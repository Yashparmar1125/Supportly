# Supportly — Product Roadmap & SaaS Transformation Plan

> **Author:** Yash Parmar
> **Version:** 2.0 — September 2026
> **Vision:** Transform Supportly from an assessment prototype into a production-grade, AI-native Customer Support SaaS platform.

---

## Table of Contents

1. [Executive Summary](#1-executive-summary)
2. [Market Opportunity](#2-market-opportunity)
3. [Competitive Landscape](#3-competitive-landscape)
4. [Supportly's Current State](#4-supportlys-current-state)
5. [Strategic Positioning](#5-strategic-positioning)
6. [Products & Use Cases](#6-products--use-cases)
7. [User Stories by Product](#7-user-stories-by-product)
8. [Technology Evolution (Stack-Aligned)](#8-technology-evolution-stack-aligned)
9. [Phased Milestone Roadmap](#9-phased-milestone-roadmap)
10. [Revenue Model & Pricing](#10-revenue-model--pricing)
11. [Key Decisions & Rationale](#11-key-decisions--rationale)
12. [Risk Matrix & Mitigation](#12-risk-matrix--mitigation)
13. [Success Metrics](#13-success-metrics)

---

## 1. Executive Summary

The customer support software market is valued at **$15.6B (2026)** and projected to reach **$58.1B by 2033** (20.94% CAGR). The industry is shifting from human-operated ticket queues to **AI-native autonomous resolution engines**.

The giants — Zendesk ($55–$169/agent), Intercom ($29–$132/seat + $0.99/resolution), Freshdesk ($19–$89/agent) — are powerful but expensive, complex, and locked into proprietary ecosystems. SMBs and growing startups need an affordable, AI-first support platform that works out of the box.

**Supportly fills this gap** — an AI-native, affordable customer support SaaS built on a familiar, proven tech stack (React, Node.js, PostgreSQL) that delivers autonomous ticket resolution, multi-channel support, and transparent pricing.

---

## 2. Market Opportunity

### 2.1 Market Sizing

| Segment | TAM (2026) | Growth Rate |
|:---|:---|:---|
| Customer Support Software | $15.6B | 20.94% CAGR |
| AI in Customer Service | $4.1B | 35.2% CAGR |
| SMB Helpdesk (<100 employees) | $3.8B | 18.5% CAGR |

### 2.2 Key Trends Driving Demand

1. **AI Resolves, Not Just Assists** — Intercom's Fin AI generates ~$100M ARR autonomously resolving tickets. Zendesk bills $1.50 per AI resolution. The market moved from "AI suggests" to "AI resolves."
2. **Outcome-Based Pricing** — Both Zendesk and Intercom now charge per successful resolution, aligning vendor incentives with customer value.
3. **SMB Underserved** — 79.5% of HelpScout's customers are <100 employees. Small teams can't afford $55/agent/month Zendesk but need more than shared Gmail.
4. **Developer-Led Adoption** — Technical founders want API-first, transparent platforms they can extend — not black-box enterprise tools behind sales calls.

---

## 3. Competitive Landscape

### 3.1 Head-to-Head Comparison

| Platform | Starting Price | AI Cost | Customers | Revenue | Strength | Weakness |
|:---|:---|:---|:---|:---|:---|:---|
| **Zendesk** | $55/agent/mo | $1.50/resolution | 100K+ | ~$2B ARR | Enterprise scale, 1800+ apps, AutoQA | Expensive, complex setup, no free tier |
| **Intercom** | $29/seat/mo | $0.99/resolution | 30K+ | ~$400M ARR | Fin AI ($100M ARR alone), Procedures, Voice AI | Acquired by Salesforce ($3.6B), mid-market pricing |
| **Freshdesk** | $19/agent/mo | $0.49/session | 75K+ | $839M rev | Neo Platform, fast setup, day passes | Legacy migration still ongoing |
| **HelpScout** | $25/user/mo | $0.75/resolution | 12K+ | ~$60M ARR | Simple, "un-ticketed" feel, B-Corp values | No native voice, limited automation |
| **Chatwoot** | Free (OSS) | Community | 15K+ GitHub stars | — | Open-source, self-hostable, Vue.js + Rails | Limited AI, small team |

### 3.2 Tech Stack Patterns (What Competitors Use)

| Company | Frontend | Backend | Database | Real-Time | Search | AI |
|:---|:---|:---|:---|:---|:---|:---|
| Zendesk | React, TypeScript | Ruby on Rails + Go/Java | Aurora MySQL | WebSockets, Kafka | Elasticsearch | Ultimate.ai + Klaus |
| Intercom | React, TypeScript | Ruby on Rails + Go/Scala | MySQL (Vitess), DynamoDB | WebSockets (millions) | Elasticsearch (350TB) | GPT-4o + Claude |
| Freshdesk | React | Ruby on Rails + Java/Node | MySQL (sharded) | WebSockets (2M+), Kafka | Elasticsearch | Azure OpenAI (Freddy) |
| HelpScout | React, TypeScript | Kotlin, Java, PHP | MySQL, PostgreSQL, ClickHouse | Kafka, SSE | Elasticsearch | OpenAI |
| Chatwoot | Vue.js, Tailwind | Ruby on Rails | PostgreSQL + pgvector | ActionCable (WebSockets) | PostgreSQL FTS | OpenAI |

**Key Insight:** Every major competitor uses a relational DB + Redis + Elasticsearch pattern. Chatwoot (closest open-source peer) uses PostgreSQL + pgvector — the exact same DB we already have. Our stack is well-aligned.

---

## 4. Supportly's Current State

### 4.1 What We Have (v1.1.7)

| Layer | Implementation | Status |
|:---|:---|:---|
| **Frontend** | React 19, TypeScript 5.5, Tailwind CSS v4, TanStack Query v5, React Router v7, Vite | ✅ Production-ready |
| **Backend** | Node.js, Express, TypeScript, Zod validation, layered service architecture | ✅ Solid |
| **Database** | Neon PostgreSQL — `ticket_id_seq`, GIN full-text search, weighted `tsvector` | ✅ Strong |
| **AI** | OpenRouter (Gemma 4 31B), context-aware prompting, anti-hallucination, heuristic fallback | ✅ Working |
| **Auth** | JWT + bcryptjs (12 rounds), single admin role | ⚠️ Needs RBAC |
| **Real-Time** | 15s polling via TanStack Query | ⚠️ Needs SSE/WS |
| **Channels** | Web portal only | ⚠️ Single channel |
| **Multi-Tenancy** | None | ❌ Single tenant |
| **Billing** | None | ❌ Not monetizable |

### 4.2 Current Stack DNA

```
React 19 + TypeScript + Tailwind CSS v4 + Vite
        ↕ REST API (JSON)
Express + TypeScript + Zod
        ↕ SQL (pg driver)
Neon PostgreSQL (Serverless)
        ↕ HTTP
OpenRouter LLM API
```

**This is the DNA we preserve.** Every technology choice below evolves from this stack naturally — no alien introductions.

---

## 5. Strategic Positioning

### 5.1 Positioning Statement

> **Supportly** is the AI-native customer support platform for modern teams who want Intercom-level intelligence at startup-friendly pricing. Instant setup, autonomous AI resolution, and multi-channel support — without the enterprise complexity.

### 5.2 Target Users

| Persona | Profile | Pain Point | What They Switch From |
|:---|:---|:---|:---|
| **Solo SaaS Founder** | 1–3 person team, bootstrapped | Can't afford Zendesk, managing support in Gmail | Gmail, Notion |
| **Startup CX Lead** | Series A, 10–30 employees | Outgrowing HelpScout, needs AI and automation | HelpScout, Crisp |
| **SMB Support Manager** | 30–100 agents, 10K+ tickets/month | Zendesk is too expensive, Freshdesk feels dated | Zendesk, Freshdesk |
| **Developer Building SaaS** | Technical founder who wants API-first tools | Wants to embed support, not bolt on a separate tool | Custom-built, Chatwoot |

---

## 6. Products & Use Cases

Supportly will ship as **5 core products** bundled into the platform:

---

### 6.1 Product: **Supportly Inbox** — Unified Multi-Channel Inbox

**What it is:** A shared team inbox where all customer conversations from every channel (web, email, chat widget, WhatsApp, Slack) appear in one view. Agents claim, reply, collaborate, and resolve — all from one screen.

**Use Cases:**

| # | Use Case | Description |
|:---|:---|:---|
| UC-1 | **Email-to-Ticket** | Customer sends email to `support@company.com` → auto-creates a ticket in Inbox with thread tracking |
| UC-2 | **Chat Widget Conversations** | Visitor clicks chat widget on company website → real-time conversation routed to available agent |
| UC-3 | **WhatsApp Support** | Customer messages business WhatsApp number → appears as conversation in Inbox |
| UC-4 | **Slack-to-Ticket** | Team member creates ticket from Slack message → bi-directional thread sync |
| UC-5 | **Collision Prevention** | Two agents open the same ticket → both see a live "Agent X is viewing this" warning |
| UC-6 | **Internal Notes** | Agent adds private note (invisible to customer) for team coordination |
| UC-7 | **Ticket Assignment** | Lead assigns ticket to specific agent or team based on skill/availability |
| UC-8 | **Bulk Actions** | Select 20 tickets → bulk close, reassign, tag, or change priority |
| UC-9 | **Saved Replies / Macros** | Agent uses pre-written templates with dynamic variables (`{{customer_name}}`, `{{ticket_id}}`) |

---

### 6.2 Product: **Supportly AI** — Autonomous Resolution Engine

**What it is:** An AI agent that reads incoming tickets, searches the knowledge base, drafts replies, and autonomously resolves common queries — only escalating to humans when unsure.

**Use Cases:**

| # | Use Case | Description |
|:---|:---|:---|
| UC-10 | **Auto-Categorize** | New ticket arrives → AI instantly classifies category (Billing, Bug, Feature Request, Account, General) and priority |
| UC-11 | **Auto-Resolve FAQs** | "How do I reset my password?" → AI finds KB article, sends answer, marks resolved (no human needed) |
| UC-12 | **AI Draft for Agent** | Complex ticket → AI drafts a suggested reply citing KB sources, agent reviews and sends |
| UC-13 | **Sentiment Detection** | Frustrated customer email → AI flags as high urgency, bumps priority, alerts team lead |
| UC-14 | **Conversation Summary** | Agent opens a 15-message thread → one-click AI summary of the entire conversation history |
| UC-15 | **Tone Adjustment** | Agent writes a reply → AI polishes tone (more empathetic, more formal, shorter) |
| UC-16 | **Knowledge Search** | Agent types a question → AI searches KB and past tickets for relevant context |
| UC-17 | **Smart Escalation** | AI confidence <60% → automatically escalates to human with context summary |
| UC-18 | **Action Execution** | Customer asks "cancel my subscription" → AI calls Stripe API to process cancellation (with guardrails) |

---

### 6.3 Product: **Supportly Docs** — Knowledge Base & Help Center

**What it is:** A public-facing help center where customers can self-serve, and an internal knowledge base that powers the AI engine's answers.

**Use Cases:**

| # | Use Case | Description |
|:---|:---|:---|
| UC-19 | **Self-Service Portal** | Customer searches "billing FAQ" on help.company.com → finds answer without contacting support |
| UC-20 | **AI-Powered Search** | Customer types natural language question → semantic search (not just keyword) finds best article |
| UC-21 | **Article Management** | Admin creates/edits articles with rich text, images, code blocks, and categories |
| UC-22 | **Internal-Only Docs** | Team creates private runbooks and SOPs visible only to agents (not customers) |
| UC-23 | **Article Suggestions** | System analyzes unanswered queries → suggests topics for new KB articles |
| UC-24 | **Multilingual Support** | KB articles available in multiple languages, auto-suggested based on customer locale |
| UC-25 | **Widget KB Search** | Customer opens chat widget → searches KB articles inline before starting a conversation |

---

### 6.4 Product: **Supportly Automate** — Workflow Automation Engine

**What it is:** A no-code rule builder where admins create "if-this-then-that" workflows to automate repetitive tasks — routing, escalation, notifications, SLA enforcement.

**Use Cases:**

| # | Use Case | Description |
|:---|:---|:---|
| UC-26 | **Auto-Route by Category** | Billing ticket → auto-assign to Billing team; Bug ticket → assign to Engineering team |
| UC-27 | **SLA Countdown** | Urgent ticket → 2-hour SLA timer starts; 30 min before breach → alert team lead |
| UC-28 | **Auto-Escalate** | Ticket unanswered for 4 hours → auto-escalate to senior agent + Slack notification |
| UC-29 | **Auto-Close Stale** | Customer hasn't replied in 7 days → auto-close ticket with follow-up email |
| UC-30 | **CSAT Survey Trigger** | Ticket resolved → automatically send 1–5 star satisfaction survey via email/in-chat |
| UC-31 | **VIP Routing** | Customer from enterprise org (>$10K ARR) → bypass queue, assign to dedicated agent |
| UC-32 | **Business Hours** | Ticket created at 2 AM → auto-reply "We'll get back to you during business hours (9 AM–6 PM IST)" |
| UC-33 | **Slack Notification** | High-priority ticket created → post alert to #support-urgent Slack channel |

---

### 6.5 Product: **Supportly Insights** — Analytics & Reporting Dashboard

**What it is:** Real-time analytics showing team performance, AI effectiveness, customer satisfaction, and SLA compliance — helping managers make data-driven decisions.

**Use Cases:**

| # | Use Case | Description |
|:---|:---|:---|
| UC-34 | **Team KPI Dashboard** | Manager views FRT (First Response Time), resolution time, SLA compliance, open backlog |
| UC-35 | **Agent Performance** | See tickets resolved per agent, average handle time, CSAT score per agent |
| UC-36 | **AI Effectiveness** | Track AI resolution rate (%), deflection rate, confidence distribution, escalation reasons |
| UC-37 | **Channel Analytics** | Compare volume and resolution time across Email vs. Chat vs. WhatsApp |
| UC-38 | **CSAT Trends** | Track customer satisfaction over time — by team, agent, category, or channel |
| UC-39 | **SLA Compliance Report** | Weekly report: 94% of urgent tickets resolved within 2-hour SLA |
| UC-40 | **Volume Forecasting** | Predict next week's ticket volume based on historical trends |
| UC-41 | **Export & Scheduled Reports** | Export CSV/PDF, schedule weekly email reports to management |

---

## 7. User Stories by Product

### 7.1 Supportly Inbox

```
INBOX-1: As a support agent, I want to see all customer conversations from email, 
         chat, and WhatsApp in one inbox so I don't need to switch between tools.

INBOX-2: As a support agent, I want to see a warning when another agent is already 
         viewing the same ticket so we don't send duplicate replies.

INBOX-3: As a support lead, I want to assign tickets to specific agents based on 
         their expertise (billing, technical, etc.) so issues reach the right person.

INBOX-4: As a support agent, I want to add private internal notes on a ticket that 
         the customer can't see, so I can coordinate with my team.

INBOX-5: As a support agent, I want to use saved reply templates with variables 
         like {{customer_name}} so I can respond quickly to common questions.

INBOX-6: As a support agent, I want to bulk-select tickets and change their status, 
         priority, or assignment in one action to manage my queue efficiently.

INBOX-7: As a customer, I want to email support@company.com and have my issue 
         tracked automatically without needing to create an account or fill forms.

INBOX-8: As a customer, I want to chat with support on the company website and get 
         real-time responses without leaving the page.

INBOX-9: As a customer, I want to message the company on WhatsApp and get support 
         on the platform I already use daily.

INBOX-10: As a support lead, I want to see which agents are online and their current 
          workload so I can distribute tickets fairly.
```

### 7.2 Supportly AI

```
AI-1: As a support agent, I want the AI to auto-categorize incoming tickets 
      (Billing, Bug, Feature Request) so I don't have to read and tag each one manually.

AI-2: As a business owner, I want the AI to autonomously resolve simple FAQ questions 
      (password reset, pricing, how-to) without any human agent involvement.

AI-3: As a support agent, I want the AI to draft a reply based on our KB articles 
      and past ticket resolutions so I can review and send it with one click.

AI-4: As a support lead, I want the AI to flag frustrated customers and auto-bump 
      their priority so we can prevent churn.

AI-5: As a support agent, I want to summarize a long 20-message conversation thread 
      into key bullet points so I can quickly understand the context.

AI-6: As a support agent, I want to adjust the tone of my reply (more empathetic, 
      more concise, more formal) with one click before sending.

AI-7: As a business owner, I want AI answers to cite the exact KB article they're 
      referencing so customers can verify the information and I can trust the AI.

AI-8: As a support lead, I want the AI to automatically escalate tickets it's 
      not confident about to a human agent — never giving wrong answers.

AI-9: As a business owner, I want the AI to handle transactional requests 
      (cancel subscription, update email, check order status) by calling our APIs.

AI-10: As a support agent, I want to ask the AI "what do we know about X?" and get 
       relevant KB articles and past ticket context instantly.
```

### 7.3 Supportly Docs

```
DOCS-1: As a customer, I want to search a help center and find answers to my 
        questions without contacting support.

DOCS-2: As a customer, I want to type a natural question ("why was I charged twice?") 
        and get relevant articles — not just keyword-matched results.

DOCS-3: As a support admin, I want to create and organize KB articles with categories, 
        tags, and rich formatting (images, code blocks, videos).

DOCS-4: As a support admin, I want to create internal-only articles (runbooks, SOPs) 
        that only agents can see, not customers.

DOCS-5: As a support admin, I want the system to suggest what new articles to write 
        based on questions customers ask that have no matching KB content.

DOCS-6: As a customer, I want to search KB articles directly inside the chat widget 
        before starting a conversation — maybe I can solve it myself.

DOCS-7: As a support admin, I want article analytics — which articles are most 
        viewed, most helpful (thumbs up/down), and which have high bounce rates.
```

### 7.4 Supportly Automate

```
AUTO-1: As a support admin, I want to create rules like "if category is Billing, 
        assign to Billing team" without writing any code.

AUTO-2: As a support lead, I want SLA timers that count down based on priority 
        (Urgent=2h, High=8h) and alert me before a breach.

AUTO-3: As a support admin, I want tickets unanswered for 4+ hours to auto-escalate 
        to a senior agent with a Slack notification.

AUTO-4: As a support admin, I want stale tickets (no customer reply in 7 days) to 
        auto-close with a polite follow-up email.

AUTO-5: As a support admin, I want a CSAT survey sent automatically when a ticket 
        is resolved so we collect feedback without manual effort.

AUTO-6: As a support admin, I want VIP customers routed to dedicated agents 
        immediately, bypassing the regular queue.

AUTO-7: As a support admin, I want an auto-reply sent outside business hours telling 
        customers when to expect a response.

AUTO-8: As a support admin, I want key events (high-priority ticket, SLA breach) 
        posted to a Slack channel automatically.
```

### 7.5 Supportly Insights

```
INSIGHT-1: As a support manager, I want a dashboard showing FRT, resolution time, 
           SLA compliance, and open backlog at a glance.

INSIGHT-2: As a support manager, I want to see per-agent metrics (tickets resolved, 
           handle time, CSAT) to identify coaching opportunities.

INSIGHT-3: As a business owner, I want to see what % of tickets the AI resolves 
           autonomously vs. what % need human agents.

INSIGHT-4: As a support manager, I want to compare performance across channels 
           (Email vs. Chat vs. WhatsApp) to staff accordingly.

INSIGHT-5: As a support manager, I want weekly CSAT trend reports emailed to me 
           every Monday morning.

INSIGHT-6: As a support admin, I want to export ticket data as CSV for compliance 
           audits or custom analysis.

INSIGHT-7: As a business owner, I want to see volume trends and predict staffing 
           needs for next month.
```

---

## 8. Technology Evolution (Stack-Aligned)

> **Principle:** Evolve the current stack naturally. No alien technology introductions. Every addition is either a PostgreSQL extension, an npm package, or a managed service that fits the Node.js/React ecosystem.

### 8.1 Stack Evolution Map

| Layer | Current (v1.x) | Phase 1–2 Addition | Phase 3–4 Addition | Phase 5–6 Addition |
|:---|:---|:---|:---|:---|
| **Frontend** | React 19, TS, Tailwind v4, TanStack Query, React Router v7, Vite | + TipTap (rich editor), + native `EventSource` API | + React Flow (workflow builder UI) | + Recharts (analytics charts) |
| **Backend** | Express, TypeScript, Zod | + `express-ws` or `ws` (WebSocket), + BullMQ (job queue) | + Stripe SDK, + Postmark SDK | + OpenAPI auto-docs |
| **Database** | Neon PostgreSQL, GIN search | + `pgvector` extension, + Redis (Upstash serverless) | + Row-Level Security (RLS), + table partitioning | + materialized views (analytics) |
| **AI/LLM** | OpenRouter (Gemma 4 31B) | + pgvector embeddings | + Claude/Gemini via OpenRouter, + Cohere Rerank | + fine-tuned classifier |
| **Real-Time** | TanStack Query 15s polling | + Server-Sent Events (SSE) | + WebSocket for chat widget | Same |
| **Email** | None | + Resend (transactional) | + Postmark Inbound Webhooks | Same |
| **Chat Widget** | None | — | + Custom React widget (iframe + Shadow DOM) | Same |
| **Messaging** | None | — | + WhatsApp Cloud API (Meta Graph) | + Slack Bolt SDK |
| **Job Queue** | None | + BullMQ (Redis-backed) | Same | Same |
| **Cache** | None | + Upstash Redis (serverless) | Same | Same |
| **File Storage** | None | + Cloudflare R2 or AWS S3 | Same | Same |
| **Auth** | JWT + bcryptjs | + `arctic` (OAuth2), + Redis sessions | + RBAC middleware | + SAML (Phase 6) |
| **Billing** | None | — | + Stripe Billing + Webhooks | Same |
| **Monitoring** | Health endpoint | + Sentry (error tracking) | + BetterStack (uptime) | + basic custom analytics |
| **Deployment** | Vercel (serverless) | Same | + Docker option (self-host) | Same |
| **CI/CD** | None | + GitHub Actions | Same | Same |

### 8.2 What We're NOT Introducing (And Why)

| Technology | Why Not |
|:---|:---|
| ~~NATS JetStream~~ | Over-engineered for our scale. **BullMQ + Redis** handles job queues and pub/sub with tools we already know (Node.js ecosystem). |
| ~~Liveblocks~~ | Expensive SaaS dependency for one feature. **Custom Redis Pub/Sub + SSE** achieves collision detection with tools we control. |
| ~~ClickHouse~~ | Premature optimization. **PostgreSQL materialized views + window functions** handle analytics for 500K+ tickets. Migrate only if we hit millions. |
| ~~Fastify~~ | Rewriting Express to Fastify adds migration risk with minimal gain. Express handles our throughput. Fastify is a "nice-to-have" for later. |
| ~~Elasticsearch~~ | PostgreSQL GIN + pgvector already gives us full-text + semantic search. Elasticsearch only needed at 10M+ documents. |
| ~~Kafka~~ | Massive operational overhead. BullMQ on Redis handles async jobs and event-driven flows perfectly at our scale. |

### 8.3 Architecture: Current → Target

**Current (v1.x):**
```
  React SPA ──── REST API ──── PostgreSQL
  (Vite)         (Express)      (Neon)
                     │
                 OpenRouter
                 (Gemma 4)
```

**Target (v3.x — Full SaaS):**
```
  ┌────────────────────────────────────────────────────┐
  │                   CLIENT APPS                       │
  │  Agent Dashboard    Customer Portal    Chat Widget  │
  │  (React 19 SPA)    (React SPA)        (iframe+WC)  │
  └─────────┬──────────────┬─────────────────┬─────────┘
            │              │                 │
            ▼              ▼                 ▼
  ┌────────────────────────────────────────────────────┐
  │              EXPRESS API SERVER                      │
  │  ├── REST API v2 (Tickets, Contacts, Orgs, KB)     │
  │  ├── SSE Endpoint (/events — live ticket stream)    │
  │  ├── WebSocket (/ws — chat widget real-time)        │
  │  ├── Webhook Receiver (Postmark, WhatsApp, Stripe)  │
  │  ├── Webhook Dispatcher (HMAC-signed outbound)      │
  │  ├── Multi-Tenant Middleware (org_id from JWT)      │
  │  └── RBAC + OAuth 2.0 (Google, GitHub, SAML)       │
  └──────────┬───────────────────┬─────────────────────┘
             │                   │
     ┌───────▼────────┐  ┌──────▼───────┐
     │  PostgreSQL 16  │  │ Upstash Redis│
     │  (Neon)         │  │ (Serverless) │
     │  ├─ tickets     │  │ ├─ Sessions  │
     │  ├─ messages    │  │ ├─ Pub/Sub   │
     │  ├─ contacts    │  │ ├─ BullMQ    │
     │  ├─ orgs        │  │ │  (job queue)│
     │  ├─ articles    │  │ ├─ Rate Limit│
     │  ├─ embeddings  │  │ └─ Cache     │
     │  │  (pgvector)  │  └──────────────┘
     │  ├─ audit_logs  │
     │  ├─ automations │         ┌───────────────┐
     │  └─ RLS policies│         │  BullMQ       │
     └────────────────┘         │  Workers       │
                                 │  ├─ AI Triage  │
             ┌──────────────┐    │  ├─ Email Send │
             │  LLM APIs    │    │  ├─ SLA Check  │
             │  (OpenRouter) │    │  ├─ Webhooks   │
             │  ├─ Claude    │    │  └─ CSAT Survey│
             │  ├─ Gemini    │    └───────────────┘
             │  ├─ Gemma     │
             │  └─ Cohere    │     ┌──────────────┐
             │    (Rerank)   │     │ External APIs │
             └──────────────┘     │ ├─ Postmark   │
                                   │ ├─ WhatsApp   │
                                   │ ├─ Stripe     │
                                   │ ├─ Slack      │
                                   │ └─ S3/R2      │
                                   └──────────────┘
```

**Key:** Everything is still Node.js/Express/PostgreSQL. We added Redis (Upstash — serverless, same deployment model as Neon), BullMQ (npm package), and pgvector (PostgreSQL extension). No new runtime languages. No new orchestration platforms.

---

## 9. Phased Milestone Roadmap

### Overview

```
Phase 1: Foundation & Real-Time       ──── Weeks 1-4    (Month 1)
Phase 2: Multi-Channel Inbox          ──── Weeks 5-10   (Months 2-3)
Phase 3: AI Autonomy & Knowledge Base ──── Weeks 11-16  (Months 3-4)
Phase 4: Multi-Tenancy & Billing      ──── Weeks 17-24  (Months 5-6)  ← BETA
Phase 5: Automation & Analytics        ──── Weeks 25-36  (Months 7-9)  ← GA
Phase 6: Ecosystem & Enterprise        ──── Weeks 37-52  (Months 10-13)
```

---

### Phase 1: Foundation & Real-Time (Weeks 1–4)

> **Goal:** Production-ready auth, RBAC, real-time ticket updates, and collaboration basics.

#### Deliverables

| # | Deliverable | Tech | Stories |
|:---|:---|:---|:---|
| 1.1 | **OAuth 2.0 Login** (Google, GitHub) | `arctic` npm package (lightweight OAuth2) | INBOX-7 |
| 1.2 | **RBAC System** — admin, lead, agent roles | `roles` + `permissions` tables, middleware | INBOX-3, INBOX-10 |
| 1.3 | **Team Management** — create teams, invite agents via email | `teams`, `team_members` tables, Resend transactional email | INBOX-3, INBOX-10 |
| 1.4 | **SSE Live Feed** — replace 15s polling with Server-Sent Events | Native `res.write()` SSE, Redis Pub/Sub for cross-process sync | INBOX-2, INBOX-5 |
| 1.5 | **Collision Detection** — "Agent X is viewing this ticket" | Redis key-value with TTL (`viewing:{ticket_id}` → `{agent_id}`, expires 30s), heartbeat refresh | INBOX-2 |
| 1.6 | **Saved Replies / Macros** — templates with `{{variables}}` | `saved_replies` table, Mustache-style interpolation | INBOX-5 |
| 1.7 | **Audit Trail** — immutable log of all ticket state changes | `audit_logs` table (append-only, `actor_id`, `action`, `old_value`, `new_value`) | — |
| 1.8 | **Upstash Redis Setup** — sessions, pub/sub, rate limiting | `@upstash/redis`, `ioredis` | — |
| 1.9 | **Sentry Integration** — error tracking frontend + backend | `@sentry/react`, `@sentry/node` | — |
| 1.10 | **GitHub Actions CI** — lint, type-check, build on every PR | `.github/workflows/ci.yml` | — |

#### Database Schema Additions

```sql
-- Teams
CREATE TABLE teams (
  id SERIAL PRIMARY KEY,
  org_id INTEGER REFERENCES organizations(id),
  name TEXT NOT NULL,
  description TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Team Members
CREATE TABLE team_members (
  team_id INTEGER REFERENCES teams(id),
  user_id INTEGER REFERENCES users(id),
  role TEXT CHECK (role IN ('admin', 'lead', 'agent')) DEFAULT 'agent',
  PRIMARY KEY (team_id, user_id)
);

-- Saved Replies
CREATE TABLE saved_replies (
  id SERIAL PRIMARY KEY,
  org_id INTEGER,
  title TEXT NOT NULL,
  body TEXT NOT NULL,
  variables JSONB DEFAULT '[]',
  created_by INTEGER REFERENCES users(id),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Audit Logs
CREATE TABLE audit_logs (
  id SERIAL PRIMARY KEY,
  org_id INTEGER,
  ticket_id INTEGER,
  actor_id INTEGER REFERENCES users(id),
  action TEXT NOT NULL,  -- 'status_changed', 'priority_changed', 'assigned', etc.
  old_value JSONB,
  new_value JSONB,
  created_at TIMESTAMPTZ DEFAULT NOW()
);
```

#### Exit Criteria
- [ ] Google + GitHub OAuth login working
- [ ] 3 roles enforced across all endpoints
- [ ] SSE streaming live ticket updates (0 polling)
- [ ] "Agent X is viewing this" collision alerts working
- [ ] CI pipeline running on every push

---

### Phase 2: Multi-Channel Inbox (Weeks 5–10)

> **Goal:** Customers can reach support via email, a chat widget on any website, and WhatsApp — all appearing in the unified agent inbox.

#### Deliverables

| # | Deliverable | Tech | Stories |
|:---|:---|:---|:---|
| 2.1 | **Email Inbound** — `support@{domain}` auto-creates tickets | Postmark Inbound Webhooks, `email-reply-parser` for thread stripping | INBOX-7, UC-1 |
| 2.2 | **Email Outbound** — agent replies appear as branded emails | Postmark / Resend transactional API, HTML email templates | INBOX-7 |
| 2.3 | **Thread Matching** — reply emails link to existing ticket | RFC 2822 `Message-ID` / `In-Reply-To` header matching | UC-1 |
| 2.4 | **Embeddable Chat Widget** — `<script>` tag for any website | Shadow DOM shell (CSS isolation) + sandboxed iframe (XSS protection), React micro-app, WebSocket transport | INBOX-8, UC-2 |
| 2.5 | **Widget Customization API** | `Supportly('init', { appId, theme, position, greeting })` JS config | UC-2 |
| 2.6 | **WhatsApp Business Channel** | Meta Graph API v20.0 webhooks, 24-hour window rule, template messages | INBOX-9, UC-3 |
| 2.7 | **Unified Conversation Model** | `conversations` + `messages` tables (channel-agnostic), channel badges in UI | UC-4 |
| 2.8 | **Attachment Storage** | Cloudflare R2 or AWS S3 with presigned URLs | UC-1, UC-2 |
| 2.9 | **Contact Management** | `contacts` table — auto-create from email/chat/WhatsApp, merge duplicates | — |
| 2.10 | **Organization Management** | `organizations` table — group contacts by company, display in sidebar | — |

#### Conversation Data Model

```sql
-- Channel-agnostic conversations
CREATE TABLE conversations (
  id SERIAL PRIMARY KEY,
  org_id INTEGER,
  ticket_id INTEGER REFERENCES tickets(id),
  channel TEXT CHECK (channel IN ('web', 'email', 'chat', 'whatsapp', 'slack')),
  contact_id INTEGER REFERENCES contacts(id),
  external_id TEXT,  -- email Message-ID, WhatsApp message ID, etc.
  status TEXT DEFAULT 'open',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Individual messages within a conversation
CREATE TABLE messages (
  id SERIAL PRIMARY KEY,
  conversation_id INTEGER REFERENCES conversations(id),
  sender_type TEXT CHECK (sender_type IN ('customer', 'agent', 'ai', 'system')),
  sender_id INTEGER,
  content TEXT NOT NULL,
  content_type TEXT DEFAULT 'text',  -- 'text', 'html', 'image', 'file'
  metadata JSONB DEFAULT '{}',  -- attachments, email headers, etc.
  is_internal BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Customer contacts
CREATE TABLE contacts (
  id SERIAL PRIMARY KEY,
  org_id INTEGER,
  name TEXT,
  email TEXT,
  phone TEXT,
  avatar_url TEXT,
  organization_id INTEGER REFERENCES organizations(id),
  metadata JSONB DEFAULT '{}',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(org_id, email)
);
```

#### Exit Criteria
- [ ] Emails to `support@` auto-create tickets with thread matching
- [ ] Chat widget embeddable with one `<script>` tag
- [ ] WhatsApp messages create tickets in unified inbox
- [ ] All channels visually distinguished with icons
- [ ] Agent replies delivered back on the originating channel

---

### Phase 3: AI Autonomy & Knowledge Base (Weeks 11–16)

> **Goal:** AI that doesn't just suggest — it resolves. Powered by a RAG knowledge base.

#### Deliverables

| # | Deliverable | Tech | Stories |
|:---|:---|:---|:---|
| 3.1 | **Knowledge Base CRUD** — articles with categories, tags, status (draft/published/internal) | TipTap rich text editor, `articles` table | DOCS-1 to DOCS-7 |
| 3.2 | **Public Help Center** — branded, searchable, SEO-friendly | React SPA or SSR page at `help.{domain}` | DOCS-1, DOCS-2 |
| 3.3 | **Embedding Pipeline** — chunk articles → generate embeddings → store | OpenAI `text-embedding-3-small` (via OpenRouter), `pgvector` HNSW index, BullMQ worker | AI-10, UC-16 |
| 3.4 | **Hybrid Search** — vector similarity + BM25 full-text with Reciprocal Rank Fusion | PostgreSQL `ts_rank` + pgvector `<=>` distance, combined scoring | DOCS-2, AI-10 |
| 3.5 | **RAG Response Generation** — retrieve top articles → inject into LLM context → generate cited answer | Claude 3.5 Sonnet (via OpenRouter) with prompt caching | AI-2, AI-3, AI-7 |
| 3.6 | **Confidence Scoring** — auto-resolve if >85%, present as draft if 60–85%, escalate if <60% | Custom scoring: source match quality + LLM self-assessment | AI-8, UC-17 |
| 3.7 | **Autonomous Resolution Flow** — incoming ticket → classify → search KB → generate answer → resolve or escalate | BullMQ pipeline chaining AI workers | AI-2, UC-11 |
| 3.8 | **AI Agent Copilot v2** — conversation summary, tone adjust, KB search from inbox | LLM with conversation history context | AI-4 to AI-6, UC-14–16 |
| 3.9 | **Multi-Model Router** — fast model for triage (Gemini Flash), quality model for replies (Claude Sonnet) | OpenRouter model parameter switching based on task type | AI-1 |
| 3.10 | **Citation Enforcement** — every AI answer must link to source article | Prompt engineering + post-processing validation | AI-7 |

#### Knowledge Base Schema

```sql
-- Articles
CREATE TABLE articles (
  id SERIAL PRIMARY KEY,
  org_id INTEGER,
  title TEXT NOT NULL,
  slug TEXT NOT NULL,
  body TEXT NOT NULL,  -- HTML from TipTap
  body_plain TEXT NOT NULL,  -- Plain text for search
  category TEXT,
  tags TEXT[] DEFAULT '{}',
  status TEXT CHECK (status IN ('draft', 'published', 'internal')) DEFAULT 'draft',
  author_id INTEGER REFERENCES users(id),
  view_count INTEGER DEFAULT 0,
  helpful_count INTEGER DEFAULT 0,
  not_helpful_count INTEGER DEFAULT 0,
  search_vector tsvector,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Article embeddings (pgvector)
CREATE TABLE article_embeddings (
  id SERIAL PRIMARY KEY,
  article_id INTEGER REFERENCES articles(id) ON DELETE CASCADE,
  chunk_index INTEGER,
  chunk_text TEXT NOT NULL,
  embedding vector(1536),  -- OpenAI text-embedding-3-small dimension
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX ON article_embeddings USING hnsw (embedding vector_cosine_ops);
```

#### Exit Criteria
- [ ] Knowledge base with article CRUD and public help center
- [ ] Semantic search returning relevant articles for natural language queries
- [ ] AI autonomously resolving >30% of simple FAQ tickets
- [ ] Confidence scoring preventing low-confidence auto-resolution
- [ ] Citation links in every AI-generated response
- [ ] Conversation summary in 1-click for agents

---

### Phase 4: Multi-Tenancy & Billing (Weeks 17–24) — BETA LAUNCH

> **Goal:** Multiple organizations can sign up, each with isolated data, and pay via Stripe.

#### Deliverables

| # | Deliverable | Tech | Stories |
|:---|:---|:---|:---|
| 4.1 | **Multi-Tenant Isolation** — org_id on every table, Row-Level Security | PostgreSQL RLS policies, `SET app.current_org_id` per request | — |
| 4.2 | **Tenant Middleware** — extract org_id from JWT, enforce on all queries | Express middleware, Zod validation | — |
| 4.3 | **Signup Flow** — email verification → org creation → first admin | Multi-step React form, Resend verification emails | — |
| 4.4 | **Onboarding Wizard** — connect email, install widget, import KB articles | Guided checklist React component | — |
| 4.5 | **Stripe Billing** — subscription management with 3 tiers | `stripe` npm SDK, webhook handlers for `invoice.paid`, `customer.subscription.updated`, etc. | — |
| 4.6 | **AI Usage Metering** — track resolutions per org, bill overage | Stripe Usage Records API, `ai_resolutions` counter table | — |
| 4.7 | **Billing Portal** — self-service plan changes, invoices, payment methods | Stripe Customer Portal (hosted) | — |
| 4.8 | **Admin Settings** — branding (logo, colors), business hours, SLA policies per org | `org_settings` JSONB column, React settings pages | — |
| 4.9 | **Custom Subdomains** — `{company}.supportly.app` | Vercel Domains API or wildcard DNS + middleware routing | — |
| 4.10 | **Sandbox Demo Mode** — pre-populated sample data for trial users | Seed script on org creation | — |

#### Pricing Tiers (Stripe Products)

| | **Free** | **Starter** | **Pro** | **Enterprise** |
|:---|:---|:---|:---|:---|
| **Price** | $0/mo | $15/agent/mo | $49/agent/mo | Custom |
| **Agents** | Up to 3 | Unlimited | Unlimited | Unlimited |
| **Channels** | Web Portal, Email | + Live Chat | + WhatsApp, Slack | + Voice, Custom |
| **AI Resolutions** | 50/mo | 200/mo | 1000/mo | Custom |
| **Extra AI** | — | $0.50/resolution | $0.50/resolution | Volume discount |
| **Knowledge Base** | 50 articles | 500 articles | Unlimited | Unlimited |
| **Automations** | 5 rules | 25 rules | Unlimited | Unlimited |
| **Support** | Community | Email (48h) | Priority (4h) | Dedicated CSM |
| **Data Retention** | 90 days | 1 year | 3 years | Unlimited |

#### Exit Criteria — **BETA LAUNCH** 🚀
- [ ] Multiple orgs sign up, each with fully isolated data
- [ ] Stripe billing active with 3 tiers + AI usage metering
- [ ] Onboarding wizard completes in <5 minutes
- [ ] Custom subdomains working
- [ ] 10 beta customers onboarded and providing feedback

---

### Phase 5: Automation & Analytics (Weeks 25–36) — GA LAUNCH

> **Goal:** No-code workflow automation, analytics dashboards, CSAT surveys, and observability.

#### Deliverables

| # | Deliverable | Tech | Stories |
|:---|:---|:---|:---|
| 5.1 | **Workflow Rule Builder** — if-this-then-that no-code rules | React Flow (visual canvas), `automations` table with trigger/condition/action JSON schema | AUTO-1 to AUTO-8 |
| 5.2 | **SLA Engine** — countdown timers, pre-breach alerts, auto-escalation | BullMQ scheduled jobs checking SLA deadlines every minute | AUTO-2 |
| 5.3 | **CSAT Surveys** — post-resolution 1–5 star rating (in-chat + email) | Embeddable survey component, 1-click email links, `csat_responses` table | AUTO-5, INSIGHT-5 |
| 5.4 | **Analytics Dashboard** — FRT, resolution time, SLA compliance, backlog, CSAT | PostgreSQL window functions + materialized views, Recharts visualization | INSIGHT-1 to INSIGHT-7 |
| 5.5 | **Agent Performance Metrics** — tickets resolved, avg handle time, CSAT per agent | SQL aggregation queries, materialized views refreshed hourly | INSIGHT-2 |
| 5.6 | **AI Analytics** — resolution rate, confidence distribution, escalation breakdown | `ai_events` table tracking every AI decision, PostgreSQL aggregation | INSIGHT-3 |
| 5.7 | **Export & Reports** — CSV export, scheduled email reports | BullMQ cron worker, email with CSV attachment | INSIGHT-6 |
| 5.8 | **Bulk Actions** — select multiple tickets, bulk close/assign/tag | Batch API endpoint, React multi-select | INBOX-6 |
| 5.9 | **Uptime Monitoring** — external health checks with alerting | BetterStack integration | — |
| 5.10 | **Docker Self-Host** — `docker-compose.yml` for self-hosted deployment | Dockerfile for API + worker, docker-compose with PostgreSQL + Redis | — |

#### Analytics Schema

```sql
-- Materialized view for daily ticket metrics
CREATE MATERIALIZED VIEW daily_ticket_metrics AS
SELECT
  org_id,
  DATE(created_at) AS date,
  COUNT(*) AS tickets_created,
  COUNT(*) FILTER (WHERE status = 'Closed') AS tickets_resolved,
  AVG(EXTRACT(EPOCH FROM (
    first_response_at - created_at
  ))) FILTER (WHERE first_response_at IS NOT NULL) AS avg_frt_seconds,
  AVG(EXTRACT(EPOCH FROM (
    resolved_at - created_at
  ))) FILTER (WHERE resolved_at IS NOT NULL) AS avg_resolution_seconds
FROM tickets
GROUP BY org_id, DATE(created_at);

-- CSAT responses
CREATE TABLE csat_responses (
  id SERIAL PRIMARY KEY,
  org_id INTEGER,
  ticket_id INTEGER REFERENCES tickets(id),
  contact_id INTEGER REFERENCES contacts(id),
  score INTEGER CHECK (score BETWEEN 1 AND 5),
  comment TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);
```

#### Exit Criteria — **GA LAUNCH** 🎉
- [ ] Visual workflow builder with 10+ pre-built rule templates
- [ ] SLA countdown timers with auto-escalation
- [ ] CSAT surveys collecting feedback on all channels
- [ ] Analytics dashboard with FRT, resolution time, SLA compliance, agent metrics
- [ ] Docker self-host option documented and tested
- [ ] 50+ paying customers, <1% error rate

---

### Phase 6: Ecosystem & Enterprise (Weeks 37–52)

> **Goal:** Integration marketplace, enterprise auth, advanced AI, and developer platform.

#### Deliverables

| # | Deliverable | Tech | Stories |
|:---|:---|:---|:---|
| 6.1 | **Slack Integration** — 2-way ticket sync, create tickets from Slack | `@slack/bolt` SDK | UC-4, AUTO-8 |
| 6.2 | **Jira Integration** — link tickets to Jira issues | Jira Cloud REST API + OAuth 2.0 | — |
| 6.3 | **Shopify Integration** — order lookup from ticket sidebar | Shopify Admin API | UC-18 |
| 6.4 | **Zapier / Make Connector** — connect to 5000+ apps | Zapier Developer Platform (triggers + actions) | — |
| 6.5 | **Public REST API v2** — comprehensive API with docs | OpenAPI 3.1 spec, `swagger-ui-express` | — |
| 6.6 | **JavaScript SDK** — `@supportly/node` npm package | TypeScript SDK wrapping REST API | — |
| 6.7 | **Webhook System v2** — configurable events, HMAC-signed, retry logic | `webhooks` table, BullMQ retry queue | — |
| 6.8 | **SAML SSO** — enterprise identity providers (Okta, Azure AD) | `@node-saml/passport-saml` | — |
| 6.9 | **Custom Roles** — granular permission matrix beyond 3 defaults | Permission bitmask or JSONB policy | — |
| 6.10 | **AI Tool Calling** — AI executes external actions (refunds, order lookup) | LLM function calling + guardrailed action executor | AI-9, UC-18 |
| 6.11 | **Multilingual AI** — detect language, respond in customer's language | LLM translation, `Accept-Language` detection | DOCS-6 |
| 6.12 | **Article Suggestions** — analyze unanswered queries, suggest KB topics | PostgreSQL query analysis on unresolved tickets | DOCS-5 |

#### Exit Criteria
- [ ] 5+ marketplace integrations live
- [ ] JavaScript SDK published on npm
- [ ] SAML SSO working with Okta and Azure AD
- [ ] AI tool-calling executing at least 3 external actions
- [ ] 200+ paying customers

---

## 10. Revenue Model & Pricing

### 10.1 Competitive Price Positioning

| | Zendesk | Intercom | Freshdesk | HelpScout | **Supportly** |
|:---|:---|:---|:---|:---|:---|
| **Entry** | $55/agent | $29/seat | $19/agent | $25/user | **$15/agent** |
| **Mid** | $115/agent | $85/seat | $55/agent | $45/user | **$49/agent** |
| **AI Cost** | $1.50/resolution | $0.99/resolution | $0.49/session | $0.75/resolution | **$0.50/resolution** |
| **Free Tier** | ❌ | ❌ | ✅ (2 agents) | ✅ (5 users) | **✅ (3 agents)** |

### 10.2 Revenue Projections

| Month | Free Orgs | Paid Customers | Avg MRR/Customer | MRR | ARR |
|:---|:---|:---|:---|:---|:---|
| Month 6 (Beta) | 50 | 10 | $45 | $450 | $5.4K |
| Month 9 (GA) | 200 | 50 | $60 | $3,000 | $36K |
| Month 12 | 500 | 150 | $75 | $11,250 | $135K |
| Month 18 | 2,000 | 700 | $100 | $70,000 | $840K |

### 10.3 Unit Economics Target

| Metric | Target |
|:---|:---|
| CAC (Customer Acquisition Cost) | <$150 (content/SEO/community-led) |
| LTV (Lifetime Value) | >$1,800 (18-month average retention) |
| LTV:CAC Ratio | >12:1 |
| Gross Margin | >80% |
| AI Resolution Cost (self-hosted models) | <$0.08/resolution |
| Monthly Logo Churn | <3% |

---

## 11. Key Decisions & Rationale

### Why pgvector, Not a Separate Vector DB?

- **Zero infrastructure** — no separate Pinecone/Qdrant cluster; just a PostgreSQL extension
- **ACID joins** — query vectors alongside tickets, articles, and orgs in one SQL statement
- **Cost** — Neon PG already included; Pinecone starts at $70/mo
- **Scale ceiling** — pgvector handles 1–10M vectors with HNSW indexing; migrate only if needed

### Why BullMQ + Redis, Not Kafka/NATS?

- **Same ecosystem** — Node.js native, npm install, TypeScript types built-in
- **Redis does triple duty** — cache, pub/sub, and job queue from one service (Upstash)
- **Operational simplicity** — no JVM, no Go runtime, no new binary to manage
- **Sufficient throughput** — handles 10K+ jobs/sec, more than enough for our scale

### Why SSE + WebSocket Hybrid, Not a Real-Time Platform?

- **SSE for dashboard** — one-way server→client ticket updates, works through all firewalls, auto-reconnects
- **WebSocket for chat only** — full-duplex needed only for live chat typing indicators and instant messaging
- **No vendor lock-in** — native browser APIs, no Liveblocks/Pusher/Ably subscription cost
- **Redis Pub/Sub bridges processes** — SSE connections on multiple Express instances sync via Redis pub/sub

### Why OpenRouter as LLM Gateway?

- **Multi-model routing** — switch between Claude, Gemini, Gemma, Llama with one API
- **No vendor lock-in** — if Anthropic raises prices, switch to Gemini or Llama with zero code changes
- **Cost optimization** — use Gemini Flash for triage ($0.075/1M tokens), Claude Sonnet for quality replies
- **Already integrated** — our current AI service already uses OpenRouter; zero migration

### Why Postmark for Email?

- **Pre-parsed JSON webhooks** — no raw MIME parsing needed (unlike SendGrid's multipart/form-data)
- **SPF/DKIM validation included** — security verification out of the box
- **99%+ deliverability** — focused on transactional email, not marketing spam
- **Affordable** — $15/mo for 10K emails

---

## 12. Risk Matrix & Mitigation

| Risk | Probability | Impact | Mitigation |
|:---|:---|:---|:---|
| **AI hallucination** | High | Critical | Citation enforcement, confidence thresholds, human-in-the-loop below 60%, simulation testing |
| **LLM provider outage** | Medium | High | OpenRouter multi-model fallback (Claude → Gemini → Gemma), heuristic fallback engine (already built) |
| **Multi-tenancy data leak** | Low | Critical | PostgreSQL RLS, org_id middleware enforcement, automated security testing |
| **Email deliverability** | Medium | Medium | Dedicated IP warmup, DKIM/SPF/DMARC config, Postmark monitoring |
| **High CAC** | Medium | High | Content-led growth (blog, open-source), product-led (free tier), developer community |
| **PostgreSQL scale ceiling** | Low | High | Read replicas, PgBouncer pooling, table partitioning, Citus sharding if needed |
| **Competitor price war** | High | Medium | Maintain cost advantage via open-source AI models, lean team, serverless infrastructure |

---

## 13. Success Metrics

### Product Metrics

| Metric | Month 6 (Beta) | Month 12 (GA+3) | Month 18 |
|:---|:---|:---|:---|
| Registered Orgs | 60 | 650 | 2,700 |
| Paying Customers | 10 | 150 | 700 |
| Monthly Active Agents | 30 | 450 | 2,100 |
| Tickets Processed/Month | 5,000 | 75,000 | 500,000 |
| AI Resolution Rate | 30% | 45% | 55% |
| Average CSAT | 4.0/5 | 4.3/5 | 4.5/5 |

### Engineering Metrics

| Metric | Target |
|:---|:---|
| API Uptime | 99.9% |
| API Latency (p95) | < 200ms |
| Deployment Frequency | Multiple times/day |
| Test Coverage | > 80% |
| Build Time | < 2 minutes |

### Business Metrics

| Metric | Target |
|:---|:---|
| MRR Growth Rate | >15% MoM |
| Free → Paid Conversion | >8% |
| Monthly Logo Churn | <3% |
| Time to Value (signup → first ticket) | < 5 minutes |
| NPS | > 50 |

---

## Appendix: Competitor Feature Matrix

| Feature | Zendesk | Intercom | Freshdesk | HelpScout | **Supportly (Target)** |
|:---|:---|:---|:---|:---|:---|
| Ticketing | ✅ | ✅ | ✅ | ✅ | ✅ (v1.0) |
| Live Chat Widget | ✅ | ✅ | ✅ | ✅ | ✅ (Phase 2) |
| Email Channel | ✅ | ✅ | ✅ | ✅ | ✅ (Phase 2) |
| WhatsApp | ✅ | ✅ | ✅ | ❌ | ✅ (Phase 2) |
| Knowledge Base | ✅ | ✅ | ✅ | ✅ | ✅ (Phase 3) |
| AI Auto-Resolution | ✅ | ✅ | ✅ | ✅ | ✅ (Phase 3) |
| AI Copilot | ✅ | ✅ | ✅ | ✅ | ✅ (Phase 3) |
| RAG + Semantic Search | ✅ | ✅ | ✅ | ✅ | ✅ (Phase 3) |
| Multi-Tenancy | ✅ | ✅ | ✅ | ✅ | ✅ (Phase 4) |
| Stripe Billing | ✅ | ✅ | ✅ | ✅ | ✅ (Phase 4) |
| Workflow Automation | ✅ | ✅ | ✅ | ✅ | ✅ (Phase 5) |
| CSAT/NPS Surveys | ✅ | ✅ | ✅ | ✅ | ✅ (Phase 5) |
| Analytics Dashboard | ✅ | ✅ | ✅ | ✅ | ✅ (Phase 5) |
| Slack Integration | ✅ | ✅ | ✅ | ✅ | ✅ (Phase 6) |
| SSO/SAML | ✅ | ✅ | ✅ | ✅ | ✅ (Phase 6) |
| App Marketplace | ✅ (1800+) | ✅ (400+) | ✅ (1200+) | ✅ (100+) | 🔮 (Future) |
| Voice/Phone | ✅ | ✅ | ✅ | ❌ | 🔮 (Future) |
| **Starting Price** | **$55** | **$29** | **$19** | **$25** | **Free** |

---

> _This is a living document. Updated as market conditions, customer feedback, and technical discoveries evolve._
>
> **Next Step:** Begin Phase 1 — OAuth 2.0, RBAC, SSE real-time engine, and Redis setup.
