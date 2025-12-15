# Role

You are a senior DevEx engineer and technical speaker building a minimal, professional Reveal.js slide deck
inside an existing public GitHub repository.

# Goal

Create a concise English presentation (Reveal.js) that supports a live talk:

- Intro hook: “Hi, I’m Łukasz Piotr Łuczak… easier to show you my online business card… I never had time to build one… AI will replace us… let’s test AI on this task.”
- Then: what the project is, how it was built using AI prompts + repo artifacts, what worked/failed, and conclusion.
- Close: invite to repo, explain “no manual edits — only prompts”, and an honest takeaway about AI: powerful tool, not a replacement except for simplest tasks; great acceleration when guided by humans.

The deck must be:

- Minimal (less text, more structure)
- Brand-aligned (use colors from design-profile.json / theme)
- A good “backdrop and plan” for spoken content
- English only

Additionally:

- Store the presentation in the repo
- Build it in CI and deploy to GitHub Pages
- Keep everything deterministic and compatible with existing tooling (pnpm, CI checks, formatting)
- No analytics/tracking

# Inputs (read from repo, do not ask me to paste)

You MUST inspect and leverage:

- `docs/design-profile.json` (brand tokens and constraints)
- `docs/theme/tailwind-theme.css` (if present, for CSS variables approach)
- `README.md` (project story)
- `docs/architecture/nest-astro.md` (architecture story points)
- `conversations/` execution logs (timeline and narrative beats)
- `git log --oneline --decorate` (high-level commit story)
- Optional: `docs/prototypes/` (before/after narrative)

If some files are missing, proceed with best effort and document assumptions.

# Repository constraints (must follow)

- Docker/Podman agnostic
- pnpm as package manager
- Keep `dist/` as the build output folder
- CI must remain green (lint, format, spell, typecheck, build)
- Use Conventional Commits with verbose messages (educational repo)

# Implementation plan (must do)

## 1) Presentation location & structure

Create a dedicated folder:

- `presentation/reveal/`

Inside it, create:

- `presentation/reveal/index.html`
- `presentation/reveal/slides.md` (markdown-based slides)
- `presentation/reveal/theme.css` (custom theme aligned with design profile)
- `presentation/reveal/assets/` (logos, avatar if available in repo; otherwise placeholders)
- `presentation/reveal/README.md` (how to run locally)

Keep the deck self-contained.

## 2) Reveal.js setup

Use Reveal.js in a clean, minimal setup:

- Install Reveal.js via npm (or vendor it if you strongly prefer; justify)
- Prefer a build tool that outputs static files (Vite is ok if needed)
- Ensure build output goes to: `dist/presentation/`

Add root scripts (pnpm) such as:

- `slides:dev` (serve locally)
- `slides:build` (build to dist/presentation)
- `slides:preview` (serve dist output)

Integrate into existing root scripts if appropriate, but keep them readable.

## 3) Slide content (English, minimal, speaker-friendly)

Create a slide deck with ~10–14 slides total.
Each slide should contain:

- A short title
- 1–3 short bullets max (or a single sentence)
- (Optional) speaker notes (Reveal supports notes) with short cues, not full paragraphs

Required sections:

1. Title / Intro (name + role + “let’s test AI” hook)
2. The problem (no online business card)
3. The “AI will replace us” premise → let’s try building it with AI
4. What the project is (digital business card platform: tabs, EN/PL, contact, events, publications)
5. Process overview (artifacts pipeline: IA → brand → design profile → tailwind theme → prototypes → repo DX → architecture → implementation)
6. A few “real-world friction” slides (CI failures and fixes: pnpm version, lockfile, formatting, ESM/CJS runtime mismatch)
7. The result (what works today; what’s intentionally unfinished)
8. The repo as the product of the talk (where to find prompts, logs, artifacts, code)
9. Key lessons (AI accelerates, but needs guidance; quality gates; humans steer)
10. Closing / CTA (QR/link placeholder, invite to repo, thanks)

Make sure to explicitly mention:

- “No manual fixes; only prompts and follow-up prompts”
- “Execution logs replaced chat logs when AI had write access”
- “Quality gates made issues visible early”

## 4) Branding & visuals

- Use brand colors from `docs/design-profile.json` as CSS variables in `theme.css`.
- Keep it modern, readable, high-contrast.
- Provide dark-mode friendly styling (Reveal theme can be dark-first).
- Include subtle accent usage (no flashy gradients unless already part of brand direction).
- Provide a footer with:
  - talk title short
  - my name
  - repo link placeholder (no raw URL in huge font; keep minimal)

## 5) GitHub Pages deployment

Add a GitHub Actions workflow:

- `.github/workflows/pages.yml`

Requirements:

- Trigger on push to main (and optionally manual dispatch)
- Build slides via `pnpm run slides:build`
- Deploy `dist/presentation/` to GitHub Pages
- Do NOT break existing CI workflow; keep CI for validation and use Pages workflow for deployment.

If the repo already has Pages configured, integrate with existing approach rather than duplicating.

## 6) Quality gates

- Ensure Prettier formats slides and markdown
- Ensure cspell ignores generated dist but checks slide markdown (with necessary vocabulary additions)
- Ensure `pnpm run validate`, `pnpm run build`, and `pnpm run slides:build` all pass

# Output format

1. Apply changes directly in the repo.
2. Then provide a Markdown summary:
   - Files created/changed (paths)
   - How to run slides locally
   - How GitHub Pages deployment works
   - Any assumptions made
   - Next recommended improvements (optional)

# Version Control & Commit Requirements

- Conventional Commits
- Verbose, educational commit messages
- Prefer 2–4 commits max for this step (scaffold, content, CI/pages, polish)
- Include commit bodies explaining rationale (Reveal setup choices, Pages workflow design)
  Do NOT generate short or generic commit messages.
