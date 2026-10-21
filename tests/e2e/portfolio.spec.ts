import { test, expect, openTravel, map } from "./fixtures";
import { TRAVEL_STOPS } from "../../src/sections/travelData";

test("hero and project process use the simplified presentation", async ({
    page
}) => {
    await page.goto("/");
    const heading = page.locator("#home h1");
    await expect(heading).toHaveText("Jonathan Cady");
    await expect(heading).toHaveCSS("font-style", "normal");
    await expect(heading.locator("em")).toHaveCount(0);
    await expect(page.locator(".hero-identity .profile-photo")).toHaveAttribute(
        "src",
        "/assets/profile.jpg"
    );
    await expect(page.locator(".experience-intro .profile-photo")).toHaveCount(
        0
    );
    await expect(page.locator(".brand-dot")).toHaveCount(0);
    await expect(
        page.getByRole("link", { name: "View my projects" })
    ).toHaveCount(0);
    await expect(page.locator(".hero-bottom")).toHaveCount(0);
    await expect(
        page.locator("#my-projects > .section-heading > p:not(.eyebrow)")
    ).toHaveCount(0);
    await expect(
        page.locator(
            ".featured-project:not(.kureo-project) .case-process ul > li"
        )
    ).toHaveCount(4);
    await expect(
        page.locator(".case-process ol, .case-process h4")
    ).toHaveCount(0);
    await expect(
        page.locator(".featured-project:not(.kureo-project) .case-process ul")
    ).toHaveCSS("display", "block");
    await expect(
        page.locator(".featured-project:not(.kureo-project) .case-process ul")
    ).toHaveCSS("list-style-type", "disc");
    await expect(page.locator("#travel-log-heading")).toHaveText("Travel Log");
});

test("navigation deep links, mobile menu, and keyboard skip link", async ({
    page,
    isMobile,
    browserName
}) => {
    await page.goto("/");
    // Safari defaults to option-tab for links unless full keyboard access is enabled.
    await page.keyboard.press(browserName === "webkit" ? "Alt+Tab" : "Tab");
    await expect(
        page.getByRole("link", { name: "Skip to content" })
    ).toBeFocused();
    await page.keyboard.press("Enter");
    await expect(page.locator("main")).toBeFocused();
    for (const [name, id] of [
        ["01 / Work", "my-projects"],
        ["02 / Experience", "experience"],
        ["03 / Travel Log", "travel"],
        ["Contact ↗", "contact"]
    ]) {
        if (isMobile)
            await page
                .getByRole("button", { name: "Toggle navigation" })
                .click();
        await page.getByRole("link", { name, exact: true }).click();
        await expect(page).toHaveURL(new RegExp("#" + id + "$"));
        if (isMobile)
            await expect(page.locator("#site-links")).not.toHaveClass(
                /is-open/
            );
        await page.reload();
        await expect(page.locator("#" + id)).toBeVisible();
    }
});

test("process-led case study, accurate source links, archive disclosures", async ({
    page
}) => {
    await page.goto("/#my-projects");
    await expect(page.locator("#transit-heading")).toContainText("arrivals.");
    await expect(
        page.locator(".featured-project:not(.kureo-project) .case-process")
    ).toContainText("SSH");
    await expect(
        page.getByRole("link", { name: "View source" })
    ).toHaveAttribute(
        "href",
        "https://github.com/joncady/OneBusAwayTransitTimesForPi"
    );
    await expect(page.locator("#skills")).toHaveCount(0);
    await expect(page.locator(".hackathon-grid article")).toHaveCount(8);
    await expect(
        page
            .locator(".travel-hud")
            .getByRole("button", { name: "Next location or trip" })
    ).toHaveCount(1);
    await expect(page.locator(".archive-grid")).not.toBeVisible();
    await page.locator(".project-archive summary").click();
    await expect(page.locator(".archive-grid article")).toHaveCount(7);
    await expect(page.locator(".archive-grid")).not.toContainText(" ()");
    await expect(page.locator('a[href="https://vocaby.app/"]')).toHaveCount(0);
    await page.locator(".earlier-experience summary").click();
    await expect(page.locator(".earlier-roles article")).toHaveCount(4);
    await page.locator(".amazon-background summary").click();
    await expect(page.locator(".amazon-background")).toContainText(
        "serverless and asynchronous"
    );
});

test("featured projects lead with Kureo and the current Fire Emblem game", async ({
    page
}) => {
    await page.goto("/#my-projects");
    const cards = page.locator("#my-projects > article");
    await expect(cards.nth(0)).toContainText("Kureo");
    await expect(cards.nth(0).locator("img")).toHaveAttribute(
        "src",
        "/assets/kureo-phone-render.png"
    );
    await expect(cards.nth(1)).toContainText("Fire Emblem Adventures");
    await expect(cards.nth(1)).toContainText("Phaser");
    await expect(cards.nth(1)).toContainText("in development");
    await expect(page.locator(".project-archive")).not.toContainText(
        "Fire Emblem Adventures"
    );
});

test("theme has no horizontal overflow and all displayed images load", async ({
    page
}, testInfo) => {
    // Walking every lazy-loaded image and capturing the long projects section
    // needs more time on mobile CI than a single interaction test.
    test.setTimeout(60000);
    await page.emulateMedia({ reducedMotion: "reduce" });
    await page.goto("/");
    const images = page.locator("img");
    for (const img of await images.all()) {
        await img.scrollIntoViewIfNeeded();
        await expect(img).toHaveJSProperty("complete", true);
        expect(
            await img.evaluate((el: HTMLImageElement) => el.naturalWidth)
        ).toBeGreaterThan(0);
    }
    expect(
        await page.evaluate(
            () => document.documentElement.scrollWidth <= innerWidth
        )
    ).toBe(true);
    await page.locator("#home").screenshot({
        path: testInfo.outputPath("refresh-hero.png"),
        animations: "disabled"
    });
    await page.locator("#my-projects").screenshot({
        path: testInfo.outputPath("refresh-work.png"),
        animations: "disabled"
    });
});

test("full-width map fades into the page, with mobile summary below", async ({
    page
}) => {
    await openTravel(page);
    const viewport = page.viewportSize()!;
    const rect = await map(page).boundingBox();
    expect(rect!.x).toBeCloseTo(0, 0);
    expect(rect!.width).toBeCloseTo(viewport.width, 0);
    const summary = await page.locator("#travel-summary").boundingBox();
    if (viewport.width <= 700)
        expect(summary!.y).toBeGreaterThanOrEqual(rect!.y + rect!.height);
    else expect(summary!.x).toBeGreaterThan(viewport.width / 2);
});

test("trip HUD stays visible while viewing the map", async ({ page }) => {
    await openTravel(page);
    await page.locator(".travel-map").evaluate((el) =>
        window.scrollTo({
            top: el.getBoundingClientRect().top + window.scrollY + 100,
            behavior: "instant"
        })
    );
    const hud = page.locator(".travel-hud");
    const rect = await hud.boundingBox();
    expect(rect!.y).toBeGreaterThanOrEqual(0);
    expect(rect!.y + rect!.height).toBeLessThan(page.viewportSize()!.height);
    const before = await page.locator("#travel-summary-heading").textContent();
    await hud.getByRole("button", { name: "Next location or trip" }).click();
    await expect(page.locator("#travel-summary-heading")).not.toHaveText(
        before!
    );
    await expect(
        page.getByRole("complementary", { name: "Trip photos and videos" })
    ).toContainText("Photos & videos /");
});
