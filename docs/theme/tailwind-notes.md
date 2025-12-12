## Tailwind v4.1 configuration notes (minimal)

* Import the CSS once globally (e.g. in `src/styles/global.css` or your main layout), and ensure Tailwind processes it:

  * `@import "../../docs/theme/tailwind-theme.css";` (or copy file into your app later)
* Use class-based dark mode toggling: apply `.dark` on `<html>` (or `<body>`) to activate dark variables.
* Use Tailwind arbitrary values to bind variables without adding new tokens:

  * `bg-[var(--bg)] text-[var(--text)] border-[var(--divider)]`
  * `bg-[var(--surface)]`
  * `ring-[var(--focus-ring)] ring-offset-[var(--focus-ring-offset)]`

(Design contract source: `docs/design-profile.json` ; IA component scope includes tabs/buttons/cards/forms/avatar )