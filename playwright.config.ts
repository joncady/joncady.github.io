import { defineConfig, devices } from "@playwright/test";
export default defineConfig({
    testDir: "./tests/e2e",
    fullyParallel: true,
    forbidOnly: !!process.env.CI,
    retries: process.env.CI ? 1 : 0,
    workers: process.env.CI ? 2 : 2,
    timeout: 30000,
    expect: { timeout: 10000 },
    reporter: [["list"], ["html", { open: "never" }]],
    use: {
        baseURL: "http://127.0.0.1:5190",
        trace: "retain-on-failure",
        screenshot: "only-on-failure"
    },
    projects: [
        {
            name: "desktop-chromium",
            use: {
                ...devices["Desktop Chrome"],
                viewport: { width: 1440, height: 1000 },
                launchOptions: { args: ["--enable-unsafe-swiftshader"] }
            }
        },
        {
            name: "mobile-chromium",
            use: {
                ...devices["Pixel 7"],
                launchOptions: { args: ["--enable-unsafe-swiftshader"] }
            }
        },
        { name: "desktop-webkit", use: { ...devices["Desktop Safari"] } }
    ],
    webServer: {
        command: "npm run preview -- --host 127.0.0.1 --port 5190 --strictPort",
        url: "http://127.0.0.1:5190",
        reuseExistingServer: false
    }
});
