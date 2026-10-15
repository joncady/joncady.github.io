import { test, expect, openTravel, map } from "./fixtures";
import { TRAVEL_STOPS } from "../../src/sections/travelData";

test("all trips synchronize selector, summary, regions, actual camera", async ({
    page
}) => {
    await openTravel(page);
    await page
        .getByRole("checkbox", { name: "Reduce motion", exact: true })
        .check();
    await expect(map(page)).toHaveAttribute("data-map-ready", "true");
    for (const [index, stop] of TRAVEL_STOPS.entries()) {
        await page.locator(`[data-trip-index="${String(index)}"]`).click();
        await expect(page.locator("#travel-summary-heading")).toHaveText(
            stop.title
        );
        await expect(map(page)).toHaveAttribute("data-selected-trip", stop.id);
        const marker = stop.visits?.[0]
            ? stop.markers.find(
                  (item) => item.name === stop.visits![0].markerName
              )!
            : stop.markers[0];
        await expect
            .poll(async () =>
                Number(await map(page).getAttribute("data-camera-longitude"))
            )
            .toBeCloseTo(marker?.longitude ?? stop.center[0], 3);
        await expect
            .poll(async () =>
                Number(await map(page).getAttribute("data-camera-latitude"))
            )
            .toBeCloseTo(marker?.latitude ?? stop.center[1], 3);
        for (const region of stop.regions)
            await expect(
                page.locator("#travel-summary li").filter({ hasText: region })
            ).toBeVisible();
    }
});

test("keyboard next/previous wrap; Escape closes, restores focus and Enter reopens", async ({
    page
}) => {
    await openTravel(page);
    await page
        .locator('[aria-current="true"][data-trip-index]')
        .press("ArrowRight");
    await expect(
        page.locator(
            `[data-trip-index="${String(TRAVEL_STOPS.findIndex((stop) => stop.id === "japan-korea-2022"))}"]`
        )
    ).toHaveAttribute("aria-current", "true");
    await page
        .locator('[aria-current="true"][data-trip-index]')
        .press("ArrowLeft");
    await expect(page.locator('[data-trip-index="0"]')).toHaveAttribute(
        "aria-current",
        "true"
    );
    await page
        .getByRole("button", { name: "Close trip summary", exact: true })
        .press("Escape");
    const toggle = page.getByRole("button", {
        name: "Show summary",
        exact: true
    });
    await expect(toggle).toBeFocused();
    await expect(toggle).toHaveAttribute("aria-expanded", "false");
    await toggle.press("Enter");
    await expect(page.locator("#travel-summary")).toBeVisible();
});

test("location controls move the actual camera without changing selected trip", async ({
    page
}) => {
    await openTravel(page);
    await page.locator('[data-trip-index="1"]').click();
    await expect(map(page)).toHaveAttribute("data-map-ready", "true");
    await page.getByRole("button", { name: "View Miami", exact: true }).click();
    await expect
        .poll(async () =>
            Number(await map(page).getAttribute("data-camera-longitude"))
        )
        .toBeCloseTo(-80.2, 3);
    await expect
        .poll(async () =>
            Number(await map(page).getAttribute("data-camera-latitude"))
        )
        .toBeCloseTo(25.8, 3);
    await expect(page.locator("#travel-summary-heading")).toHaveText(
        "World Cup stadium trips"
    );
});

test("system reduced motion is honored and manual motion preference toggles", async ({
    page
}) => {
    await page.emulateMedia({ reducedMotion: "reduce" });
    await openTravel(page);
    const system = page.getByRole("checkbox", {
        name: "Reduce motion (system preference)",
        exact: true
    });
    await expect(system).toBeChecked();
    await expect(system).toBeDisabled();
    await expect(map(page)).toHaveAttribute("data-reduced-motion", "true");
    await page.emulateMedia({ reducedMotion: "no-preference" });
    const manual = page.getByRole("checkbox", {
        name: "Reduce motion",
        exact: true
    });
    await expect(manual).toBeEnabled();
    await manual.check();
    await expect(map(page)).toHaveAttribute("data-reduced-motion", "true");
    await manual.uncheck();
    await expect(map(page)).toHaveAttribute("data-reduced-motion", "false");
});

