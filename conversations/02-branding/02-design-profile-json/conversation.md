# Design contract JSON output

<!--
Prompt: prompts/01-discovery/01-project-spec.md
Date: 2025-12-12
Model: GPT-5.2
-->

## Prompt:
<!-- 
Attached files:
- /docs/brand-style-direction.md
- /docs/information-architecture.md
-->

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

1. docs/brand-style-direction.md
   - normative brand and visual rules
2. docs/information-architecture.md (optional but recommended)
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

## Response:
Myślał przez 14s

```json
{
  "metadata": {
    "name": "luczak-personal-and-consulting-design-contract",
    "version": null,
    "description": "Authoritative visual and brand system for Łukasz Piotr Łuczak (personal brand) and Luczak Consulting (company brand) for a digital business card platform with light/dark modes and Tailwind CSS implementation.",
    "createdAt": "2025-12-12"
  },
  "color": {
    "tokens": {
      "brand-consulting-primary": {
        "value": "#FAD228",
        "intent": "Primary actions, active navigation, key highlights"
      },
      "brand-consulting-secondary": {
        "value": "#D28C0A",
        "intent": "Hover states, secondary emphasis"
      },
      "brand-personal-primary": {
        "value": "#CC1E1E",
        "intent": "Personal brand accents only"
      },
      "neutral-900": {
        "value": "#0B0B0C",
        "intent": "Dark backgrounds"
      },
      "neutral-50": {
        "value": "#FAFAFA",
        "intent": "Light backgrounds"
      },
      "gray-100": {
        "value": null,
        "intent": "Light surfaces"
      },
      "gray-800": {
        "value": null,
        "intent": "Dark surfaces"
      },
      "gray-500": {
        "value": null,
        "intent": "Secondary text"
      },
      "gray-300": {
        "value": null,
        "intent": "Dividers and outlines"
      },
      "surface-glass": {
        "light": "rgba(255,255,255,0.65)",
        "dark": "rgba(15,15,17,0.6)",
        "intent": "Glass card/surface backgrounds"
      }
    },
    "modes": {
      "light": {
        "background": "neutral-50",
        "surface": "gray-100",
        "surfaceGlass": "surface-glass.light",
        "textSecondary": "gray-500",
        "divider": "gray-300"
      },
      "dark": {
        "background": "neutral-900",
        "surface": "gray-800",
        "surfaceGlass": "surface-glass.dark",
        "textSecondary": "gray-500",
        "divider": "gray-300"
      }
    },
    "constraints": {
      "must": [
        "All colors must meet accessibility contrast requirements.",
        "Personal red must not be used for primary system actions.",
        "Consulting yellow must not be used in personal-only contexts.",
        "Personal red and consulting yellow must never appear together in the same primary action."
      ],
      "mustNot": [
        "Do not use personal red for primary system actions.",
        "Do not use consulting yellow in personal-only contexts.",
        "Do not combine personal red and consulting yellow in the same primary action."
      ]
    }
  },
  "typography": {
    "families": {
      "primary": "Inter",
      "accent": "Space Grotesk"
    },
    "sizes": {
      "base": {
        "px": 16
      }
    },
    "weights": {
      "headingsUltraBold": {
        "allowed": false
      }
    },
    "lineHeights": {
      "body": "leading-relaxed"
    },
    "rules": {
      "must": [
        "Inter must be used for all body text and UI controls.",
        "Base font size must be 16px (text-base).",
        "Line height must be relaxed (leading-relaxed)."
      ],
      "may": [
        "Space Grotesk may be used only for headlines and section titles."
      ],
      "mustNot": [
        "Decorative or display fonts must not be used.",
        "Headings must not use ultra-bold weights."
      ]
    }
  },
  "layout": {
    "spacingScale": [4, 8, 12, 16, 24, 32],
    "radiusScale": {
      "card": "rounded-2xl",
      "button": "rounded-xl",
      "chip": "rounded-full",
      "avatar": "rounded-full"
    },
    "shadows": {
      "light": "shadow-md shadow-black/5",
      "dark": "shadow-lg shadow-black/40",
      "rules": {
        "mustNot": ["Hard or sharp shadows must not be used."]
      }
    },
    "blur": {
      "glassBackdrop": "backdrop-blur-md",
      "rules": {
        "must": ["Blur must always be paired with a subtle border."]
      }
    },
    "rules": {
      "must": ["Only the system spacing scale is allowed."],
      "mustNot": ["Arbitrary spacing values must not be used."]
    }
  },
  "components": {
    "tabs": {
      "composition": {
        "mustInclude": ["icon", "label"]
      },
      "activeState": {
        "colorToken": "brand-consulting-primary",
        "indicator": {
          "underlineOnlyAllowed": false,
          "stateExpression": ["background", "contrast"]
        }
      },
      "rules": {
        "must": [
          "Tabs must contain icon + label.",
          "Active tab must use consulting primary color.",
          "State changes must be expressed via background and contrast."
        ],
        "mustNot": ["Underline-only indicators must not be used."]
      }
    },
    "buttons": {
      "radius": "rounded-xl",
      "primary": {
        "backgroundToken": "brand-consulting-primary",
        "textColorIntent": "dark-text"
      },
      "secondary": {
        "background": "transparent",
        "border": "visible"
      },
      "personalActions": {
        "accentToken": "brand-personal-primary",
        "scope": "personal-brand actions only"
      },
      "rules": {
        "must": [
          "Primary button must use consulting yellow background with dark text.",
          "Secondary button must use transparent background with a visible border."
        ],
        "mustNot": [
          "Personal red must not be used for primary system actions.",
          "Buttons must not rely on color alone for state indication."
        ]
      }
    },
    "cards": {
      "radius": "rounded-2xl",
      "surfaceToken": "surface-glass",
      "contentOrder": ["title", "content", "actions"],
      "rules": {
        "must": [
          "Cards must use glass surfaces.",
          "Content order must be: title → content → actions."
        ],
        "mustNot": ["Cards must not contain decorative gradients."]
      }
    },
    "forms": {
      "fields": null,
      "rules": {
        "must": [],
        "mustNot": []
      }
    },
    "avatar": {
      "shape": "circular",
      "image": {
        "mustBe": ["high-contrast"]
      },
      "ring": {
        "mayUseToken": "brand-personal-primary",
        "scope": "personal-brand contexts only"
      },
      "shadows": {
        "allowed": false
      },
      "rules": {
        "must": ["Shape must be circular.", "Image must be high-contrast."],
        "may": ["A personal red ring may be used only for personal-brand contexts."],
        "mustNot": ["No decorative frames or shadows."]
      }
    }
  },
  "accessibility": {
    "standards": {
      "wcag": "2.1",
      "level": "AA"
    },
    "contrast": {
      "mustComply": true,
      "notes": [
        "Text must not be placed directly on glass without sufficient contrast."
      ]
    },
    "focus": {
      "must": [
        "Focus states must be clearly visible and consistent.",
        "Visible focus indicators on all interactive elements."
      ]
    },
    "nonColorSignaling": {
      "must": [
        "Interactive states must not rely solely on color.",
        "Buttons must not rely on color alone for state indication."
      ]
    },
    "keyboard": {
      "mustSupport": true,
      "tabUI": {
        "roles": {
          "tablist": "role=\"tablist\"",
          "tab": "role=\"tab\"",
          "tabpanel": "role=\"tabpanel\""
        },
        "keyboardControls": [
          "Left/Right arrows switch tabs",
          "Home/End jump to first/last tab"
        ],
        "activeTabIndication": "Active tab is programmatically indicated"
      }
    }
  }
}
```

