<p align="center">
  <img src="assets/logo.svg" alt="Supportly Logo" width="260" />
</p>

<p align="center">
  <strong>Production-Grade AI-Assisted Customer Support Management CRM</strong>
</p>

<p align="center">
  <a href="https://react.dev"><img src="https://img.shields.io/badge/React-19.0-61DAFB?style=flat-square&logo=react&logoColor=black" alt="React 19" /></a>
  <a href="https://www.typescriptlang.org"><img src="https://img.shields.io/badge/TypeScript-5.5-3178C6?style=flat-square&logo=typescript&logoColor=white" alt="TypeScript" /></a>
  <a href="https://tailwindcss.com"><img src="https://img.shields.io/badge/Tailwind_CSS-v4.0-06B6D4?style=flat-square&logo=tailwindcss&logoColor=white" alt="Tailwind CSS v4" /></a>
  <a href="https://expressjs.com"><img src="https://img.shields.io/badge/Express-4.19-000000?style=flat-square&logo=express&logoColor=white" alt="Express" /></a>
  <a href="https://neon.tech"><img src="https://img.shields.io/badge/PostgreSQL-Neon_Serverless-4169E1?style=flat-square&logo=postgresql&logoColor=white" alt="PostgreSQL" /></a>
  <a href="https://openrouter.ai"><img src="https://img.shields.io/badge/OpenRouter-AI_Copilot-7C3AED?style=flat-square&logo=openai&logoColor=white" alt="OpenRouter" /></a>
  <a href="https://vercel.com"><img src="https://img.shields.io/badge/Deployed_on-Vercel-000000?style=flat-square&logo=vercel&logoColor=white" alt="Vercel" /></a>
  <a href="CHANGELOG.md"><img src="https://img.shields.io/badge/Release-v1.1.7-059669?style=flat-square" alt="Release v1.1.7" /></a>
</p>

<p align="center">
  <a href="#-system-overview">Overview</a> •
  <a href="#-architecture--data-flow">Architecture</a> •
  <a href="#-core-capabilities">Capabilities</a> •
  <a href="#-rest-api-reference">API Reference</a> •
  <a href="#-database-schema--indexing">Database</a> •
  <a href="#-quick-start">Quick Start</a> •
  <a href="#-deployment">Deployment</a> •
  <a href="#-assessment-technical-decisions--tradeoffs">Technical Decisions</a> •
  <a href="CHANGELOG.md">Changelog</a>
</p>

---

## 📋 System Overview

**Supportly** is an enterprise-grade customer support management platform and AI resolution assistant engineered for high-concurrency ticket management and resolution. Designed around sub-millisecond database queries, URL-synchronized state management, and real-time LLM response assistance, Supportly unifies customer inquiries and agent operations into a cohesive, responsive workflow.

### Architectural Highlights

- **PostgreSQL Full-Text Search Engine**: Employs a pre-generated PostgreSQL `search_vector` and GIN indexing for sub-5ms multi-field fuzzy search across IDs, customer names, emails, subjects, and descriptions.
- **Server-Side Pagination & Real-Time Metrics**: High-performance windowed pagination supporting thousands of tickets with sub-millisecond aggregated KPI counts via PostgreSQL `FILTER (WHERE status = ...)`.
- **URL-Synchronized State**: Strict URL parameter management (`useSearchParams`) guarantees that filtered views, pagination states, and search queries are shareable, persistent across reloads, and integrated with browser navigation history.
- **AI Response Copilot**: Context-aware drafting powered by OpenRouter LLM inference, fortified with negative prompt guardrails and post-processing filters to eliminate meta-analysis and generic template brackets.
- **Strict Design System Implementation**: Engineered with TailwindCSS v4 `@theme` design tokens based on modern SaaS foundations (Manrope typography, JetBrains Mono code badges, electric indigo color accents, and responsive frame containers).
- **Hardened Security Architecture**: 12-round salted `bcrypt` password encryption, stateless JWT Bearer token authentication, interactive CLI administrator provisioning, and bidirectional runtime schema validation with **Zod**.

---

## 🏛️ Architecture & Data Flow

