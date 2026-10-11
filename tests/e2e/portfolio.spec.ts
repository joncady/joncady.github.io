import { test, expect } from "./fixtures";
import { webDevProjects, mobileDevProjects } from "../../src/sections/Helpers";
const oldAmazon =
    "I began my career at Amazon as an engineer on an experimentation team in the Alexa organization. I worked on high-velocity growth experiments, primarily to drive increased customer engagment across all Alexa surfaces. On my current team, I manage infrastructure that supports Alexa marketing iniatives and internal data pipelines. Over the past 3.5 years, I've learned to build serverless and asyncronous software solutions using proprietary Java frameworks and the AWS CDK. Additionally, I've developed multiple features using React Native for both the Amazon Shopping and Alexa apps. I also designed an Alexa skill in Typescript from the ground up to support short-term experiments.";

test("navigation anchors, deep links, mobile menu collapse, skip link", async ({
    page,
    isMobile
}) => {
    await page.goto("/");
    await page.keyboard.press("Tab");
    await expect(
        page.getByRole("link", { name: "Skip to content" })
    ).toBeFocused();
    await page.keyboard.press("Enter");
    await expect(page.locator("main")).toBeFocused();
    for (const [name, hash] of [
        ["About Me", "about-me"],
        ["Experience", "experience"],
        ["Projects", "my-projects"],
        ["Skills", "skills"],
        ["Travel", "travel"],
        ["Contact", "contact"]
    ]) {
        if (isMobile)
            await page
                .getByRole("button", { name: "Toggle navigation" })
                .click();
        await page.getByRole("link", { name, exact: true }).click();
        await expect(page).toHaveURL(new RegExp(`#${hash}$`));
        if (isMobile)
            await expect(page.locator("#basic-navbar-nav")).not.toHaveClass(
                /show/
            );
        await page.reload();
        await expect(page.locator(`#${hash}`)).toBeVisible();
    }
});

test("Amazon additions preserve the complete original text", async ({
    page
}) => {
    await page.goto("/#experience");
    await page.getByText("Earlier Amazon work", { exact: true }).click();
    const text = await page.locator(".amazon-background p").innerText();
    expect(text.replace(/\s+/g, " ").trim()).toBe(oldAmazon);
    await expect(page.locator(".current-role")).toContainText(
        "Worked on Alexa Smart Home, building model evaluation pipelines and web apps for data labeling."
    );
    await expect(page.locator(".current-role")).toContainText(
        "Developed and supported an evaluation MCP for running experiments with AI tools."
    );
});

test("every project opens the correct modal and link, Escape returns focus", async ({
    page
}) => {
    await page.goto("/#my-projects");
    for (const project of [...webDevProjects, ...mobileDevProjects]) {
        const card = page.getByRole("button", {
            name: project.title,
            exact: true
        });
        await card.click();
        const modal = page.getByRole("dialog", {
            name: project.title,
            exact: true
        });
        await expect(modal).toBeVisible();
        await expect(modal).toContainText(
            project.content.replace(/\s+/g, " ").trim()
        );
        if (project.link) {
            await expect(
                modal.getByRole("link", { name: "View Project", exact: true })
            ).toHaveAttribute("href", project.link);
            await expect(
                modal.getByRole("link", { name: "View Project", exact: true })
            ).toHaveAttribute("rel", "noopener noreferrer");
        } else
            await expect(
                modal.getByRole("button", { name: "Project link unavailable" })
            ).toBeDisabled();
        await page.keyboard.press("Escape");
        await expect(modal).not.toBeVisible();
        await expect(card).toBeFocused();
    }
});

test("project filters reset independently; corrected public links", async ({
    page
}) => {
    await page.goto("/#my-projects");
    await page.locator("#web-project-filter").selectOption("Python");
    await expect(
        page.getByRole("button", {
            name: "Raspberry Pi Transit Display",
            exact: true
        })
    ).toBeVisible();
    await expect(
        page.getByRole("button", {
            name: "Fire Emblem Adventures",
            exact: true
        })
    ).toHaveCount(0);
    await page.locator("#web-project-filter").selectOption("");
    await expect(
        page.getByRole("button", {
            name: "Fire Emblem Adventures",
            exact: true
        })
    ).toBeVisible();
    await page.locator("#mobile-project-filter").selectOption("");
    const links = await page
        .locator("a[href]")
        .evaluateAll((els) => els.map((el) => el.getAttribute("href")!));
    expect(links.every((h) => !h.startsWith("javascript:"))).toBe(true);
    expect(
        webDevProjects.find((p) => p.title === "Fire Emblem Adventures")?.link
    ).toBe("https://joncady.github.io/feadventures/");
    expect(webDevProjects.find((p) => p.title === "FeelingFeed")?.link).toBe(
        "https://github.com/joncady/dubhacks18"
    );
});
