<!--
Prompt: prompts/03-ui/01-tailwind-theme.md
Date: 2025-12-12
Model: GPT-5.2
-->

# Astro theme setup

## Prompt:
<!-- 
Attached files:
- /docs/information-architecture.md
- /docs/design-profile.json
-->

# Role
You are a Tailwind CSS v4.1 expert implementing a theme layer from a strict design contract.

# Goal
Generate an Astro-friendly theme setup using **CSS variables** derived from the provided design-profile.json.
This is a translational task, not a creative one.

# Inputs
I will paste:
1) docs/design-profile.json (authoritative design contract)
2) docs/information-architecture.md (recommended; limits component scope)

# Strict Rules
- Do NOT invent new design tokens, colors, fonts, or components.
- Use ONLY what exists in design-profile.json.
- If the design profile contains "UNDEFINED" values:
  - Do NOT replace them with guessed colors
  - Instead, define corresponding CSS variables with a clearly marked fallback value
  - and add a short note listing which variables require final decisions

# Requirements
- Tailwind CSS 4.1 compatible
- Light/Dark mode via CSS variables (e.g., [data-theme="dark"] or .dark)
- Accessible defaults (focus visible, contrasts)
- Astro-friendly file layout
- Must support the components in scope (tabs, buttons, cards, forms, avatar) via variables/utilities

# Expected Output (Markdown)
# Expected Output (Markdown)

1) File: docs/theme/tailwind-theme.css
   - define :root variables for light mode
   - define dark mode overrides (.dark OR [data-theme="dark"]) — pick one and be consistent
   - include focus ring variables and glass surface variables if defined in the contract

2) Tailwind v4.1 configuration notes (minimal)
   - only what is necessary for variable-based theming and dark mode toggling

3) Usage examples (short snippets)
   - tabs (active/inactive)
   - primary/secondary button
   - glass card
   - form input (even if form fields are UNDEFINED, show placeholder usage)
   - avatar ring (personal-brand contexts only)

4) A short section: Undefined tokens
   - list any CSS variables that are derived from "UNDEFINED" contract values

Do NOT output anything else.

2/2

## Response:
Myślał przez sekundę

1) File: `docs/theme/tailwind-theme.css`
----------------------------------------

```css
/* docs/theme/tailwind-theme.css */
/* Derived strictly from docs/design-profile.json :contentReference[oaicite:0]{index=0} */

:root {
  /* typography */
  --font-sans: Inter;
  --font-accent: "Space Grotesk";

  /* light mode semantic surfaces/text */
  --bg: #FAFAFA;                 /* color.modes.light.background -> neutral-50 */
  --surface: #f3f4f6;            /* FALLBACK: gray-100 is UNDEFINED */
  --surface-glass: rgba(255,255,255,0.65); /* surface-glass.light */
  --text: #0B0B0C;               /* default readable text on light bg (neutral-900 from contract) */
  --text-secondary: #6b7280;     /* FALLBACK: gray-500 is UNDEFINED */
  --divider: #d1d5db;            /* FALLBACK: gray-300 is UNDEFINED */

  /* brand tokens */
  --brand-consulting-primary: #FAD228;
  --brand-consulting-secondary: #D28C0A;
  --brand-personal-primary: #CC1E1E;

  /* focus (contract: “clearly visible and consistent”) */
  --focus-ring: var(--brand-consulting-primary);
  --focus-ring-offset: var(--bg);

  /* component-scoped helpers (no new tokens; just aliases to contract tokens) */
  --tab-active-bg: var(--brand-consulting-primary); /* components.tabs.activeState.colorToken */
  --btn-primary-bg: var(--brand-consulting-primary); /* components.buttons.primary.backgroundToken */
  --btn-primary-text: #0B0B0C;   /* components.buttons.primary.textColorIntent = dark-text */
  --btn-secondary-border: var(--divider);

  /* glass rules (contract: blur + subtle border) */
  --glass-border: var(--divider);
}

.dark {
  /* dark mode semantic surfaces/text */
  --bg: #0B0B0C;                 /* color.modes.dark.background -> neutral-900 */
  --surface: #111827;            /* FALLBACK: gray-800 is UNDEFINED */
  --surface-glass: rgba(15,15,17,0.6); /* surface-glass.dark */
  --text: #FAFAFA;               /* readable text on dark bg (neutral-50 from contract) */
  --text-secondary: #9ca3af;     /* FALLBACK: gray-500 is UNDEFINED */
  --divider: #374151;            /* FALLBACK: gray-300 is UNDEFINED */

  /* focus */
  --focus-ring-offset: var(--bg);

  /* secondary button border stays tied to divider */
  --btn-secondary-border: var(--divider);
}

/* base element mapping (Astro-friendly global layer; can be imported once) */
html {
  font-family: var(--font-sans);
  font-size: 16px; /* typography.sizes.base.px :contentReference[oaicite:1]{index=1} */
}

body {
  background: var(--bg);
  color: var(--text);
}

/* consistent focus visibility */
:where(a, button, input, textarea, select, [role="tab"]):focus-visible {
  outline: 2px solid var(--focus-ring);
  outline-offset: 2px;
  /* If you prefer ring utilities, keep this as a fallback baseline */
}

/* glass surface utility class (pairs blur + subtle border per contract) */
.glass-surface {
  background: var(--surface-glass);
  border: 1px solid var(--glass-border);
  /* contract blur token: layout.blur.glassBackdrop = backdrop-blur-md :contentReference[oaicite:2]{index=2} */
  backdrop-filter: blur(12px); /* matches “md” feel; Tailwind class can be used instead */
}

/* optional: reduce-motion baseline */
@media (prefers-reduced-motion: reduce) {
  * {
    scroll-behavior: auto !important;
    transition-duration: 0ms !important;
    animation-duration: 0ms !important;
  }
}
```

