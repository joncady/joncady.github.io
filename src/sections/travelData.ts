import { PLACES } from "./Helpers";

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

const pixel = (id: string) => `/assets/travel-log/pixel-v1/${id}.png`;

// These rounded geographic anchors represent broad regions, not personal
// photo coordinates, exact visited locations, or a recorded route.
// Match identities are confirmed stadium visits. July 6 USA–Belgium attendance
// was explicitly confirmed by the portfolio owner.
export const WORLD_CUP_VISITS: WorldCupVisit[] = [
    {
        id: "seattle-belgium-egypt-2026",
        img: "/assets/travel-log/world-cup-v1/seattle-gloves-belgium-egypt.png",
        kind: "game",
        date: "2026-06-15",
        title: "Belgium–Egypt",
        city: "Seattle",
        markerName: "Seattle"
    },
    {
        id: "dallas-japan-sweden-2026",
        img: "/assets/travel-log/world-cup-v1/dallas-cleat-japan-sweden.png",
        kind: "game",
        date: "2026-06-25",
        title: "Japan–Sweden",
        city: "Dallas",
        markerName: "Dallas"
    },
    {
        id: "new-jersey-panama-england-2026",
        img: "/assets/travel-log/world-cup-v1/new-jersey-goal-panama-england.png",
        kind: "game",
        date: "2026-06-27",
        title: "Panama–England",
        city: "New Jersey",
        markerName: "New Jersey"
    },
    {
        id: "seattle-belgium-senegal-2026",
        img: "/assets/travel-log/world-cup-v1/seattle-whistle-belgium-senegal.png",
        kind: "game",
        date: "2026-07-01",
        title: "Belgium–Senegal",
        city: "Seattle",
        markerName: "Seattle"
    },
    {
        id: "seattle-usa-belgium-2026",
        img: "/assets/travel-log/world-cup-v1/seattle-ball-usa-belgium.png",
        kind: "game",
        date: "2026-07-06",
        title: "USA–Belgium",
        city: "Seattle",
        markerName: "Seattle"
    },
    {
        id: "miami-norway-england-2026",
        img: "/assets/travel-log/world-cup-v1/miami-corner-norway-england.png",
        kind: "game",
        date: "2026-07-11",
        title: "Norway–England",
        city: "Miami",
        markerName: "Miami"
    }
];

export const RECENT_TRIPS: TravelStop[] = [
    {
        id: "alaska-2026",
        title: "Alaska",
        year: "2026",
        regions: ["Anchorage and Seward, Alaska"],
        markers: [
            {
                name: "Alaska",
                img: pixel("alaska-iceberg"),
                latitude: 61,
                longitude: -150
            }
        ],
        center: [-150, 61],
        zoom: 5
    },
    {
        id: "world-cup-2026",
        visits: WORLD_CUP_VISITS,
        title: "World Cup stadium trips",
        year: "2026",
        regions: ["Dallas", "New Jersey", "Miami", "Seattle"],
        markers: [
            {
                name: "Dallas",
                img: pixel("dallas-boot"),
                latitude: 32.8,
                longitude: -96.8
            },
            {
                name: "New Jersey",
                img: pixel("new-jersey-stadium"),
                latitude: 40.8,
                longitude: -74.1
            },
            {
                name: "Miami",
                img: pixel("miami-lifeguard"),
                latitude: 25.8,
                longitude: -80.2
            },
            {
                name: "Seattle",
                img: pixel("seattle-space-needle"),
                latitude: 47.6,
                longitude: -122.3
            }
        ],
        center: [-98, 39],
        zoom: 3.5
    },
    {
        id: "train-2026",
        title: "Coast-to-coast train trip",
        year: "2026",
        regions: ["Pacific Northwest", "Midwest", "Northeast United States"],
        markers: [
            {
                name: "Pacific Northwest",
                img: pixel("northwest-train"),
                latitude: 47,
                longitude: -122
            },
            {
                name: "Midwest",
                img: pixel("midwest-rail"),
                latitude: 42,
                longitude: -88
            },
            {
                name: "Northeast",
                img: pixel("northeast-station"),
                latitude: 41,
                longitude: -74
            }
        ],
        center: [-96, 39],
        zoom: 3.5
    },
    {
        id: "catalina-2026",
        title: "Catalina Island and return journey",
        year: "2026",
        regions: ["Catalina Island and California", "Pacific Northwest"],
        markers: [
            {
                name: "California",
                img: pixel("california-catalina"),
                latitude: 35,
                longitude: -120
            },
            {
                name: "Pacific Northwest",
                img: pixel("northwest-ferry"),
                latitude: 47,
                longitude: -122
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
                img: pixel("japan-sushi")
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
                img: pixel("san-juan-lighthouse"),
                latitude: 48.5,
                longitude: -123
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
                img: pixel("singapore-merlion")
            },
            {
                name: "Taiwan",
                latitude: 24,
                longitude: 121,
                img: pixel("taiwan-boba")
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
                img: pixel("england-phone-box"),
                latitude: 52,
                longitude: -2
            },
            {
                name: "Scotland",
                img: pixel("scotland-highland-cow"),
                latitude: 56,
                longitude: -4
            }
        ],
        center: [-3, 54],
        zoom: 4.8
    }
];

// Preserve the original public destination log; Singapore/Taiwan are represented
// in their confirmed 2024 trip above. Original PLACES entries remain unchanged.
const ORIGINAL_PIXEL_ASSETS: Record<string, string> = {
    Seoul: "seoul-palace",
    Busan: "busan-bridge",
    Fukuoka: "fukuoka-ramen",
    Hiroshima: "hiroshima-crane",
    Osaka: "osaka-castle",
    Sapporo: "sapporo-clock",
    Tokyo: "tokyo-tower",
    Chicago: "chicago-cloud-gate",
    Nashville: "nashville-guitar"
};

export const TRAVEL_STOPS: TravelStop[] = [
    ...RECENT_TRIPS,
    ...PLACES.filter(
        (place) =>
            !(
                place.year === "2024" &&
                ["Singapore", "Taipei"].includes(place.name)
            )
    ).map((place) => ({
        id: `${place.name.toLowerCase()}-${place.year}`,
        title: place.name,
        year: place.year,
        regions: [place.name],
        markers: [
            {
                name: place.name,
                img: ORIGINAL_PIXEL_ASSETS[place.name]
                    ? pixel(ORIGINAL_PIXEL_ASSETS[place.name])
                    : undefined,
                latitude: place.latitude,
                longitude: place.longitude
            }
        ],
        center: [place.longitude, place.latitude] as [number, number],
        zoom: 8,
        earlier: true
    }))
];
