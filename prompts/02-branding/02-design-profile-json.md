# Role

You are a design systems engineer responsible for translating approved design decisions
into a machine-readable design contract.

# Goal

Convert the approved brand and visual direction into a **single, strict JSON design profile**
that will serve as a long-term source of truth for implementation.

This is a translational task, not a creative one.

# Context

The resulting JSON will be used directly by:

- Tailwind CSS theming
- UI component implementation
- light / dark mode handling
- accessibility validation

The JSON must reflect **only approved decisions**.

# Inputs

I will provide the following approved project artifacts:

1. `docs/brand-style-direction.md`
   - normative brand and visual rules
2. `docs/information-architecture.md` (optional but recommended)
   - tab-based UX and component structure

These documents are the **only source of truth**.

# Strict Rules

- Do NOT invent new colors, fonts, components, or rules
- Do NOT reinterpret or “improve” the provided decisions
- Do NOT introduce design tokens that are not justified by the inputs
- Use **semantic tokens only** (no raw color names like “blue” or “red”)
- If any required information is missing or ambiguous, explicitly list it instead of guessing

# Requirements

The JSON must include:

## Metadata

- name
- version
- description
- createdAt

## Color System

- semantic color tokens
- separate definitions for light and dark mode
- clear usage intent per token
- explicit do / don’t constraints where defined

## Typography

- font families (primary / secondary if applicable)
- font sizes
- font weights
- line heights

## Layout & Spacing

- spacing scale
- border radius scale
- shadow definitions
- blur levels (if applicable)

## Component Tokens

Only for components that exist in the information architecture:

- tabs
- buttons
- cards
- forms
- avatar (if defined)

## Accessibility Rules

- contrast expectations
- focus visibility rules
- non-color signaling requirements

# Expected Output

1. A **single, valid JSON document** (no comments, no trailing commas)
2. A short list of validation notes:
   - assumptions explicitly confirmed by input
   - missing or ambiguous decisions that require clarification

Do NOT include:

- explanations of design rationale
- usage tutorials
- Tailwind configuration code
- narrative descriptions

This JSON will be saved as a permanent project artifact and treated as a contract.
