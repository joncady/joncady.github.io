import { readFileSync } from "node:fs";
import { createHash } from "node:crypto";
import { TRAVEL_STOPS } from "../../src/sections/travelData";
import { test, expect, openTravel, map } from "./fixtures";

test("every marker has a distinct, real transparent PNG with recorded provenance", async ({
    request
}) => {
    const assets = TRAVEL_STOPS.flatMap((stop) =>
        stop.markers.map((marker) => marker.img)
    );
    expect(assets).toHaveLength(25);
    expect(new Set(assets).size).toBe(25);
    const manifest = JSON.parse(
        readFileSync("docs/travel-pixel-asset-manifest.json", "utf8")
    ) as Array<{
        url: string;
        bytes: number;
        sha256: string;
        generator: string;
    }>;
    expect(new Set(manifest.map((item) => item.sha256)).size).toBe(25);
    let total = 0;
    for (const url of assets) {
        expect(url).toMatch(/^\/assets\/travel-log\/pixel-v1\/[a-z-]+\.png$/);
        const response = await request.get(url!);
        expect(response.ok()).toBe(true);
        const bytes = await response.body();
        total += bytes.length;
        expect(bytes.subarray(0, 8).toString("hex")).toBe("89504e470d0a1a0a");
        expect(bytes[25]).toBe(6); // RGBA, alpha corner also validated during generation copy.
        const recorded = manifest.find((item) => item.url === url)!;
        expect(bytes.length).toBe(recorded.bytes);
        expect(createHash("sha256").update(bytes).digest("hex")).toBe(
            recorded.sha256
        );
        expect(recorded.generator).toBe("built-in imagegen");
        expect(bytes.length).toBeLessThan(2 * 1024 * 1024);
    }
    expect(total).toBeLessThan(32 * 1024 * 1024);
});

test("initial view requests only visible/current icons and keeps large remote textures off the path", async ({
    page
}, testInfo) => {
    const requested = new Set<string>();
    page.on("request", (request) => {
        const url = new URL(request.url());
        if (url.pathname.includes("/assets/travel-log/pixel-v1/"))
            requested.add(url.pathname);
    });
    await openTravel(page);
    await page
        .getByRole("checkbox", { name: "Reduce motion", exact: true })
        .check();
    await expect(map(page)).toHaveAttribute("data-map-ready", "true");
    await expect(map(page)).toHaveAttribute("data-map-idle", "true");
    expect(requested.size).toBeGreaterThan(0);
    expect(requested.size).toBeLessThan(25);
    await testInfo.attach("initial-icon-requests", {
        body: JSON.stringify([...requested], null, 2),
        contentType: "application/json"
    });
    await page
        .getByRole("combobox", { name: "Choose a trip", exact: true })
        .selectOption("15");
    await expect
        .poll(() =>
            requested.has("/assets/travel-log/pixel-v1/chicago-cloud-gate.png")
        )
        .toBe(true);
});
