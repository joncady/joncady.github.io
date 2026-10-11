# Map-pin click investigation

CI run [38161711693](https://github.com/joncady/joncady.github.io/actions/runs/38161711693), head `a498b347f8e13dbba37e39dc4d0a0b2f00857f5a`, reported one mobile Chromium unselected-sprite click failing initially and passing its existing retry. The other 59 cases passed initially. The failed test uses a desktop-sized 1440×1000 viewport in the Pixel 7 emulation context and sends a mouse click; it is not a physical handset touch test.

The retained trace confirms Chicago's camera longitude -87.6298, latitude 41.8781, zoom 8, map-ready and map-idle states before the click. The Midwest texture returned HTTP 200 before the click. The reference-map projection calculated CSS point (443.082, 622.343), aligned with the visible unselected train sprite in the trace. The click did not change selection. Camera/layout staleness and texture-loading failure are therefore not established as the cause. The fixture intentionally blocks external resources; the recorded font-fetch error preceded selection and does not by itself explain the miss.

Focused repeats on the unchanged production build, with no test retries:

- Twelve mobile Chromium runs: twelve passed.
- Six repeats in each of desktop Chromium, mobile Chromium and WebKit: seventeen passed; one mobile run reproduced the same selection miss. Its trace and screenshot were preserved locally.
- Twenty additional mobile runs with temporary passive pointer-event diagnostics and four workers: twenty passed. Instrumentation can affect timing, so this result is not proof of a fix. Temporary diagnostic code was removed.
- A native click on the visible train sprite in the laptop's real-basemap browser successfully selected the train trip and updated its summary.

The evidence supports an intermittent canvas-hit/input path issue under automation, but does not conclusively separate test timing from a product input race. No production fix is claimed. A speculative event-handler/hit-box rewrite is not warranted by the trace, and no retries, timeouts or weakened assertions were added to this test. The existing single-retry CI setting is unchanged.

Remaining risk is a rare missed sprite click; the timeline, previous/next and location buttons remain independent selection paths and are covered by the full suite. Physical touch and a repeat investigation on the Linux CI host remain follow-ups. Any subsequent CI recurrence should preserve its first-attempt trace and compare pointer target/offsets before modifying selection logic. This investigation does not claim all first attempts pass.


## Deeper event and raycast diagnostics

An isolated copy of the published build was instrumented without changing the PR source or its tests. Twenty-four mobile mouse-click runs passed with scene/camera/raycast probes. Another forty-eight passed with logging inside a private copy of Fiber's actual pointer handler. The latter logs show pointer-down, pointer-up and click hitting the same Midwest event-object UUID and PlaneGeometry; the initial-hit gate contains that same object. Pointer events target CANVAS, offsets remain consistent with its rectangle and 908×620 logical surface, and click-distance delta is zero. No occluding target or mesh/handler replacement was observed in these successful runs. The CI test sends mouse pointers even in its Pixel 7 emulation context.

The original failure has not recurred with those diagnostics, so those observations do not establish the rare failure's cause. Instrumentation may perturb timing. They rule out a deterministic geometry/occlusion/offset error in the tested scene, but cannot rule out a transient product handler/raycast race. No pointer-handler or geometry change was published on that evidence.

Twelve further runs using `page.touchscreen.tap` passed in the same emulated mobile context. Handler logs confirm touch pointers target the canvas and hit the same Midwest object on pointer-down and click. This distinguishes actual touch dispatch from the failing test's mouse dispatch, without claiming physical handset verification. Across uninstrumented baseline runs, one of thirty missed; the ninety-two instrumented mouse runs and twelve instrumented touch runs passed. These are diagnostic comparisons, not a measured production failure rate.
