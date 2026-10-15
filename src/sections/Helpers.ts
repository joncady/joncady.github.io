export interface Project {
    title: string;
    filters: string[];
    link?: string;
    content: string;
    tech: string[];
    src: string;
}

export const webDevProjects: Project[] = [
    {
        title: "Raspberry Pi Transit Display",
        filters: ["React", "Python", "Raspberry Pi"],
        link: "https://github.com/joncady/OneBusAwayTransitTimesForPi",
        content:
            "I built a React and Python app that displays live transit arrivals on a Raspberry Pi touchscreen. Scheduled wake times and idle polling controls keep the display active when needed.",
        tech: ["react", "python"],
        src: "transit.jpg"
    },
    {
        title: "Yelp Business App",
        filters: ["R, Shiny", "Yelp API"],
        link: "https://jit98.shinyapps.io/BE-shrug/",
        content:
            "I built a web app with a team to display business information from the Yelp API.",
        tech: ["r-project", "yelp"],
        src: "yelp.PNG"
    },
    {
        title: "Rate My Professor MyPlanExtension",
        filters: ["CSS", "JavaScript", "PHP"],
        link: "https://github.com/joncady/rmpUW",
        content:
            "I designed a Chrome extension that displays the professor's RateMyProfessor score next to their course. Used by students at the University of Washington.",
        tech: ["php", "js"],
        src: "rmp.PNG"
    },
    {
        title: "FeelingFeed",
        filters: ["JavaScript", "Bootstrap", "PHP"],
        link: "https://github.com/joncady/dubhacks18",
        content: "I developed a dynamic website with teammates at a hackathon.",
        tech: ["php", "js", "html5"],
        src: "feeling.png"
    },
    {
        title: "SpotiViz",
        filters: ["React", "Node"],
        content:
            "I built a React app with classmates that displays an album timeline using the Spotify API.",
        tech: ["react", "node-js"],
        src: "spotify.PNG"
    },
    {
        title: "help.me",
        filters: ["React", "Firebase"],
        link: "https://joncady.github.io/help.me/",
        content:
            "I worked with a team at a hackathon to build an emotional support chatbot with user authentication.",
        tech: ["react"],
        src: "help.PNG"
    },
    {
        title: "Fire Emblem Adventures",
        filters: ["Phaser 3", "TypeScript", "Vite"],
        link: "https://joncady.github.io/feadventures/",
        content:
            "I rebuilt my Fire Emblem-inspired browser game with Phaser and TypeScript, adding real-time party combat, mission objectives, equipment and forging, earned XP, browser saves, and keyboard, mouse and touch controls.",
        tech: ["js", "html5", "css3"],
        src: "fire-emblem-current.png"
    },
    {
        title: "Satellite Smash Brand Website",
        filters: ["React", "Firebase"],
        link: "https://satellitesmash.com/",
        content:
            "I developed a React app with a player database, news feed, and client-side routing between pages.",
        tech: ["react"],
        src: "ss.PNG"
    },
    {
        title: "DuetWithMe",
        filters: ["React", "Node", "Speech-to-Text"],
        link: "https://devpost.com/software/duetwithme-fu9y5p",
        content:
            "I worked with a team at a hackathon to build a web app that responds to voice commands and plays with the user.",
        tech: ["react", "node-js", "microsoft"],
        src: "duet.PNG"
    },
    {
        title: "Draw with Me",
        filters: ["React", "Socket IO", "Node"],
        link: "https://joncady.github.io/draw-with-me/",
        content:
            "I designed a drawing app that lets users draw together online in real time and save their pictures.",
        tech: ["react", "node-js"],
        src: "draw.PNG"
    },
    {
        title: "ShipShop",
        filters: ["Angular", "NodeJS", "Python"],
        link: "https://devpost.com/software/ship-shop",
        content:
            "I worked with a team to build an e-commerce tool to reduce food waste. We won first place at T-Mobile's NB-IoT Hackathon.",
        tech: ["angular", "node-js", "python"],
        src: "shipshop.png"
    },
    {
        title: "Ticketmaster Event Finder",
        filters: ["React"],
        link: "https://github.com/joncady/seahacks",
        content:
            "I worked with other interns at a Ticketmaster hackathon to build an interactive map of local events.",
        tech: ["react"],
        src: "tm.PNG"
    },
    {
        title: "FreShip",
        filters: ["Python", "Angular", "IBM Cloud"],
        link: "https://www.zdnet.com/article/ibm-hackathon-winner-helps-fight-rash-of-wasted-food/",
        content:
            "Our team won the IBM Food Waste Virtual Hackathon with FreShip.",
        tech: ["python", "angular"],
        src: "freship.png"
    },
    {
        title: "Snack Saver",
        filters: ["React", "Firebase"],
        link: "https://devpost.com/software/snacksaver",
        content:
            "I worked with a team at DubHacks to build a proof of concept for Snack Saver, a platform intended to help students choose healthy, less expensive food options.",
        tech: ["react", "node-js"],
        src: "snacksaver.PNG"
    },
    {
        title: "Vocaby",
        filters: ["React", "Chrome Extension"],
        link: "https://vocaby.app/",
        content:
            "I managed a project that started at a hackathon: a Chrome extension for looking up definitions and saving vocabulary words.",
        tech: ["react", "chrome"],
        src: "vocaby.png"
    },
    {
        title: "Stream Dashboard",
        filters: ["React", "Electron", "Socket IO"],
        link: "https://github.com/joncady/stream-dashboard",
        content:
            "I wrote a multi-platform desktop application with Electron to update HTML overlays for live streams. It fetches player tags and metadata from the start.gg API and sends updates through Socket.IO in real time. It has been used at the Port Priority Smash Bros. tournament series in Seattle.",
        tech: ["react"],
        src: "dashboard.png"
    }
];

