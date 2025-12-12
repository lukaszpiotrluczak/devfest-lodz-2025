# Role
You are a design systems engineer performing a strict “contract hardening” pass.

# Goal
Produce a corrected, **fully explicit** `design-profile.json` that is safe to use as a source of truth for Tailwind theming.

This is NOT a creative task. Do not invent new design direction.

# Inputs
I will paste:
1) The current `docs/design-profile.json` (contains nulls and missing version)
2) `docs/brand-style-direction.md` (normative rules)
3) `docs/information-architecture.md` (component scope)

# Hardening Rules (must follow)
- Do NOT change the overall structure unless necessary for validity/clarity
- Do NOT introduce new colors, fonts, or components beyond what is already implied by the inputs
- The output JSON must contain **no `null` values**
- If a value is genuinely not defined in inputs, replace it with the literal string `"UNDEFINED"` and record it in `openDecisions`
- Set `metadata.version` to `"1.0.0"` unless an existing version is provided
- Keep semantic tokens; do not rename existing tokens unless required to fix inconsistencies
- Ensure all intra-JSON references are consistent (e.g., modes referencing tokens that exist)

# Specific Fix Requirements
1) Replace all `null` token values (e.g., grays and form fields) following the rules above.
2) Ensure `color.modes.light` and `color.modes.dark` reference valid tokens/paths.
3) Ensure `components.forms` is not underspecified:
   - If form field styling is not defined in inputs, mark it as `"UNDEFINED"` and list it in `openDecisions`.
4) Add top-level `openDecisions: []` (array of strings) and populate it with any unresolved items you had to mark as `"UNDEFINED"`.
5) Keep the output strictly valid JSON (no comments, no trailing commas).

# Expected Output
Return **only**:
1) The final corrected JSON (single code block, valid JSON)
2) A short bullet list (max 8 bullets) titled `Changes made`, summarizing what was fixed.