### Validation notes (confirmed vs missing)

*   **Confirmed by input**
    *   Color tokens, glass surface RGBA values, and cross-token constraints are defined.
        brand-style-direction
    *   Typography families, base size (16px), relaxed line-height, and headline weight constraint are defined.
        brand-style-direction
    *   Spacing scale, radius classes, shadow classes, blur requirement, and component rules for tabs/buttons/cards/avatar are defined.
        brand-style-direction
    *   Tabs exist in IA and have explicit ARIA + keyboard requirements (included under accessibility).
        information-architecture
*   **Missing / ambiguous (requires clarification, not guessed)**
    *   **`metadata.version`**: no versioning scheme/value provided (left as `null`).
        brand-style-direction
    *   **Exact hex/RGB values** for `gray-100`, `gray-800`, `gray-500`, `gray-300` are not provided (left as `null`).
        brand-style-direction
    *   **Typography scale** beyond base size (additional font sizes), **explicit font weights**, and **explicit line-height values** beyond `leading-relaxed` are not provided.
        brand-style-direction
    *   **Form component visual tokens** (borders, inputs, labels, validation states) are not defined in the brand rules (kept empty/`null`).
    *   **Mode-specific semantic tokens** for text (primary), borders, and focus ring colors are not explicitly defined as tokens (only general contrast/focus rules exist).
        brand-style-direction



---
Powered by [ChatGPT Exporter](https://www.chatgptexporter.com)