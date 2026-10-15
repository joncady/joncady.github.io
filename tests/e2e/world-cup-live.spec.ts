import { test, expect } from "@playwright/test";
test.skip(
    !process.env.LIVE_E2E,
    "Run with LIVE_E2E=1 for real World Cup basemap previews"
);
for (const [width, visit] of [
    [1440, "seattle-usa-belgium-2026"],
    [390, "miami-norway-england-2026"]
] as const) {
    test(`World Cup real map and selected game at ${width}px`, async ({
        page
    }, testInfo) => {
        await page.setViewportSize({ width, height: 1000 });
        await page.goto("/#travel");
        await page
            .getByRole("checkbox", { name: "Reduce motion", exact: true })
            .check();
        await page
            .getByRole("button", {
                name: "World Cup stadium trips · 2026",
                exact: true
            })
            .click();
        await page.locator(`[data-visit-id="${visit}"]`).click();
        const map = page.getByLabel("Interactive 3D travel map", {
            exact: true
        });
        await expect(map).toHaveAttribute("data-selected-visit", visit);
        await expect(map).toHaveAttribute("data-map-ready", "true", {
            timeout: 20000
        });
        await expect(map).toHaveAttribute("data-map-idle", "true", {
            timeout: 20000
        });
        await expect(
            page.getByRole("status").filter({ hasText: "could not" })
        ).toHaveCount(0);
        expect(
            await page.evaluate(
                () => document.documentElement.scrollWidth <= innerWidth
            )
        ).toBe(true);
        await page.locator("#travel").screenshot({
            path: testInfo.outputPath(`world-cup-live-${width}.png`),
            animations: "disabled"
        });
    });
}
