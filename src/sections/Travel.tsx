import { TRAVEL_PHOTOS } from "./travelPhotos";
import { TRAVEL_VIDEOS } from "./travelVideos";
import { TRAVEL_DETAILS } from "./travelDetails";
import React, { Suspense, useEffect, useMemo, useRef, useState } from "react";
import { Billboard, Text, useTexture } from "@react-three/drei";
import "maplibre-gl/dist/maplibre-gl.css";
import { useFrame } from "@react-three/fiber";
import { DoubleSide, Group, NearestFilter } from "three";
import Map, { MapRef } from "react-map-gl/maplibre";
import { Canvas, Coordinates } from "react-three-map/maplibre";
import { TRAVEL_STOPS, TravelMarker } from "./travelData";
import { supportsWebGL, TravelFallback } from "./TravelFallback";

const formatTripDate = (date: string) =>
    new Intl.DateTimeFormat("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
        timeZone: "UTC"
    }).format(new Date(`${date}T00:00:00Z`));

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
    const [photoSelection, setPhotoSelection] = useState({
        tripId: "",
        index: 0
    });
    const [slideshowPlaying, setSlideshowPlaying] = useState(false);
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
    const [newestFirst, setNewestFirst] = useState(false);
    const timelineOrder = useMemo(() => {
        const order = TRAVEL_STOPS.map((_, index) => index).sort(
            (a, b) =>
                Number(TRAVEL_STOPS[b].year) - Number(TRAVEL_STOPS[a].year)
        );
        return newestFirst ? order : order.reverse();
    }, [newestFirst]);
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
    }, [selectedIndex, reduceMotion, instantCamera, timelineOrder]);
    const selected = TRAVEL_STOPS[selectedIndex];
    const selectedDetails = TRAVEL_DETAILS[selected.id];
    const photos = [
        ...(TRAVEL_PHOTOS[selected.id] ?? []),
        ...(TRAVEL_VIDEOS[selected.id] ?? [])
    ];
    const photoIndex =
        photoSelection.tripId === selected.id
            ? photoSelection.index % Math.max(photos.length, 1)
            : 0;
    const activePhoto = photos[photoIndex];
    const movePhoto = (step: number) => {
        setSlideshowPlaying(false);
        setPhotoSelection({
            tripId: selected.id,
            index: (photoIndex + step + photos.length) % photos.length
        });
    };
    useEffect(() => {
        setSlideshowPlaying(false);
    }, [selected.id]);
    useEffect(() => {
        if (activePhoto?.kind === "video") setSlideshowPlaying(false);
    }, [activePhoto?.kind]);
    useEffect(() => {
        if (
            !slideshowPlaying ||
            photos.length < 2 ||
            activePhoto?.kind === "video"
        )
            return;
        const timer = window.setInterval(
            () =>
                setPhotoSelection((current) => ({
                    tripId: selected.id,
                    index:
                        ((current.tripId === selected.id ? current.index : 0) +
                            1) %
                        photos.length
                })),
            4000
        );
        return () => window.clearInterval(timer);
    }, [slideshowPlaying, selected.id, photos.length, activePhoto?.kind]);

    const [selectedVisitId, setSelectedVisitId] = useState<string | null>(null);
    const [selectedRegionIndex, setSelectedRegionIndex] = useState(0);
    const pendingStepDirection = useRef(0);
    useEffect(() => {
        const enterAtEnd = pendingStepDirection.current < 0;
        pendingStepDirection.current = 0;
        setSelectedRegionIndex(
            enterAtEnd ? Math.max(0, selected.markers.length - 1) : 0
        );
        setSelectedVisitId(
            enterAtEnd
                ? selected.visits?.[selected.visits.length - 1]?.id ?? null
                : null
        );
    }, [selected.id]);
    const selectedVisit =
        selected.visits?.find((visit) => visit.id === selectedVisitId) ??
        selected.visits?.[0];
    const selectedRegion =
        selected.markers[selectedRegionIndex] ?? selected.markers[0];
    const visitMarker = selectedVisit
        ? selected.markers.find(
              (marker) => marker.name === selectedVisit.markerName
          )
        : selectedRegion;
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
            zoom: selectedVisit
                ? 7
                : selected.markers.length > 1
                  ? 8
                  : selected.zoom,
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
    const moveLocation = (direction: number) => {
        const count = selected.visits?.length ?? selected.markers.length;
        const index = selected.visits
            ? selected.visits.findIndex(
                  (visit) => visit.id === selectedVisit?.id
              )
            : selectedRegionIndex;
        const next = index + direction;
        if (next < 0 || next >= count) {
            pendingStepDirection.current = direction;
            move(direction);
        } else if (selected.visits)
            setSelectedVisitId(selected.visits[next].id);
        else setSelectedRegionIndex(next);
    };
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
                    <p className="eyebrow">03 / Travel Log</p>
                    <h2 id="travel-log-heading">Travel Log</h2>
                    <p>
                        Select a trip to see the places I visited. More photos
                        on{" "}
                        <a href="https://www.instagram.com/travelerjc/">
                            Instagram
                        </a>
                        .
                    </p>
                </div>
            </div>
            <div
                className={`travel-stage ${summaryOpen ? "with-summary" : ""}`}
            >
                <aside
                    className="travel-gallery"
                    aria-label="Trip photos and videos"
                >
                    <h3>Photos &amp; videos / {selected.title}</h3>
                    {activePhoto ? (
                        <div
                            className="travel-photo-viewer"
                            onKeyDown={(event) => {
                                if (event.target instanceof HTMLVideoElement)
                                    return;
                                if (
                                    event.key === "ArrowLeft" ||
                                    event.key === "ArrowRight"
                                ) {
                                    event.preventDefault();
                                    movePhoto(
                                        event.key === "ArrowLeft" ? -1 : 1
                                    );
                                }
                            }}
                        >
                            <figure>
                                {activePhoto.kind === "video" ? (
                                    <video
                                        key={activePhoto.src}
                                        src={activePhoto.src}
                                        aria-label={activePhoto.alt}
                                        controls
                                        playsInline
                                        preload="metadata"
                                        onPlay={() =>
                                            setSlideshowPlaying(false)
                                        }
                                    />
                                ) : (
                                    <img
                                        src={activePhoto.src}
                                        alt={activePhoto.alt}
                                    />
                                )}
                                {activePhoto.caption && (
                                    <figcaption>
                                        {activePhoto.caption}
                                    </figcaption>
                                )}
                            </figure>
                            <div className="travel-photo-controls">
                                <button
                                    type="button"
                                    aria-label="Previous photo"
                                    disabled={photos.length < 2}
                                    onClick={() => movePhoto(-1)}
                                >
                                    ←
                                </button>
                                <span aria-live="polite">
                                    {photoIndex + 1} / {photos.length}
                                </span>
                                <button
                                    type="button"
                                    aria-label="Next photo"
                                    disabled={photos.length < 2}
                                    onClick={() => movePhoto(1)}
                                >
                                    →
                                </button>
                                <button
                                    type="button"
                                    disabled={
                                        photos.length < 2 ||
                                        activePhoto.kind === "video"
                                    }
                                    aria-pressed={slideshowPlaying}
                                    onClick={() =>
                                        setSlideshowPlaying(
                                            (playing) => !playing
                                        )
                                    }
                                >
                                    {slideshowPlaying ? "Pause" : "Play"}
                                </button>
                            </div>
                        </div>
                    ) : (
                        <div className="travel-gallery-empty">
                            <span>No photos added for this trip.</span>
                        </div>
                    )}
                </aside>
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
                                interactive={false}
                                scrollZoom={false}
                                dragPan={false}
                                dragRotate={false}
                                doubleClickZoom={false}
                                touchZoomRotate={false}
                                touchPitch={false}
                                keyboard={false}
                                antialias
                                mapStyle="https://basemaps.cartocdn.com/gl/voyager-gl-style/style.json"
                            >
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
                        Drag to pan · Use the zoom controls
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
                            {selectedDetails?.startDate && (
                                <p className="travel-dates">
                                    <time dateTime={selectedDetails.startDate}>
                                        {formatTripDate(
                                            selectedDetails.startDate
                                        )}
                                    </time>
                                    {selectedDetails.endDate && (
                                        <>
                                            {" – "}
                                            <time
                                                dateTime={
                                                    selectedDetails.endDate
                                                }
                                            >
                                                {formatTripDate(
                                                    selectedDetails.endDate
                                                )}
                                            </time>
                                        </>
                                    )}
                                </p>
                            )}
                            {selectedDetails?.summary && (
                                <p className="travel-story">
                                    {selectedDetails.summary}
                                </p>
                            )}
                            {selected.visits && (
                                <section
                                    className="world-cup-visits"
                                    aria-label="World Cup visits"
                                >
                                    <h5>World Cup visits</h5>
                                    <p>I attended six games in four cities.</p>
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
                                        aria-pressed={
                                            !selected.visits &&
                                            selectedRegion?.name === marker.name
                                        }
                                        onClick={() => {
                                            if (selected.visits)
                                                setSelectedVisitId(
                                                    selected.visits.find(
                                                        (visit) =>
                                                            visit.markerName ===
                                                            marker.name
                                                    )?.id ?? null
                                                );
                                            else
                                                setSelectedRegionIndex(
                                                    selected.markers.indexOf(
                                                        marker
                                                    )
                                                );
                                        }}
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
                <div
                    className="travel-dock"
                    aria-label="Travel timeline and navigation"
                >
                    <div className="travel-hud" aria-label="Trip navigation">
                        <div className="travel-hud-title">
                            <span>{selected.year}</span>
                            <strong>{selected.title}</strong>
                            <span>
                                {timelineOrder.indexOf(selectedIndex) + 1} /{" "}
                                {timelineOrder.length}
                            </span>
                        </div>
                        <p className="travel-hud-location" aria-live="polite">
                            {selectedVisit
                                ? `${selectedVisit.title} · ${selectedVisit.city}`
                                : selectedRegion?.name}
                        </p>
                        <div className="travel-buttons">
                            <button
                                type="button"
                                onClick={() => moveLocation(-1)}
                                aria-label="Previous location or trip"
                                title="Previous"
                            >
                                <span aria-hidden="true">{"<"}</span>
                            </button>
                            <button
                                type="button"
                                onClick={() => moveLocation(1)}
                                aria-label="Next location or trip"
                                title="Next"
                            >
                                <span aria-hidden="true">{">"}</span>
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
                        </div>{" "}
                    </div>
                    <div className="travel-toolbar">
                        <div className="travel-timeline-order">
                            <span aria-live="polite">
                                {newestFirst ? "Newest first" : "Oldest first"}
                            </span>
                            <button
                                type="button"
                                aria-label={
                                    newestFirst
                                        ? "Show oldest trips first"
                                        : "Show newest trips first"
                                }
                                title={
                                    newestFirst
                                        ? "Show oldest trips first"
                                        : "Show newest trips first"
                                }
                                aria-controls="trip-timeline"
                                onClick={() =>
                                    setNewestFirst((value) => !value)
                                }
                            >
                                <svg
                                    width="20"
                                    height="20"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    aria-hidden="true"
                                >
                                    <path
                                        d={
                                            newestFirst
                                                ? "M7 4v16m-4-4 4 4 4-4"
                                                : "M7 20V4m-4 4 4-4 4 4"
                                        }
                                    />
                                    <path d="M15 5h6M15 12h4M15 19h2" />
                                </svg>
                            </button>
                        </div>
                        <div className="reel-window">
                            <div
                                id="trip-timeline"
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
                                            TRAVEL_STOPS[
                                                timelineOrder[position - 1]
                                            ].year;
                                    return (
                                        <div
                                            className="travel-timeline-entry"
                                            key={stop.id}
                                            style={{
                                                transform: `perspective(700px) rotateY(${Math.max(-25, Math.min(25, (position - timelineOrder.indexOf(selectedIndex)) * -9))}deg)`
                                            }}
                                        >
                                            <span
                                                className="travel-timeline-year"
                                                aria-hidden="true"
                                            >
                                                {showYear ||
                                                index === selectedIndex
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
                                                onClick={() =>
                                                    setSelectedIndex(index)
                                                }
                                                onKeyDown={(event) => {
                                                    const direction =
                                                        event.key ===
                                                        "ArrowRight"
                                                            ? 1
                                                            : event.key ===
                                                                "ArrowLeft"
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
                                                            : event.key ===
                                                                "End"
                                                              ? timelineOrder[
                                                                    timelineOrder.length -
                                                                        1
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
                                                        ?.focus();
                                                }}
                                            >
                                                <span
                                                    className="travel-timeline-dot"
                                                    aria-hidden="true"
                                                />
                                                <span
                                                    className="reel-frame-number"
                                                    aria-hidden="true"
                                                >
                                                    {String(
                                                        position + 1
                                                    ).padStart(2, "0")}
                                                </span>
                                                <span className="reel-frame-title">
                                                    {stop.title}
                                                </span>
                                            </button>
                                        </div>
                                    );
                                })}
                            </div>
                            <span
                                className="reel-playhead"
                                aria-hidden="true"
                            />
                        </div>
                    </div>
                    <label className="travel-motion-choice">
                        <input
                            type="checkbox"
                            checked={reduceMotion || instantCamera}
                            disabled={reduceMotion}
                            onChange={(event) =>
                                setInstantCamera(event.target.checked)
                            }
                        />
                        Reduce motion
                        {reduceMotion ? " (system preference)" : ""}
                    </label>
                </div>
            </div>
        </section>
    );
};

export default Travel;
