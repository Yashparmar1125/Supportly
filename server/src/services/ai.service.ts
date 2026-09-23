import { z } from "zod";
import { env } from "../config/env.js";

export const ticketTriageResultSchema = z.object({
  category: z.enum(["Billing", "Technical Bug", "Feature Request", "Account Access", "General"]).default("General"),
  priority: z.enum(["Urgent", "High", "Medium", "Low"]).default("Medium"),
  sentiment: z.enum(["Frustrated", "Neutral", "Delighted"]).default("Neutral"),
});

export type TicketTriageResult = z.infer<typeof ticketTriageResultSchema>;

/**
 * Deterministic heuristic triage engine providing instant, rule-based fallback
 */
function heuristicTriage(subject: string, description: string): TicketTriageResult {
  const text = `${subject} ${description}`.toLowerCase();

  // Category heuristics
  let category: TicketTriageResult["category"] = "General";
  if (/(payment|invoice|bill|charge|refund|subscription|credit card|pricing|renewal|tax|receipt)/i.test(text)) {
    category = "Billing";
  } else if (/(bug|error|crash|fail|exception|timeout|500|504|broken|glitch|stack trace|outage)/i.test(text)) {
    category = "Technical Bug";
  } else if (/(feature|request|would love|suggestion|add support|integration|roadmap|enhancement)/i.test(text)) {
    category = "Feature Request";
  } else if (/(password|login|2fa|mfa|account|reset|unlock|unauthorized|access denied|permission)/i.test(text)) {
    category = "Account Access";
  }

  // Priority heuristics
  let priority: TicketTriageResult["priority"] = "Medium";
  if (/(asap|emergency|urgent|critical|immediately|down|outage|data loss|breached|production down)/i.test(text)) {
    priority = "Urgent";
  } else if (/(high|blocker|cannot work|failing repeatedly|timeout|broken|refund)/i.test(text) || category === "Technical Bug" || category === "Billing") {
    priority = "High";
  } else if (category === "Feature Request") {
    priority = "Low";
  }

  // Sentiment heuristics
  let sentiment: TicketTriageResult["sentiment"] = "Neutral";
  if (/(furious|angry|frustrated|ridiculous|terrible|awful|worst|unacceptable|disappointed|urgent|fail)/i.test(text)) {
    sentiment = "Frustrated";
  } else if (/(thank|great|love|awesome|appreciate|helpful|delighted|pleased)/i.test(text)) {
    sentiment = "Delighted";
  }

  return { category, priority, sentiment };
}

export const aiService = {
  /**
   * Autonomous Zero-Touch Triage: Extracts category, priority, and sentiment
   * Guaranteed structured JSON validated by Zod schema
   */
  async classifyTicket(subject: string, description: string): Promise<TicketTriageResult> {
    const fallback = heuristicTriage(subject, description);

    if (!env.OPENROUTER_API_KEY) {
      return fallback;
    }

    try {
      const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
        method: "POST",
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
1. Category must be one of: "Billing", "Technical Bug", "Feature Request", "Account Access", "General".
2. Priority must be one of: "Urgent", "High", "Medium", "Low". (Payment issues or breaking crashes are Urgent/High).
3. Sentiment must be one of: "Frustrated", "Neutral", "Delighted".
4. OUTPUT ONLY THE RAW JSON OBJECT. No markdown fences, no backticks, no comments, no extra text.`
            },
            {
              role: "user",
              content: `Subject: ${subject}\nDescription: ${description}`
            }
          ]
        })
      });

      if (!response.ok) {
        return fallback;
      }

      const data = await response.json();
      let rawContent: string = data.choices?.[0]?.message?.content || "";

      // Extract JSON if wrapped in codeblocks or text
      const jsonMatch = rawContent.match(/\{[\s\S]*\}/);
      if (!jsonMatch) {
        return fallback;
      }

      const parsed = JSON.parse(jsonMatch[0]);
      return ticketTriageResultSchema.parse(parsed);
    } catch (error) {
      console.warn("AI Triage inference error, applying heuristic fallback:", error);
      return fallback;
    }
  },

  async getSuggestion(ticket: any) {
    if (!env.OPENROUTER_API_KEY) {
      return "AI suggestions are not configured. Set OPENROUTER_API_KEY in your environment to enable this feature.";
    }

    try {
      const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
        method: "POST",
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
1. OUTPUT ONLY THE ACTUAL REPLY. Do NOT include any self-analysis, meta-commentary, notes like "*Why this response works*", or bullet points analyzing the response.
2. NO PLACEHOLDERS: Never output bracketed placeholders like "[Your Name]" or "[Your Company Name]".
3. CONCISE & POLITE: Keep it between 2 to 3 short, helpful paragraphs.
4. SIGN-OFF: End with:
Best regards,
Supportly Customer Support`
            },
            {
              role: "user",
              content: `Customer Name: ${ticket.customer_name}\nCustomer Email: ${ticket.customer_email || 'Not provided'}\nTicket Subject: ${ticket.subject}\nCustomer Issue: ${ticket.description}`
            }
          ]
        })
      });

      if (!response.ok) {
        throw new Error(`OpenRouter API error: ${response.statusText}`);
      }

      const data = await response.json();
      let reply: string = data.choices?.[0]?.message?.content || "";

      // Post-processing cleanup: strip any model meta-analysis or brackets
      reply = reply.replace(/\n*---\s*\n*\*?Why this response works[\s\S]*/i, "");
      reply = reply.replace(/\n*\*?Why this response works[\s\S]*/i, "");
      reply = reply.replace(/\[Your Name\]/gi, "Supportly Agent");
      reply = reply.replace(/\[Your Company Name\]/gi, "Supportly");
      reply = reply.replace(/\[Company Name\]/gi, "Supportly");
      reply = reply.replace(/\[Your Title\]/gi, "Customer Support Team");

      return reply.trim() || "Thank you for contacting Supportly. We have received your ticket and our team is actively investigating. We will follow up shortly.";
    } catch (error) {
      console.error("AI suggestion error:", error);
      return "AI suggestion service is currently unavailable. Please try again later.";
    }
  }
};
