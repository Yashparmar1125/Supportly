import { pool } from "../src/db/pool.js";
import { ticketService } from "../src/services/ticket.service.js";

async function seed() {
  try {
    console.log("Seeding tickets with realistic support data...");

    const t1 = await ticketService.create({
      customer_name: "Aarav Patel",
      customer_email: "aarav.patel@kredx.in",
      subject: "Payment failed on annual enterprise renewal",
      description: "Customer says the renewal charge failed twice with bank decline code 05. Requesting a manual retry before the grace period expires.",
      category: "Billing",
      priority: "Urgent",
      channel: "Email",
      organization: "KredX"
    });

    const t2 = await ticketService.create({
      customer_name: "Riya Nair",
      customer_email: "riya.nair@quicksend.in",
      subject: "Webhook delivery payloads failing with 504 timeout",
      description: "Our ingestion worker is receiving HTTP 504 gateway timeouts on webhook delivery payloads. Over 2,400 orders pending sync.",
      category: "Technical Bug",
      priority: "High",
      channel: "API",
      organization: "QuickSend"
    });

    const t3 = await ticketService.create({
      customer_name: "Vikram Mehta",
      customer_email: "vikram.mehta@cashflow.in",
      subject: "GST invoice reconciliation report discrepancy",
      description: "Accidentally generated GST invoice on two different billing entities. Requesting a credit note and updated B2B invoice.",
      category: "Billing",
      priority: "High",
      channel: "Web Portal",
      organization: "CashFlow Neo"
    });

    const t4 = await ticketService.create({
      customer_name: "Alex Chen",
      customer_email: "alex.chen@innovate.io",
      subject: "Can't reset password on mobile device",
      description: "Password reset link sends successfully, but tapping the link inside iOS Safari throws an invalid session token error.",
      category: "Account Access",
      priority: "Medium",
      channel: "Web Portal",
      organization: "Innovate"
    });

    const t5 = await ticketService.create({
      customer_name: "David Kim",
      customer_email: "dkim@globalfin.org",
      subject: "Enterprise SSO SAML 2.0 integration guidelines",
      description: "We are onboarding 150 agents and need Okta SAML 2.0 configuration guidelines, metadata URL, and SP entity ID.",
      category: "Account Access",
      priority: "Medium",
      channel: "Email",
      organization: "GlobalFin"
    });

    const t6 = await ticketService.create({
      customer_name: "Sarah Jenkins",
      customer_email: "sarah@brightpath.co",
      subject: "Feature request: Custom tag routing & dark mode",
      description: "Our night-shift support squad would greatly appreciate automated tag routing rules and a dark mode interface toggle.",
      category: "Feature Request",
      priority: "Low",
      channel: "Web Portal",
      organization: "BrightPath"
    });

    console.log("Seeding activity notes...");
    await ticketService.update(t1.ticket_id, {
      status: "In Progress",
      note: "Checked Stripe logs. Card expired last month; sent an update billing link to customer."
    });
    await ticketService.update(t1.ticket_id, {
      note: "Customer updated payment method. Retry scheduled for 18:00 UTC."
    });

    await ticketService.update(t2.ticket_id, {
      status: "In Progress",
      note: "Investigated API Gateway error logs. Traced to 10s worker timeout under high traffic burst."
    });

    await ticketService.update(t3.ticket_id, {
      status: "Closed",
      note: "Generated credit note CN-2026-904. Sent corrected B2B tax invoice to accounts payable."
    });

    console.log("Database seeded successfully with multi-client triage tickets.");
  } catch (error) {
    console.error("Error seeding database:", error);
    process.exit(1);
  } finally {
    await pool.end();
  }
}

seed();
