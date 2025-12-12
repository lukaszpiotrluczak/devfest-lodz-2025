# Brand & Visual Direction

## Normative Artifact

---

## 1. Purpose & brand scope

This document defines the **authoritative visual and brand system** for:

* **Łukasz Piotr Łuczak** (personal brand)
* **Luczak Consulting** (company brand)

The system **must** support:

* A digital business card platform
* Light and dark modes
* Tailwind CSS implementation
* Long-term scalability across products and services

This document is a **source of truth** for designers and developers.

---

## 2. Design principles

* The interface **must** be minimal, precise, and restrained.
* Visual hierarchy **must** be clear and predictable.
* Decoration **must not** interfere with readability or usability.
* The system **must** balance:

  * personal expressiveness (personal brand)
  * structural credibility (company brand)
* Visual consistency **must** be preserved across all screens and modes.

---

## 3. Color system (semantic tokens)

### Core semantic tokens

| Token                        | Value     | Usage                                              |
| ---------------------------- | --------- | -------------------------------------------------- |
| `brand-consulting-primary`   | `#FAD228` | Primary actions, active navigation, key highlights |
| `brand-consulting-secondary` | `#D28C0A` | Hover states, secondary emphasis                   |
| `brand-personal-primary`     | `#CC1E1E` | Personal brand accents only                        |
| `neutral-900`                | `#0B0B0C` | Dark backgrounds                                   |
| `neutral-50`                 | `#FAFAFA` | Light backgrounds                                  |

### Neutral system

* `gray-100` – light surfaces
* `gray-800` – dark surfaces
* `gray-500` – secondary text
* `gray-300` – dividers and outlines

### Glass surfaces

* Light mode: `rgba(255,255,255,0.65)`
* Dark mode: `rgba(15,15,17,0.6)`

### Rules

* Personal red **must not** be used for primary system actions.
* Consulting yellow **must not** be used in personal-only contexts.
* Personal red and consulting yellow **must never** appear together in the same primary action.
* All colors **must** meet accessibility contrast requirements.

---

## 4. Typography system

### Fonts

* **Primary UI font:** Inter
* **Accent / headline font:** Space Grotesk

### Rules

* Inter **must** be used for all body text and UI controls.
* Space Grotesk **may** be used only for headlines and section titles.
* Decorative or display fonts **must not** be used.
* Base font size **must** be `16px` (`text-base`).
* Line height **must** be relaxed (`leading-relaxed`).
* Headings **must not** use ultra-bold weights.

---

## 5. UI primitives

### Border radius

* Cards: `rounded-2xl`
* Buttons: `rounded-xl`
* Chips / tags: `rounded-full`

### Shadows

* Light mode: `shadow-md shadow-black/5`
* Dark mode: `shadow-lg shadow-black/40`
* Hard or sharp shadows **must not** be used.

### Blur

* Glass surfaces **must** use `backdrop-blur-md`.
* Blur **must always** be paired with a subtle border.

### Spacing

* Only system spacing scale is allowed:
  `4 / 8 / 12 / 16 / 24 / 32`
* Arbitrary spacing values **must not** be used.

---

## 6. Component styling rules

### Avatar

* Shape **must** be circular.
* Image **must** be high-contrast.
* A personal red ring **may** be used only for personal-brand contexts.
* No decorative frames or shadows.

### Tabs

* Tabs **must** contain icon + label.
* Active tab **must** use consulting primary color.
* Underline-only indicators **must not** be used.
* State changes **must** be expressed via background and contrast.

### Cards

* Cards **must** use glass surfaces.
* Content order **must** be: title → content → actions.
* Cards **must not** contain decorative gradients.

### Buttons

* Primary button:

  * Consulting yellow background
  * Dark text
* Secondary button:

  * Transparent background
  * Visible border
* Personal red **must** be used only for personal-brand actions.
* Buttons **must not** rely on color alone for state indication.

---

## 7. Light / Dark mode rules

* Dark mode **must** be designed explicitly, not derived by inversion.
* Both modes **must** share identical spacing, typography, and hierarchy.
* Glass opacity values **must** differ between modes.
* Contrast ratios **must** remain compliant in both modes.

---

## 8. Accessibility requirements

* WCAG 2.1 AA contrast compliance is mandatory.
* Text **must not** be placed directly on glass without sufficient contrast.
* Focus states **must** be clearly visible and consistent.
* Interactive states **must not** rely solely on color.
* Keyboard navigation **must** be fully supported.

---

## 9. Non-goals

* Brand experimentation outside defined tokens
* Trend-driven visual effects
* Decorative gradients and textures
* Skeuomorphic or illustrative UI styles
* Marketing-heavy or promotional visuals

---

**Status:** Final
**Change control:** Any modification requires explicit versioning and approval