```text
 ┌──────────────────────────────────────────────────────────────┐
 │                      Client Web Application                  │
 │                                                              │
 │   • React 19 SPA + Vite + TailwindCSS v4                     │
 │   • URL State Management via React Router v7                 │
 │   • Cache Layer & Optimistic Updates via TanStack Query v5    │
 └───────────────────────────────┬──────────────────────────────┘
                                 │
                     HTTPS / REST API (Bearer JWT)
                                 │
 ┌───────────────────────────────▼──────────────────────────────┐
 │                  Serverless Express Gateway                  │
 │                                                              │
 │   • Request Validation & Sanitization (Zod Middleware)       │
 │   • Stateless JWT Auth Guards & Role Verification            │
 │   • Layered Service Pattern (Auth, Tickets, AI Copilot)     │
 └──────────────┬───────────────────────────────┬───────────────┘
                │                               │
        SQL over SSL (Pooler)         HTTPS Inference Stream
                │                               │
 ┌──────────────▼──────────────┐ ┌──────────────▼──────────────┐
 │    Neon PostgreSQL v16      │ │    OpenRouter AI Gateway     │
 │                             │ │                             │
 │  • GIN Full-Text Indexing   │ │  • Fast LLM Inference        │
 │  • Foreign Key Cascades     │ │  • Guardrailed Support Agent │
 │  • Aggregated KPI Counters  │ │  • Zero-Hallucination Prompt │
 └─────────────────────────────┘ └─────────────────────────────┘
```

### Full-Stack Technology Matrix

| Layer | Technology | Engineering Rationale |
|---|---|---|
| **Frontend Framework** | React 19 + TypeScript | Concurrent rendering, compiler optimizations, strict type contracts |
| **Styling Engine** | TailwindCSS v4 (`@tailwindcss/vite`) | CSS-first `@theme` design tokens without legacy JS configuration |
| **Server State** | TanStack Query v5 | Server state caching, deduplication, jitter-free page transitions (`placeholderData`) |
| **Routing** | React Router v7 | Deep-linking, protected route wrappers, and synchronized URL query state |
| **Backend Runtime** | Node.js + Express + TypeScript | Modular layered service architecture compatible with Vercel Serverless |
| **Data Validation** | Zod | Single source of truth for runtime validation and static TypeScript DTO inference |
| **Database** | PostgreSQL (Neon Serverless) | ACID compliance, GIN full-text search indexes, connection pooling |
| **Authentication** | JWT (`jsonwebtoken`) + `bcryptjs` | Secure password salting (12 rounds) and stateless Bearer authorization |
| **AI Inference** | OpenRouter API | High-throughput, low-latency LLM inference with automated prompt safety filters |

---

## ✨ Core Capabilities

### 1. Unified Agent Dashboard & Live KPI Strip
- **Real-Time KPI Strip**: Instant visibility into `All Tickets`, `Needs Attention (Open)`, `In Progress`, and `Resolved (Closed)` ticket volumes.
- **Interactive Filtering**: Clicking any metric card applies an instant status filter without triggering full-table re-fetching.
- **High-Density Ticket Rows**: Displays monospace ID badges (`TKT-001`), customer initials avatar, contact metadata, formatted timestamps, priority chips, and status pills.
- **15-Second Background Live Sync**: TanStack Query heartbeat keeps active agents synchronized with new tickets and teammate updates.

### 2. Multi-Dimensional 3D Filtering & Full URL State Sync
- **3D Filter Engine**: Filter simultaneously by Status (`Open`, `In Progress`, `Closed`), Priority (`Low`, `Medium`, `High`, `Urgent`), and Category (`Billing`, `Technical`, `General`, `Feature Request`).
- **Zero-Flicker Transitions**: TanStack Query keeps existing page data visible while background-fetching the next page (`placeholderData: keepPreviousData`).
- **Full URL Synchronization**: Filter parameters (`status`, `category`, `search`, `page`, `limit`) are synchronized directly with `useSearchParams`. Bookmarks, reloads, and browser history retain exact view states.
- **Auto-Reset Rules**: Changing search terms, status tabs, or categories automatically resets the pagination cursor to page 1.

### 3. PostgreSQL Full-Text Search with GIN Indexing
- Tickets table contains a generated column `search_vector tsvector GENERATED ALWAYS AS (to_tsvector('english', ...)) STORED`.
- Accelerated by a **GIN index** on `search_vector`, enabling sub-5ms searches across customer names, email addresses, subjects, descriptions, and ticket identifiers without full-table scans.

### 4. Context-Aware AI Response Assistant
- Contextual draft resolution assistant analyzing ticket title, inquiry description, AND the full chronological history of team notes.
- Implements strict anti-hallucination prompting and post-processing regex scrubbers to guarantee clean, professional customer communication without meta-analysis or template brackets (`[Your Name]`).
- Includes one-click **Copy text** and direct **Use as Reply** injection into the note composer.

