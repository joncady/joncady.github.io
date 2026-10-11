# Portfolio usability review

Captured from the local preview in native Chrome on the MacBookPro. These are page-only Chrome captures, with no browser chrome or private photo-library material.

- `tablet-experience.png`: narrower browser layout after opening docked DevTools; current role, collapsed earlier roles, and named project cards.
- `mobile-experience.png`: responsive viewport configured to 390 × 844 CSS pixels; image rendered at device scale.

Desktop interaction checks: earlier roles expand on click and collapse with Enter. Project details have an accessible dialog title and explicit close control. Escape closes the dialog and restores focus to the initiating project card; Enter reopens it.

Source checks: navigation toggle and collapse IDs match; filters have associated labels; icon-only contact and map controls have accessible names; skip link targets the main landmark. Removed scroll parallax/blur/zoom and spinning map icons. CSS disables smooth scroll, transitions, and animation for reduced-motion preference; map navigation no longer marks its flight essential.

Mobile layouts were visually inspected; full mobile touch and screen-reader testing has not been performed. The browser's extension-origin console error is unrelated to portfolio source. Existing bundle-size and lottie eval build warnings remain.

The screenshots predate the appended Alexa Smart Home description and the restoration of the complete original Amazon background in an expandable block. All original Amazon description text is preserved verbatim (whitespace normalized), with the supplied Smart Home work appended. The text update passed build and lint; a fresh browser capture was deferred because native Chrome was in active use for another activity.
