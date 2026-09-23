import { env } from "../config/env.js";

export const aiService = {
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
