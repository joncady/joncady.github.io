import { test as base, expect, Page } from "@playwright/test";
// Exercise the real MapLibre + R3F rendering, but avoid flaky external tiles/fonts.
// A separate opt-in live smoke exercises the public basemap network.
export const test = base.extend({
    page: async ({ page }, use) => {
        await page.route("https://**/*", (route) => {
            if (route.request().url().includes("positron-gl-style/style.json"))
                return route.fulfill({
                    json: {
                        version: 8,
                        sources: {},
                        layers: [
                            {
                                id: "background",
                                type: "background",
                                paint: { "background-color": "#edf0f2" }
                            }
                        ]
                    }
                });
            return route.abort();
        });
        await use(page);
    }
});
export { expect };
export async function openTravel(page: Page) {
    await page.goto("/#travel");
    await page
        .getByRole("heading", { name: "Travel Log", exact: true })
        .scrollIntoViewIfNeeded();
    await expect(
        page.getByRole("region", { name: "Travel Log", exact: true })
    ).toBeVisible();
}
export const map = (page: Page) =>
    page.getByLabel("Interactive 3D travel map", { exact: true });
