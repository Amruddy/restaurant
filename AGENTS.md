# AGENTS.md

## Project

Restaurant website project. The goal is a polished, responsive website for a modern restaurant with menu, booking, events, contacts, and strong visual presentation.

## Working Rules

- Keep changes scoped to this `restaurant` folder.
- Prefer simple static HTML, CSS, and JavaScript unless the user asks for a framework.
- Use semantic HTML and accessible controls.
- Keep the first screen as the real usable restaurant page, not a marketing placeholder.
- Do not add dependencies unless they clearly improve the project.
- Use local assets from `assets/` for images and media.
- Keep file names lowercase and descriptive.
- Write user-facing copy in Russian by default.

## Design Direction

- The site should feel like a real restaurant: warm, refined, easy to scan.
- Avoid generic SaaS layouts, oversized empty cards, and purely decorative gradients.
- Use restrained typography, strong food imagery, clear reservation actions, and practical restaurant information.
- Ensure mobile layout is first-class.

## Suggested Structure

- `index.html` - main page markup.
- `styles.css` - site styles and responsive layout.
- `script.js` - lightweight interactions.
- `assets/` - images, icons, and other static media.
- `SPEC.md` - product direction and content requirements.
- `TASKS.md` - implementation checklist.

## Verification

Before finishing meaningful changes:

- Open or inspect `index.html` for broken paths.
- Check mobile breakpoints in CSS when layout changes.
- Keep JavaScript resilient if elements are missing.
- If adding dependencies later, document install and run commands in `README.md`.