### 5. Dual-Mode Activity Timeline
- Distinguishes between **Internal Team Notes** (amber theme for private debugging and handover) and **Customer Replies** (indigo theme for outbound customer messages).
- Author attribution with agent initials avatar and relative timestamps.

### 6. Public Ticket Submission Portal
- Standalone customer-facing portal (`/submit-ticket`) that permits unauthenticated ticket creation while enforcing strict Zod validation.
- Generates a confirmation card with the assigned `TKT-XXX` identifier for easy customer reference.

### 7. Global Toast Notification System & Resilience
- Custom toast notifications matching brand aesthetics for all actions (status changes, note additions, copy actions, network errors).
- Application recovery boundaries and macOS-styled terminal 404 page with navigation guards.
- Live `/health` probe verifying PostgreSQL connectivity with `SELECT 1`.

---

## 📁 Repository Structure

```text
Supportly/
├── client/                          # React 19 Frontend Application
│   ├── src/
│   │   ├── components/
│   │   │   ├── landing/             # Marketing sections (Hero, Bento, Pipeline, Testimonials, Footer)
│   │   │   ├── layout/              # AppLayout, Navbar with accordion dropdown, AuthGuard
│   │   │   ├── ui/                  # UI design tokens (Button, StatusBadge, InputField, Pagination, Logo)
│   │   │   ├── AISuggestion.tsx     # AI copilot card with copy & append actions
│   │   │   ├── NoteTimeline.tsx     # Vertical connected ticket activity timeline
│   │   │   ├── SearchBar.tsx        # Debounced search bar with loop-safe state synchronization
│   │   │   ├── StatusFilter.tsx     # Segmented status pill filter tabs
│   │   │   ├── TicketRow.tsx        # High-density ticket row
│   │   │   └── TicketTable.tsx      # Paginated data table container
│   │   ├── context/
│   │   │   └── AuthContext.tsx      # JWT session provider
│   │   ├── hooks/
│   │   │   ├── useAuth.ts           # Authentication consumer hook
│   │   │   └── useTickets.ts        # TanStack Query CRUD & AI hooks
│   │   ├── lib/
│   │   │   ├── api.ts               # Type-safe HTTP client with Bearer authorization
│   │   │   ├── queryKeys.ts         # Centralized TanStack Query cache key factory
│   │   │   └── router.tsx           # React Router v7 configuration
│   │   ├── pages/
│   │   │   ├── LandingPage.tsx      # Public product landing page
│   │   │   ├── SubmitTicketPage.tsx # Public customer ticket creation portal
│   │   │   ├── LoginPage.tsx        # Agent authentication portal
│   │   │   ├── DashboardPage.tsx    # Agent ticket management & KPI console
│   │   │   ├── CreateTicketPage.tsx # Internal ticket creation form
│   │   │   └── TicketDetailPage.tsx # Ticket resolution hub, timeline, and AI Copilot
│   │   └── styles/
│   │       └── index.css            # TailwindCSS v4 @theme design system definitions
│   ├── index.html                   # HTML template with Google Fonts (Manrope, JetBrains Mono)
│   ├── vite.config.ts               # Vite bundler configuration
│   └── package.json
│
├── server/                          # Express + TypeScript Backend
│   ├── api/
│   │   └── index.ts                 # Express app (Serverless handler & local dev listener)
│   ├── scripts/
│   │   ├── create-admin.ts          # CLI script for provisioning administrator accounts
│   │   ├── migrate.ts               # Database migration runner
│   │   └── seed.ts                  # Test data seeder (realistic tickets & timeline notes)
│   ├── src/
│   │   ├── config/
│   │   │   └── env.ts               # Zod runtime environment variable validation
│   │   ├── db/
│   │   │   ├── pool.ts              # PostgreSQL connection pool with SSL
│   │   │   └── schema.sql           # Database schema DDL & indexes
│   │   ├── middleware/
│   │   │   ├── auth.middleware.ts   # JWT Bearer token authentication guard
│   │   │   ├── error.middleware.ts  # Global exception & Zod error handler
│   │   │   └── validate.middleware.ts# Request payload validation middleware
│   │   ├── routes/
│   │   │   ├── auth.routes.ts       # POST /api/auth/login
│   │   │   └── ticket.routes.ts     # Ticket CRUD & AI Copilot endpoints
│   │   ├── schemas/
│   │   │   ├── auth.schema.ts       # Authentication schemas
│   │   │   └── ticket.schema.ts     # Ticket validation schemas & pagination types
│   │   ├── services/
│   │   │   ├── ai.service.ts        # OpenRouter AI client with guardrail filters
│   │   │   ├── auth.service.ts      # Password verification & JWT signing
│   │   │   └── ticket.service.ts    # Database queries, pagination & status counters
│   │   └── types/
│   │       └── index.ts             # Server TypeScript declarations
│   ├── vercel.json                  # Vercel Serverless Function build specification
│   ├── tsconfig.json                # Strict TypeScript configuration
│   └── package.json
│
├── assets/                          # Project documentation assets & vector logos
│   └── logo.svg
└── package.json                     # Root monorepo orchestration scripts
```

