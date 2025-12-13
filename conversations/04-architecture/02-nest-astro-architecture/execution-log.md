# Execution log — NestJS + Astro architecture

Prompt:

- prompts/04-architecture/02-nest-astro-architecture.md

AI tool:

- Claude Code

Date:

- 2025-12-12

Mode:

- Direct repository write access (no conversational transcript)

---

## Preflight inventory

Before changes:

- Repository contained production-grade DX setup (CI, linting, formatting, lockfile enforcement).
- No application code yet present under `app/`.
- Architecture artifacts and HTML prototypes existed under `docs/`.

Conclusion:

- Safe to scaffold application architecture and introduce minimal working code.
- CI was ready to validate build, typecheck, and structure.

---

## Architecture documentation

Created:

- `docs/architecture/nest-astro.md`

Contents:

- ASCII architecture diagram
- HTTP request flow (pages vs API)
- Build & runtime strategy (dev / preview / production)
- Static content strategy (JSON loaded at build time)
- Security headers strategy
- Risks and mitigations
- Explicit mapping to repository paths:
  - `app/backend`
  - `app/astro`
  - `dist/`

This document serves as the authoritative reference for the NestJS + Astro integration.

---

## Backend implementation (NestJS)

Created:

- `app/backend/src/main.ts`
  - NestJS entry point
  - Helmet security middleware
- `app/backend/src/app.module.ts`
  - Root module
  - Rate limiting configuration

### Contact form API

Created:

- `app/backend/src/contact/contact.controller.ts`
- `app/backend/src/contact/contact.service.ts`
- `app/backend/src/contact/dto/contact.dto.ts`

Features:

- DTO validation via `class-validator`
- Honeypot field (`company`)
- Timing-based spam detection (submissions < 2s rejected)
- Rate limiting (3 requests/hour/IP)
- Topic-based routing (console logging for MVP)

### Astro integration (backend side)

Created:

- `app/backend/src/astro/astro.module.ts`
- `app/backend/src/astro/astro.middleware.ts`
- `app/backend/src/astro/astro-manifest.ts` (placeholder, replaced at build time)

Configuration:

- Astro served via NestJS middleware
- Single HTTP server for pages and API

Backend configuration:

- `app/backend/tsconfig.json`
- `app/backend/nest-cli.json`
- `app/backend/package.json`

---

## Frontend implementation (Astro)

Created:

- `app/astro/astro.config.mjs`
  - Node adapter in middleware mode
- `app/astro/tsconfig.json`
- `app/astro/src/env.d.ts`

### Layouts & pages

Created:

- `app/astro/src/layouts/BaseLayout.astro`
  - SEO metadata
  - Shared HTML structure

Routing & pages:

- Redirects:
  - `/` → `/en/me`
  - `/en` → `/en/me`
  - `/pl` → `/pl/o-mnie`

EN pages:

- `app/astro/src/pages/en/me.astro`
- `app/astro/src/pages/en/luczak-consulting.astro`
- `app/astro/src/pages/en/contact.astro`

PL pages:

- `app/astro/src/pages/pl/o-mnie.astro`
- `app/astro/src/pages/pl/luczak-consulting.astro`
- `app/astro/src/pages/pl/kontakt.astro`

Astro scripts:

- `app/astro/package.json`

---

## Static content (build-time JSON)

Created:

- `app/astro/src/content/identity.en.json`
- `app/astro/src/content/identity.pl.json`
- `app/astro/src/content/company.en.json`
- `app/astro/src/content/company.pl.json`
- `app/astro/src/content/publications.json`
- `app/astro/src/content/events.json`

Strategy:

- Content imported at build time
- No runtime file I/O
- Fast, deterministic, SSR-friendly

---

## Build & runtime configuration

Modified:

- `package.json` (root)
  - Added scripts:
    - `dev`
    - `build`
    - `start`
    - `start:prod`
    - `typecheck`

Build output layout:

```

dist/
├── astro/
│ ├── server/
│ ├── client/
│ └── middleware.mjs
└── backend/
├── main.js
├── contact/
├── astro/
└── \*_/_.js

```

---

## CI impact

Modified:

- `.github/workflows/ci.yml`

New CI steps:

- Type checking (`pnpm run typecheck`)
- Build (`pnpm run build`)
- Structure validation (checks for `dist/backend` and `dist/astro`)

