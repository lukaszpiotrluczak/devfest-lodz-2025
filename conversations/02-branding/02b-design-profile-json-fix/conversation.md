<!--
Prompt: prompts/01-discovery/01-project-spec.md
Date: 2025-12-12
Model: GPT-5.2
-->

# Design profile hardening

## Prompt:
<!-- 
Attached files:
- /docs/brand-style-direction.md
- /docs/information-architecture.md
- /docs/design-profile.json
-->

# Role
You are a design systems engineer performing a strict “contract hardening” pass.

# Goal
Produce a corrected, **fully explicit** design-profile.json that is safe to use as a source of truth for Tailwind theming.

This is NOT a creative task. Do not invent new design direction.

# Inputs
I will paste:
1) The current docs/design-profile.json (contains nulls and missing version)
2) docs/brand-style-direction.md (normative rules)
3) docs/information-architecture.md (component scope)

# Hardening Rules (must follow)
- Do NOT change the overall structure unless necessary for validity/clarity
- Do NOT introduce new colors, fonts, or components beyond what is already implied by the inputs
- The output JSON must contain **no null values**
- If a value is genuinely not defined in inputs, replace it with the literal string "UNDEFINED" and record it in openDecisions
- Set metadata.version to "1.0.0" unless an existing version is provided
- Keep semantic tokens; do not rename existing tokens unless required to fix inconsistencies
- Ensure all intra-JSON references are consistent (e.g., modes referencing tokens that exist)

# Specific Fix Requirements
1) Replace all null token values (e.g., grays and form fields) following the rules above.
2) Ensure color.modes.light and color.modes.dark reference valid tokens/paths.
3) Ensure components.forms is not underspecified:
   - If form field styling is not defined in inputs, mark it as "UNDEFINED" and list it in openDecisions.
4) Add top-level openDecisions: [] (array of strings) and populate it with any unresolved items you had to mark as "UNDEFINED".
5) Keep the output strictly valid JSON (no comments, no trailing commas).

# Expected Output
Return **only**:
1) The final corrected JSON (single code block, valid JSON)
2) A short bullet list (max 8 bullets) titled Changes made, summarizing what was fixed.

## Response:
Myślał przez 10s

```json
{
  "metadata": {
    "name": "luczak-personal-and-consulting-design-contract",
    "version": "1.0.0",
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
        "value": "UNDEFINED",
        "intent": "Light surfaces"
      },
      "gray-800": {
        "value": "UNDEFINED",
        "intent": "Dark surfaces"
      },
      "gray-500": {
        "value": "UNDEFINED",
        "intent": "Secondary text"
      },
      "gray-300": {
        "value": "UNDEFINED",
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
      "fields": "UNDEFINED",
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
        "may": [
          "A personal red ring may be used only for personal-brand contexts."
        ],
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
  },
  "openDecisions": [
    "Define color.tokens.gray-100.value (light surfaces).",
    "Define color.tokens.gray-800.value (dark surfaces).",
    "Define color.tokens.gray-500.value (secondary text).",
    "Define color.tokens.gray-300.value (dividers and outlines).",
    "Define components.forms.fields (form field styling contract)."
  ]
}
```

### Changes made

*   Set `metadata.version` to `"1.0.0"` and removed the previous `null`.
    design-profile
*   Replaced all `null` color token values (`gray-100`, `gray-800`, `gray-500`, `gray-300`) with `"UNDEFINED"`.
*   Ensured `color.modes.light` and `color.modes.dark` continue referencing existing token keys/paths (no broken references introduced).
    design-profile
*   Replaced `components.forms.fields: null` with `"UNDEFINED"` and flagged it as an open decision.
*   Added top-level `openDecisions: []` and populated it with every `"UNDEFINED"` replacement.
    design-profile



---
Powered by [ChatGPT Exporter](https://www.chatgptexporter.com)