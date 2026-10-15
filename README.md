# Jonathan Cady — portfolio

React, TypeScript and Vite portfolio with a MapLibre/React Three Fiber Travel Log.

## Local review

```sh
npm ci
npm start -- --host 127.0.0.1
```

`npm run lint`, `npm run test:typecheck`, `npm run build`, and `npm run test:e2e` run the release checks. Install the browser dependencies with `npx playwright install --with-deps chromium webkit`. Use `--workers=1` for a lighter local browser run.

## Merge and deploy

Open a pull request into `source`. The **Portfolio checks and Pages** workflow validates lint, test types, the production build, and Chromium/mobile/WebKit browser tests. PRs upload a review build and never deploy.

After review and green checks, merge into `source`. Its push workflow repeats the checks and deploys `dist` to GitHub Pages. Confirm the deploy job succeeds, then review `https://joncady.github.io/` and the Projects and Travel Log sections. A workflow dispatch on `source` can redeploy the current source revision. Do not use the legacy `npm run deploy` command: it targets the historical `master` branch and bypasses this Pages workflow.

To roll back, revert the merged change on `source` through a reviewed PR and allow the same workflow to rebuild and deploy.

## Travel content

The site reads `travelData.ts`, `travelDetails.ts`, `travelPhotos.ts`, and `travelVideos.ts` in `src/sections`. Public media derivatives live in `public/assets/travel-photos` and `public/assets/travel-videos`. The private editor, browser drafts, original photos/videos, backups and uploaded ZIPs stay outside this checkout and must not be published.

The current import contains 11 trips, 103 metadata-stripped photos and seven H.264/AAC clips. HDR clips are converted to SDR BT.709; media URLs are versioned when color processing changes. `docs/travel-media-import.json` records derivative hashes and verification. External basemap tests and evidence-recording tests remain opt-in; deterministic browser tests stub external map resources.
