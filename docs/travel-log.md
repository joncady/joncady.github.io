# Travel Log

The portfolio's existing MapLibre / React Three Fiber map now includes 17 selectable entries and 25 original pixel sprites. Approved newer entries cover Alaska, World Cup stadium trips, a coast-to-coast train trip, Catalina and the return journey, Japan, Roche Harbor, Singapore/Taiwan, and the United Kingdom. Entries use confirmed years and broad regions; no private photos, precise travel dates, album URLs, commute configuration, or route traces are published.

Selecting a trip synchronizes its camera, year, regions, and summary. Previous/Next wrap through the log. Clicking a 3D sprite selects its trip; summary location controls move the camera to that location. Desktop summaries sit beside the map, and mobile summaries sit below it. Keyboard and system/manual reduced-motion controls remain available; missing textures or unavailable map/WebGL resources retain trip controls and summaries.

The floating items are geographically anchored PNG planes, with gentle motion and nearest texture filtering. Selected/visible locations load textures; the rest use lightweight pins until they enter the view. The scene remains a 3D map rather than a spherical globe.

## Assets and review evidence

All 25 PNGs in `public/assets/travel-log/pixel-v1` have unique filenames and SHA-256 hashes. They were generated with built-in imagegen after subject approval, then visually approved in the labeled sheet and desktop/mobile views. `travel-pixel-asset-manifest.json` records the final prompts, dimensions, source method, bytes, and hashes. Each PNG is 1254 × 1254 RGBA with transparent corners.

- [Approved sprite sheet](review-evidence/travel-pixel-contact-sheet.png)
- [Desktop production preview](review-evidence/travel-pixel-desktop.png)
- [Mobile production preview](review-evidence/travel-pixel-mobile.png)

The sheet and screenshots preserve the approved review state; local-draft wording shown in that evidence is removed from the prepared public UI.

### Bounded compression assessment

Before: 23,702,481 bytes (22.60 MiB). After: 23,702,481 bytes. No files were recompressed or visually altered, and all existing whole-file hashes remain unchanged.

All PNGs carry `caBX` provenance chunks and `c2pa.hash.data` assertions. PNG recompression can change the serialized bytes protected by those assertions even with identical pixels. The available system tools do not provide a provenance-aware optimization/re-signing workflow, so original files and credentials were retained. C2PA describes byte-range hard bindings and marks the embedded PNG manifest chunk unsafe to copy after modification. [C2PA specification](https://spec.c2pa.org/specifications/specifications/2.2/specs/C2PA_Specification.html#_data_hash)

This does not block asset review or publication. A later optimization must preserve verified provenance as well as decoded RGBA equivalence; downsampling would require its own visual review.

## Validation

Run `npm ci`, then `npm run check`. Install the pinned Playwright browsers once with `npx playwright install chromium webkit` (CI adds `--with-deps`).

`npm run check` runs lint, test TypeScript checking, the TypeScript/Vite production build, and production-preview E2E tests. The deterministic suite comprises 48 cases across desktop Chromium, mobile Chromium, and desktop WebKit. It intentionally fulfills the external map style with a local blank-background fixture to isolate UI/rendering behavior from third-party availability.

Coverage includes anchor navigation and deep links, mobile menu collapse, skip-link focus, every project modal/destination, project filter/reset, complete preserved Amazon text and additions, all 17 camera/selector/summary combinations, next/previous wraparound, summary focus, system/manual reduced motion, responsive placement/control size/overlap, loading and missing resources, WebGL fallback, PNG uniqueness/hashes/budgets, and selective loading. A real canvas hit on an unselected Midwest sprite changes the trip, camera, and summary in all three browser projects. The test derives coordinates through MapLibre's documented custom-layer projection matrix.

Real basemap and deployed-site smoke are opt-in:

```sh
LIVE_E2E=1 npm run test:e2e -- tests/e2e/live.spec.ts --project=desktop-chromium
```

This separately exercises real basemap painting at 1440px and 390px and checks the deployed portfolio's Amazon/transit updates. Those three cases passed after pixel integration. `ASSET_REVIEW=1` enables the labeled review-sheet capture.

The GitHub workflow runs deterministic tests before uploading the preview/Pages artifact; deployment still requires the source-branch check job. PRs cannot deploy. Reports, traces, and screenshots are retained as integration evidence.

## Limits

Physical-touch hardware, screen-reader interaction, and handset GPU/frame-rate/texture-memory benchmarking remain manual checks. Resource budgets are regression limits rather than performance benchmark claims. Existing Vite/lottie/bundle warnings and legacy dependency audit findings remain. No coverage percentage or accessibility conformance certification is claimed.
