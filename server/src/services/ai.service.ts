import { z } from "zod";
import { env } from "../config/env.js";

export const ticketTriageResultSchema = z.object({
  category: z.enum(["Billing", "Technical Bug", "Feature Request", "Account Access", "General"]).default("General"),
  priority: z.enum(["Urgent", "High", "Medium", "Low"]).default("Medium"),
  sentiment: z.enum(["Frustrated", "Neutral", "Delighted"]).default("Neutral"),
});

export type TicketTriageResult = z.infer<typeof ticketTriageResultSchema>;

export interface TicketSuggestionContext {
  id?: number;
  ticket_id: string;
  customer_name: string;
  customer_email?: string;
  subject: string;
  description: string;
  notes?: Array<{
    note_text: string;
    author_name?: string;
    is_internal?: boolean;
    created_at?: string;
  }>;
}

/**
 * Industrial Rule-Based Triage Engine:
 * Separates Category classification from Urgency & Impact scoring.
 * Evaluates semantic signals rather than naively escalating entire categories.
 */
function heuristicTriage(subject: string, description: string): TicketTriageResult {
  const text = `${subject} ${description}`.toLowerCase();

  // 1. Category Classification
  let category: TicketTriageResult["category"] = "General";
  if (/\b(payment|invoice|bill|billing|charge|charges|refund|subscription|credit\s*card|pricing|renewal|tax|receipt)\b/i.test(text)) {
    category = "Billing";
  } else if (/\b(bug|error|crash|exception|timeout|500|502|503|504|broken|glitch|stack\s*trace|unhandled|nullpointer)\b/i.test(text)) {
    category = "Technical Bug";
  } else if (/\b(feature|roadmap|enhancement|suggestion|would\s*like|add\s*support|integration|export\s*to)\b/i.test(text)) {
    category = "Feature Request";
  } else if (/\b(password|login|2fa|mfa|account|reset\s*password|locked|unauthorized|access\s*denied|permission)\b/i.test(text)) {
    category = "Account Access";
  }

  // 2. Priority & Impact Scoring (Decoupled from Category)
  let priority: TicketTriageResult["priority"] = "Medium";

  // Critical / Production Outage signals
  const isUrgent = /\b(production\s*down|system\s*down|site\s*down|major\s*outage|data\s*loss|breach|security\s*vulnerability|critical\s*emergency|sev0|sev1)\b/i.test(text);
  // High impact / Workflow blocker signals
  const isHigh = /\b(blocker|blocking|cannot\s*login|cannot\s*access|payment\s*failed|unable\s*to\s*work|repeatedly\s*failing|crash\s*loop|deadline)\b/i.test(text);
  // Low priority / Non-urgent inquiry signals
  const isLow = category === "Feature Request" || /\b(nice\s*to\s*have|low\s*priority|cosmetic|typo|minor|question|inquiry|how\s*do\s*i)\b/i.test(text);

  if (isUrgent) {
    priority = "Urgent";
  } else if (isHigh) {
    priority = "High";
  } else if (isLow && !isHigh) {
    priority = "Low";
  }

  // 3. Contextual Sentiment Analysis
  let sentiment: TicketTriageResult["sentiment"] = "Neutral";
  const hasFrustration = /\b(furious|angry|frustrated|ridiculous|terrible|awful|worst|unacceptable|disappointed|appalled|livid)\b/i.test(text);
  const hasDelight = /\b(thank\s*you|thanks|great|awesome|appreciate|helpful|delighted|pleased|wonderful|kudos)\b/i.test(text);

  if (hasFrustration && !hasDelight) {
    sentiment = "Frustrated";
  } else if (hasDelight && !hasFrustration) {
    sentiment = "Delighted";
  }

  return { category, priority, sentiment };
}

/**
 * Universal template cleaner that sanitizes any model placeholder artifacts
 */
function sanitizeAiResponse(raw: string): string {
  if (!raw) return "";

  let cleaned = raw;

  // 1. Strip reasoning blocks (e.g. <think>...</think>)
  cleaned = cleaned.replace(/<think>[\s\S]*?<\/think>/gi, "");

  // 2. Strip model self-analysis or post-response notes
  cleaned = cleaned.replace(/\n*---\s*\n*\*?Why this response works[\s\S]*/i, "");
  cleaned = cleaned.replace(/\n*\*?Why this response works[\s\S]*/i, "");
  cleaned = cleaned.replace(/\n*\*?Analysis:?[\s\S]*/i, "");

  // 3. Universal regex sanitizer for any bracketed placeholders: [Your Name], [Company], [Agent], etc.
  cleaned = cleaned.replace(/\[\s*(?:Your\s+)?(?:Company\s+)?Name\s*\]/gi, "Supportly");
  cleaned = cleaned.replace(/\[\s*(?:Your\s+)?(?:Agent\s+|Representative\s+)?Name\s*\]/gi, "Supportly Agent");
  cleaned = cleaned.replace(/\[\s*(?:Your\s+)?Title\s*\]/gi, "Customer Support Team");
  cleaned = cleaned.replace(/\[\s*(?:Your\s+)?Company(?:\s+Name)?\s*\]/gi, "Supportly");
  cleaned = cleaned.replace(/\[\s*(?:Supportly\s+)?Support\s+Team\s*\]/gi, "Supportly Customer Support");
  // Clean any remaining generic bracketed placeholders
  cleaned = cleaned.replace(/\[[A-Za-z0-9\s_-]{2,30}\]/g, "");

  return cleaned.trim();
}

