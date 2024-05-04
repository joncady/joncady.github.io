import { Image, Text } from "@react-three/drei";
import "maplibre-gl/dist/maplibre-gl.css";
import React, { useRef, useState } from "react";
import Map from "react-map-gl/maplibre";
import { Canvas } from "react-three-map/maplibre";
import { Coordinates } from "react-three-map";
import { DoubleSide, Mesh } from "three";
import { useFrame, Vector3 } from "@react-three/fiber";
import { Button } from "react-bootstrap";
import { Map as MapGl } from "maplibre-gl";
import { Place, PLACES } from "./Helpers";

/**
 * TODO:
 * - Floating icons / something to represent place (finish)
 * - What happens when clicked or hovered? Pictures should show up / appear in 3D space
 */
const Travel = () => {
    const [currentIndex, setCurrentIndex] = useState(0);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const mapRef = useRef<any>(null);
    console.log(mapRef);

    const Controls = ({ map }: { map?: MapGl }) => {
        const onClick = (direction: string) => {
            let newIndex: number;
            if (direction === "forward") {
                newIndex =
                    currentIndex + 1 === PLACES.length ? 0 : currentIndex + 1;
            } else {
                newIndex =
                    currentIndex - 1 < 0 ? PLACES.length - 1 : currentIndex - 1;
            }
            const nextPlace = PLACES[newIndex];
            setCurrentIndex(newIndex);
            map?.flyTo({
                center: {
                    lat: nextPlace.latitude,
                    lon: nextPlace.longitude
                },
                zoom: 9,
                bearing: 0,

                // These options control the flight curve, making it move
                // slowly and zoom out almost completely before starting
                // to pan.
                speed: 2.5, // make the flying slow
                curve: 1, // change the speed at which it zooms out

                // this animation is considered essential with respect to prefers-reduced-motion
                essential: true
            });
            setCurrentIndex(newIndex);
        };

        return (
            <div
                style={{
                    position: "absolute",
                    width: "100%",
                    textAlign: "center",
                    bottom: 15
                }}
            >
                <Button
                    variant="primary"
                    onClick={() => onClick("backward")}
                    style={{ width: 200, height: 50, marginRight: 5 }}
                >
                    <i className="fa fa-arrow-left"></i>
                </Button>
                <Button
                    variant="primary"
                    onClick={() => onClick("forward")}
                    style={{ width: 200, height: 50, marginLeft: 5 }}
                >
                    <i className="fa fa-arrow-right"></i>
                </Button>
            </div>
        );
    };

    const Box = (props: { position: Vector3; img: string }) => {
        // This reference gives us direct access to the THREE.Mesh object
        const ref = useRef<Mesh>(null);
        // Subscribe this component to the render-loop, rotate the mesh every frame
        useFrame((_state, delta) => {
            if (!ref.current) return;
            ref.current.rotation.y += delta;
        });
        return (
            <mesh {...props} ref={ref}>
                <Image url={props.img} transparent side={DoubleSide} />
            </mesh>
        );
    };

    const renderPlace = ({ latitude, longitude, name, img }: Place) => {
        return (
            <Coordinates latitude={latitude} longitude={longitude}>
                <object3D scale={3000}>
                    <Box position={[0, 0, 0]} img={img} />
                    <Text position={[0, 1.5, 0]} color="darkblue">
                        {name}
                    </Text>
                </object3D>
            </Coordinates>
        );
    };

    const [viewState, setViewState] = React.useState<{
        zoom: number;
        latitude: number;
        longitude: number;
    }>({
        ...PLACES[currentIndex],
        zoom: 3.5
    });

    return (
        <div id="travel">
            <h3>Travel Log</h3>
            <section>
                I enjoy traveling and exploring new countries. Check out some
                pictures from my travels on my travel{" "}
                <a href="https://www.instagram.com/travelerjc/">Instagram</a>!
                I've created a travel log visualizer below to show my travels.
                Still a work in progress :)
            </section>
            <div style={{ position: "relative" }}>
                <Map
                    ref={mapRef}
                    style={{
                        height: "800px",
                        width: "100%"
                    }}
                    {...viewState}
                    onMove={(evt) => setViewState(evt.viewState)}
                    antialias
                    initialViewState={{
                        zoom: 13,
                        pitch: 60
                    }}
                    mapStyle="https://basemaps.cartocdn.com/gl/positron-gl-style/style.json"
                >
                    <Canvas latitude={51} longitude={0}>
                        {PLACES.map((place) => renderPlace(place))}
                    </Canvas>
                </Map>
                <Controls map={mapRef.current?.getMap()} />
            </div>
        </div>
    );
};

export default Travel;
