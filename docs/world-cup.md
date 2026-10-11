# World Cup visits — local review

The existing World Cup timeline entry now contains six confirmed attended matches. Game buttons select the corresponding city camera and original soccer/city sprite. The three Seattle games share a broad city anchor and use distinct sprites selected by visit ID, so they do not overlap as competing markers. Clicking the selected visit recenters the camera; returning to the World Cup trip preserves its selection.

| Visit | City | Date in 2026 | Sprite |
| --- | --- | --- | --- |
| Belgium–Egypt | Seattle | June 15 | Goalkeeper gloves with Space Needle |
| Japan–Sweden | Dallas | June 25 | Soccer cleat with cowboy boot |
| Panama–England | New Jersey | June 27 | Goal with stadium silhouette |
| Belgium–Senegal | Seattle | July 1 | Whistle with waterfront skyline |
| USA–Belgium | Seattle | July 6 | Soccer ball with Seattle ferry |
| Norway–England | Miami | July 11 | Corner flag with Art Deco tower and palm |

The owner explicitly confirmed USA–Belgium stadium attendance on July 6, superseding the earlier photo-only fan-event classification. No outcomes are inferred. City anchors are rounded public geographic areas. Private source photos, album links, precise GPS and photo metadata are excluded.

## Assets and review

The six originals are in `public/assets/travel-log/world-cup-v1`. Each is a distinct 1254 × 1254 RGBA PNG with a verified transparent corner. Original bytes and embedded provenance are preserved. `world-cup-asset-manifest.json` contains the final built-in imagegen prompts, style reference filename, dimensions, byte counts and SHA-256 hashes. The six assets total 4,540,962 bytes.

- [Labeled sprite sheet](review-evidence/world-cup-contact-sheet.png)
- [Desktop map preview](review-evidence/world-cup-desktop.png)
- [Mobile map preview](review-evidence/world-cup-mobile.png)

The first five sprites were approved and combined into draft PR #6. The sixth USA–Belgium sprite is included for review alongside the owner-confirmed attendance correction. No merge or deployment has been performed.

## Validation

`npm run check` passed lint, application/test TypeScript, production build and 60 browser cases across desktop Chromium, mobile Chromium and WebKit. Coverage includes every game-to-sprite/city mapping, same-city selection, recentering after zoom, keyboard activation, remembered selection, all six attended-match labels, missing game textures and the existing portfolio/timeline/fallback/responsive checks. Asset checks cover 31 unique retained/new PNGs and their manifest hashes.

```sh
ASSET_REVIEW=1 LIVE_E2E=1 npm run test:e2e -- tests/e2e/live.spec.ts tests/e2e/world-cup-live.spec.ts tests/e2e/review.spec.ts --project=desktop-chromium
```

Seven opt-in cases passed: real basemap rendering at two widths, deployed-site smoke, both contact sheets, and desktop/mobile World Cup scenes. A hover-contrast issue found during visual inspection was corrected and the two real-map World Cup previews recaptured. Physical touch, screen-reader use and handset GPU performance remain manual checks; existing build/dependency warnings remain.

[Map-pin click investigation](review-evidence/pin-click-investigation.md) records the observed CI retry and focused repeat evidence without hiding the miss.