* * *

2) Tailwind v4.1 configuration notes (minimal)
----------------------------------------------

*   Import the CSS once globally (e.g. in `src/styles/global.css` or your main layout), and ensure Tailwind processes it:
    *   `@import "../../docs/theme/tailwind-theme.css";` (or copy file into your app later)
*   Use class-based dark mode toggling: apply `.dark` on `<html>` (or `<body>`) to activate dark variables.
*   Use Tailwind arbitrary values to bind variables without adding new tokens:
    *   `bg-[var(--bg)] text-[var(--text)] border-[var(--divider)]`
    *   `bg-[var(--surface)]`
    *   `ring-[var(--focus-ring)] ring-offset-[var(--focus-ring-offset)]`

(Design contract source: `docs/design-profile.json`

design-profile

; IA component scope includes tabs/buttons/cards/forms/avatar

information-architecture

)

* * *

3) Usage examples (short snippets)
----------------------------------

### Tabs (active/inactive)

```html
<div role="tablist" class="flex gap-2 p-2">
  <button
    role="tab"
    aria-selected="true"
    class="rounded-xl px-3 py-2 bg-[var(--tab-active-bg)] text-[var(--btn-primary-text)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--focus-ring)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--focus-ring-offset)]"
  >
    <span aria-hidden="true" class="mr-2">👤</span><span>Me</span>
  </button>

  <button
    role="tab"
    aria-selected="false"
    class="rounded-xl px-3 py-2 bg-[var(--surface)] text-[var(--text)] border border-[var(--divider)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--focus-ring)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--focus-ring-offset)]"
  >
    <span aria-hidden="true" class="mr-2">🏢</span><span>Luczak Consulting</span>
  </button>
</div>
```

### Primary / secondary button

```html
<button
  class="rounded-xl px-4 py-2 bg-[var(--btn-primary-bg)] text-[var(--btn-primary-text)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--focus-ring)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--focus-ring-offset)]"
>
  Primary
</button>

<button
  class="rounded-xl px-4 py-2 bg-transparent text-[var(--text)] border border-[var(--btn-secondary-border)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--focus-ring)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--focus-ring-offset)]"
>
  Secondary
</button>
```

### Glass card

```html
<article class="rounded-2xl p-4 glass-surface">
  <h3 class="font-[var(--font-accent)] text-lg">Card title</h3>
  <p class="mt-2 text-[var(--text-secondary)]">
    Card content…
  </p>
  <div class="mt-4 flex gap-2">
    <button class="rounded-xl px-3 py-2 bg-[var(--btn-primary-bg)] text-[var(--btn-primary-text)]">
      Action
    </button>
  </div>
</article>
```

### Form input (placeholder usage)

```html
<label class="block text-sm mb-2 text-[var(--text-secondary)]">Email</label>
<input
  type="email"
  class="w-full rounded-xl px-3 py-2 bg-[var(--surface)] text-[var(--text)] border border-[var(--divider)]
         focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--focus-ring)]
         focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--focus-ring-offset)]"
/>
```

### Avatar ring (personal-brand contexts only)

```html
<div class="inline-flex items-center justify-center rounded-full p-[2px] bg-[var(--brand-personal-primary)]">
  <img
    alt="Profile photo"
    class="h-16 w-16 rounded-full object-cover bg-[var(--surface)]"
    src="/avatar.jpg"
  />
</div>
```

* * *

4) Undefined tokens
-------------------

Derived from `"UNDEFINED"` values in the contract

design-profile

:

*   `--surface` (from `color.tokens.gray-100.value` / `color.tokens.gray-800.value`)
*   `--text-secondary` (from `color.tokens.gray-500.value`)
*   `--divider` and `--glass-border` (from `color.tokens.gray-300.value`)



---
Powered by [ChatGPT Exporter](https://www.chatgptexporter.com)