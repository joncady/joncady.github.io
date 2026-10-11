import { resolve } from "node:path";
import type { Page } from "@playwright/test";

/** Use MapLibre's documented custom-layer projection matrix in a test-only
 * reference map. No React internals, production test hooks, or fixed pixels.
 * The altitude targets the real neutral marker's sphere, not a DOM substitute. */
export async function markerScreenPoint(
    page: Page,
    marker: { longitude: number; latitude: number }
) {
    const surface = page.getByLabel("Interactive 3D travel map", {
        exact: true
    });
    const box = (await surface.boundingBox())!;
    const camera = {
        longitude: Number(await surface.getAttribute("data-camera-longitude")),
        latitude: Number(await surface.getAttribute("data-camera-latitude")),
        zoom: Number(await surface.getAttribute("data-camera-zoom"))
    };
    await page.addScriptTag({
        path: resolve("node_modules/maplibre-gl/dist/maplibre-gl.js")
    });
    const point = await page.evaluate(
        async ({ camera, marker, width, height }) => {
            const api = (
                window as Window & { maplibregl: typeof import("maplibre-gl") }
            ).maplibregl;
            const holder = document.createElement("div");
            Object.assign(holder.style, {
                position: "absolute",
                left: "-10000px",
                width: `${width}px`,
                height: `${height}px`
            });
            document.body.append(holder);
            const reference = new api.Map({
                container: holder,
                center: [camera.longitude, camera.latitude],
                zoom: camera.zoom,
                pitch: 50,
                bearing: 0,
                interactive: false,
                style: { version: 8, sources: {}, layers: [] }
            });
            try {
                return await new Promise<{ x: number; y: number }>(
                    (resolve, reject) => {
                        reference.on("error", (event) => reject(event.error));
                        reference.on("load", () =>
                            reference.addLayer({
                                id: "projection-reference",
                                type: "custom",
                                renderingMode: "3d",
                                render(_gl, matrix) {
                                    const scale =
                                        3000 * Math.pow(2, 9 - camera.zoom);
                                    const p = api.MercatorCoordinate.fromLngLat(
                                        [marker.longitude, marker.latitude],
                                        1.5 * scale
                                    );
                                    const clip = [0, 1, 2, 3].map(
                                        (row) =>
                                            matrix[row] * p.x +
                                            matrix[row + 4] * p.y +
                                            matrix[row + 8] * p.z +
                                            matrix[row + 12]
                                    );
                                    resolve({
                                        x:
                                            ((clip[0] / clip[3] + 1) * width) /
                                            2,
                                        y:
                                            ((1 - clip[1] / clip[3]) * height) /
                                            2
                                    });
                                }
                            })
                        );
                    }
                );
            } finally {
                reference.remove();
                holder.remove();
            }
        },
        { camera, marker, width: box.width, height: box.height }
    );
    return { x: box.x + point.x, y: box.y + point.y };
}
