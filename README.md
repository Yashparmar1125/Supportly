# Supportly — AI-Assisted Customer Support Ticketing CRM

> Built for the **Datastraw AI + Tech Intern Assessment Test**.
> A production-grade, full-stack Customer Support Management CRM following modern software engineering best practices and strict design system tokens.

---

## 🌟 Overview & Highlights

Supportly is a customer support management system designed to handle real-world support ticketing workflows:
- **Full Ticket Lifecycle**: Create, list, search, filter, update status (`Open` → `In Progress` → `Closed`), and append activity notes.
- **Instant Search**: Real-time search across ticket IDs, customer names, emails, subjects, and descriptions using PostgreSQL full-text search (`tsvector` & GIN index).
- **AI-Powered Response Copilot (Bonus / Standout Feature)**: Integrated with OpenRouter (`google/gemma-4-31b-it:free`) to generate context-aware draft replies with one-click copy and auto-fill into notes.
- **Design System Fidelity**: Mapped directly from the provided `Supportly — Design System.html` foundations (Manrope typography, JetBrains Mono, exact hex palettes, spacing scale, custom shadows, and badge styles).
- **Enterprise-Grade Security**: Interactive CLI admin user creation (`bcrypt` salted 12 rounds), JWT Bearer authentication, and schema-first validation with **Zod** across client and server.
- **Modern SaaS Landing Page**: Complete with outcome-first Hero, interactive product dashboard preview, 3-column Features grid, 3-step How-It-Works workflow, Social Proof, and conversion CTA.

---

## 🛠️ Architecture & Tech Stack

```text
┌────────────────────────────────────────────────────────┐
│               Frontend (Vercel SPA)                    │
│                                                        │
│  • React 19 + TypeScript + Vite                        │
│  • TailwindCSS v4 (CSS-first @theme design tokens)     │
│  • React Router v7 (createBrowserRouter SPA mode)      │
│  • TanStack Query v5 (cache, optimistic invalidations) │
│  • React Context API (JWT Auth State + LocalStorage)   │
└───────────────────────────┬────────────────────────────┘
                            │ REST API (Bearer JWT)
┌───────────────────────────▼────────────────────────────┐
│            Backend (Vercel Serverless / Express)       │
│                                                        │
│  • Node.js + Express + TypeScript                      │
│  • Zod (runtime validation schemas + static types)     │
│  • JWT (jsonwebtoken) + bcryptjs                       │
│  • PostgreSQL Pool with SSL (Neon Serverless)          │
│  • OpenRouter API Client (AI Response Copilot)         │
└───────────────────────────┬────────────────────────────┘
                            │
               ┌────────────▼────────────┐
               │    Neon PostgreSQL      │
               │  users, tickets, notes  │
               └─────────────────────────┘
```

| Layer | Technology | Rationale |
|---|---|---|
| **Frontend** | React 19, TypeScript, Vite | Fast HMR, type safety, industry standard |
| **Styling** | TailwindCSS v4 (`@tailwindcss/vite`) | Latest CSS-first `@theme` configuration without legacy config files |
| **Routing** | React Router v7 (Library mode) | Declarative client-side routing with route guards |
| **Server State** | TanStack Query v5 | Automatic query caching, deduplication, and cache invalidation |
| **Backend** | Express + TypeScript | Layered architecture (routes, services, middleware) serverless-compatible |
| **Validation** | Zod | Single source of truth for runtime validation and TypeScript DTOs |
| **Database** | PostgreSQL (Neon) | Relational integrity, foreign keys, and full-text GIN search indexes |
| **Auth** | JWT + bcrypt | Secure credential storage via interactive CLI, protected REST endpoints |
| **AI Copilot** | OpenRouter (`gemma-4-31b-it:free`) | Fast, free-tier LLM inference for response recommendations |

---

## 🎨 Design System Token Mapping

Extracted directly from `Supportly — Design System.html` into `client/src/styles/index.css`:

