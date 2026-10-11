import { readFileSync } from "node:fs";
import { test, expect } from "@playwright/test";
test.skip(
    !process.env.ASSET_REVIEW,
    "Run with ASSET_REVIEW=1 to capture the labeled asset review"
);
test("labeled pixel asset contact sheet", async ({ page }, testInfo) => {
    await page.setViewportSize({ width: 1240, height: 1100 });
    await page.route("**/__asset-review", (route) =>
        route.fulfill({
            contentType: "text/html",
            body: readFileSync(
                "docs/review-evidence/travel-pixel-contact-sheet.html",
                "utf8"
            )
        })
    );
    await page.goto("/__asset-review");
    await expect(page.locator("img")).toHaveCount(25);
    await expect
        .poll(() =>
            page
                .locator("img")
                .evaluateAll((images) =>
                    images.every(
                        (image) =>
                            (image as HTMLImageElement).complete &&
                            (image as HTMLImageElement).naturalWidth > 0
                    )
                )
        )
        .toBe(true);
    await page.screenshot({
        path: testInfo.outputPath("pixel-contact-sheet.png"),
        fullPage: true
    });
});
