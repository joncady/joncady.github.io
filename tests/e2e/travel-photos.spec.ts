import { test, expect, openTravel } from "./fixtures";
import { TRAVEL_STOPS } from "../../src/sections/travelData";
import { TRAVEL_PHOTOS } from "../../src/sections/travelPhotos";
import { TRAVEL_DETAILS } from "../../src/sections/travelDetails";
import { TRAVEL_VIDEOS } from "../../src/sections/travelVideos";

for (const trip of TRAVEL_STOPS) {
    test(`travel media and summary render for ${trip.id}`, async ({ page }) => {
        await openTravel(page);
        await page
            .locator(`[data-trip-index="${TRAVEL_STOPS.indexOf(trip)}"]`)
            .click();
        const gallery = page.locator(".travel-gallery");
        for (const photo of TRAVEL_PHOTOS[trip.id] ?? []) {
            const image = gallery.locator("img");
            await expect(image).toHaveAttribute("src", photo.src);
            await expect(image).toHaveAttribute("alt", photo.alt);
            await expect
                .poll(() =>
                    image.evaluate((el: HTMLImageElement) => el.naturalWidth)
                )
                .toBeGreaterThan(0);
            await gallery
                .getByRole("button", { name: "Next photo", exact: true })
                .click();
        }
        for (const clip of TRAVEL_VIDEOS[trip.id] ?? []) {
            const video = gallery.locator("video");
            await expect(video).toHaveAttribute("src", clip.src);
            await expect(video).toHaveAttribute("controls", "");
            const playable = await video.evaluate((el: HTMLVideoElement) =>
                Boolean(
                    el.canPlayType('video/mp4; codecs="avc1.42E01E, mp4a.40.2"')
                )
            );
            if (playable) {
                await expect
                    .poll(() =>
                        video.evaluate((el: HTMLVideoElement) => el.readyState)
                    )
                    .toBeGreaterThan(0);
                await video.evaluate((el: HTMLVideoElement) => {
                    el.muted = true;
                    return el.play();
                });
                await expect
                    .poll(() =>
                        video.evaluate((el: HTMLVideoElement) => el.currentTime)
                    )
                    .toBeGreaterThan(0);
            }
            await gallery
                .getByRole("button", { name: "Next photo", exact: true })
                .click();
        }
        await expect(page.locator(".travel-story")).toHaveText(
            TRAVEL_DETAILS[trip.id].summary ?? ""
        );
    });
}