```css
@import "tailwindcss";

@theme {
  --color-ink: #1A1A2E;
  --color-canvas: #FAFAFC;
  --color-card: #FFFFFF;
  --color-primary: #5B4FE5;
  --color-primary-deep: #3D33B0;
  --color-line: #E7E7F2;
  --color-status-open: #5B4FE5;
  --color-status-progress: #E5A33D;
  --color-status-closed: #3DBE7A;

  --font-sans: 'Manrope', -apple-system, sans-serif;
  --font-mono: 'JetBrains Mono', monospace;

  --radius-sm: 6px;
  --radius-md: 8px;
  --radius-lg: 10px;
  --radius-xl: 14px;

  --shadow-card: 0 24px 60px -24px rgba(26, 26, 46, 0.22);
  --shadow-lg: 0 16px 32px -16px rgba(26, 26, 46, 0.25);
}
```

---

## 📁 Repository Structure

```text
Supportly/
├── client/                          # React 19 + Vite frontend
│   ├── src/
│   │   ├── components/
│   │   │   ├── landing/             # SaaS Marketing sections (Hero, Features, HowItWorks, Testimonials, CtaBanner, Footer)
│   │   │   ├── layout/              # AppLayout, Navbar, AuthGuard
│   │   │   ├── ui/                  # Design primitives (Button, StatusBadge, InputField, TextArea, Select, Logo)
│   │   │   ├── AISuggestion.tsx     # AI copilot card with copy & apply actions
│   │   │   ├── NoteTimeline.tsx     # Ticket activity notes timeline
│   │   │   ├── SearchBar.tsx        # Debounced search bar
│   │   │   ├── StatusFilter.tsx     # Pill status filter tabs
│   │   │   ├── TicketRow.tsx        # Ticket table row matching .t-row
│   │   │   └── TicketTable.tsx      # Table container matching .mock-frame
│   │   ├── context/
│   │   │   └── AuthContext.tsx      # JWT auth provider
│   │   ├── hooks/
│   │   │   ├── useAuth.ts           # Auth context consumer
│   │   │   └── useTickets.ts        # TanStack Query hooks (CRUD + AI)
│   │   ├── lib/
│   │   │   ├── api.ts               # Type-safe fetch wrapper with Bearer token
│   │   │   ├── queryKeys.ts         # Query key factory
│   │   │   └── router.tsx           # React Router v7 routes
│   │   ├── pages/
│   │   │   ├── LandingPage.tsx      # Public SaaS marketing landing page
│   │   │   ├── LoginPage.tsx        # Authentication login page
│   │   │   ├── DashboardPage.tsx    # Protected ticket list & search
│   │   │   ├── CreateTicketPage.tsx # Protected new ticket form
│   │   │   └── TicketDetailPage.tsx # Protected ticket detail & activity
│   │   ├── styles/
│   │   │   └── index.css            # TailwindCSS v4 @theme configuration
│   │   └── main.tsx                 # Providers & DOM entry
│   ├── vite.config.ts
│   └── package.json
│
├── server/                          # Express + TypeScript backend
│   ├── api/
│   │   └── index.ts                 # Express entry (local dev listener + Vercel export)
│   ├── scripts/
│   │   ├── create-admin.ts          # Interactive CLI for creating admin users
│   │   ├── migrate.ts               # Schema migration runner
│   │   └── seed.ts                  # Realistic test data seeder
│   ├── src/
│   │   ├── config/
│   │   │   └── env.ts               # Zod-validated environment config
│   │   ├── db/
│   │   │   ├── pool.ts              # pg Pool with SSL support
│   │   │   └── schema.sql           # DDL for users, tickets, notes & indexes
│   │   ├── middleware/
│   │   │   ├── auth.middleware.ts   # JWT verification middleware
│   │   │   ├── error.middleware.ts  # Centralized error handler
│   │   │   └── validate.middleware.ts# Generic Zod validation middleware
│   │   ├── routes/
│   │   │   ├── auth.routes.ts       # POST /api/auth/login
│   │   │   └── ticket.routes.ts     # CRUD + AI suggestion endpoints
│   │   ├── schemas/
│   │   │   ├── auth.schema.ts       # Login validation schema
│   │   │   └── ticket.schema.ts     # Ticket creation, update, and query schemas
│   │   └── services/
│   │       ├── ai.service.ts        # OpenRouter API integration
│   │       ├── auth.service.ts      # Authentication business logic
│   │       └── ticket.service.ts    # Ticket CRUD & search business logic
│   ├── tsconfig.json
│   ├── vercel.json
│   └── package.json
│
├── .env.example                     # Environment template
├── .gitignore                       # Git ignore specifications
├── package.json                     # Root orchestration scripts
└── README.md                        # Documentation
```

