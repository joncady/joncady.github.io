import { PLACES } from "./Helpers";

export interface TravelMarker {
    name: string;
    img?: string;
    latitude: number;
    longitude: number;
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
}

const pixel = (id: string) => `/assets/travel-log/pixel-v1/${id}.png`;

// These rounded geographic anchors represent broad regions, not personal
// photo coordinates, exact visited locations, or a recorded route.
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
        title: "World Cup stadium trips",
        year: "2026",
        regions: ["Dallas", "New Jersey", "Miami", "Seattle"],
        markers: [
            {
                name: "Dallas",
                img: pixel("dallas-boot"),
                latitude: 33,
                longitude: -97
            },
            {
                name: "New Jersey",
                img: pixel("new-jersey-stadium"),
                latitude: 40,
                longitude: -74
            },
            {
                name: "Miami",
                img: pixel("miami-lifeguard"),
                latitude: 26,
                longitude: -80
            },
            {
                name: "Seattle",
                img: pixel("seattle-space-needle"),
                latitude: 48,
                longitude: -122
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
