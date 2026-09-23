import { pool } from "../src/db/pool.js";
import { ticketService } from "../src/services/ticket.service.js";

async function seed() {
  try {
    console.log("Seeding tickets with realistic support data...");

    const t1 = await ticketService.create({
      customer_name: "Rina Shah",
      customer_email: "rina@acmecorp.com",
      subject: "Payment failed on annual renewal",
      description: "Customer says the renewal charge failed twice with bank decline code 05. Requesting a manual retry before the grace period expires."
    });

    const t2 = await ticketService.create({
      customer_name: "Alex Chen",
      customer_email: "alex.chen@innovate.io",
      subject: "Can't reset password on mobile",
      description: "Password reset link sends successfully, but tapping the link inside iOS Safari throws an invalid session token error."
    });

    const t3 = await ticketService.create({
      customer_name: "Marcus Vance",
      customer_email: "m.vance@vancestudio.com",
      subject: "Refund request for double subscription",
      description: "Accidentally upgraded to the team tier on two different workspaces. Requesting a cancellation and refund for workspace WS-941."
    });

    const t4 = await ticketService.create({
      customer_name: "Priya Patel",
      customer_email: "priya@dataflow.dev",
      subject: "Webhook payloads failing with 504 timeout",
      description: "Outbound webhooks to our AWS API Gateway endpoint are timing out after 10s. Could you check if outbound payload retries are enabled?"
    });

    const t5 = await ticketService.create({
      customer_name: "David Kim",
      customer_email: "dkim@globalfin.org",
      subject: "Enterprise SSO SAML integration inquiry",
      description: "We are onboarding 150 agents and need Okta SAML 2.0 configuration guidelines, metadata URL, and SP entity ID."
    });

    const t6 = await ticketService.create({
      customer_name: "Sarah Jenkins",
      customer_email: "sarah@brightpath.co",
      subject: "Feature request: Dark mode & custom tags",
      description: "Our night-shift support team would greatly appreciate a dark theme toggle and custom color tags for priority categorization."
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
      note: "Reproduced on iOS 17.4 Safari. Deep-link scheme handler issue identified in client v2.4."
    });

    await ticketService.update(t3.ticket_id, {
      status: "Closed",
      note: "Issued full refund of $240 via Stripe payment refund ID re_3Nq... Closed ticket."
    });

    await ticketService.update(t4.ticket_id, {
      status: "Open",
      note: "Assigned to backend infrastructure on-call engineer."
    });

    console.log("Database seeded successfully with authentic support data.");
  } catch (error) {
    console.error("Error seeding database:", error);
  } finally {
    await pool.end();
  }
}

seed();
