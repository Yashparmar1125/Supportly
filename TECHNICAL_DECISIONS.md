# Supportly CRM — Technical Decisions, Architecture & Tradeoffs

> **Author:** Yash Parmar  
> **Prepared for:** Datastraw AI + Tech Intern Hiring Assessment  
> **Evaluators:** Ozair Shaikh & Aryan Jaiswal (Datastraw Technologies)

---

## 🏛️ 1. Technical Approach & Architectural Decisions

Rather than assembling a minimal proof-of-concept, Supportly was engineered from day one as an enterprise-grade SaaS CRM ready for multi-agent concurrency:

- **End-to-End Type Safety & Runtime Schema Contracts**: We utilized **Zod** as the single source of truth across both client and server. All incoming payloads (ticket submissions, status updates, notes, search queries) undergo strict bidirectional runtime schema validation, preventing malformed inputs and SQL injection before hitting business logic.
- **Layered Service Architecture**: The backend strictly follows a layered architecture (`Routes` $\rightarrow$ `Middleware` $\rightarrow$ `Services` $\rightarrow$ `Database Pool`). Business logic, error mapping, and external API integrations reside purely in isolated service layers.
- **Atomic Concurrency for Ticket Sequencing**: To prevent race conditions in sequential ticket numbering (`TKT-XXX`), we implemented a dedicated PostgreSQL `SEQUENCE` (`ticket_id_seq`) rather than naive `SELECT MAX(id) + 1` queries, ensuring serializable safety under high-volume concurrent submissions.
- **URL-Synchronized Single Source of Truth**: On the frontend, all filter states (Status, Priority, Category, full-text search, and pagination) are synchronized directly to browser URL search parameters (`useSearchParams`). Every view is linkable, shareable between teammates, and natively integrated with browser back/forward history.
- **PostgreSQL Full-Text Search with GIN Indexing**: Rather than relying on unindexed, CPU-heavy `LIKE` pattern scans, Supportly utilizes a generated PostgreSQL `search_vector` (`tsvector`) indexed with **GIN (Generalized Inverted Index)**, enabling multi-field fuzzy search across IDs, customer names, emails, subjects, and descriptions in sub-5ms.

---

## ✨ 2. Key Features & Standout Implementations

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

---

## 🛠️ 3. Challenges Faced & How We Overcame Them

- **Decoupling AI Latency from Database Transactions**:
  - *Challenge*: Initially, generating AI classifications during ticket creation opened a database transaction that waited for OpenRouter's HTTP response (3–10s latency). Under load, this would rapidly exhaust PostgreSQL connection pools.
  - *Solution*: Decoupled the AI inference from the database transaction. The ticket is immediately committed using atomic sequences, and AI insights are either processed asynchronously or requested on-demand in the detail view.
- **PostgreSQL Error Code Handling**:
  - *Challenge*: Raw database constraint violations were bubbling up as uninformative generic 500 Internal Server Errors.
  - *Solution*: Engineered custom Express error middleware that maps PostgreSQL `SQLSTATE` codes (e.g., `23505` unique violation $\rightarrow$ 409 Conflict, `23503` foreign key violation $\rightarrow$ 404 Not Found) with structured JSON error responses.
- **Search Debounce & URL Synchronization Loops**:
  - *Challenge*: Synchronizing a debounced 300ms search input with URL search parameters caused re-render flicker and cursor jumps.
  - *Solution*: Decoupled local controlled input state from URL navigation, pushing to `useSearchParams` only on debounced dispatch or form submission, while preserving pagination auto-resets.

---

## ⚖️ 4. Tradeoffs Made & Future Roadmap

- **Server-Assisted Polling vs. WebSockets**:
  - *Tradeoff*: For this version, we implemented 15-second polling via TanStack Query rather than a persistent WebSocket connection. In a serverless deployment environment (Vercel), stateless polling is significantly more resilient and requires no external Redis pub/sub infrastructure.
  - *Roadmap*: With additional time, we would implement Server-Sent Events (SSE) or WebSockets with Redis pub/sub for instant typing indicators and live collision detection (warning when two agents view the same ticket).
- **Automated SLA Breach Countdown & Escalation**:
  - *Roadmap*: Implement a visual countdown timer per ticket based on priority (e.g., Urgent = 2hr SLA, High = 6hr SLA) with automated background notifications when an SLA is breached.
- **OAuth 2.0 / SSO & Role-Based Permissions**:
  - *Roadmap*: Expand authentication beyond single-admin JWT to include Google/GitHub SSO, agent role segregation (`agent`, `lead`, `admin`), and audit trails for status changes.