test("responsive map, summary, controls and back-to-top do not overlap", async ({
    page
}, testInfo) => {
    await openTravel(page);
    await expect(map(page)).toHaveAttribute("data-map-ready", "true");
    await page
        .getByRole("checkbox", { name: "Reduce motion", exact: true })
        .check();
    await page.locator('[data-trip-index="9"]').click();
    await expect(page.locator(".back-to-top")).toHaveCount(0);
    expect(
        await page.evaluate(
            () => document.documentElement.scrollWidth <= innerWidth
        )
    ).toBe(true);
    const stage = await page.locator(".travel-map").boundingBox();
    const summary = await page.locator("#travel-summary").boundingBox();
    expect(stage).not.toBeNull();
    expect(summary).not.toBeNull();
    if (page.viewportSize()!.width <= 700)
        expect(summary!.y).toBeGreaterThanOrEqual(stage!.y + stage!.height - 1);
    else {
        expect(stage!.width).toBeCloseTo(page.viewportSize()!.width, 0);
        expect(summary!.x).toBeGreaterThan(stage!.x + stage!.width / 2);
        expect(summary!.x + summary!.width).toBeLessThanOrEqual(
            stage!.x + stage!.width
        );
    }
    for (const name of [
        "Previous location or trip",
        "Next location or trip",
        "Close trip summary"
    ]) {
        const rect = await page
            .getByRole("button", { name, exact: true })
            .boundingBox();
        expect(rect!.height).toBeGreaterThanOrEqual(44);
    }
    await page.locator("#travel").screenshot({
        path: testInfo.outputPath("travel-layout.png"),
        animations: "disabled"
    });
});

test("blocked map resources retain trip controls and a visible error status", async ({
    page
}) => {
    await page.route("**/voyager-gl-style/style.json", (route) =>
        route.abort()
    );
    await openTravel(page);
    await expect(
        page
            .getByRole("status")
            .filter({ hasText: "Some map resources could not load" })
    ).toBeVisible();
    await page
        .locator('[aria-current="true"][data-trip-index]')
        .press("ArrowLeft");
    await expect(page.locator("#travel-summary-heading")).toHaveText(
        "World Cup stadium trips"
    );
});

test("WebGL unavailable retains the portfolio, summaries and navigation", async ({
    page
}) => {
    await page.addInitScript(() => {
        const original = HTMLCanvasElement.prototype.getContext;
        HTMLCanvasElement.prototype.getContext = function (
            this: HTMLCanvasElement,
            type,
            ...args
        ) {
            if (String(type).startsWith("webgl")) return null;
            return original.call(this, type, ...args);
        } as typeof original;
    });
    await openTravel(page);
    await expect(
        page
            .getByRole("status")
            .filter({ hasText: "Your browser cannot display the 3D map" })
    ).toBeVisible();
    await page
        .locator('[aria-current="true"][data-trip-index]')
        .press("ArrowLeft");
    await expect(page.locator("#travel-summary-heading")).toHaveText(
        "World Cup stadium trips"
    );
    await expect(
        page.getByRole("heading", { name: "My experience" })
    ).toBeVisible();
});

test("missing floating textures fall back without losing the portfolio", async ({
    page
}) => {
    let missingRequests = 0;
    await page.route("**/assets/travel-log/pixel-v1/*.png", (route) => {
        missingRequests += 1;
        return route.fulfill({ status: 404, body: "missing fixture" });
    });
    await openTravel(page);
    await page.locator('[data-trip-index="4"]').click();
    await expect(map(page)).toHaveAttribute("data-map-ready", "true");
    await expect(page.locator("#travel-summary-heading")).toHaveText("Japan");
    await expect(page.locator("#travel canvas")).toHaveCount(1);
    await expect.poll(() => missingRequests).toBeGreaterThan(0);
    await page
        .locator('[aria-current="true"][data-trip-index]')
        .press("ArrowLeft");
    await expect(page.locator("#travel-summary-heading")).toHaveText(
        "Roche Harbor"
    );
});

