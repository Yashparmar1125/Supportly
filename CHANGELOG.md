# Changelog

All notable changes to the **Supportly** project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

---

## [1.1.6] - 2026-09-24

### Human-Centric Terminology & Jargon Elimination
- **Natural Language & UI Copy Modernization**:
  - Replaced medical, military, and robotic jargons across all application views and landing copy with standard, friendly customer support CRM terminology.
  - Replaced `"Zero-Shot LLM"` badge with `"AI Assistant"` on the ticket resolution hub.
  - Replaced `"AI Zero-Touch Triage"` card title with `"AI Ticket Insights"` and `"Triage Verified"` with `"AI Categorized"`.
  - Replaced `"Triage & SLA Overrides"` with `"Update Status & Priority"`.
  - Replaced `"In Progress (Active Triage)"` dropdown status with `"In Progress (Under Review)"`.
  - Replaced `"All Inbound"` KPI card with `"All Tickets"`.
  - Replaced `"Intake Channel"` with `"Support Channel"`.
  - Replaced `"Internal Audit Log"` with `"Ticket History"`.
  - Replaced `"INTERNAL AGENT LOG"` with `"New Support Ticket"`.
  - Replaced `"Autonomous Route Guard"` and `"Autonomous Resilience Guard"` with clean, user-friendly navigation and recovery messaging.
  - Cleaned landing page copy (`Hero.tsx`, `HowItWorks.tsx`, `Features.tsx`, `MetricsStrip.tsx`, `Testimonials.tsx`) to remove references to "account telemetry", "inbound ping", and "autonomous resolution" in favor of natural customer support phrasing.

---

## [1.1.5] - 2026-09-24

### Multi-Client Triage, Team Collaboration & Live Sync
- **3D Triage with Dashboard Category Filtering**:
  - Added Category Filter selector dropdown to the dashboard toolbar (`Billing`, `Technical Bug`, `Feature Request`, `Account Access`, `General`).
  - Completed the 3D triage matrix alongside existing Status tabs and Priority SLA dropdown.
  - Fully synchronized with URL search query parameters (`?category=...`), resetting page cursor to 1 on filter changes.
- **Team Collaboration: Note Authorship & Note Types**:
  - Non-destructively migrated PostgreSQL `notes` table with `author_name TEXT DEFAULT 'Support Agent'` and `is_internal BOOLEAN DEFAULT true`.
  - Added dual-mode note composer toggle on `TicketDetailPage.tsx`:
    - 🔒 **Internal Note**: Private team findings and internal triage updates (amber badge, logged by authenticated agent username).
    - 💬 **Customer Reply**: Outbound customer-facing replies logged to the audit timeline (indigo badge).
  - Enhanced `NoteTimeline.tsx` with dynamic author initials avatar, author username, relative time (`formatRelativeTime`), and distinct visual classification badges.
- **Live Auto-Refresh & Real-Time Sync Heartbeat**:
  - Configured TanStack Query `refetchInterval: 15000` (15s) in `useTickets`, enabling automated background syncing without manual page reloads.
  - Added a pulsing `Live Sync (15s)` telemetry badge to the dashboard header.
- **Context-Aware AI Copilot**:
  - Enhanced OpenRouter prompt generation in `ai.service.ts` to include recent activity history and discussion notes with author attribution and note type markers, enabling contextually aware follow-up replies.

---

## [1.1.4] - 2026-09-24

### UI Feedback, Resilience & Health Monitoring
- **Supportly Global Toast & Notification System**:
  - Implemented `ToastContext` and `useToast()` hook with sleek, brand-compliant toast alerts matching the Supportly design tokens (`--color-ink`, `--color-card`, `--shadow-lg`, Lucide vector icons).
  - Wired instant visual feedback for ticket status updates, priority overrides, category adjustments, note submissions, AI suggestion clipboard copies, and network errors.
  - Auto-dismissing timer (3.5s) with smooth slide-up + fade-in animations and accessible close button.
- **Supportly Branded 404 Route**:
  - Created `NotFoundPage.tsx` styled with Supportly's signature macOS chrome frame, traffic-light window controls, Manrope typography, and quick navigation back to the ticket dashboard or public support portal.
  - Registered catch-all `*` route in `router.tsx` to prevent blank React screens on invalid paths or deleted ticket IDs.
- **Global Error Boundary**:
  - Created `ErrorBoundary.tsx` catching runtime exceptions gracefully and providing an interactive "Reload Application" recovery control and diagnostics.
- **PostgreSQL Pool Health Probe**:
  - Implemented `server/src/routes/health.routes.ts` with real database pinging (`SELECT 1 AS alive`) and latency benchmarking.
  - Returns structured health metrics: `{ status, service, version, uptime_seconds, database: { status, latency_ms } }` on `/health` and `/api/health`.

---

## [1.1.3] - 2026-09-24

