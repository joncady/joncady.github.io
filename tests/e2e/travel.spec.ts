import { test, expect, openTravel, map } from "./fixtures";
import { markerScreenPoint } from "./project-marker";
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
        await page
            .getByRole("combobox", { name: "Choose a trip", exact: true })
            .selectOption(String(index));
        await expect(page.locator("#travel-summary-heading")).toHaveText(
            stop.title
        );
        await expect(map(page)).toHaveAttribute("data-selected-trip", stop.id);
        await expect
            .poll(async () =>
                Number(await map(page).getAttribute("data-camera-longitude"))
            )
            .toBeCloseTo(stop.center[0], 3);
        await expect
            .poll(async () =>
                Number(await map(page).getAttribute("data-camera-latitude"))
            )
            .toBeCloseTo(stop.center[1], 3);
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
        .getByRole("button", { name: "Previous trip", exact: true })
        .press("Enter");
    await expect(
        page.getByRole("combobox", { name: "Choose a trip", exact: true })
    ).toHaveValue(String(TRAVEL_STOPS.length - 1));
    await page
        .getByRole("button", { name: "Next trip", exact: true })
        .press("Enter");
    await expect(
        page.getByRole("combobox", { name: "Choose a trip", exact: true })
    ).toHaveValue("0");
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
    await page
        .getByRole("combobox", { name: "Choose a trip", exact: true })
        .selectOption("1");
    await expect(map(page)).toHaveAttribute("data-map-ready", "true");
    await page.getByRole("button", { name: "View Miami", exact: true }).click();
    await expect
        .poll(async () =>
            Number(await map(page).getAttribute("data-camera-longitude"))
        )
        .toBeCloseTo(-80, 3);
    await expect
        .poll(async () =>
            Number(await map(page).getAttribute("data-camera-latitude"))
        )
        .toBeCloseTo(26, 3);
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
    await page
        .getByRole("combobox", { name: "Choose a trip", exact: true })
        .selectOption("15");
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
    if (page.viewportSize()!.width <= 900)
        expect(summary!.y).toBeGreaterThanOrEqual(stage!.y + stage!.height - 1);
    else expect(summary!.x).toBeGreaterThanOrEqual(stage!.x + stage!.width - 1);
    for (const name of ["Previous trip", "Next trip", "Close trip summary"]) {
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
    await page.route("**/positron-gl-style/style.json", (route) =>
        route.abort()
    );
    await openTravel(page);
    await expect(
        page
            .getByRole("status")
            .filter({ hasText: "Some map resources could not load" })
    ).toBeVisible();
    await page.getByRole("button", { name: "Next trip", exact: true }).click();
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
    await page.getByRole("button", { name: "Next trip", exact: true }).click();
    await expect(page.locator("#travel-summary-heading")).toHaveText(
        "World Cup stadium trips"
    );
    await expect(
        page.getByRole("heading", { name: "Professional Experience" })
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
    await page
        .getByRole("combobox", { name: "Choose a trip", exact: true })
        .selectOption("4");
    await expect(map(page)).toHaveAttribute("data-map-ready", "true");
    await expect(page.locator("#travel-summary-heading")).toHaveText("Japan");
    await expect(page.locator("#travel canvas")).toHaveCount(1);
    await expect.poll(() => missingRequests).toBeGreaterThan(0);
    await page.getByRole("button", { name: "Next trip", exact: true }).click();
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
    await page.route("**/positron-gl-style/style.json", async (route) => {
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
            .getByRole("button", { name: "Next trip", exact: true })
            .click();
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

test("a real unselected 3D mesh click updates trip, camera and summary", async ({
    page
}) => {
    await page.setViewportSize({ width: 1440, height: 1000 });
    await openTravel(page);
    await page
        .getByRole("checkbox", { name: "Reduce motion", exact: true })
        .check();
    await page
        .getByRole("combobox", { name: "Choose a trip", exact: true })
        .selectOption("15");
    await expect(map(page)).toHaveAttribute("data-map-ready", "true");
    await expect(map(page)).toHaveAttribute("data-map-idle", "true");
    await map(page).scrollIntoViewIfNeeded();
    const point = await markerScreenPoint(page, {
        longitude: -88,
        latitude: 42
    });
    await page.mouse.click(point.x, point.y);
    await expect(
        page.getByRole("combobox", { name: "Choose a trip", exact: true })
    ).toHaveValue("2");
    await expect(page.locator("#travel-summary-heading")).toHaveText(
        "Coast-to-coast train trip"
    );
    await expect(map(page)).toHaveAttribute("data-selected-trip", "train-2026");
    await expect
        .poll(async () =>
            Number(await map(page).getAttribute("data-camera-longitude"))
        )
        .toBeCloseTo(-96, 3);
    await expect(page.locator("#travel-summary")).toBeVisible();
});
