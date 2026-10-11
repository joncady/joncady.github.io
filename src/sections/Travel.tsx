import React, { Suspense, useEffect, useRef, useState } from "react";
import { Billboard, Text, useTexture } from "@react-three/drei";
import "maplibre-gl/dist/maplibre-gl.css";
import { useFrame } from "@react-three/fiber";
import { DoubleSide, Group, NearestFilter } from "three";
import Map, { MapRef, NavigationControl } from "react-map-gl/maplibre";
import { Canvas, Coordinates } from "react-three-map/maplibre";
import { TRAVEL_STOPS, TravelMarker } from "./travelData";
import { supportsWebGL, TravelFallback } from "./TravelFallback";

const PinShape = ({ selected }: { selected: boolean }) => (
    <>
        <mesh position={[0, 0.7, 0]} rotation={[0, 0, Math.PI]}>
            <coneGeometry args={[0.3, 1.4, 16]} />
            <meshBasicMaterial color={selected ? "#4b2e83" : "#6c757d"} />
        </mesh>
        <mesh position={[0, 1.5, 0]}>
            <sphereGeometry args={[selected ? 0.48 : 0.32, 16, 12]} />
            <meshBasicMaterial color={selected ? "#4b2e83" : "#6c757d"} />
        </mesh>
    </>
);

// Restore the original image planes as geographically anchored floating items.
const FloatingItem = ({
    img,
    animate,
    selected
}: {
    img: string;
    animate: boolean;
    selected: boolean;
}) => {
    const item = useRef<Group>(null);
    const texture = useTexture(img);
    useEffect(() => {
        texture.magFilter = NearestFilter;
        texture.minFilter = NearestFilter;
        texture.generateMipmaps = false;
        texture.needsUpdate = true;
    }, [texture]);
    useFrame(({ clock }) => {
        if (!item.current) return;
        const time = clock.elapsedTime;
        item.current.position.y = animate ? Math.sin(time * 0.9) * 0.12 : 0;
        item.current.rotation.y = animate ? Math.sin(time * 0.45) * 0.2 : 0;
        item.current.rotation.z = animate ? Math.sin(time * 0.7) * 0.025 : 0;
    });
    return (
        <Billboard position={[0, 1.6, 0]}>
            <group ref={item}>
                <mesh>
                    <planeGeometry
                        args={[selected ? 2.6 : 1.4, selected ? 2.6 : 1.4]}
                    />
                    <meshBasicMaterial
                        map={texture}
                        transparent
                        side={DoubleSide}
                        depthWrite={false}
                        toneMapped={false}
                    />
                </mesh>
            </group>
        </Billboard>
    );
};

const TripPin = ({
    marker,
    selected,
    scale,
    onSelect,
    year,
    reducedMotion
}: {
    marker: TravelMarker;
    selected: boolean;
    scale: number;
    onSelect: () => void;
    year: string;
    reducedMotion: boolean;
}) => (
    <Coordinates latitude={marker.latitude} longitude={marker.longitude}>
        <group
            scale={scale}
            onClick={(event) => {
                event.stopPropagation();
                onSelect();
            }}
        >
            {marker.img ? (
                <TravelFallback fallback={<PinShape selected={selected} />}>
                    <Suspense fallback={<PinShape selected={selected} />}>
                        <FloatingItem
                            img={marker.img}
                            selected={selected}
                            animate={selected && !reducedMotion}
                        />
                    </Suspense>
                </TravelFallback>
            ) : (
                <PinShape selected={selected} />
            )}
            {selected && (
                <Billboard position={[0, marker.img ? 3.4 : 2.6, 0]}>
                    <Suspense fallback={null}>
                        <Text
                            fontSize={0.5}
                            color="#343a40"
                            outlineWidth={0.03}
                            outlineColor="#ffffff"
                            anchorX="center"
                            maxWidth={8}
                            textAlign="center"
                        >
                            {marker.name}
                            {"\n"}
                            {year}
                        </Text>
                    </Suspense>
                </Billboard>
            )}
        </group>
    </Coordinates>
);

