// Selected, locally re-encoded images only. First photo is the trip cover.
export interface TravelPhoto {
    kind?: "image" | "video";
    src: string;
    alt: string;
    caption?: string;
}
export const TRAVEL_PHOTOS: Record<string, TravelPhoto[]> = {
    "alaska-2026": [
        {
            src: "/assets/travel-photos/alaska-2026/001.jpg",
            alt: "airport welcome to alaska sign"
        },
        {
            src: "/assets/travel-photos/alaska-2026/002.jpg",
            alt: "beautiful mountain reflected in lake"
        },
        {
            src: "/assets/travel-photos/alaska-2026/003.jpg",
            alt: "glacier picture on boat tour"
        },
        {
            src: "/assets/travel-photos/alaska-2026/004.jpg",
            alt: "kayaking in Resurrection Bay"
        },
        {
            src: "/assets/travel-photos/alaska-2026/005.jpg",
            alt: "plane window view of mountains"
        }
    ],
    "world-cup-2026": [
        {
            src: "/assets/travel-photos/world-cup-2026/001.jpg",
            alt: "sweden vs. japan stadium flags"
        },
        {
            src: "/assets/travel-photos/world-cup-2026/002.jpg",
            alt: "outside of Seattle Stadium waiting to enter"
        },
        {
            src: "/assets/travel-photos/world-cup-2026/003.jpg",
            alt: "posing with japanese fans"
        },
        {
            src: "/assets/travel-photos/world-cup-2026/004.jpg",
            alt: "English fans draping flags inside of Dream Mall"
        },
        {
            src: "/assets/travel-photos/world-cup-2026/005.jpg",
            alt: "Outside of MetLife"
        },
        {
            src: "/assets/travel-photos/world-cup-2026/006.jpg",
            alt: "panama vs. england stadium flags"
        },
        {
            src: "/assets/travel-photos/world-cup-2026/007.jpg",
            alt: "norway vs. england miami stadium"
        },
        {
            src: "/assets/travel-photos/world-cup-2026/008.jpg",
            alt: "pitch-side view of warm ups"
        }
    ],
    "train-2026": [
        {
            src: "/assets/travel-photos/train-2026/001.jpg",
            alt: "amtrak cascades train"
        },
        {
            src: "/assets/travel-photos/train-2026/002.jpg",
            alt: "reflection in window of Portland building"
        },
        {
            src: "/assets/travel-photos/train-2026/003.jpg",
            alt: "sunrise in glacier national park"
        },
        {
            src: "/assets/travel-photos/train-2026/004.jpg",
            alt: "snow on mountain in glacier park"
        },
        {
            src: "/assets/travel-photos/train-2026/005.jpg",
            alt: "breakfast in amtrak"
        },
        {
            src: "/assets/travel-photos/train-2026/006.jpg",
            alt: "chicago skyline looking up"
        },
        {
            src: "/assets/travel-photos/train-2026/007.jpg",
            alt: "selfie in Cloud Gate"
        },
        {
            src: "/assets/travel-photos/train-2026/008.jpg",
            alt: "hudson river"
        },
        {
            src: "/assets/travel-photos/train-2026/009.jpg",
            alt: "Times Square ending destination"
        }
    ],
    "catalina-2026": [
        {
            src: "/assets/travel-photos/catalina-2026/001.jpg",
            alt: "catalina island bay with boats"
        },
        {
            src: "/assets/travel-photos/catalina-2026/002.jpg",
            alt: "manhattan beach palm trees"
        },
        {
            src: "/assets/travel-photos/catalina-2026/003.jpg",
            alt: "kayaking in the bay"
        },
        {
            src: "/assets/travel-photos/catalina-2026/004.jpg",
            alt: "kasso skateboarding near long beach"
        },
        {
            src: "/assets/travel-photos/catalina-2026/005.jpg",
            alt: "roomette sleeping situation"
        },
        {
            src: "/assets/travel-photos/catalina-2026/006.jpg",
            alt: "marshes on the way up to washignton"
        },
        {
            src: "/assets/travel-photos/catalina-2026/007.jpg",
            alt: "king street station after long train ride"
        }
    ],
    "japan-2025": [
        {
            src: "/assets/travel-photos/japan-2025/001.jpg",
            alt: "Chureito pagoda"
        },
        {
            src: "/assets/travel-photos/japan-2025/002.jpg",
            alt: "One-Legged Torii Gate"
        },
        {
            src: "/assets/travel-photos/japan-2025/003.jpg",
            alt: "Windmills at Huis Ten Bosch"
        },
        {
            src: "/assets/travel-photos/japan-2025/004.jpg",
            alt: "Himeji castle"
        },
        {
            src: "/assets/travel-photos/japan-2025/005.jpg",
            alt: "Expo 2025"
        },
        {
            src: "/assets/travel-photos/japan-2025/006.jpg",
            alt: "Gundam pavilion"
        },
        {
            src: "/assets/travel-photos/japan-2025/007.jpg",
            alt: "Big N64 controller"
        },
        {
            src: "/assets/travel-photos/japan-2025/008.jpg",
            alt: "Hakone open air museum stain glass"
        }
    ],
    "roche-harbor-2025": [
        {
            src: "/assets/travel-photos/roche-harbor-2025/001.jpg",
            alt: "posing on the dock"
        },
        {
            src: "/assets/travel-photos/roche-harbor-2025/002.jpg",
            alt: "twin eagles"
        },
        {
            src: "/assets/travel-photos/roche-harbor-2025/003.jpg",
            alt: "sea lons"
        },
        {
            src: "/assets/travel-photos/roche-harbor-2025/004.jpg",
            alt: "lighthouse"
        },
        {
            src: "/assets/travel-photos/roche-harbor-2025/005.jpg",
            alt: "lighthouse pic"
        },
        {
            src: "/assets/travel-photos/roche-harbor-2025/006.jpg",
            alt: "close to eagle"
        },
        {
            src: "/assets/travel-photos/roche-harbor-2025/007.jpg",
            alt: "man and a dog"
        }
    ],
    "singapore-taiwan-2024": [
        {
            src: "/assets/travel-photos/singapore-taiwan-2024/001.jpg",
            alt: "lunar new year temple"
        },
        {
            src: "/assets/travel-photos/singapore-taiwan-2024/002.jpg",
            alt: "kaya toast breakfast"
        },
        {
            src: "/assets/travel-photos/singapore-taiwan-2024/003.jpg",
            alt: "earl gray pear pancakes"
        },
        {
            src: "/assets/travel-photos/singapore-taiwan-2024/004.jpg",
            alt: "chinese desserts"
        },
        {
            src: "/assets/travel-photos/singapore-taiwan-2024/005.jpg",
            alt: "arab street singapore"
        },
        {
            src: "/assets/travel-photos/singapore-taiwan-2024/006.jpg",
            alt: "post-dinner view of empty plates"
        },
        {
            src: "/assets/travel-photos/singapore-taiwan-2024/007.jpg",
            alt: "Chiang Kai-shek Memorial Hall"
        },
        {
            src: "/assets/travel-photos/singapore-taiwan-2024/008.jpg",
            alt: "ximending walking district"
        },
        {
            src: "/assets/travel-photos/singapore-taiwan-2024/009.jpg",
            alt: "sloths at the zoo"
        },
        {
            src: "/assets/travel-photos/singapore-taiwan-2024/010.jpg",
            alt: "rolling mountains near tea houses"
        },
        {
            src: "/assets/travel-photos/singapore-taiwan-2024/011.jpg",
            alt: "wait for gondola back"
        },
        {
            src: "/assets/travel-photos/singapore-taiwan-2024/012.jpg",
            alt: "michelin dessert"
        },
        {
            src: "/assets/travel-photos/singapore-taiwan-2024/013.jpg",
            alt: "cats"
        },
        {
            src: "/assets/travel-photos/singapore-taiwan-2024/014.jpg",
            alt: "mt keelung"
        },
        {
            src: "/assets/travel-photos/singapore-taiwan-2024/015.jpg",
            alt: "sentosa island gondolas"
        },
        {
            src: "/assets/travel-photos/singapore-taiwan-2024/016.jpg",
            alt: "marina bay stands"
        },
        {
            src: "/assets/travel-photos/singapore-taiwan-2024/017.jpg",
            alt: "monkey"
        }
    ],
    "uk-2023": [
        {
            src: "/assets/travel-photos/uk-2023/001.jpg",
            alt: "welcome to uk sign"
        },
        {
            src: "/assets/travel-photos/uk-2023/002.jpg",
            alt: "buckingham palace"
        },
        {
            src: "/assets/travel-photos/uk-2023/003.jpg",
            alt: "westminster abbey"
        },
        {
            src: "/assets/travel-photos/uk-2023/004.jpg",
            alt: "big ben"
        },
        {
            src: "/assets/travel-photos/uk-2023/005.jpg",
            alt: "stone henge"
        },
        {
            src: "/assets/travel-photos/uk-2023/006.jpg",
            alt: "tottenham hotspur stadium"
        },
        {
            src: "/assets/travel-photos/uk-2023/007.jpg",
            alt: "royal mile"
        },
        {
            src: "/assets/travel-photos/uk-2023/008.jpg",
            alt: "Edinburgh from castle"
        },
        {
            src: "/assets/travel-photos/uk-2023/009.jpg",
            alt: "dean village"
        },
        {
            src: "/assets/travel-photos/uk-2023/010.jpg",
            alt: "fish and chips"
        },
        {
            src: "/assets/travel-photos/uk-2023/011.jpg",
            alt: "tottenham game"
        },
        {
            src: "/assets/travel-photos/uk-2023/012.jpg",
            alt: "seven sisters"
        },
        {
            src: "/assets/travel-photos/uk-2023/013.jpg",
            alt: "view from plane"
        }
    ],
    "japan-korea-2022": [
        {
            src: "/assets/travel-photos/japan-korea-2022/001.jpg",
            alt: "in front of blue house"
        },
        {
            src: "/assets/travel-photos/japan-korea-2022/002.jpg",
            alt: "cafe in old style"
        },
        {
            src: "/assets/travel-photos/japan-korea-2022/003.jpg",
            alt: "eva robot"
        },
        {
            src: "/assets/travel-photos/japan-korea-2022/004.jpg",
            alt: "market in seoul"
        },
        {
            src: "/assets/travel-photos/japan-korea-2022/005.jpg",
            alt: "view near n seoul tower"
        },
        {
            src: "/assets/travel-photos/japan-korea-2022/006.jpg",
            alt: "dmz"
        },
        {
            src: "/assets/travel-photos/japan-korea-2022/007.jpg",
            alt: "starfield coex library"
        },
        {
            src: "/assets/travel-photos/japan-korea-2022/008.jpg",
            alt: "view of seoul"
        },
        {
            src: "/assets/travel-photos/japan-korea-2022/009.jpg",
            alt: "gamcheon village"
        },
        {
            src: "/assets/travel-photos/japan-korea-2022/010.jpg",
            alt: "flower park near fukuoka"
        },
        {
            src: "/assets/travel-photos/japan-korea-2022/011.jpg",
            alt: "lunch set on island"
        },
        {
            src: "/assets/travel-photos/japan-korea-2022/012.jpg",
            alt: "nanzo-in leaning budha"
        },
        {
            src: "/assets/travel-photos/japan-korea-2022/013.jpg",
            alt: "famous tori gate"
        },
        {
            src: "/assets/travel-photos/japan-korea-2022/014.jpg",
            alt: "pikachu in pokemon cae"
        },
        {
            src: "/assets/travel-photos/japan-korea-2022/015.jpg",
            alt: "osaka water front"
        },
        {
            src: "/assets/travel-photos/japan-korea-2022/016.jpg",
            alt: "view from mt. moiwa"
        },
        {
            src: "/assets/travel-photos/japan-korea-2022/017.jpg",
            alt: "walking gundam yokohama"
        },
        {
            src: "/assets/travel-photos/japan-korea-2022/018.jpg",
            alt: "unicorn gundam"
        },
        {
            src: "/assets/travel-photos/japan-korea-2022/019.jpg",
            alt: "nara deer wanting cracker"
        }
    ],
    "chicago-2024": [
        {
            src: "/assets/travel-photos/chicago-2024/001.jpg",
            alt: "chicago waterfront"
        },
        {
            src: "/assets/travel-photos/chicago-2024/002.jpg",
            alt: "more buildings"
        },
        {
            src: "/assets/travel-photos/chicago-2024/003.jpg",
            alt: "some art near the water front"
        },
        {
            src: "/assets/travel-photos/chicago-2024/004.jpg",
            alt: "chicago theater"
        },
        {
            src: "/assets/travel-photos/chicago-2024/005.jpg",
            alt: "Bull's game"
        }
    ],
    "nashville-2024": [
        {
            src: "/assets/travel-photos/nashville-2024/001.jpg",
            alt: "cowboy bebop live"
        },
        {
            src: "/assets/travel-photos/nashville-2024/002.jpg",
            alt: "broadway street"
        },
        {
            src: "/assets/travel-photos/nashville-2024/003.jpg",
            alt: "premier league live"
        },
        {
            src: "/assets/travel-photos/nashville-2024/004.jpg",
            alt: "nashville fc game"
        },
        {
            src: "/assets/travel-photos/nashville-2024/005.jpg",
            alt: "watching tottenham play"
        }
    ]
};