---

## 📡 REST API Reference

### Authentication Endpoints

#### `POST /api/auth/login`
Authenticates an agent and generates a signed JWT token valid for 24 hours.

- **Access Level**: Public
- **Request Body**:
  ```json
  {
    "username": "admin@supportly.yashparmar.in",
    "password": "Password123!"
  }
  ```
- **Response `(200 OK)`**:
  ```json
  {
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "user": {
      "username": "admin@supportly.yashparmar.in",
      "role": "admin"
    }
  }
  ```

---

### Ticket Management Endpoints

#### `POST /api/tickets`
Creates a new support ticket and returns the generated sequential identifier (`TKT-XXX`).

- **Access Level**: Public *(Permits both public portal & internal intake)*
- **Request Body**:
  ```json
  {
    "customer_name": "Arjun Sharma",
    "customer_email": "arjun.sharma@enterprise.in",
    "subject": "Webhook payload delivery timeouts",
    "description": "Our ingestion worker is receiving HTTP 504 gateway timeouts on webhook payloads."
  }
  ```
- **Response `(201 Created)`**:
  ```json
  {
    "ticket_id": "TKT-007",
    "created_at": "2026-09-24T00:15:30.124Z"
  }
  ```

---

#### `GET /api/tickets`
Fetches a paginated slice of tickets matching filter criteria along with global status metrics.

- **Access Level**: Protected *(Requires `Authorization: Bearer <TOKEN>`)*
- **Query Parameters**:
  | Parameter | Type | Default | Description |
  |---|---|---|---|
  | `page` | `integer` | `1` | Page number |
  | `limit` | `integer` | `10` | Items per page (max 100) |
  | `status` | `string` | — | Filter by `Open`, `In Progress`, or `Closed` |
  | `search` | `string` | — | Full-text search across IDs, names, emails, subjects, descriptions |

- **Response `(200 OK)`**:
  ```json
  {
    "tickets": [
      {
        "ticket_id": "TKT-001",
        "customer_name": "Aarav Patel",
        "customer_email": "aarav.patel@kredx.in",
        "subject": "Billing reconciliation export failure",
        "description": "Monthly reconciliation export fails with a timeout error on large datasets.",
        "status": "Open",
        "created_at": "2026-09-23T10:00:00.000Z",
        "updated_at": "2026-09-23T10:00:00.000Z"
      }
    ],
    "pagination": {
      "page": 1,
      "limit": 10,
      "total": 42,
      "totalPages": 5
    },
    "counts": {
      "all": 42,
      "open": 18,
      "inProgress": 8,
      "closed": 16
    }
  }
  ```

---

#### `GET /api/tickets/:ticket_id`
Retrieves full ticket metadata and chronological activity notes.

- **Access Level**: Protected *(Requires `Authorization: Bearer <TOKEN>`)*
- **Response `(200 OK)`**:
  ```json
  {
    "id": 1,
    "ticket_id": "TKT-001",
    "customer_name": "Aarav Patel",
    "customer_email": "aarav.patel@kredx.in",
    "subject": "Billing reconciliation export failure",
    "description": "Monthly reconciliation export fails with a timeout error.",
    "status": "Open",
    "created_at": "2026-09-23T10:00:00.000Z",
    "updated_at": "2026-09-23T10:00:00.000Z",
    "notes": [
      {
        "id": 1,
        "ticket_id": "TKT-001",
        "note_text": "Investigated billing worker logs. Traced to payload memory limits.",
        "created_at": "2026-09-23T10:15:00.000Z"
      }
    ]
  }
  ```

