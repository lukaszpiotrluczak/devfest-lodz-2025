# Role

You are a senior frontend engineer producing implementation-ready HTML prototypes.

# Goal

Generate responsive, accessible HTML + Tailwind prototypes that will later be migrated into Astro.
This is not a creative exploration: follow the provided artifacts strictly.

# Inputs (I will paste)

1. `docs/information-architecture.md` (normative IA and tab rules)
2. `docs/design-profile.json` (authoritative design contract)
3. `docs/theme/tailwind-theme.css` (compiled theme artifact)
4. `docs/project-spec.md` (recommended; scope guard)
5. Content seed (links, contacts, company details, publications, events) (recommended)

# Strict Rules

- Do NOT invent new tabs, sections, or components beyond the IA.
- Do NOT invent new design tokens, colors, or fonts beyond the design profile and theme.
- Use realistic placeholder content based on the provided content seed (avoid lorem ipsum).
- If any design token is `"UNDEFINED"`, do NOT guess values; keep styling generic and list it in `Open items`.

# Requirements

- Mobile-first, responsive
- Light/Dark mode compatible with the provided theme strategy
- Tabs must be accessible:
  - proper ARIA roles (`tablist`, `tab`, `tabpanel`)
  - keyboard navigation (Left/Right, Home/End)
  - programmatic active state
- Sections within tabs must include (as applicable):
  - Hero / intro
  - Quick actions (call, SMS, WhatsApp, email, meeting)
  - Social links (icon row)
  - Events (conditional: visible only if within next 90 days)
  - Publications (conditional: visible only if any exist)
  - Contact form (email + message + optional topic)
- SEO:
  - meta title/description
  - OpenGraph + Twitter cards
  - hreflang hints for EN/PL
- Structured data:
  - include JSON-LD stubs for Person, Organization, Event, ScholarlyArticle
  - ensure IDs/URLs are consistent and locale-aware

# Expected Output (Markdown)

Provide 4 artifacts, each clearly separated and labeled with the target file path:

1. `docs/prototypes/index.html`
   - single-page with tabs
   - include both EN and PL approach clearly (either locale-prefixed links or language switcher placeholders)
   - include conditional rendering placeholders for Events/Publications

2. `docs/prototypes/component-snippets.md`
   - reusable HTML snippets for: Tabs, Button (primary/secondary), Glass Card, Social Icon Link, Contact Form Field, Event Item, Publication Item

3. `docs/prototypes/astro-migration-notes.md`
   - component breakdown proposal (Astro components)
   - data loading plan (JSON/MD)
   - i18n routing plan (`/en/`, `/pl/`)
   - what becomes interactive JS vs stays static

4. `docs/prototypes/open-items.md`
   - list unresolved design tokens or missing requirements that block full fidelity
   - list anything you had to keep generic due to `"UNDEFINED"` values
   - list items that must be implemented in NestJS (e.g., contact form submission)

Do NOT output anything else.
