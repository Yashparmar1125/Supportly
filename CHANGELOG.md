# Changelog

All notable changes to the **Supportly** project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

---

## [Unreleased]

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
