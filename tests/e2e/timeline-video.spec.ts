import { test, expect } from "@playwright/test";
test.skip(
    !process.env.INTERACTION_REVIEW,
    "Run with INTERACTION_REVIEW=1 to record timeline interactions"
);

test.use({ video: { mode: "on", size: { width: 1440, height: 1000 } } });
test("timeline interaction video with live map", async ({ page }, testInfo) => {
    test.setTimeout(90000);
    await page.goto("/#travel");
    const map = page.getByLabel("Interactive 3D travel map", { exact: true });
    await expect(map).toHaveAttribute("data-map-ready", "true", {
        timeout: 20000
    });
    await page.locator("#travel").scrollIntoViewIfNeeded();
    for (const [label, id] of [
        ["World Cup stadium trips · 2026", "world-cup-2026"],
        ["Japan · 2025", "japan-2025"],
        ["Chicago · 2024", "chicago-2024"],
        ["Japan / Korea · 2022", "japan-korea-2022"]
    ]) {
        await page.getByRole("button", { name: label, exact: true }).click();
        await expect(map).toHaveAttribute("data-selected-trip", id);
        await expect(map).toHaveAttribute("data-map-idle", "true", {
            timeout: 20000
        });
        await expect(
            page.locator(`[aria-current="true"][data-trip-index]`)
        ).toHaveAttribute("aria-label", label);
        if (id === "world-cup-2026") {
            for (const visit of [
                "dallas-japan-sweden-2026",
                "seattle-usa-belgium-2026"
            ]) {
                await page.locator(`[data-visit-id="${visit}"]`).click();
                await expect(map).toHaveAttribute("data-selected-visit", visit);
                await expect(map).toHaveAttribute("data-map-idle", "true", {
                    timeout: 20000
                });
            }
        }
    }
    await page
        .getByRole("button", { name: "Show newest trips first", exact: true })
        .click();
    await expect(map).toHaveAttribute("data-selected-trip", "japan-korea-2022");
    await page
        .getByRole("button", { name: "Next location or trip", exact: true })
        .click();
    await expect(map).toHaveAttribute("data-selected-trip", "uk-2023");
    await expect(map).toHaveAttribute("data-map-idle", "true", {
        timeout: 20000
    });
    await page
        .getByRole("button", { name: "Show oldest trips first", exact: true })
        .click();
    await expect(map).toHaveAttribute("data-selected-trip", "uk-2023");
    await page
        .getByRole("button", { name: "Hide summary", exact: true })
        .click();
    await expect(page.locator("#travel-summary")).toHaveCount(0);
    await page
        .getByRole("button", { name: "Show summary", exact: true })
        .click();
    await expect(page.locator("#travel-summary")).toBeVisible();
    await page.locator("#travel").screenshot({
        path: testInfo.outputPath("timeline-neutral-desktop.png"),
        animations: "disabled"
    });
});
