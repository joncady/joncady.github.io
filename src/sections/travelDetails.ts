// Optional companion data: integrate into the UI explicitly.
export interface TravelDetails {
    summary?: string;
    startDate?: string;
    endDate?: string;
}
export const TRAVEL_DETAILS: Record<string, TravelDetails> = {
    "alaska-2026": {
        summary:
            "I took a short getaway to Anchorage, primarily to ride the Coastal Classic train down to Seward.",
        startDate: "2026-05-22",
        endDate: "2026-05-26"
    },
    "world-cup-2026": {
        summary:
            "I traveled to watch some of my favorite countries play in the World Cup."
    },
    "train-2026": {
        summary:
            "I set a goal: travel coast to coast without taking a car. I took the Amtrak Cascades down to Portland, then the Empire Builder over to Chicago, and lastly, and the overnight Lakeshore Limited to New York."
    },
    "catalina-2026": {
        summary:
            "I took a one way flight down to California to explore Long Beach, attend Kasso, a skateboarding competition, and stay the night on Catalina Island. I took the Coast Starlight home.",
        startDate: "2026-03-18",
        endDate: "2026-03-23"
    },
    "japan-2025": {
        summary:
            "I did a 3 week trip to Japan with a friend. We took bullet trains from Nagasaki to Tokyo, and then I drove 3 days around Mt. Fuji.",
        startDate: "2025-10-06",
        endDate: "2025-10-24"
    },
    "roche-harbor-2025": {
        summary: "I took a quick trip up to the San Juans. Gorgeous!",
        startDate: "2025-04-12",
        endDate: "2025-04-15"
    },
    "singapore-taiwan-2024": {
        summary:
            "I visited my friend in Singapore, and took a quick detour over to Taiwan.",
        startDate: "2024-02-04",
        endDate: "2024-02-18"
    },
    "uk-2023": {
        summary:
            "I took a quick trip across the pond to visit England and Scotland."
    },
    "japan-korea-2022": {
        summary:
            "I embarked on a 3 week solo trip to Korea and Japan. Got to experience so many cool places.",
        startDate: "2022-10-28",
        endDate: "2022-11-20"
    },
    "chicago-2024": {
        summary: "Short trip over to the Windy City for the first time.",
        startDate: "2024-03-08",
        endDate: "2024-03-12"
    },
    "nashville-2024": {
        summary:
            "I attended Premier League Live in Nashville and hit the honky-tonks after.",
        startDate: "2024-04-03",
        endDate: "2024-04-08"
    }
};
