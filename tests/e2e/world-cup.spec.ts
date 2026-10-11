import { test, expect, openTravel, map } from "./fixtures";
import { TRAVEL_STOPS, WORLD_CUP_VISITS } from "../../src/sections/travelData";

test("each game selects its own sprite and city; fan visit remains distinct", async ({
    page
}) => {
    const requested = new Set<string>();
    page.on("request", (request) =>
        requested.add(new URL(request.url()).pathname)
    );
    await openTravel(page);
    await page
        .getByRole("checkbox", { name: "Reduce motion", exact: true })
        .check();
    await page
        .getByRole("button", {
            name: "World Cup stadium trips · 2026",
            exact: true
        })
        .click();
    const stop = TRAVEL_STOPS.find((stop) => stop.id === "world-cup-2026")!;
    await expect(page.locator("[data-visit-id]")).toHaveCount(6);
    for (const visit of WORLD_CUP_VISITS.filter(
        (visit) => visit.kind === "game"
    )) {
        const button = page.locator(`[data-visit-id="${visit.id}"]`);
        await button.click();
        await expect(button).toHaveAttribute("aria-pressed", "true");
        await expect(map(page)).toHaveAttribute(
            "data-selected-visit",
            visit.id
        );
        await expect(map(page)).toHaveAttribute(
            "data-selected-sprite",
            visit.img!
        );
        await expect.poll(() => requested.has(visit.img!)).toBe(true);
        const marker = stop.markers.find(
            (marker) => marker.name === visit.markerName
        )!;
        await expect
            .poll(async () =>
                Number(await map(page).getAttribute("data-camera-longitude"))
            )
            .toBeCloseTo(marker.longitude, 3);
        await expect
            .poll(async () =>
                Number(await map(page).getAttribute("data-camera-latitude"))
            )
            .toBeCloseTo(marker.latitude, 3);
        await expect(page.locator(".world-cup-selected")).toContainText(
            visit.title
        );
    }
    const fan = WORLD_CUP_VISITS.find(
        (visit) => visit.kind === "fan-experience"
    )!;
    await page.locator(`[data-visit-id="${fan.id}"]`).click();
    await expect(page.locator(".world-cup-selected")).toContainText(
        "Selected fan experience"
    );
    await expect(map(page)).toHaveAttribute("data-selected-sprite", "");
    await expect(page.locator(".world-cup-visits")).not.toContainText(
        "USA–Belgium"
    );
});

test("game selection is keyboard usable and can recenter after map zoom", async ({
    page
}) => {
    await openTravel(page);
    await page
        .getByRole("checkbox", { name: "Reduce motion", exact: true })
        .check();
    await page
        .getByRole("button", {
            name: "World Cup stadium trips · 2026",
            exact: true
        })
        .click();
    const game = page.locator('[data-visit-id="seattle-belgium-senegal-2026"]');
    await page
        .locator('[data-visit-id="seattle-belgium-egypt-2026"]')
        .press("Enter");
    await page.getByRole("button", { name: "Zoom in", exact: true }).click();
    await expect
        .poll(async () =>
            Number(await map(page).getAttribute("data-camera-zoom"))
        )
        .toBeCloseTo(8, 2);
    await game.press("Enter");
    await expect
        .poll(async () =>
            Number(await map(page).getAttribute("data-camera-zoom"))
        )
        .toBeCloseTo(7, 2);
    await expect(map(page)).toHaveAttribute(
        "data-selected-visit",
        "seattle-belgium-senegal-2026"
    );
    await page.getByRole("button", { name: "Zoom in", exact: true }).click();
    await expect
        .poll(async () =>
            Number(await map(page).getAttribute("data-camera-zoom"))
        )
        .toBeCloseTo(8, 2);
    await game.press("Enter");
    await expect
        .poll(async () =>
            Number(await map(page).getAttribute("data-camera-zoom"))
        )
        .toBeCloseTo(7, 2);
    await page
        .getByRole("button", { name: "Japan · 2025", exact: true })
        .click();
    await expect(page.locator(".world-cup-visits")).toHaveCount(0);
    await page
        .getByRole("button", {
            name: "World Cup stadium trips · 2026",
            exact: true
        })
        .click();
    await expect(game).toHaveAttribute("aria-pressed", "true");
});

test("missing game textures keep match selection and map usable", async ({
    page
}) => {
    let missing = 0;
    await page.route("**/world-cup-v1/*.png", (route) => {
        missing += 1;
        return route.fulfill({ status: 404, body: "missing fixture" });
    });
    await openTravel(page);
    await page
        .getByRole("button", {
            name: "World Cup stadium trips · 2026",
            exact: true
        })
        .click();
    await page.locator('[data-visit-id="dallas-japan-sweden-2026"]').click();
    await expect.poll(() => missing).toBeGreaterThan(0);
    await page.locator('[data-visit-id="miami-norway-england-2026"]').click();
    await expect(page.locator(".world-cup-selected")).toContainText(
        "Norway–England"
    );
    await expect(page.locator("#travel canvas")).toHaveCount(1);
});
