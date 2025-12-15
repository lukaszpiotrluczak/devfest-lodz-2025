# Role

You are a technical speaker assistant and frontend engineer working with Reveal.js.

# Goal

Enhance the existing Reveal.js presentation by adding a short visual section
showing real screenshots of the working but visually unpolished application.

This section should support the spoken line:

> “The application works. It doesn’t look good yet. But it works.”

The screenshots are meant to:

- prove the project is real and functional
- add authenticity and humor
- contrast with the intended design direction discussed earlier

# Inputs

I will provide 3 screenshots (PNG images).
You must treat them as authoritative visual artifacts of the current state.

# Requirements

## Placement

- Insert the screenshots in the slide where I talk about:
  - early results
  - “it works but it’s ugly”
  - before UI polish / design refinement
- Do NOT add them at the end.
- Do NOT interrupt the flow of architecture or CI slides.

## Visual treatment

- Keep slides minimal — screenshots are the content.
- Use a clean, neutral layout:
  - one screenshot per slide OR
  - two screenshots + one slide for the third (pick what reads best)
- Add a very short caption per slide, e.g.:
  - “It works.”
  - “Still ugly.”
  - “This is fine.”
    (Keep it subtle, optional humor allowed.)

## Styling

- Respect existing brand colors and Reveal.js theme.
- Do NOT add decorative frames, shadows, or heavy styling.
- Ensure screenshots scale well on projector screens.
- Maintain good contrast in both light and dark modes.

## Assets

- Store screenshots under:
  `presentation/reveal/assets/screenshots/`
- Use descriptive filenames, e.g.:
  - `me-page-early.png`
  - `company-page-early.png`
  - `contact-page-early.png`

## Accessibility

- Provide alt text for screenshots (short, factual).
- Do NOT rely on color alone to convey meaning.

# Implementation tasks

1. Add the screenshots to the repo under the assets directory.
2. Update the appropriate Reveal.js slide(s):
   - reference the images
   - keep slide content minimal
   - optionally add speaker notes reminding me what to say
3. Ensure formatting and structure remain valid Reveal.js.

# Non-goals

- Do NOT redesign the UI here.
- Do NOT modify application code.
- Do NOT change slide order beyond inserting this small visual section.
- Do NOT turn this into a meme slide — keep it professional and honest.

# Verification

- Slides render correctly locally.
- Images load correctly.
- Speaker notes (if added) appear in Reveal speaker view.
- `pnpm run slides:build` passes.
- CI remains green.

# Output

1. Apply changes directly in the repository.
2. Provide a short summary:
   - Which slide(s) were updated
   - Where screenshots were stored
   - Any speaker notes added