test("loading state stays usable until the map resources arrive", async ({
    page
}) => {
    let release!: () => void;
    const ready = new Promise<void>((resolve) => {
        release = resolve;
    });
    await page.route("**/voyager-gl-style/style.json", async (route) => {
        await ready;
        await route.fulfill({
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
    });
    await page.goto("/#travel", { waitUntil: "domcontentloaded" });
    try {
        await expect(
            page.getByRole("status").filter({ hasText: "Loading the 3D map" })
        ).toBeVisible();
        await page
            .locator('[aria-current="true"][data-trip-index]')
            .press("ArrowLeft");
        await expect(page.locator("#travel-summary-heading")).toHaveText(
            "World Cup stadium trips"
        );
    } finally {
        release();
    }
    await expect(map(page)).toHaveAttribute("data-map-ready", "true");
    await expect(
        page.getByRole("status").filter({ hasText: "Loading the 3D map" })
    ).toHaveCount(0);
});

test("map gestures stay locked while region controls move the camera", async ({
    page
}) => {
    await openTravel(page);
    await page
        .getByRole("checkbox", { name: "Reduce motion", exact: true })
        .check();
    await page.locator('[data-trip-index="2"]').click();
    await expect(map(page)).toHaveAttribute("data-map-ready", "true");
    await expect(map(page)).toHaveAttribute("data-map-idle", "true");
    await map(page).scrollIntoViewIfNeeded();
    const before = await map(page).getAttribute("data-camera-longitude");
    const box = (await map(page).boundingBox())!;
    await page.mouse.move(box.x + box.width / 2, box.y + box.height / 3);
    await page.mouse.down();
    await page.mouse.move(
        box.x + box.width / 2 + 80,
        box.y + box.height / 3 + 40,
        { steps: 5 }
    );
    await page.mouse.up();
    await expect(map(page)).toHaveAttribute("data-camera-longitude", before!);
    await page
        .getByRole("button", { name: "Next location or trip", exact: true })
        .click();
    await expect
        .poll(async () =>
            Number(await map(page).getAttribute("data-camera-longitude"))
        )
        .toBeCloseTo(-88, 3);
    await expect(map(page)).toHaveAttribute("data-selected-trip", "train-2026");
    await page
        .getByRole("button", { name: "Previous location or trip", exact: true })
        .click();
    await expect
        .poll(async () =>
            Number(await map(page).getAttribute("data-camera-longitude"))
        )
        .toBeCloseTo(-122, 3);
});

test("timeline combines all years, scrolls horizontally and supports arrow/Home/End selection", async ({
    page
}) => {
    await openTravel(page);
    await page
        .getByRole("checkbox", { name: "Reduce motion", exact: true })
        .check();
    const timeline = page.getByRole("navigation", { name: "Trip timeline" });
    const buttons = timeline.getByRole("button");
    await expect(buttons).toHaveCount(TRAVEL_STOPS.length);
    await expect(
        page.getByRole("combobox", { name: "Choose a trip" })
    ).toHaveCount(0);
    const labels = await buttons.evaluateAll((nodes) =>
        nodes.map((node) => node.getAttribute("aria-label")!)
    );
    const years = labels.map((label) => Number(label.split(" · ").pop()));
    expect(years).toEqual([...years].sort((a, b) => a - b));
    expect(labels.indexOf("Chicago · 2024")).toBeGreaterThan(
        labels.indexOf("United Kingdom · 2023")
    );
    await buttons.first().focus();
    await buttons.first().press("End");
    await expect(buttons.last()).toBeFocused();
    await expect(buttons.last()).toHaveAttribute("aria-current", "true");
    await expect(
        buttons.last().locator("..").locator(".travel-timeline-year")
    ).toHaveText("2026");
    await expect(map(page)).toHaveAttribute(
        "data-selected-trip",
        "alaska-2026"
    );
    expect(await timeline.evaluate((node) => node.scrollLeft)).toBeGreaterThan(
        0
    );
    await buttons.last().press("Home");
    await expect(buttons.first()).toBeFocused();
    await buttons.first().press("ArrowRight");
    await expect(buttons.nth(1)).toBeFocused();
    await expect(map(page)).toHaveAttribute("data-selected-trip", "uk-2023");
});

test("sort direction retains selection and camera; navigation follows both directions", async ({
    page
}) => {
    await openTravel(page);
    await page
        .getByRole("checkbox", { name: "Reduce motion", exact: true })
        .check();
    const timeline = page.getByRole("navigation", { name: "Trip timeline" });
    const buttons = timeline.getByRole("button");
    const oldestOrder = await buttons.evaluateAll((nodes) =>
        nodes.map((node) => node.getAttribute("aria-label"))
    );
    await page
        .getByRole("button", {
            name: "World Cup stadium trips · 2026",
            exact: true
        })
        .click();
    await page.locator('[data-visit-id="dallas-japan-sweden-2026"]').click();
    await expect(map(page)).toHaveAttribute("data-map-idle", "true");
    const longitude = await map(page).getAttribute("data-camera-longitude");
    for (const newest of [true, false, true, false]) {
        await page
            .locator('[data-visit-id="dallas-japan-sweden-2026"]')
            .click();
        await expect(map(page)).toHaveAttribute(
            "data-selected-visit",
            "dallas-japan-sweden-2026"
        );
        await expect
            .poll(async () =>
                Number(await map(page).getAttribute("data-camera-longitude"))
            )
            .toBeCloseTo(-96.8, 3);
        const toggle = page.getByRole("button", {
            name: newest
                ? "Show newest trips first"
                : "Show oldest trips first",
            exact: true
        });
        const size = await toggle.boundingBox();
        expect(size?.width).toBeGreaterThanOrEqual(44);
        expect(size?.height).toBeGreaterThanOrEqual(44);
        await toggle.press(newest ? "Enter" : "Space");
        await expect(buttons).toHaveCount(TRAVEL_STOPS.length);
        expect(
            await buttons.evaluateAll((nodes) =>
                nodes.map((node) => node.getAttribute("aria-label"))
            )
        ).toEqual(newest ? [...oldestOrder].reverse() : oldestOrder);
        await expect(map(page)).toHaveAttribute(
            "data-selected-visit",
            "dallas-japan-sweden-2026"
        );
        await expect(map(page)).toHaveAttribute(
            "data-camera-longitude",
            longitude!
        );
        await expect(page.locator("#travel-summary-heading")).toHaveText(
            "World Cup stadium trips"
        );
        await expect(page.locator("#travel-summary")).toContainText(
            `${newest ? 2 : TRAVEL_STOPS.length - 1} of ${TRAVEL_STOPS.length} entries`
        );
        await expect
            .poll(async () =>
                timeline.evaluate((node) => {
                    const selected = node
                        .querySelector('[aria-current="true"]')!
                        .getBoundingClientRect();
                    const visible = node.getBoundingClientRect();
                    return (
                        selected.left >= visible.left - 1 &&
                        selected.right <= visible.right + 1
                    );
                })
            )
            .toBe(true);
        await page
            .locator('[aria-current="true"][data-trip-index]')
            .press("ArrowRight");
        await expect(map(page)).toHaveAttribute(
            "data-selected-trip",
            newest ? "train-2026" : "alaska-2026"
        );
        await page
            .locator('[aria-current="true"][data-trip-index]')
            .press("ArrowLeft");
        await expect(map(page)).toHaveAttribute(
            "data-selected-trip",
            "world-cup-2026"
        );
    }
    await page
        .getByRole("button", { name: "Show newest trips first", exact: true })
        .click();
    await buttons.first().focus();
    await buttons.first().press("End");
    await expect(map(page)).toHaveAttribute(
        "data-selected-trip",
        "japan-korea-2022"
    );
    await buttons.last().press("ArrowRight");
    await expect(buttons.first()).toBeFocused();
    await expect(map(page)).toHaveAttribute(
        "data-selected-trip",
        "alaska-2026"
    );
    await buttons.first().press("ArrowLeft");
    await expect(buttons.last()).toBeFocused();
    await buttons.last().press("Home");
    await expect(buttons.first()).toBeFocused();
});