---

## 🚀 Quick Start Guide

### 1. Prerequisites
- **GitHub Repository**: [https://github.com/Yashparmar1125/Supportly](https://github.com/Yashparmar1125/Supportly)
- **Node.js**: v18+ (tested on Node.js 20+)
- **PostgreSQL**: Neon serverless connection URL (`postgres://...`)
- **OpenRouter Key**: (Optional, for AI suggestions) [openrouter.ai](https://openrouter.ai)

### 2. Demo Admin Credentials
The database has already been migrated and seeded on Neon with pre-configured admin credentials:
- **Username**: `admin@supportly.yashparmar.in`
- **Password**: `Supportly@2026!`
- **Role**: `admin`

### 3. Clone & Install Dependencies

```bash
# Clone the repository
git clone https://github.com/your-username/supportly.git
cd supportly

# Install dependencies for both client and server
npm run install:all
```

### 3. Environment Variables Configuration

Create a `.env` file in the project root:

```env
# Database (Neon PostgreSQL connection string)
DATABASE_URL=postgres://user:password@ep-xyz.us-east-1.aws.neon.tech/supportly?sslmode=require

# Authentication (Random string at least 16 chars)
JWT_SECRET=super-secret-jwt-key-min-16-characters-long

# OpenRouter AI (Optional - for AI Copilot replies)
OPENROUTER_API_KEY=sk-or-v1-your-openrouter-key

# Client & Server Ports
PORT=3001
FRONTEND_URL=http://localhost:5173
VITE_API_URL=http://localhost:3001
```

*Note: In `client/`, if needed, you can also place a `.env` file with `VITE_API_URL=http://localhost:3001`.*

### 4. Database Setup & Seeding

```bash
# 1. Run migrations to create users, tickets, notes tables and GIN indexes
npm run db:migrate

# 2. Create an admin user interactively via CLI
npm run db:create-admin
# Follow prompt:
# Username: admin
# Password: [enter password >= 8 characters]
# Confirm Password: [re-enter password]

# 3. Seed realistic support tickets and notes
npm run db:seed
```

### 5. Start Development Servers

In terminal 1 (Backend):
```bash
npm run dev:server
# Server running on http://localhost:3001
```

In terminal 2 (Frontend):
```bash
npm run dev:client
# Local: http://localhost:5173/
```

Navigate to:
- **`http://localhost:5173/`**: SaaS Landing Page
- **`http://localhost:5173/login`**: Sign in with the admin credentials you created
- **`http://localhost:5173/dashboard`**: Ticket list, search, filter, and management

---

## 📡 API Specification

All protected endpoints require an `Authorization: Bearer <token>` header.

### 1. Authentication
- **`POST /api/auth/login`**
  - **Body**: `{ "username": "admin", "password": "password123" }`
  - **Response (200)**:
    ```json
    {
      "token": "eyJhbGciOiJIUzI1NiIs...",
      "user": { "username": "admin", "role": "admin" }
    }
    ```

### 2. Create Ticket
- **`POST /api/tickets`**
  - **Body**:
    ```json
    {
      "customer_name": "Rina Shah",
      "customer_email": "rina@example.com",
      "subject": "Payment failed on renewal",
      "description": "Renewal charge failed twice. Need fix before billing cycle."
    }
    ```
  - **Response (201)**:
    ```json
    {
      "ticket_id": "TKT-001",
      "created_at": "2026-09-23T12:00:00.000Z"
    }
    ```

### 3. List & Search Tickets
- **`GET /api/tickets?status=Open&search=payment`**
  - **Query Params**:
    - `status`: `Open` | `In Progress` | `Closed` (Optional)
    - `search`: String matching title, description, customer name, email, or ID (Optional)
  - **Response (200)**:
    ```json
    [
      {
        "id": 1,
        "ticket_id": "TKT-001",
        "customer_name": "Rina Shah",
        "customer_email": "rina@example.com",
        "subject": "Payment failed on renewal",
        "description": "...",
        "status": "Open",
        "created_at": "2026-09-23T12:00:00.000Z",
        "updated_at": "2026-09-23T12:00:00.000Z"
      }
    ]
    ```

### 4. Get Ticket Detail with Notes
- **`GET /api/tickets/:ticket_id`**
  - **Response (200)**:
    ```json
    {
      "id": 1,
      "ticket_id": "TKT-001",
      "customer_name": "Rina Shah",
      "customer_email": "rina@example.com",
      "subject": "Payment failed on renewal",
      "description": "...",
      "status": "Open",
      "created_at": "...",
      "updated_at": "...",
      "notes": [
        {
          "id": 1,
          "ticket_id": "TKT-001",
          "note_text": "Investigating card decline code.",
          "created_at": "..."
        }
      ]
    }
    ```

### 5. Update Ticket Status & Add Note
- **`PUT /api/tickets/:ticket_id`**
  - **Body**: `{ "status": "In Progress", "note": "Contacted payment processor." }`
  - **Response (200)**:
    ```json
    {
      "success": true,
      "updated_at": "2026-09-23T12:30:00.000Z"
    }
    ```

### 6. AI Reply Copilot (Bonus Feature)
- **`POST /api/tickets/:ticket_id/suggest`**
  - **Response (200)**:
    ```json
    {
      "suggestion": "Dear Rina,\n\nThank you for reaching out. We apologize for the renewal charge failure. We have reviewed your account and initiated a payment retry. Please verify your payment details in the billing portal..."
    }
    ```

---

## 🚢 Deployment Guide

### Database (Neon PostgreSQL)
1. Sign up for a free account at [neon.tech](https://neon.tech).
2. Create a project named `supportly`.
3. Copy the connection string (`postgres://...`).
4. Run `npm run db:migrate` and `npm run db:create-admin` against your Neon URL.

### Frontend & Backend (Vercel)

Both the React SPA client and the Express backend are designed for seamless Vercel deployment:
- **Server**: Configured via `server/vercel.json` and `server/api/index.ts` to deploy as a Vercel Serverless Function.
- **Client**: Standard Vite build (`dist/`) deployable directly on Vercel with single-page app rewrite.

---

## 🏆 Assessment Criteria Self-Check

- [x] **Full-Stack Implementation**: Database (PostgreSQL), REST API (Express + TypeScript + Zod), and Frontend (React 19 + TailwindCSS v4 + TanStack Query).
- [x] **Core Features Complete**:
  - [x] 1. Create tickets with customer info & auto-generated `TKT-XXX` ID
  - [x] 2. List all tickets with responsive table layout
  - [x] 3. Search functionality across names, emails, IDs, subjects, descriptions
  - [x] 4. Filter by status (`All`, `Open`, `In Progress`, `Closed`)
  - [x] 5. Detailed ticket view, status dropdown updates, and activity notes
- [x] **Design System Fidelity**: Implements `Supportly — Design System.html` typography, color tokens, and components down to exact specs.
- [x] **Standout Feature Added**: AI Response Copilot with OpenRouter integration, copy-to-clipboard, and direct insertion into notes.
- [x] **Production Standards**: No hardcoded credentials (interactive CLI admin creator), parameterized SQL queries, strict TypeScript compilation, centralized error handling.
