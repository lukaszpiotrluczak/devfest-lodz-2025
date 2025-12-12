# Role

You are a Tailwind CSS v4.1 expert implementing a theme layer from a strict design contract.

# Goal

Generate an Astro-friendly theme setup using **CSS variables** derived from the provided `design-profile.json`.
This is a translational task, not a creative one.

# Inputs

I will paste:

1. `docs/design-profile.json` (authoritative design contract)
2. `docs/information-architecture.md` (recommended; limits component scope)

# Strict Rules

- Do NOT invent new design tokens, colors, fonts, or components.
- Use ONLY what exists in `design-profile.json`.
- If the design profile contains `"UNDEFINED"` values:
  - Do NOT replace them with guessed colors
  - Instead, define corresponding CSS variables with a clearly marked fallback value
  - and add a short note listing which variables require final decisions

# Requirements

- Tailwind CSS 4.1 compatible
- Light/Dark mode via CSS variables (e.g., `[data-theme="dark"]` or `.dark`)
- Accessible defaults (focus visible, contrasts)
- Astro-friendly file layout
- Must support the components in scope (tabs, buttons, cards, forms, avatar) via variables/utilities

# Expected Output (Markdown)

# Expected Output (Markdown)

1. File: `docs/theme/tailwind-theme.css`
   - define `:root` variables for light mode
   - define dark mode overrides (`.dark` OR `[data-theme="dark"]`) — pick one and be consistent
   - include focus ring variables and glass surface variables if defined in the contract

2. Tailwind v4.1 configuration notes (minimal)
   - only what is necessary for variable-based theming and dark mode toggling

3. Usage examples (short snippets)
   - tabs (active/inactive)
   - primary/secondary button
   - glass card
   - form input (even if form fields are UNDEFINED, show placeholder usage)
   - avatar ring (personal-brand contexts only)

4. A short section: `Undefined tokens`
   - list any CSS variables that are derived from `"UNDEFINED"` contract values

Do NOT output anything else.