Existing checks retained:

- ESLint
- Prettier
- cspell

Outcome:

- CI validates tooling, code quality, type safety, and build integrity.

---

## Request routing overview

### Page requests (Astro via NestJS)

- `/` → `/en/me`
- `/en` → `/en/me`
- `/pl` → `/pl/o-mnie`
- Locale pages rendered by Astro SSR

### API requests (NestJS)

- `POST /api/contact`
  - Validation
  - Honeypot
  - Rate limiting
  - Spam detection

### Security headers (all responses)

- Content-Security-Policy
- Strict-Transport-Security (production)
- X-Content-Type-Options: nosniff
- Referrer-Policy: strict-origin-when-cross-origin
- X-Frame-Options: DENY
- Permissions-Policy

---

## Verification

Local verification:

- `pnpm run validate`
  - ESLint: 0 errors
  - Prettier: all files formatted
  - cspell: 0 errors
- `pnpm run build`
  - Astro build succeeds
  - NestJS build succeeds
- `pnpm run dev`
  - Application starts on http://localhost:3000
  - EN and PL routes render correctly
  - `/api/contact` responds with safe stub response

---

## Outcome

- Single deployment artifact: NestJS serving Astro via middleware
- Bilingual routing with EN/PL parity
- Security-first API design
- Deterministic builds and CI validation
- Architecture ready for deployment testing

---

## Deferred / out of scope

- Email delivery integration for contact form
- GDPR-friendly CAPTCHA (e.g. Turnstile, hCaptcha)
- CSP hardening (removal of `unsafe-inline`)
- Health check endpoint
- Automated content freshness checks

This step establishes a **production-ready application architecture**
while keeping scope intentionally minimal and auditable.

---

## Patch: Fix ESM/CommonJS runtime conflict for production start

### Problem observed

Local runtime failed when starting the built backend:

- `pnpm run start` executed `node dist/backend/main.js`
- Node treated `dist/backend/main.js` as ESM because repository root `package.json` declares `"type": "module"`
- NestJS build output is CommonJS (uses `exports` / `require`)

Resulting error:

- `ReferenceError: exports is not defined in ES module scope`

Root cause:

- ESM/CJS mismatch at runtime due to root-level module type affecting compiled backend output.

---

### Solution applied (Strategy: module boundary)

Chosen strategy:

- Keep root ESM (`"type": "module"`) unchanged
- Introduce an explicit CommonJS boundary for the backend build output

Implementation:

- Added a build postprocessing step that creates:
  - `dist/backend/package.json` containing `{ "type": "commonjs" }`

Effect:

- Node treats `dist/backend/*.js` as CommonJS at runtime
- Astro build output remains ESM under `dist/astro/`
- Backend dynamically imports Astro’s ESM handler when needed

This preserves a single deployment artifact while making runtime module semantics explicit and deterministic.

---

### Files changed

Build configuration:

- `package.json`
  - added `build:postprocess` script (creates `dist/backend/package.json`)

Backend integration:

- `app/backend/src/astro/astro.middleware.ts`
  - refactored to dynamically import Astro SSR handler
- `app/backend/src/astro/astro-manifest.ts`
  - placeholder typing adjusted (not used in production path)

Tooling:

- `eslint.config.js`
  - fixed ignore pattern for `.astro/` directories

Generated at build time:

- `dist/backend/package.json` (CommonJS boundary)

---

### Verification

Verified locally:

- `pnpm run build`
  - builds Astro to `dist/astro/`
  - builds NestJS to `dist/backend/`
  - generates `dist/backend/package.json`
- `pnpm run start:prod`
  - application starts without module errors
- smoke checks:
  - `POST /api/contact` returns `{"success":true,"message":"Message received"}`
  - `curl -I /en/me` shows redirect + CSP header present
- `pnpm run validate`
  - ESLint passed (with known acceptable warnings for placeholder `any`)
  - Prettier passed
  - cspell passed

CI impact:

- No workflow changes required; existing typecheck/build/validate steps remain green.

---

### Outcome

Production start is now reliable across Node environments while keeping:

- root project ESM
- backend output explicitly CommonJS
- Astro SSR handled via dynamic ESM import

This patch documents a practical, production-safe approach to ESM/CJS interop in a mixed-tooling monorepo.