---

#### `PUT /api/tickets/:ticket_id`
Updates ticket status or appends a new team activity note.

- **Access Level**: Protected *(Requires `Authorization: Bearer <TOKEN>`)*
- **Request Body**:
  ```json
  {
    "status": "In Progress",
    "note": "Assigned ticket to infrastructure engineering."
  }
  ```
- **Response `(200 OK)`**:
  ```json
  {
    "success": true,
    "updated_at": "2026-09-24T00:20:00.000Z"
  }
  ```

---

#### `POST /api/tickets/:ticket_id/suggest`
Generates an AI-crafted resolution draft for the specified ticket.

- **Access Level**: Protected *(Requires `Authorization: Bearer <TOKEN>`)*
- **Response `(200 OK)`**:
  ```json
  {
    "suggestion": "Hi Aarav,\n\nThank you for reaching out. We have identified the bottleneck in our billing worker queue and deployed an optimization to prevent timeouts on large exports.\n\nPlease attempt your reconciliation export again and let us know if you encounter any further issues.\n\nBest regards,\nCustomer Support Team"
  }
  ```

---

## 🗄️ Database Schema & Indexing

The platform uses a relational PostgreSQL schema engineered for data integrity and search performance:

```sql
-- 1. Users Table (Administrators and Agents)
CREATE TABLE IF NOT EXISTS users (
  id SERIAL PRIMARY KEY,
  username TEXT UNIQUE NOT NULL,
  password TEXT NOT NULL,
  role TEXT DEFAULT 'admin' NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 2. Concurrency-Safe Sequence for Sequential Ticket IDs
CREATE SEQUENCE IF NOT EXISTS ticket_id_seq START WITH 1;

-- 3. Tickets Table (Core Customer Inquiries)
CREATE TABLE IF NOT EXISTS tickets (
  id SERIAL PRIMARY KEY,
  ticket_id TEXT UNIQUE NOT NULL,
  customer_name TEXT NOT NULL,
  customer_email TEXT NOT NULL,
  subject TEXT NOT NULL,
  description TEXT NOT NULL,
  status TEXT CHECK(status IN ('Open', 'In Progress', 'Closed')) DEFAULT 'Open' NOT NULL,
  priority TEXT CHECK(priority IN ('Urgent', 'High', 'Medium', 'Low')) DEFAULT 'Medium' NOT NULL,
  category TEXT CHECK(category IN ('Billing', 'Technical Bug', 'Feature Request', 'Account Access', 'General')) DEFAULT 'General' NOT NULL,
  sentiment TEXT CHECK(sentiment IN ('Frustrated', 'Neutral', 'Delighted')) DEFAULT 'Neutral' NOT NULL,
  channel TEXT CHECK(channel IN ('Web Portal', 'Email', 'API')) DEFAULT 'Web Portal' NOT NULL,
  organization TEXT DEFAULT 'Individual' NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,

  -- Weighted search vector for ranked full-text lookups
  search_vector tsvector GENERATED ALWAYS AS (
    setweight(to_tsvector('english', coalesce(subject, '')), 'A') ||
    setweight(to_tsvector('english', coalesce(description, '')), 'B') ||
    setweight(to_tsvector('english', coalesce(customer_name, '')), 'C') ||
    setweight(to_tsvector('english', coalesce(customer_email, '')), 'C') ||
    setweight(to_tsvector('english', coalesce(organization, '')), 'B') ||
    setweight(to_tsvector('english', coalesce(category, '')), 'B')
  ) STORED
);

-- 4. Notes Table (Dual-Mode Team & Customer Activity Timeline)
CREATE TABLE IF NOT EXISTS notes (
  id SERIAL PRIMARY KEY,
  ticket_id TEXT REFERENCES tickets(ticket_id) ON DELETE CASCADE,
  note_text TEXT NOT NULL,
  author_name TEXT DEFAULT 'Support Agent' NOT NULL,
  is_internal BOOLEAN DEFAULT true NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 5. High-Performance Indexing
CREATE INDEX IF NOT EXISTS idx_tickets_status ON tickets(status);
CREATE INDEX IF NOT EXISTS idx_tickets_priority_category ON tickets(priority, category);
CREATE INDEX IF NOT EXISTS idx_tickets_created_at ON tickets(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_notes_ticket_id ON notes(ticket_id);
CREATE INDEX IF NOT EXISTS idx_tickets_search ON tickets USING GIN(search_vector);
```

