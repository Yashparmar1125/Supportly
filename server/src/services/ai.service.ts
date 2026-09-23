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
          "HTTP-Referer": env.FRONTEND_URL || "http://localhost:3000",
          "X-Title": "Supportly CRM"
        },
        body: JSON.stringify({
          model: "openrouter/free",
          messages: [
            {
              role: "system",
              content: "You are a professional customer support agent. Please provide a helpful, polite, and concise reply to the customer's issue based on the ticket details."
            },
            {
              role: "user",
              content: `Ticket Subject: ${ticket.subject}\nTicket Description: ${ticket.description}\nCustomer Name: ${ticket.customer_name}`
            }
          ]
        })
      });

      if (!response.ok) {
        throw new Error(`OpenRouter API error: ${response.statusText}`);
      }

      const data = await response.json();
      return data.choices[0]?.message?.content || "I'm sorry, I couldn't generate a suggestion at this time.";
    } catch (error) {
      console.error("AI suggestion error:", error);
      return "AI suggestion service is currently unavailable. Please try again later.";
    }
  }
};
