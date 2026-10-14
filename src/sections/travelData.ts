// Explicit local-editor export. Review before copying into the portfolio.
export interface TravelMarker {
    name: string;
    img?: string;
    latitude: number;
    longitude: number;
}
export interface WorldCupVisit {
    id: string;
    kind: "game" | "fan-experience";
    date: string;
    title: string;
    city: string;
    markerName: string;
    img?: string;
}
export interface TravelStop {
    id: string;
    title: string;
    year: string;
    regions: string[];
    markers: TravelMarker[];
    center: [number, number];
    zoom: number;
    earlier?: boolean;
    visits?: WorldCupVisit[];
}
export const TRAVEL_STOPS: TravelStop[] = [
    {
        id: "alaska-2026",
        title: "Alaska",
        year: "2026",
        regions: ["Anchorage and Seward, Alaska"],
        markers: [
            {
                name: "Alaska",
                latitude: 61,
                longitude: -150,
                img: "/assets/travel-log/pixel-v1/alaska-iceberg.png"
            }
        ],
        center: [-150, 61],
        zoom: 5
    },
    {
        id: "world-cup-2026",
        title: "World Cup stadium trips",
        year: "2026",
        regions: ["Dallas", "New Jersey", "Miami", "Seattle"],
        markers: [
            {
                name: "Dallas",
                latitude: 32.8,
                longitude: -96.8,
                img: "/assets/travel-log/pixel-v1/dallas-boot.png"
            },
            {
                name: "New Jersey",
                latitude: 40.8,
                longitude: -74.1,
                img: "/assets/travel-log/pixel-v1/new-jersey-stadium.png"
            },
            {
                name: "Miami",
                latitude: 25.8,
                longitude: -80.2,
                img: "/assets/travel-log/pixel-v1/miami-lifeguard.png"
            },
            {
                name: "Seattle",
                latitude: 47.6,
                longitude: -122.3,
                img: "/assets/travel-log/pixel-v1/seattle-space-needle.png"
            }
        ],
        center: [-98, 39],
        zoom: 3.5,
        visits: [
            {
                id: "seattle-belgium-egypt-2026",
                kind: "game",
                date: "2026-06-15",
                title: "Belgium–Egypt",
                city: "Seattle",
                markerName: "Seattle",
                img: "/assets/travel-log/world-cup-v1/seattle-gloves-belgium-egypt.png"
            },
            {
                id: "dallas-japan-sweden-2026",
                kind: "game",
                date: "2026-06-25",
                title: "Japan–Sweden",
                city: "Dallas",
                markerName: "Dallas",
                img: "/assets/travel-log/world-cup-v1/dallas-cleat-japan-sweden.png"
            },
            {
                id: "new-jersey-panama-england-2026",
                kind: "game",
                date: "2026-06-27",
                title: "Panama–England",
                city: "New Jersey",
                markerName: "New Jersey",
                img: "/assets/travel-log/world-cup-v1/new-jersey-goal-panama-england.png"
            },
            {
                id: "seattle-belgium-senegal-2026",
                kind: "game",
                date: "2026-07-01",
                title: "Belgium–Senegal",
                city: "Seattle",
                markerName: "Seattle",
                img: "/assets/travel-log/world-cup-v1/seattle-whistle-belgium-senegal.png"
            },
            {
                id: "seattle-usa-belgium-2026",
                kind: "game",
                date: "2026-07-06",
                title: "USA–Belgium",
                city: "Seattle",
                markerName: "Seattle",
                img: "/assets/travel-log/world-cup-v1/seattle-ball-usa-belgium.png"
            },
            {
                id: "miami-norway-england-2026",
                kind: "game",
                date: "2026-07-11",
                title: "Norway–England",
                city: "Miami",
                markerName: "Miami",
                img: "/assets/travel-log/world-cup-v1/miami-corner-norway-england.png"
            }
        ]
    },
    {
        id: "train-2026",
        title: "Coast-to-coast train trip",
        year: "2026",
        regions: ["Pacific Northwest", "Midwest", "Northeast United States"],
        markers: [
            {
                name: "Pacific Northwest",
                latitude: 47,
                longitude: -122,
                img: "/assets/travel-log/pixel-v1/northwest-train.png"
            },
            {
                name: "Midwest",
                latitude: 42,
                longitude: -88,
                img: "/assets/travel-log/pixel-v1/midwest-rail.png"
            },
            {
                name: "Northeast",
                latitude: 41,
                longitude: -74,
                img: "/assets/travel-log/pixel-v1/northeast-station.png"
            }
        ],
        center: [-96, 39],
        zoom: 3.5
    },
    {
        id: "catalina-2026",
        title: "Catalina Island and return trip",
        year: "2026",
        regions: ["Catalina Island and California", "Pacific Northwest"],
        markers: [
            {
                name: "California",
                latitude: 35,
                longitude: -120,
                img: "/assets/travel-log/pixel-v1/california-catalina.png"
            },
            {
                name: "Pacific Northwest",
                latitude: 47,
                longitude: -122,
                img: "/assets/travel-log/pixel-v1/northwest-ferry.png"
            }
        ],
        center: [-120, 38],
        zoom: 4
    },
    {
        id: "japan-2025",
        title: "Japan",
        year: "2025",
        regions: ["Japan"],
        markers: [
            {
                name: "Japan",
                latitude: 36,
                longitude: 138,
                img: "/assets/travel-log/pixel-v1/japan-sushi.png"
            }
        ],
        center: [138, 36],
        zoom: 4.5
    },
    {
        id: "roche-harbor-2025",
        title: "Roche Harbor",
        year: "2025",
        regions: ["San Juan Island, Washington"],
        markers: [
            {
                name: "San Juan Islands",
                latitude: 48.5,
                longitude: -123,
                img: "/assets/travel-log/pixel-v1/san-juan-lighthouse.png"
            }
        ],
        center: [-123, 48.5],
        zoom: 7
    },
    {
        id: "singapore-taiwan-2024",
        title: "Singapore and Taiwan",
        year: "2024",
        regions: ["Singapore", "Taiwan"],
        markers: [
            {
                name: "Singapore",
                latitude: 1,
                longitude: 104,
                img: "/assets/travel-log/pixel-v1/singapore-merlion.png"
            },
            {
                name: "Taiwan",
                latitude: 24,
                longitude: 121,
                img: "/assets/travel-log/pixel-v1/taiwan-boba.png"
            }
        ],
        center: [113, 14],
        zoom: 3.2
    },
    {
        id: "uk-2023",
        title: "United Kingdom",
        year: "2023",
        regions: ["England", "Scotland"],
        markers: [
            {
                name: "England",
                latitude: 52,
                longitude: -2,
                img: "/assets/travel-log/pixel-v1/england-phone-box.png"
            },
            {
                name: "Scotland",
                latitude: 56,
                longitude: -4,
                img: "/assets/travel-log/pixel-v1/scotland-highland-cow.png"
            }
        ],
        center: [-3, 54],
        zoom: 4.8
    },
    {
        id: "japan-korea-2022",
        title: "Japan / Korea",
        year: "2022",
        regions: [
            "Seoul",
            "Busan",
            "Fukuoka",
            "Hiroshima",
            "Osaka",
            "Sapporo",
            "Tokyo"
        ],
        markers: [
            {
                name: "Seoul",
                latitude: 37.5519,
                longitude: 126.9918,
                img: "/assets/travel-log/pixel-v1/seoul-palace.png"
            },
            {
                name: "Busan",
                latitude: 35.21,
                longitude: 129.0689,
                img: "/assets/travel-log/pixel-v1/busan-bridge.png"
            },
            {
                name: "Fukuoka",
                latitude: 33.5902,
                longitude: 130.4017,
                img: "/assets/travel-log/pixel-v1/fukuoka-ramen.png"
            },
            {
                name: "Hiroshima",
                latitude: 34.3853,
                longitude: 132.4553,
                img: "/assets/travel-log/pixel-v1/hiroshima-crane.png"
            },
            {
                name: "Osaka",
                latitude: 34.6937,
                longitude: 135.5023,
                img: "/assets/travel-log/pixel-v1/osaka-castle.png"
            },
            {
                name: "Sapporo",
                latitude: 43.0618,
                longitude: 141.3545,
                img: "/assets/travel-log/pixel-v1/sapporo-clock.png"
            },
            {
                name: "Tokyo",
                latitude: 35.6764,
                longitude: 139.65,
                img: "/assets/travel-log/pixel-v1/tokyo-tower.png"
            }
        ],
        center: [135, 37],
        zoom: 4,
        earlier: true
    },
    {
        id: "chicago-2024",
        title: "Chicago",
        year: "2024",
        regions: ["Chicago"],
        markers: [
            {
                name: "Chicago",
                latitude: 41.8781,
                longitude: -87.6298,
                img: "/assets/travel-log/pixel-v1/chicago-cloud-gate.png"
            }
        ],
        center: [-87.6298, 41.8781],
        zoom: 8,
        earlier: true
    },
    {
        id: "nashville-2024",
        title: "Nashville",
        year: "2024",
        regions: ["Nashville"],
        markers: [
            {
                name: "Nashville",
                latitude: 36.1627,
                longitude: -86.7816,
                img: "/assets/travel-log/pixel-v1/nashville-guitar.png"
            }
        ],
        center: [-86.7816, 36.1627],
        zoom: 8,
        earlier: true
    }
];
export const RECENT_TRIPS = TRAVEL_STOPS.filter((trip) => !trip.earlier);
export const WORLD_CUP_VISITS = TRAVEL_STOPS.flatMap(
    (trip) => trip.visits || []
);