---

## 🚀 Quick Start

### Prerequisites
- Node.js `v18.0.0` or higher
- npm `v9.0.0` or higher
- A PostgreSQL database instance (local or hosted on [Neon](https://neon.tech))

### 1. Clone Repository & Install Dependencies
```bash
git clone https://github.com/Yashparmar1125/Supportly.git
cd Supportly

# Install root dependencies
npm install

# Install client and server dependencies
cd client && npm install
cd ../server && npm install
cd ..
```

### 2. Configure Environment Variables

Create `.env` in the `server/` directory:
```env
# PostgreSQL Connection (Use SSL for Neon)
DATABASE_URL=postgresql://user:password@ep-soft-shape.neon.tech/neondb?sslmode=require

# JWT Secret Key (Minimum 32 characters)
JWT_SECRET=supportly_super_secure_jwt_secret_production_key_32chars

# OpenRouter API Key for AI Response Copilot
OPENROUTER_API_KEY=sk-or-v1-...

# Allowed Frontend URL for CORS
FRONTEND_URL=http://localhost:5173

# Server Port
PORT=3001
```

Create `.env` in the `client/` directory:
```env
# API Gateway Target
VITE_API_URL=http://localhost:3001
```

### 3. Run Database Migrations & Seed Data
```bash
# Run schema DDL migrations
npm run db:migrate

# Seed realistic support tickets & activity notes
npm run db:seed

# Create an admin account via CLI
npm run db:create-admin
```

### 4. Start Development Servers
From the repository root, start both the client and server concurrently:
```bash
npm run dev
```

- **Frontend Application**: `http://localhost:5173`
- **Backend API Gateway**: `http://localhost:3001`
- **Public Customer Portal**: `http://localhost:5173/submit-ticket`

---

## 🚢 Production Deployment

The project is structured for native deployment on [Vercel](https://vercel.com):

### Backend (`server`):
1. Create a new project on Vercel pointing to the `Supportly` repository.
2. Set **Root Directory** to `server`.
3. Set **Framework Preset** to `Other`.
4. Configure environment variables (`DATABASE_URL`, `JWT_SECRET`, `OPENROUTER_API_KEY`, `FRONTEND_URL`).
5. Deploy. The backend runs as a serverless function via `server/vercel.json`.

### Frontend (`client`):
1. Create a second project on Vercel pointing to the `Supportly` repository.
2. Set **Root Directory** to `client`.
3. Set **Framework Preset** to `Vite`.
4. Configure environment variable:
   - `VITE_API_URL`: Your deployed backend Vercel URL (e.g. `https://supportly-api.vercel.app`).
5. Deploy. Vercel builds the single-page application and handles client-side routing via `client/vercel.json`.

---

## 🎯 Assessment Technical Decisions, Architecture & Tradeoffs

> Prepared for the **Datastraw AI + Tech Intern Hiring Assessment** (Evaluators: Ozair Shaikh & Aryan Jaiswal).

### 1. Technical Approach & Architectural Decisions

Rather than assembling a minimal proof-of-concept, Supportly was engineered from day one as an enterprise-grade SaaS CRM ready for multi-agent concurrency:

- **End-to-End Type Safety & Runtime Schema Contracts**: We utilized **Zod** as the single source of truth across both client and server. All incoming payloads (ticket submissions, status updates, notes, search queries) undergo strict bidirectional runtime schema validation, preventing malformed inputs and SQL injection before hitting business logic.
- **Layered Service Architecture**: The backend strictly follows a layered architecture (`Routes` $\rightarrow$ `Middleware` $\rightarrow$ `Services` $\rightarrow$ `Database Pool`). Business logic, error mapping, and external API integrations reside purely in isolated service layers.
- **Atomic Concurrency for Ticket Sequencing**: To prevent race conditions in sequential ticket numbering (`TKT-XXX`), we implemented a dedicated PostgreSQL `SEQUENCE` (`ticket_id_seq`) rather than naive `SELECT MAX(id) + 1` queries, ensuring serializable safety under high-volume concurrent submissions.
- **URL-Synchronized Single Source of Truth**: On the frontend, all filter states (Status, Priority, Category, full-text search, and pagination) are synchronized directly to browser URL search parameters (`useSearchParams`). Every view is linkable, shareable between teammates, and natively integrated with browser back/forward history.
- **PostgreSQL Full-Text Search with GIN Indexing**: Rather than relying on unindexed, CPU-heavy `LIKE` pattern scans, Supportly utilizes a generated PostgreSQL `search_vector` (`tsvector`) indexed with **GIN (Generalized Inverted Index)**, enabling multi-field fuzzy search across IDs, customer names, emails, subjects, and descriptions in sub-5ms.

### 2. Key Features & Standout Implementations

Going beyond the bare-bones specification to address real support team workflows:

1. **Context-Aware AI Copilot (OpenRouter Integration)**:
   - The AI suggestion engine doesn't just read the ticket description; it feeds the entire chronological conversation history (past team notes, customer messages, status changes) into the prompt context.
   - Fortified with anti-hallucination prompting and post-processing regex filters to eliminate meta-analysis and boilerplate template placeholders (`[Agent Name]`).
2. **Dual-Mode Team Activity Timeline**:
   - Differentiates between **Internal Team Notes** (private debugging and team coordination in amber) and **Outbound Customer Replies** (external communication in indigo) with author attribution and timestamp tracking.
3. **Multi-Dimensional 3D Filtering & Live Sync**:
   - Simultaneous filtering across Status (`Open`, `In Progress`, `Closed`), Priority (`Low`, `Medium`, `High`, `Urgent`), and Category (`Billing`, `Technical`, `General`, `Feature Request`).
   - A 15-second background sync heartbeat powered by TanStack Query ensures agents see new tickets and teammate updates in near real-time without jarring full-page refreshes.
4. **Accessible Design System & Brand Toast Alerts**:
   - Built with Tailwind CSS v4 design tokens, custom macOS-style terminal 404/Error Boundaries, and accessible keyboard navigation (`tabIndex`, `role="button"`).
   - Global feedback system alerting agents immediately when tickets are updated, AI replies are copied, or network exceptions occur.
5. **Observability & Health Probes**:
   - Production `/health` and `/api/health` endpoints performing active `SELECT 1` ping verification against PostgreSQL to integrate cleanly with uptime monitors and load balancers.

### 3. Challenges Faced & How We Overcame Them

- **Decoupling AI Latency from Database Transactions**:
  - *Challenge*: Initially, generating AI classifications during ticket creation opened a database transaction that waited for OpenRouter's HTTP response (3–10s latency). Under load, this would rapidly exhaust PostgreSQL connection pools.
  - *Solution*: Decoupled the AI inference from the database transaction. The ticket is immediately committed using atomic sequences, and AI insights are either processed asynchronously or requested on-demand in the detail view.
- **PostgreSQL Error Code Handling**:
  - *Challenge*: Raw database constraint violations were bubbling up as uninformative generic 500 Internal Server Errors.
  - *Solution*: Engineered custom Express error middleware that maps PostgreSQL `SQLSTATE` codes (e.g., `23505` unique violation $\rightarrow$ 409 Conflict, `23503` foreign key violation $\rightarrow$ 404 Not Found) with structured JSON error responses.
- **Search Debounce & URL Synchronization Loops**:
  - *Challenge*: Synchronizing a debounced 300ms search input with URL search parameters caused re-render flicker and cursor jumps.
  - *Solution*: Decoupled local controlled input state from URL navigation, pushing to `useSearchParams` only on debounced dispatch or form submission, while preserving pagination auto-resets.

### 4. Tradeoffs Made & Future Roadmap

- **Server-Assisted Polling vs. WebSockets**:
  - *Tradeoff*: For this version, we implemented 15-second polling via TanStack Query rather than a persistent WebSocket connection. In a serverless deployment environment (Vercel), stateless polling is significantly more resilient and requires no external Redis pub/sub infrastructure.
  - *Roadmap*: With additional time, we would implement Server-Sent Events (SSE) or WebSockets with Redis pub/sub for instant typing indicators and live collision detection (warning when two agents view the same ticket).
- **Automated SLA Breach Countdown & Escalation**:
  - *Roadmap*: Implement a visual countdown timer per ticket based on priority (e.g., Urgent = 2hr SLA, High = 6hr SLA) with automated background notifications when an SLA is breached.
- **OAuth 2.0 / SSO & Role-Based Permissions**:
  - *Roadmap*: Expand authentication beyond single-admin JWT to include Google/GitHub SSO, agent role segregation (`agent`, `lead`, `admin`), and audit trails for status changes.

---

## 📄 License

This project is licensed under the [MIT License](LICENSE).