export const mobileDevProjects: Project[] = [
    {
        title: "Monitood: Monitor your Food",
        filters: ["React Native"],
        link: "https://github.com/joncady/monitoodApp",
        content:
            "I designed the React Native front end for an app that stores user information in a Python back end.",
        tech: ["react"],
        src: "monitood.png"
    },
    {
        title: "Solace: Connect, Plan, Support",
        filters: ["Swift"],
        link: "https://stanfchristina.github.io/solace-landing/",
        content:
            "Solace is a free iOS app that provides resources, information, and connections for survivors of domestic violence, including those quarantined with their partners. I implemented chat and other core features.",
        tech: ["swift"],
        src: "solace.png"
    }
];

export interface Trip {
    countryName: string;
    pictures: string[];
    date: string;
}

export interface Place {
    latitude: number;
    longitude: number;
    name: string;
    year: string;
    img: string;
}

export const PLACES: Place[] = [
    {
        latitude: 37.5519,
        longitude: 126.9918,
        name: "Seoul",
        year: "2022",
        img: "https://cdn-icons-png.flaticon.com/512/2252/2252075.png"
    },
    {
        latitude: 35.21,
        longitude: 129.0689,
        name: "Busan",
        year: "2022",
        img: "https://cdn-icons-png.flaticon.com/512/2252/2252075.png"
    },
    {
        latitude: 33.5902,
        longitude: 130.4017,
        name: "Fukuoka",
        year: "2022",
        img: "https://cdn-icons-png.flaticon.com/512/2252/2252075.png"
    },
    {
        latitude: 34.3853,
        longitude: 132.4553,
        name: "Hiroshima",
        year: "2022",
        img: "https://png.pngtree.com/png-vector/20220713/ourmid/pngtree-vector-illustration-of-miyajima-monument-of-japan-asian-buddhist-oriental-vector-png-image_32698646.png"
    },
    {
        latitude: 34.6937,
        longitude: 135.5023,
        name: "Osaka",
        year: "2022",
        img: "https://cdn-icons-png.flaticon.com/256/13152/13152135.png"
    },
    {
        latitude: 43.0618,
        longitude: 141.3545,
        name: "Sapporo",
        year: "2022",
        img: "https://cdn-icons-png.flaticon.com/512/2252/2252075.png"
    },
    {
        latitude: 35.6764,
        longitude: 139.65,
        name: "Tokyo",
        year: "2022",
        img: "https://cdn-icons-png.flaticon.com/512/2252/2252075.png"
    },
    {
        latitude: 1.3521,
        longitude: 103.8198,
        name: "Singapore",
        year: "2024",
        img: "https://img.pikbest.com/origin/09/27/23/08xpIkbEsTFgc.png!sw800"
    },
    {
        latitude: 23.6978,
        longitude: 120.9605,
        name: "Taipei",
        year: "2024",
        img: "https://images.vexels.com/media/users/3/240168/isolated/preview/d17a578c03915b108a4c162b62c13fd3-boba-tea-illustration.png"
    },
    {
        latitude: 41.8781,
        longitude: -87.6298,
        name: "Chicago",
        year: "2024",
        img: "https://cdn-icons-png.flaticon.com/512/404/404777.png"
    },
    {
        latitude: 36.1627,
        longitude: -86.7816,
        name: "Nashville",
        year: "2024",
        img: "https://cdn-icons-png.flaticon.com/512/2252/2252075.png"
    }
];