### Refactoring & Core Logic Hardening
- **Typed Auth Context & Ambient Declaration**: Introduced `AuthUser` and `JwtTokenPayload` with ambient `Express.Request.user` typings, eliminating unsafe type assertions across all route handlers and middlewares.
- **Production PostgreSQL Error Code Mapping**: Enhanced global error middleware with standard SQLSTATE mappings (`23505` Unique Violation $\rightarrow$ 409 Conflict, `23503` FK Violation / `23502` Not Null / `22P02` Invalid Type / `22001` Value Too Long $\rightarrow$ 400 Bad Request), headers-sent checks, and production error masking to prevent database disclosure.
- **Structured Validation Errors**: Standardized Zod error responses into `{ error: string, fields: Record<string, string>, details: ZodIssue[] }` for unified field-level client mapping.
- **Decoupled AI Urgency & Impact Heuristics**: Replaced naive category-based priority escalation with an Urgency & Impact Matrix, ensuring bug and billing questions are prioritized by actual operational impact rather than category alone.
- **Universal LLM Output Sanitization**: Implemented robust regex token scrubbers to purge synthetic reasoning tags (`<think>...</think>`) and unpopulated placeholder brackets (`\[[A-Za-z0-9\s_-]{2,30}\]`) across all model responses.
- **Masked Admin CLI Password Input**: Hardened `create-admin.ts` with terminal raw-mode masking (`*` keystroke suppression), preventing shoulder-surfing during administrative onboarding.
- **Centralized Frontend Utilities & Metadata Config**:
  - Created `client/src/lib/formatters.ts` with pure, reusable date and name formatters (`getInitials`, `formatRelativeTime`, `formatDateTime`, `formatNoteTime`).
  - Created `client/src/lib/ticketConfig.tsx` as single source of truth for channels, categories, sentiments, and icons.
  - Deduplicated over 120 lines of redundant local helper functions across `TicketRow.tsx`, `TicketDetailPage.tsx`, and `NoteTimeline.tsx`.
- **Hardened API Client & Client-Side JWT Expiration Check**:
  - Re-architected `api.ts` with unified `request<T>()` runner, structured `ApiError` hierarchy, and falsy-safe query param serialization (preserving `0` and `false`).
  - Added proactive JWT expiry validation on application startup in `AuthContext` to prevent stale token flashes and unauthorized request storms.
- **Accessibility & UI Refinements**:
  - Added `aria-invalid` and `aria-describedby` associations to `InputField` and `TextArea`.
  - Added `size` responsiveness (`sm` / `md`) to `PriorityBadge`.
  - Rendered dynamic user role in the navbar badge and dropdown profile panel.
  - Added `motion-reduce:animate-none` to `StatusBadge` pulsing indicator.

---

## [1.1.2] - 2026-09-24

### Security & Critical Fixes
- **CORS Vulnerability Resolved**: Fixed unconditional CORS fallthrough and removed arbitrary wildcard matching; origin checks now strictly enforce configured `FRONTEND_URL` and development hosts.
- **Decoupled AI Inference from Database Transactions**: Moved external OpenRouter HTTP requests and organization inference outside of the PostgreSQL transaction boundary in `ticketService.create()`, preventing pool connection starvation.
- **Concurrency-Safe Atomic Ticket Sequence**: Created `ticket_id_seq` PostgreSQL sequence to eliminate race conditions and duplicate key collisions during concurrent ticket creation.
- **Input Length Bounds & DoS Prevention**: Enforced strict `.trim()` and `.max()` length constraints across all Zod schemas (preventing multi-megabyte payloads and bcrypt CPU exhaustion).
- **Rate Limiting Protection**: Added `express-rate-limit` middlewares for authentication (10/15m), public ticket intake (30/15m), AI suggestions (20/15m), and global API requests (300/15m).
- **LLM Network Timeout Safeguard**: Added `AbortSignal.timeout(8000)` to OpenRouter requests in `aiService` to prevent process threads from hanging indefinitely.
- **Note-Only Update Reliability**: Fixed ticket update logic so note-only submissions reliably refresh `updated_at` and verify ticket existence.
- **Keyboard & WCAG Accessibility**: Made ticket table rows and KPI cards fully keyboard-accessible with `tabIndex={0}`, `role="button"`, and `Enter`/`Space` handlers.
- **Generalized Dynamic Organization Resolution**: Eliminated hardcoded company brands from the codebase in favor of a universal, zero-config domain parser in `organizationService` that dynamically resolves any corporate domain (e.g. `stripe.com` → `Stripe`, `acme-corp.co.in` → `Acme Corp`) while cleanly recognizing personal webmail providers as consumer `Individual` accounts.

---

## [1.1.1] - 2026-09-24

