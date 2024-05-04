export interface Project {
    title: string;
    filters: string[];
    link: string;
    content: string;
    tech: string[];
    src: string;
}

export const webDevProjects: Project[] = [
    {
        title: "Yelp Business App",
        filters: ["R, Shiny", "Yelp API"],
        link: "https://jit98.shinyapps.io/BE-shrug/",
        content:
            "I collaborated with a team to create a web app that utilizes the Yelp API to present information on businesses.",
        tech: ["r-project", "yelp"],
        src: "yelp.PNG"
    },
    {
        title: "Rate My Professor MyPlanExtension",
        filters: ["CSS", "JavaScript", "PHP"],
        link: "https://github.com/joncady/rmpUW",
        content:
            "I designed a Chrome extension that displays the professor's RateMyProfessor score next to their course. Actively used by students at my school!",
        tech: ["php", "js"],
        src: "rmp.PNG"
    },
    {
        title: "FeelingFeed",
        filters: ["JavaScript", "Bootstrap", "PHP"],
        link: "https://students.washington.edu/joncady/projects/dubhacks/landing.html",
        content:
            "I developed a full, dynamic website with my teammates at a Hackathon.",
        tech: ["php", "js", "html5"],
        src: "feeling.png"
    },
    {
        title: "SpotiViz",
        filters: ["React", "Node"],
        link: "https://info340b-a18.github.io/react-project-music-viz/",
        content:
            "I constructed a React app with classmates that visualizes an album timeline using the Spotify API.",
        tech: ["react", "node-js"],
        src: "spotify.PNG"
    },
    {
        title: "help.me",
        filters: ["React", "Firebase"],
        link: "https://joncady.github.io/help.me/",
        content:
            "I collorated with a team during a hackathon to create an emotional support chat bot that has user authentication.",
        tech: ["react"],
        src: "help.PNG"
    },
    {
        title: "Fire Emblem Adventures",
        filters: ["JavaScript", "HTML", "CSS"],
        link: "https://students.washington.edu/joncady/projects/feadventures/",
        content:
            "I designed a 2D game using only vanilla JavaScript, HTML, and CSS. I created classes to encapsulate behavior for players, enemies, and obstacles.",
        tech: ["js", "html5", "css3"],
        src: "fe.PNG"
    },
    {
        title: "Satellite Smash Brand Website",
        filters: ["React", "Firebase"],
        link: "http://satellitesmash.com",
        content:
            "I developed a React app that includes a player database, as well as a news feed. I used client rounting to emulate a multi-page site.",
        tech: ["react"],
        src: "ss.PNG"
    },
    {
        title: "DuetWithMe ()",
        filters: ["React", "Node", "Speech-to-Text"],
        link: "https://devpost.com/software/duetwithme-fu9y5p",
        content:
            "I collaborated with a team during a hackathon to create a interactive web app that can respond to voice commands and plays with you!",
        tech: ["react", "node-js", "microsoft"],
        src: "duet.PNG"
    },
    {
        title: "Draw with Me ()",
        filters: ["React", "Socket IO", "Node"],
        link: "https://joncady.me/draw-with-me",
        content:
            "I designed an interactive drawing app that allows friends to draw live over the internet and save their pictures!",
        tech: ["react", "node-js"],
        src: "draw.PNG"
    },
    {
        title: "ShipShop",
        filters: ["Angular", "NodeJS", "Python"],
        link: "https://devpost.com/software/ship-shop",
        content: `I worked with a team to win first place at T-Mobile's NB-IoT Hackathon! We created a E-Commerce Solution that helped
        with food waste.`,
        tech: ["angular", "node-js", "python"],
        src: "shipshop.png"
    },
    {
        title: "Ticketmaster Event Finder",
        filters: ["React"],
        link: "https://github.com/joncady/seahacks",
        content: `For my intern hackathon at Ticketmaster, I developed a interactive map of events in your area! I worked with the
        awesome other interns to build this app.`,
        tech: ["react"],
        src: "tm.PNG"
    },
    {
        title: "FreShip",
        filters: ["Python", "Angular", "IBM Cloud"],
        link: "https://docs.google.com/presentation/d/1bpSRR3cq6qomSm5p7QTX45gt_1ppyESKYYIGhIC-v-c/edit?usp=sharing",
        content: `Team FreShip won the IBM Food Waste Virtual Hackathon! Take a look at these slides to see our solution.`,
        tech: ["python", "angular"],
        src: "freship.png"
    },
    {
        title: "Snack Saver",
        filters: ["React", "Firebase"],
        link: "https://devpost.com/software/snacksaver",
        content: `I attended Dubhacks and created a platform to help encourage students to choose healthy, cheaper food options
        called Snack Saver! For the hackathon, we created a proof of concept based on the designs and it turned out great.`,
        tech: ["react", "node-js"],
        src: "snacksaver.PNG"
    },
    {
        title: "Vocaby",
        filters: ["React", "Chrome Extension"],
        link: "https://vocaby.app/",
        content: `The extension to build vocabulary online. Get definitions instantly. Save words for later. I functioned as the project manager to take this project from an initial hackathon idea to reality.`,
        tech: ["react", "chrome"],
        src: "vocaby.png"
    },
    {
        title: "Stream Dashboard",
        filters: ["React", "Electron", "Socket IO"],
        link: "https://github.com/joncady/stream-dashboard",
        content: `I wrote a multi-platform desktop application that enables live streams to update HTML overlays. Additionally, it utilizes the start.gg API to dynamically fetch player tags and metadata.
        It has been used for the past couple years at the Port Priority Smash Bros. tournament series in Seattle. I used Electron.js to quickly develop a desktop application which leverages socket.io to
        deliver data to HTML overlays in real time.`,
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
            "I designed the front-end of a React Native app that stores user information in a Python back-end.",
        tech: ["react"],
        src: "monitood.png"
    },
    {
        title: "Solace: Connect, Plan, Support",
        filters: ["Swift"],
        link: "https://stanfchristina.github.io/solace-landing/",
        content:
            "Solace is a free iOS mobile app geared towards providing resources, information, and connection to survivors of domestic violence, especially those who are currently quarantined with their partners. I worked as a developer to implement chat and other main features.",
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