export const aiService = {
  /**
   * Autonomous Zero-Touch Triage: Extracts category, priority, and sentiment
   */
  async classifyTicket(subject: string, description: string): Promise<TicketTriageResult> {
    const fallback = heuristicTriage(subject, description);

    if (!env.OPENROUTER_API_KEY) {
      return fallback;
    }

    try {
      const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
        method: "POST",
        signal: AbortSignal.timeout(8000),
        headers: {
          "Authorization": `Bearer ${env.OPENROUTER_API_KEY}`,
          "Content-Type": "application/json",
          "HTTP-Referer": env.FRONTEND_URL || "http://localhost:5173",
          "X-Title": "Supportly CRM Triage"
        },
        body: JSON.stringify({
          model: "nvidia/nemotron-3-nano-omni-30b-a3b-reasoning:free",
          models: [
            "nvidia/nemotron-3-nano-omni-30b-a3b-reasoning:free",
            "openrouter/free"
          ],
          temperature: 0.1,
          messages: [
            {
              role: "system",
              content: `You are an AI support ticket classification engine. Analyze the customer support ticket and return ONLY a valid JSON object matching this exact schema:
{
  "category": "Billing" | "Technical Bug" | "Feature Request" | "Account Access" | "General",
  "priority": "Urgent" | "High" | "Medium" | "Low",
  "sentiment": "Frustrated" | "Neutral" | "Delighted"
}

RULES:
1. Category: "Billing", "Technical Bug", "Feature Request", "Account Access", "General".
2. Priority: Evaluate true business urgency. Production outages or blocking crashes are Urgent/High. General questions or feature requests are Medium/Low.
3. Sentiment: "Frustrated", "Neutral", "Delighted".
4. OUTPUT ONLY THE RAW JSON OBJECT. No markdown fences, no backticks, no comments.`
            },
            {
              role: "user",
              content: `Subject: ${subject.slice(0, 500)}\nDescription: ${description.slice(0, 2000)}`
            }
          ]
        })
      });

      if (!response.ok) {
        return fallback;
      }

      const data = await response.json();
      let rawContent: string = data.choices?.[0]?.message?.content || "";

      // Extract JSON if wrapped in markdown code blocks or reasoning text
      const jsonMatch = rawContent.match(/\{[\s\S]*?\}/);
      if (!jsonMatch) {
        return fallback;
      }

      const parsed = JSON.parse(jsonMatch[0]);
      return ticketTriageResultSchema.parse(parsed);
    } catch (error) {
      console.warn("AI Triage inference error/timeout, applying heuristic fallback:", error);
      return fallback;
    }
  },

  /**
   * Generates empathetic, contextual resolution draft for a ticket
   */
  async getSuggestion(ticket: TicketSuggestionContext): Promise<string> {
    if (!env.OPENROUTER_API_KEY) {
      return "AI suggestions are not configured. Set OPENROUTER_API_KEY in your environment to enable this feature.";
    }

    try {
      let userPrompt = `Customer Name: ${ticket.customer_name}\nCustomer Email: ${ticket.customer_email || 'Not provided'}\nTicket Subject: ${ticket.subject}\nCustomer Issue: ${ticket.description}`;
      if (ticket.notes && Array.isArray(ticket.notes) && ticket.notes.length > 0) {
        const notesContext = ticket.notes
          .slice(-6)
          .map((n, idx) => {
            const author = n.author_name || 'Agent';
            const typeLabel = n.is_internal ? '[Internal Note]' : '[Customer Reply]';
            return `Update ${idx + 1} (${author} ${typeLabel}): ${n.note_text}`;
          })
          .join('\n');
        userPrompt += `\n\nRecent Activity & Discussion History:\n${notesContext}`;
      }

      const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
        method: "POST",
        signal: AbortSignal.timeout(10000),
        headers: {
          "Authorization": `Bearer ${env.OPENROUTER_API_KEY}`,
          "Content-Type": "application/json",
          "HTTP-Referer": env.FRONTEND_URL || "http://localhost:5173",
          "X-Title": "Supportly CRM"
        },
        body: JSON.stringify({
          model: "nvidia/nemotron-3-nano-omni-30b-a3b-reasoning:free",
          models: [
            "nvidia/nemotron-3-nano-omni-30b-a3b-reasoning:free",
            "nvidia/nemotron-3-super-120b-a12b:free",
            "openrouter/free"
          ],
          messages: [
            {
              role: "system",
              content: `You are a helpful, empathetic, and professional customer support specialist at Supportly. Write a direct, ready-to-send reply to the customer.

RULES:
1. OUTPUT ONLY THE ACTUAL REPLY. Do NOT include any self-analysis, meta-commentary, or reasoning notes.
2. NO PLACEHOLDERS: Never output bracketed placeholders like "[Your Name]" or "[Your Company Name]". Sign off directly as:
Best regards,
Supportly Customer Support
3. CONCISE & POLITE: 2 to 3 short, helpful paragraphs.`
            },
            {
              role: "user",
              content: userPrompt
            }
          ]
        })
      });

      if (!response.ok) {
        throw new Error(`OpenRouter API error: ${response.statusText}`);
      }

      const data = await response.json();
      const rawReply: string = data.choices?.[0]?.message?.content || "";
      const cleaned = sanitizeAiResponse(rawReply);

      return cleaned || "Thank you for contacting Supportly. We have received your ticket and our team is actively investigating. We will follow up shortly.";
    } catch (error) {
      console.error("AI suggestion error or timeout:", error);
      return "AI suggestion service is currently unavailable. Please try again later.";
    }
  }
};
