# Role

You are a backend architect experienced with NestJS and Astro, operating inside this repository using Claude Code
(with full read/write access to files and the ability to run local commands).

# Goal

Implement a working architecture where **Astro is served through NestJS** (as middleware or integrated adapter),
with EN/PL routing, static content from JSON/MD, and a contact form API stub.
This step must result in a repo state that builds and passes CI checks.

# Scope (important)

- This step is **architecture + minimal working scaffold** (“proof of life”), not full UI implementation.
- Use the existing HTML prototypes as a reference for routes/structure, but do not aim for pixel-perfect parity yet.

# Requirements (must)

- EN / PL routing with URL prefixes: `/en/` and `/pl/`
- Static content loaded from local files (JSON/MD) at runtime or build-time (choose and justify)
- Contact form API endpoint (NestJS) with:
  - validation
  - honeypot field
  - rate limiting
  - GDPR-friendly CAPTCHA placeholder (no third-party tracking)
- Security headers on HTTP responses (CSP, HSTS where applicable, X-Content-Type-Options, Referrer-Policy, etc.)
- Local dev, preview, production strategy
- All build outputs must go under `dist/`
- Must remain Docker/Podman agnostic

# Inputs (read from repo — do NOT ask me to paste)

You MUST inspect and align with existing files/artifacts, including:

- `docs/prototypes/astro-migration-notes.md` (routing + migration assumptions) [if present]
- `docs/prototypes/open-items.md` (known gaps impacting architecture)
- `docs/prototypes/index.html` (route/section expectations)
- Existing CI workflow: `.github/workflows/ci.yml`
- Existing tooling scripts in `package.json`

If any of these paths do not exist in the repo yet, note it and proceed with best-effort.

# Repository conventions (must follow)

- Application root: `app/`
- NestJS app lives in: `app/backend/` (create it)
- Astro app lives in: `app/astro/` (create it)
- Build outputs: `dist/` (single cleanup target)
- Keep deployment stacks in: `stacks/production/` (do not implement stacks now unless strictly required)

# What you must do (Claude Code actions)

## 0) Preflight (mandatory)

Before changing anything:

1. List the current contents of:
   - repository root
   - `app/`
   - `.github/`
   - `.devcontainer/`
   - `.vscode/`
2. State what already exists and what you will create/modify.
3. Do NOT overwrite existing files unless required.

## 1) Design artifact: architecture documentation

Create/update:

- `docs/architecture/nest-astro.md`

This document MUST contain:

1. Architecture diagram (ASCII)
2. Request flow (HTTP flow for page requests and API)
3. Build & runtime strategy (dev vs preview vs prod)
4. Static content strategy (JSON/MD): where it lives and how it is loaded
5. Security headers strategy (what, where configured)
6. Risks & mitigations
7. Clear mapping to repository paths (`app/backend`, `app/astro`, `dist`)

## 2) Minimal working scaffold (proof of life)

Implement a minimal but real setup that can run locally and pass CI:

- Initialize NestJS in `app/backend/` (TypeScript)
- Initialize Astro in `app/astro/`
- Integrate them so that NestJS serves:
  - `/en/*` and `/pl/*` via Astro rendering (or a build output + static serving), according to your chosen strategy
  - `/api/contact` (POST) handled by NestJS

Rules:

- The integration must be explicit and documented.
- Prefer a strategy that keeps SSR/adapter choices clear and maintainable.
- Ensure the app can run in dev mode with a single command from repo root.

## 3) Scripts and CI alignment

Update root `package.json` scripts to include:

- `dev` (runs backend + astro integration)
- `build`
- `start` / `start:prod` (serving from `dist/`)
- keep existing `lint`, `format`, `spell`, `validate`

Ensure CI remains green:

- lint passes
- prettier passes
- cspell passes
- any new build/typecheck steps you introduce must pass

## 4) Verification (must)

After implementing:

- Run the repo scripts locally (or describe exactly what was run and what outputs were observed):
  - `pnpm run validate`
  - `pnpm run build`
  - `pnpm run dev` (smoke test)
- Ensure:
  - `/en/` returns a page
  - `/pl/` returns a page
  - `POST /api/contact` responds with a safe stub response (no email sending yet)
  - security headers are present
- If you cannot run commands in this environment, provide a deterministic checklist and ensure the configuration is correct by inspection.

## 5) Output summary

After changes are applied, output a Markdown summary containing:

- `Files created/changed` (with paths)
- `How to run locally`
- `Request routing overview`
- `Build output layout under dist/`
- `CI impact`

# Version Control & Commit Requirements

All generated code and configuration must assume:

- The project uses **Conventional Commits**
- Commit messages must be **verbose and descriptive**
- This is a **public, educational repository**
- Commit history should explain _why_ changes were made, not only _what_ was changed

Guidelines:

- Use conventional types: feat, fix, chore, refactor, docs, ci, build, test
- Scope must be meaningful (e.g. `nest`, `astro`, `arch`, `dx`, `security`)
- Commit messages should be multi-line when appropriate:
  - short imperative subject line
  - followed by a detailed body explaining intent and design decisions
- Assume commits may be squashed, but the squash message must remain detailed and educational

Do NOT generate short or generic commit messages.
