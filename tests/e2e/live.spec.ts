import { test, expect } from "@playwright/test";
// Optional real network smoke, separate from deterministic offline CI cases.
// Only local preview and read-only public site access; no deployment mutations.
test.skip(
    !process.env.LIVE_E2E,
    "Set LIVE_E2E=1 for the real basemap/public deployment smoke"
);
for (const width of [1440, 390]) {
    test(`live map paints completely at ${width}px`, async ({
        page
    }, testInfo) => {
        await page.setViewportSize({ width, height: 1000 });
        await page.goto("/#travel");
        const map = page.getByLabel("Interactive 3D travel map", {
            exact: true
        });
        await page
            .getByRole("checkbox", { name: "Reduce motion", exact: true })
            .check();
        await page.locator('[data-trip-index="9"]').click();
        await page.locator("#travel").scrollIntoViewIfNeeded();
        await expect(map).toHaveAttribute("data-map-ready", "true", {
            timeout: 20000
        });
        await expect(map).toHaveAttribute("data-map-idle", "true", {
            timeout: 20000
        });
        await expect(
            page.getByRole("status").filter({ hasText: "could not" })
        ).toHaveCount(0);
        await expect(page.locator(".back-to-top")).toHaveCount(0);
        expect(
            await page.evaluate(
                () => document.documentElement.scrollWidth <= innerWidth
            )
        ).toBe(true);
        await page.locator("#travel").screenshot({
            path: testInfo.outputPath(`live-travel-${width}.png`),
            animations: "disabled"
        });
    });
}
test("deployed portfolio serves Amazon refresh and transit project", async ({
    page
}) => {
    await page.goto("https://joncady.github.io/");
    await expect(
        page.getByRole("heading", { name: "Jonathan Cady", exact: true })
    ).toBeVisible();
    await expect(page.locator(".current-role")).toContainText(
        "Alexa Smart Home"
    );
    await expect(page.locator("#transit-heading")).toBeVisible();
});
