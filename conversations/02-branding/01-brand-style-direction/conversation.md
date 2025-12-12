<!--
Prompt: prompts/01-discovery/01-project-spec.md
Date: 2025-12-12
Model: GPT-5.2
-->

# Digital business card design

## Prompt:

<!--
Attached files:
- Łukasz Piotr Łuczak avatar [png]
- Luczak Consulting logo [png,svg]
- Luczak Consulting brand mark [png,svg]
-->

# Role

You are a brand designer and UI art director for modern tech products.

# Goal

Propose a cohesive visual and brand direction for a digital business card.

# Context

The platform represents:

- Łukasz Piotr Łuczak (personal brand)
- Luczak Consulting (company)

Seed brand colors (inspiration, not constraints):

- Luczak Consulting: #FAD228, #D28C0A
- Personal brand: #CC1E1E
- PremiMade: #352CFF, #9B0DFF

Style hints:

- neo-tech
- glassmorphism
- minimal

Must support:

- light & dark mode
- accessibility
- Tailwind CSS implementation

# Inputs

I will attach:

- Personal photo
- Company logo and sygnet

# Expected Output (Markdown)

1. Overall design direction (tone, mood)
2. Color palette with semantic roles
3. Typography recommendations
4. UI primitives (radius, shadows, blur, spacing)
5. Component styling notes
6. Accessibility considerations

## Response:

<!--
Response contained 4 images - not needed for conversation.
-->

# Digital Business Card — Visual & Brand Direction

## 1\. Overall design direction

**Tone & mood**

- **Confident, precise, modern**
- Balance between **personal authority** and **consulting credibility**
- Calm, engineered aesthetics with subtle visual sophistication

**Style keywords**

- Neo-tech
- Minimal
- Glassmorphism (restrained, functional)
- Editorial clarity

**Brand relationship**

- **Personal brand** → expressive, human, signal color accents
- **Luczak Consulting** → structured, stable, system-oriented
- Both coexist in one system without visual conflict

---

## 2\. Color palette (semantic-first)

### Core colors

| Role                         | Color     | Usage                                               |
| ---------------------------- | --------- | --------------------------------------------------- |
| `brand-consulting-primary`   | `#FAD228` | Highlights, CTAs, active tabs                       |
| `brand-consulting-secondary` | `#D28C0A` | Hover states, borders, emphasis                     |
| `brand-personal-primary`     | `#CC1E1E` | Personal accents, avatar ring, key identity moments |
| `brand-neutral-900`          | `#0B0B0C` | Dark backgrounds                                    |
| `brand-neutral-50`           | `#FAFAFA` | Light backgrounds                                   |

### Supporting neutrals

- `gray-100` – surfaces (light)
- `gray-800` – surfaces (dark)
- `gray-500` – secondary text
- `gray-300` – dividers / outlines

### Glass layers

- Light: `rgba(255,255,255,0.65)`
- Dark: `rgba(15,15,17,0.6)`

> **Rule:** never mix personal red and consulting yellow in the same primary action.

---

## 3\. Typography

### Primary UI font

**Inter**

- Excellent readability
- Neutral, professional
- Tailwind-native support

### Accent / brand font (optional)

**Space Grotesk**

- Headlines
- Section titles
- Tab labels (desktop)

### Typographic rules

- Base size: `text-base` (16px)
- Line-height: relaxed (`leading-relaxed`)
- Headlines: medium weight, never ultra-bold
- No decorative fonts

---

## 4\. UI primitives

### Radius

- Cards: `rounded-2xl`
- Buttons: `rounded-xl`
- Chips/tags: `rounded-full`

### Shadows

- Light mode: `shadow-md shadow-black/5`
- Dark mode: `shadow-lg shadow-black/40`
- No hard drop shadows

### Blur / glass

- `backdrop-blur-md`
- Combined with subtle border: `border border-white/10`

### Spacing

- System spacing scale only (`4 / 8 / 12 / 16 / 24 / 32`)
- Avoid arbitrary values

---

## 5\. Component styling notes

### Avatar

- Circular crop
- Optional **personal red ring**
- High contrast black & white photo preferred

### Tabs

- Icon + label
- Active state uses **consulting yellow**
- No underline animations; use background + blur

### Cards

- Glass surface
- Strong vertical rhythm
- Title → content → action

### Buttons

- Primary: consulting yellow, dark text
- Secondary: transparent + border
- Personal actions may use red sparingly

---

## 6\. Accessibility considerations

- Minimum contrast ratio **WCAG AA**
- No text on pure glass without solid backing
- Focus states always visible
- Dark mode is **first-class**, not inverted light mode
- Color is never the only signal (icons, weight, structure)

---

### Summary

This system creates a **calm, authoritative digital presence** that scales from a personal card to a consulting platform. It is modern without being trendy, expressive without being loud, and engineered for long-term consistency.

---

Powered by [ChatGPT Exporter](https://www.chatgptexporter.com)
