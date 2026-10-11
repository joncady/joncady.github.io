# Portfolio publishing

The application source lives on `source`. The existing public site is served from generated files on `master` with legacy branch publishing.

The proposed `Portfolio checks and Pages` workflow runs lint and the complete TypeScript/Vite build for pull requests. PRs produce a downloadable `portfolio-preview` build and cannot deploy. After activation, pushes to `source` deploy only when those checks pass. Manual runs deploy only when run against `source`.

## Activation after approval

These steps change production publishing. Do them only when the reviewed source is approved to go live:

1. Merge approved source PRs, including this workflow, into `source`.
2. In repository Settings → Pages, change **Source** to **GitHub Actions**.
3. Confirm Settings → Environments → `github-pages` still permits the `source` branch (the audited policy already allows `master` and `source`). No branch-policy expansion is required.
4. Run `Portfolio checks and Pages` against `source` and verify its build and deployment jobs, then open https://joncady.github.io/.

The deployment job alone requests `pages: write` and `id-token: write`. Build and PR jobs use `contents: read`; checkout does not persist credentials. No personal access token or source-branch write access is needed.

Do not use the old `npm run deploy` command after activation: it updates `master` rather than using the reviewed workflow. `master` remains available as the legacy output until a separate cleanup is approved.

If activation is postponed, the existing `master` site continues serving. A source deployment job cannot complete until Pages and the environment permit Actions deployments from `source`.
