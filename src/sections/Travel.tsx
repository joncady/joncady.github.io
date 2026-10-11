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
    const selected = TRAVEL_STOPS[selectedIndex];
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
            center: selected.center,
            zoom: selected.zoom,
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
    }, [selected, mapReady, reduceMotion, instantCamera]);
    useEffect(() => {
        mapRef.current?.resize();
    }, [summaryOpen]);
    const move = (direction: number) =>
        setSelectedIndex(
            (index) =>
                (index + direction + TRAVEL_STOPS.length) % TRAVEL_STOPS.length
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
                <label htmlFor="travel-trip">
                    Choose a trip
                    <select
                        id="travel-trip"
                        value={selectedIndex}
                        onChange={(event) =>
                            setSelectedIndex(Number(event.target.value))
                        }
                    >
                        <optgroup label="Trips">
                            {TRAVEL_STOPS.map(
                                (stop, index) =>
                                    !stop.earlier && (
                                        <option key={stop.id} value={index}>
                                            {stop.title} · {stop.year}
                                        </option>
                                    )
                            )}
                        </optgroup>
                        <optgroup label="Earlier destinations">
                            {TRAVEL_STOPS.map(
                                (stop, index) =>
                                    stop.earlier && (
                                        <option key={stop.id} value={index}>
                                            {stop.title} · {stop.year}
                                        </option>
                                    )
                            )}
                        </optgroup>
                    </select>
                </label>
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
                                mapStyle="https://basemaps.cartocdn.com/gl/positron-gl-style/style.json"
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
                                                                ? marker.img
                                                                : undefined
                                                    }}
                                                    selected={
                                                        index === selectedIndex
                                                    }
                                                    scale={pinScale}
                                                    onSelect={() => {
                                                        setSelectedIndex(index);
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
                        className="travel-summary"
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
                            <p className="travel-year">
                                {selected.year}
                                {selected.earlier
                                    ? " · Earlier destination"
                                    : ""}
                            </p>
                            <h4 id="travel-summary-heading">
                                {selected.title}
                            </h4>
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
                                {selectedIndex + 1} of {TRAVEL_STOPS.length}{" "}
                                entries
                            </span>
                        </div>
                    </aside>
                )}
            </div>
        </section>
    );
};

export default Travel;
