# Role

You are a DevEx and platform engineer working inside a real repository using Claude Code
(with full read/write access to the project files).

# Goal

Create a production-grade repository structure and DX setup for a public, educational project:
a digital business card platform (Astro frontend + NestJS backend later),
with strict quality gates from day one.

This step focuses on repo foundations, tooling, and CI — not on implementing the app yet.

# Constraints (must follow)

- Public GitHub repo
- Docker/Podman agnostic
- Use `compose.yml` (not docker-compose.yml)
- Use `Containerfile` (not Dockerfile)
- Dev Container + VS Code workspace
- ESLint, Prettier, cspell
- Conventional Commits with **verbose** commit messages
- CI checks that will validate future steps incrementally

# Repository structure constraints (must follow)

- Use `app/` as the application root (later: NestJS in `app/`, Astro in `app/astro/`)
- Build artifacts must go to `dist/` (single cleanup target)
- Coolify-related stack files must live in `stacks/production/`
- Generated artifacts from AI conversations and outputs are stored under:
  - `docs/` for approved artifacts
  - `conversations/` for conversation logs

# Inputs (read from repo files — do NOT ask me to paste)

You MUST inspect and align with these existing artifacts:

- `docs/prototypes/index.html` (HTML prototype + assumptions about theme import, tabs, i18n routes)
- `docs/prototypes/astro-migration-notes.md` (planned Astro structure and routing)
- `docs/prototypes/open-items.md` (known gaps that impact architecture decisions)
- `docs/theme/tailwind-theme.css` (if present; required later)
- `docs/design-profile.json` (design contract)

# What you must produce (make real changes in the repo)

Implement the repo + DX scaffolding by creating/modifying files with correct paths.

## 1) Folder structure

Create the base directories (even if empty for now), including:

- `app/`
- `docs/`
- `docs/theme/`
- `docs/prototypes/`
- `conversations/`
- `stacks/production/`
- `.github/`
- `.vscode/`
- `.devcontainer/`

## 2) Node/tooling baseline (minimal but future-proof)

Decide and implement ONE approach:

- Option A: root `package.json` as the tooling orchestrator (recommended)
- Option B: defer root tooling and keep per-app configs only (NOT recommended unless justified)

If you choose Option A, create:

- `package.json` with scripts for lint/format/spell/validate
- lockfile policy (pnpm preferred unless repo already decided otherwise)
- `engines` fields
- `lint-staged` (optional)

## 3) ESLint + Prettier + cspell

Set up:

- ESLint (flat config) suitable for TypeScript + Astro later
- Prettier config
- cspell config with Polish names/terms and domain terms (Łódź, Łuczak, DevFest, etc.)
  All must run via npm scripts.

## 4) Conventional commits + local hooks (verbose educational messages)

Add:

- commitlint config (Conventional Commits)
- a hook strategy that works in a public repo and in CI
  - Prefer `core.hooksPath` + `.githooks/` OR Husky (pick one; justify briefly in README notes)
- Add a short guide on writing verbose commit messages and squash messages.

## 5) CI workflows (must be incremental)

Create `.github/workflows/ci.yml` that runs on PRs and pushes:

- install
- lint
- format check
- cspell
- basic repo validation (e.g., required files exist)
  It must NOT assume app code exists yet, but must be ready to validate future steps.

## 6) README reproduction notes (root README)

Update `README.md` to include:

- project intent and scope (digital business card; not a full website/blog)
- local dev prerequisites
- devcontainer usage
- how to run checks
- how to structure conversations/artifacts (docs vs conversations)
- future architecture overview (app/ + app/astro)
  Keep it concise and non-marketing.

# Output format (Claude Code)

1. Apply changes directly in the repo (create/modify files).
2. Then output a Markdown summary with:
   - `Files created/changed` (with paths)
   - `How to run checks locally`
   - `CI checks overview`
   - `Open questions / tradeoffs`

# Version Control & Commit Requirements

All generated code and configuration must assume:

- The project uses **Conventional Commits**
- Commit messages must be **verbose and descriptive**
- This is a **public, educational repository**
- Commit history should explain _why_ changes were made, not only _what_ was changed

Guidelines:

- Use conventional types: feat, fix, chore, refactor, docs, ci, build, test
- Scope must be meaningful (e.g. `ci`, `dx`, `repo`, `tooling`)
- Commit messages should be multi-line when appropriate:
  - short imperative subject line
  - followed by a detailed body explaining intent and design decisions
- Assume commits may be squashed, but the squash message must remain detailed and educational

Do NOT generate short or generic commit messages.

# Preflight (mandatory)

Before creating or modifying any files:

1. List the current contents of:
   - repository root
   - `.github/`
   - `.devcontainer/`
   - `.vscode/`
2. Briefly state what already exists and what will be newly created or modified.
3. Do NOT overwrite existing files unless explicitly required by the goal.