const Travel = () => {
    const [webglAvailable] = useState(supportsWebGL);
    const [selectedIndex, setSelectedIndex] = useState(0);
    const [summaryOpen, setSummaryOpen] = useState(true);
    const [mapReady, setMapReady] = useState(false);
    const [mapIdle, setMapIdle] = useState(false);
    const [mapError, setMapError] = useState(false);
    const [reduceMotion, setReduceMotion] = useState(
        () => window.matchMedia("(prefers-reduced-motion: reduce)").matches
    );
    const [instantCamera, setInstantCamera] = useState(false);
    const mapRef = useRef<MapRef>(null);
    const summaryToggle = useRef<HTMLButtonElement>(null);
    const timelineRef = useRef<HTMLDivElement>(null);
    const timelineOrder = TRAVEL_STOPS.map((_, index) => index).sort(
        (a, b) => Number(TRAVEL_STOPS[b].year) - Number(TRAVEL_STOPS[a].year)
    );
    useEffect(() => {
        const container = timelineRef.current;
        const button = container?.querySelector<HTMLButtonElement>(
            `[data-trip-index="${selectedIndex}"]`
        );
        if (!container || !button) return;
        const bounds = button.getBoundingClientRect();
        const viewport = container.getBoundingClientRect();
        container.scrollTo({
            left:
                container.scrollLeft +
                bounds.left -
                viewport.left -
                (viewport.width - bounds.width) / 2,
            behavior: reduceMotion || instantCamera ? "auto" : "smooth"
        });
    }, [selectedIndex, reduceMotion, instantCamera]);
    const selected = TRAVEL_STOPS[selectedIndex];
    const [selectedVisitId, setSelectedVisitId] = useState<string | null>(null);
    const selectedVisit = selected.visits?.find(
        (visit) => visit.id === selectedVisitId
    );
    const visitMarker = selectedVisit
        ? selected.markers.find(
              (marker) => marker.name === selectedVisit.markerName
          )
        : undefined;
    const [viewState, setViewState] = useState({
        longitude: selected.center[0],
        latitude: selected.center[1],
        zoom: selected.zoom,
        pitch: 50,
        bearing: 0
    });
    useEffect(() => {
        const preference = window.matchMedia(
            "(prefers-reduced-motion: reduce)"
        );
        const update = () => setReduceMotion(preference.matches);
        preference.addEventListener("change", update);
        return () => preference.removeEventListener("change", update);
    }, []);
    useEffect(() => {
        if (!mapReady) return;
        const options = {
            center: visitMarker
                ? ([visitMarker.longitude, visitMarker.latitude] as [
                      number,
                      number
                  ])
                : selected.center,
            zoom: visitMarker ? 7 : selected.zoom,
            pitch: 50,
            bearing: 0
        };
        if (reduceMotion || instantCamera) mapRef.current?.jumpTo(options);
        else
            mapRef.current?.flyTo({
                ...options,
                duration: 1100,
                essential: false
            });
    }, [
        selected,
        selectedVisit,
        visitMarker,
        mapReady,
        reduceMotion,
        instantCamera
    ]);
    useEffect(() => {
        mapRef.current?.resize();
    }, [summaryOpen]);
    const move = (direction: number) =>
        setSelectedIndex(
            (index) =>
                timelineOrder[
                    (timelineOrder.indexOf(index) +
                        direction +
                        timelineOrder.length) %
                        timelineOrder.length
                ]
        );
    const closeSummary = () => {
        setSummaryOpen(false);
        summaryToggle.current?.focus();
    };
    const visibleBounds = mapReady ? mapRef.current?.getBounds() : undefined;
    const pinScale = 3000 * Math.pow(2, 9 - viewState.zoom);
    return (
        <section
            id="travel"
            className="travel-log"
            aria-labelledby="travel-log-heading"
        >
            <div className="travel-log-intro">
                <div>
                    <h3 id="travel-log-heading">Travel Log</h3>
                    <p>
                        Explore my travels in 3D, or see more on{" "}
                        <a href="https://www.instagram.com/travelerjc/">
                            Instagram
                        </a>
                        .
                    </p>
                </div>
            </div>
            <div className="travel-toolbar">
                <div
                    className="travel-timeline"
                    ref={timelineRef}
                    aria-label="Trip timeline"
                    role="navigation"
                >
                    {timelineOrder.map((index, position) => {
                        const stop = TRAVEL_STOPS[index];
                        const showYear =
                            position === 0 ||
                            stop.year !==
                                TRAVEL_STOPS[timelineOrder[position - 1]].year;
                        return (
                            <div
                                className="travel-timeline-entry"
                                key={stop.id}
                            >
                                <span
                                    className="travel-timeline-year"
                                    aria-hidden="true"
                                >
                                    {showYear || index === selectedIndex
                                        ? stop.year
                                        : "\u00a0"}
                                </span>
                                <button
                                    type="button"
                                    data-trip-index={index}
                                    aria-label={`${stop.title} · ${stop.year}`}
                                    aria-current={
                                        index === selectedIndex
                                            ? "true"
                                            : undefined
                                    }
                                    onClick={() => setSelectedIndex(index)}
                                    onKeyDown={(event) => {
                                        const direction =
                                            event.key === "ArrowRight"
                                                ? 1
                                                : event.key === "ArrowLeft"
                                                  ? -1
                                                  : 0;
                                        if (
                                            !direction &&
                                            event.key !== "Home" &&
                                            event.key !== "End"
                                        )
                                            return;
                                        event.preventDefault();
                                        const next =
                                            event.key === "Home"
                                                ? timelineOrder[0]
                                                : event.key === "End"
                                                  ? timelineOrder[
                                                        timelineOrder.length - 1
                                                    ]
                                                  : timelineOrder[
                                                        (position +
                                                            direction +
                                                            timelineOrder.length) %
                                                            timelineOrder.length
                                                    ];
                                        setSelectedIndex(next);
                                        timelineRef.current
                                            ?.querySelector<HTMLButtonElement>(
                                                `[data-trip-index="${next}"]`
                                            )
                                            ?.focus({ preventScroll: true });
                                    }}
                                >
                                    <span
                                        className="travel-timeline-dot"
                                        aria-hidden="true"
                                    />
                                    {stop.title}
                                </button>
                            </div>
                        );
                    })}
                </div>
                <div className="travel-buttons">
                    <button
                        type="button"
                        onClick={() => move(-1)}
                        aria-label="Previous trip"
                    >
                        ← Previous
                    </button>
                    <button
                        type="button"
                        onClick={() => move(1)}
                        aria-label="Next trip"
                    >
                        Next →
                    </button>
                    <button
                        type="button"
                        ref={summaryToggle}
                        aria-expanded={summaryOpen}
                        aria-controls="travel-summary"
                        onClick={() => setSummaryOpen((open) => !open)}
                    >
                        {summaryOpen ? "Hide summary" : "Show summary"}
                    </button>
                </div>
            </div>
            <label className="travel-motion-choice">
                <input
                    type="checkbox"
                    checked={reduceMotion || instantCamera}
                    disabled={reduceMotion}
                    onChange={(event) => setInstantCamera(event.target.checked)}
                />
                Reduce motion{reduceMotion ? " (system preference)" : ""}
            </label>
            <div
                className={`travel-stage ${summaryOpen ? "with-summary" : ""}`}
            >
                <div
                    className="travel-map"
                    aria-label="Interactive 3D travel map"
                    data-selected-trip={selected.id}
                    data-selected-visit={selectedVisit?.id ?? ""}
                    data-selected-sprite={selectedVisit?.img ?? ""}
                    data-camera-longitude={viewState.longitude}
                    data-camera-latitude={viewState.latitude}
                    data-camera-zoom={viewState.zoom}
                    data-reduced-motion={reduceMotion || instantCamera}
                    data-map-ready={mapReady}
                    data-map-idle={mapIdle}
                >
                    {webglAvailable ? (
                        <TravelFallback
                            fallback={
                                <p role="status">
                                    The 3D map could not render. Trip selection
                                    and summaries are still available.
                                </p>
                            }
                        >
                            <Map
                                ref={mapRef}
                                initialViewState={viewState}
                                onMove={(event) =>
                                    setViewState(event.viewState)
                                }
                                onLoad={() => setMapReady(true)}
                                onIdle={() => setMapIdle(true)}
                                onMoveStart={() => setMapIdle(false)}
                                onError={() => setMapError(true)}
                                style={{ width: "100%", height: "100%" }}
                                minZoom={1}
                                maxZoom={12}
                                maxPitch={65}
                                cooperativeGestures
                                antialias
                                mapStyle="https://basemaps.cartocdn.com/gl/voyager-gl-style/style.json"
                            >
                                <NavigationControl
                                    position="top-left"
                                    showCompass
                                />
                                <Canvas
                                    latitude={51}
                                    longitude={0}
                                    frameloop={
                                        !(reduceMotion || instantCamera) &&
                                        selected.markers.some(
                                            (marker) => marker.img
                                        )
                                            ? "always"
                                            : "demand"
                                    }
                                >
                                    {TRAVEL_STOPS.map((stop, index) =>
                                        stop.markers.map(
                                            (marker, markerIndex) => (
                                                <TripPin
                                                    key={`${stop.id}-${markerIndex}`}
                                                    marker={{
                                                        ...marker,
                                                        img:
                                                            index ===
                                                                selectedIndex ||
                                                            visibleBounds?.contains(
                                                                [
                                                                    marker.longitude,
                                                                    marker.latitude
                                                                ]
                                                            )
                                                                ? index ===
                                                                      selectedIndex &&
                                                                  selectedVisit?.markerName ===
                                                                      marker.name
                                                                    ? selectedVisit.img ??
                                                                      marker.img
                                                                    : marker.img
                                                                : undefined
                                                    }}
                                                    selected={
                                                        index === selectedIndex
                                                    }
                                                    scale={pinScale}
                                                    onSelect={() => {
                                                        setSelectedIndex(index);
                                                        if (stop.visits)
                                                            setSelectedVisitId(
                                                                stop.visits.find(
                                                                    (visit) =>
                                                                        visit.markerName ===
                                                                            marker.name &&
                                                                        visit.kind ===
                                                                            "game"
                                                                )?.id ?? null
                                                            );
                                                        setSummaryOpen(true);
                                                    }}
                                                    year={stop.year}
                                                    reducedMotion={
                                                        reduceMotion ||
                                                        instantCamera
                                                    }
                                                />
                                            )
                                        )
                                    )}
                                </Canvas>
                            </Map>
                        </TravelFallback>
                    ) : (
                        <p role="status">
                            Your browser cannot display the 3D map. Trip
                            selection and summaries are still available.
                        </p>
                    )}
                    {webglAvailable && !mapReady && !mapError && (
                        <p className="travel-map-status" role="status">
                            Loading the 3D map…
                        </p>
                    )}
                    {mapError && (
                        <p className="travel-map-status" role="status">
                            Some map resources could not load. Trip selection
                            and summaries are still available.
                        </p>
                    )}
                    <p className="travel-map-hint">
                        Drag to explore · Use the zoom controls
                    </p>
                </div>
                {summaryOpen && (
                    <aside
                        id="travel-summary"
                        className={`travel-summary ${selected.visits ? "with-visits" : ""}`}
                        aria-labelledby="travel-summary-heading"
                        onKeyDown={(event) => {
                            if (event.key === "Escape") closeSummary();
                        }}
                    >
                        <div className="travel-summary-header">
                            <span>Trip summary</span>
                            <button
                                type="button"
                                aria-label="Close trip summary"
                                onClick={closeSummary}
                            >
                                ×
                            </button>
                        </div>
                        <div aria-live="polite" aria-atomic="true">
                            <p className="travel-year">{selected.year}</p>
                            <h4 id="travel-summary-heading">
                                {selected.title}
                            </h4>
                            {selected.visits && (
                                <section
                                    className="world-cup-visits"
                                    aria-label="World Cup visits"
                                >
                                    <h5>World Cup visits</h5>
                                    <p>
                                        Six attended games across four cities.
                                    </p>
                                    <div className="world-cup-game-buttons">
                                        {selected.visits.map((visit) => (
                                            <button
                                                type="button"
                                                key={visit.id}
                                                data-visit-id={visit.id}
                                                aria-pressed={
                                                    selectedVisit?.id ===
                                                    visit.id
                                                }
                                                onClick={() => {
                                                    setSelectedVisitId(
                                                        visit.id
                                                    );
                                                    if (
                                                        visit.id ===
                                                            selectedVisitId &&
                                                        visitMarker
                                                    ) {
                                                        const options = {
                                                            center: [
                                                                visitMarker.longitude,
                                                                visitMarker.latitude
                                                            ] as [
                                                                number,
                                                                number
                                                            ],
                                                            zoom: 7,
                                                            pitch: 50,
                                                            bearing: 0
                                                        };
                                                        if (
                                                            reduceMotion ||
                                                            instantCamera
                                                        )
                                                            mapRef.current?.jumpTo(
                                                                options
                                                            );
                                                        else
                                                            mapRef.current?.flyTo(
                                                                {
                                                                    ...options,
                                                                    duration: 1100
                                                                }
                                                            );
                                                    }
                                                }}
                                            >
                                                <span className="world-cup-visit-kind">
                                                    {visit.kind === "game"
                                                        ? "Game"
                                                        : "Fan experience"}
                                                </span>
                                                <strong>{visit.title}</strong>
                                                <span>
                                                    {visit.city} ·{" "}
                                                    <time dateTime={visit.date}>
                                                        {new Intl.DateTimeFormat(
                                                            "en-US",
                                                            {
                                                                month: "short",
                                                                day: "numeric",
                                                                timeZone: "UTC"
                                                            }
                                                        ).format(
                                                            new Date(
                                                                `${visit.date}T00:00:00Z`
                                                            )
                                                        )}
                                                    </time>
                                                </span>
                                            </button>
                                        ))}
                                    </div>
                                    {selectedVisit && (
                                        <p
                                            role="status"
                                            className="world-cup-selected"
                                        >
                                            {selectedVisit.kind === "game"
                                                ? "Selected game"
                                                : "Selected fan experience"}
                                            : {selectedVisit.title} ·{" "}
                                            {selectedVisit.city}
                                        </p>
                                    )}
                                </section>
                            )}
                            <h5>Broad regions</h5>
                            <ul>
                                {selected.regions.map((region) => (
                                    <li key={region}>{region}</li>
                                ))}
                            </ul>
                            <div
                                className="travel-location-controls"
                                aria-label="Locations in this trip"
                            >
                                {selected.markers.map((marker) => (
                                    <button
                                        type="button"
                                        key={marker.name}
                                        onClick={() =>
                                            mapRef.current?.jumpTo({
                                                center: [
                                                    marker.longitude,
                                                    marker.latitude
                                                ],
                                                zoom: 8
                                            })
                                        }
                                    >
                                        View {marker.name}
                                    </button>
                                ))}
                            </div>
                            <p className="travel-region-note">
                                Map pins represent broad geographic areas.
                            </p>
                        </div>
                        <div className="travel-summary-footer">
                            <span>
                                {timelineOrder.indexOf(selectedIndex) + 1} of{" "}
                                {TRAVEL_STOPS.length} entries
                            </span>
                        </div>
                    </aside>
                )}
            </div>
        </section>
    );
};

export default Travel;