### Fixed
- **Table Column Architecture**: Replaced crowded inline badges with dedicated vertical grid columns for `CATEGORY`, `PRIORITY`, and `STATUS`.
- **Eliminated Badge Fatigue**: Replaced nested box badges on the customer sub-row with clean typographic hierarchy (`Avatar` · `Name` · `Organization` · `Channel/Email`), restoring natural readability.
- **Visual Distinction for Priority vs. Status**: Transformed `PriorityBadge` from a duplicate colored pill with a dot into a sleek, icon-led urgency meter (`Flame`, `AlertCircle`, `Clock`, `ArrowDown`) paired with SLA chips, visually separating it from the primary `StatusBadge` lifecycle pill.
- **Emoji Removal & Icon Standardization**: Completely removed unicode emojis (`🔥`, `⚠️`, `⏱️`, `💤`) from the dashboard priority filter and ticket detail triage overrides, replacing them with crisp Lucide vector icons (`Flame`, `AlertCircle`, `Clock`, `ArrowDown`, `Building2`, `CreditCard`, `Bug`, `Sparkles`, `KeyRound`, `FileText`).

---

## [1.1.0] - 2026-09-24

### Added
- **AI Zero-Touch Triage Engine**:
  - Automated classification on ticket ingestion: extracts `category` (`Billing`, `Technical Bug`, `Feature Request`, `Account Access`, `General`), `priority` (`Urgent`, `High`, `Medium`, `Low`), and `sentiment` (`Frustrated`, `Neutral`, `Delighted`).
  - Structured output enforced with Zod runtime validation and prompt schemas.
  - Zero-latency heuristic fallback engine guaranteeing reliable categorization even under AI provider timeout or rate limits.
- **SLA Countdown & Urgency Management**:
  - Enforceable SLA resolution windows: Urgent (2h), High (8h), Medium (24h), Low (48h).
  - High-visibility `PriorityBadge` with dynamic SLA indicator and pulsing urgency dots.
  - Dashboard priority filter selector (`All Priorities`, `Urgent`, `High`, `Medium`, `Low`) with URL synchronization.
- **Multi-Client & Channel Attribution**:
  - Automatic organization clustering derived from verified email domains (`KredX`, `QuickSend`, `CashFlow Neo`, `Acme Corp`).
  - Channel source tracking (`Web Portal`, `Email Forward`, `API Webhook`) with visual channel icons.
- **Agent Triage Console**:
  - Dedicated AI Triage & Client Context panel inside the ticket resolution hub.
  - Interactive priority and category override controls for agents.

---

## [1.0.1] - 2026-09-24

### Changed
- **Landing Navigation Polish**:
  - Reduced header vertical height to standard `h-16` (64px) with subtle backdrop blur and soft border styling.
  - Eliminated redundant duplicate agent login icon button, unifying the action into a clean pill button with integrated user icon.
  - Added session awareness: automatically displays a `Dashboard` navigation button when authenticated.
  - Added `How It Works` quick anchor link alongside `Features` in the primary desktop navigation bar.

### Added
- **Core Ticketing Engine**:
  - Full CRUD lifecycle for support tickets with auto-incrementing `TKT-XXX` identifier sequence.
  - State machine supporting status transitions: `Open` → `In Progress` → `Closed` with historical timeline logs.
  - Multi-user activity timeline notes with cascading foreign keys (`notes` table).
- **Sub-5ms Full-Text Search**:
  - Generated PostgreSQL `search_vector` column indexing ticket IDs, customer names, emails, subjects, and issue descriptions.
  - GIN indexing for high-concurrency English dictionary text querying.
- **Server-Side Pagination & Status Aggregation**:
  - Sub-millisecond windowed pagination (`LIMIT` / `OFFSET`) supporting large dataset scalability.
  - Real-time global status count aggregation via PostgreSQL `COUNT(*) FILTER (WHERE status = ...)` for instant KPI updates.
  - URL query state synchronization (`useSearchParams`) as single source of truth for deep linking, sharing, and browser history.
  - Flicker-free page transitions using TanStack Query `placeholderData: keepPreviousData`.
- **AI Response Copilot**:
  - OpenRouter LLM integration (`nvidia/nemotron-3-nano-omni-30b-a3b-reasoning:free`).
  - Strict negative prompt guardrails and post-processing filters preventing meta-analysis and generic template brackets.
  - Direct one-click **Copy text** and **Use as note** auto-fill integration.
- **Public Customer Support Portal**:
  - Unauthenticated intake route (`/submit-ticket` and `POST /api/tickets`) with instant reference ID generation.
- **Agent & Admin Experience**:
  - High-density dashboard with live interactive KPI metric cards.
  - Segmented status pill filter tabs with real-time ticket count badges.
  - Debounced search input with automated page cursor resets.
  - Sticky navigation bar with interactive user profile accordion dropdown menu, database telemetry, and secure session termination.
- **Design System & Branding**:
  - Strict implementation of Supportly design system tokens in TailwindCSS v4 `@theme`.
  - Electric indigo color palette (`#5B4FE5`), Manrope typography, JetBrains Mono code badges, and macOS container frames.
  - Native SVG brand vector logo with adaptive light/dark mode GitHub support.
- **Security & Infrastructure**:
  - 12-round salted `bcrypt` password hashing for admin credentials.
  - Stateless 24-hour JWT Bearer authentication guard middleware.
  - Bidirectional runtime schema validation with Zod on both client and server.
  - Serverless Express deployment configuration for Vercel with resilient CORS origin handling.
  - Neon Serverless PostgreSQL connection pooling with enforced SSL.
