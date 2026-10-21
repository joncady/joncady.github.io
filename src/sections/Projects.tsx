import React from "react";
import { webDevProjects, mobileDevProjects } from "./Helpers";
const hackathonProjects = webDevProjects.filter((project) =>
    /hackathon|dubhacks/i.test(project.content)
);
const archive = [...webDevProjects, ...mobileDevProjects].filter(
    (project) =>
        !hackathonProjects.includes(project) &&
        ![
            "Raspberry Pi Transit Display",
            "Stream Dashboard",
            "Fire Emblem Adventures"
        ].includes(project.title)
);
export default function Projects() {
    return (
        <section
            id="my-projects"
            className="work-section section-shell"
            aria-labelledby="work-heading"
        >
            <div className="section-heading">
                <p className="eyebrow">01 / Projects</p>
                <h2 id="work-heading">My projects</h2>
            </div>
            <article
                className="featured-project kureo-project"
                aria-labelledby="kureo-heading"
            >
                <div className="case-copy">
                    <p className="eyebrow">Kureo / Android app</p>
                    <h3 id="kureo-heading">A little less noise.</h3>
                    <p className="case-problem">
                        I built Kureo to bring relevant products, events and
                        travel deals into one place.
                    </p>
                    <p className="case-solution">
                        The Android app connects discovery with collections,
                        native to-dos, reminders and Google calendars. A
                        scheduled backend gathers updates, assesses relevance
                        and sends notifications.
                    </p>
                    <a
                        className="button-link"
                        href="https://kureo.dev"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        Explore Kureo <span aria-hidden="true">↗</span>
                    </a>
                    <p className="project-stack">
                        Android / Python / AWS / Cloudflare / Firebase
                    </p>
                </div>
                <figure className="kureo-figure">
                    <img
                        src="/assets/kureo-phone-render.png"
                        alt="Kureo Android app on a phone, showing product, event and travel suggestions"
                        loading="lazy"
                    />
                    <figcaption>
                        Discovery, collections and everyday planning.
                    </figcaption>
                </figure>
                <div className="case-process">
                    <p className="eyebrow">What I built</p>
                    <ul>
                        <li>
                            Scheduled source collection with duplicate detection
                            and relevance filtering.
                        </li>
                        <li>
                            An authenticated backend connected to the Android
                            app and Firebase notifications.
                        </li>
                        <li>
                            Collections, to-dos, reminders and connected
                            calendars in one interface.
                        </li>
                    </ul>
                </div>
            </article>
            <article
                className="supporting-project"
                aria-labelledby="fire-emblem-heading"
            >
                <div>
                    <p className="eyebrow">
                        Fire Emblem Adventures / Browser game
                    </p>
                    <h3 id="fire-emblem-heading">Real-time party combat.</h3>
                    <p>
                        I rebuilt my Fire Emblem-inspired browser game with
                        Phaser and TypeScript. Players choose and deploy a
                        party, switch between heroes during combat, and use
                        melee weapons, bows, magic and healing to complete
                        missions and fight commanders.
                    </p>
                    <p>
                        Equipment purchases, forging and earned XP carry between
                        missions through browser saves. Keyboard, mouse and
                        touch controls support the same game. A ten-mission
                        expansion with deeper weapon progression is in
                        development.
                    </p>
                    <a
                        className="text-link"
                        href="https://joncady.github.io/feadventures/"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        Play Fire Emblem Adventures{" "}
                        <span aria-hidden="true">↗</span>
                    </a>
                    <p className="project-stack">
                        Phaser 3 / TypeScript / Vite
                    </p>
                </div>
                <img
                    src="/assets/fire-emblem-current.png"
                    alt="Fire Emblem Adventures castle defense with heroes, a minimap and mission controls"
                    loading="lazy"
                />
            </article>
            <article
                className="supporting-project"
                aria-labelledby="table-tennis-heading"
            >
                <div>
                    <p className="eyebrow">Table Tennis / Browser game</p>
                    <h3 id="table-tennis-heading">Step up to the table.</h3>
                    <p>
                        I built a first-person 3D table tennis prototype with
                        React Three Fiber. Play against an AI with mouse and
                        keyboard, or pair a phone and webcam to swing your
                        paddle with motion controls.
                    </p>
                    <p>
                        Matches play to 11, win by two, with customizable paddle
                        rubber and sponge thickness. The phone mode combines
                        motion sensors with browser-based body tracking and
                        sends sound and haptic feedback on contact.
                    </p>
                    <p>
                        <a
                            className="text-link"
                            href="https://joncady.github.io/R3F-Table-Tennis/"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            Play Table Tennis <span aria-hidden="true">↗</span>
                        </a>
                        {" · "}
                        <a
                            className="text-link"
                            href="https://github.com/joncady/R3F-Table-Tennis"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            View on GitHub <span aria-hidden="true">↗</span>
                        </a>
                    </p>
                    <p className="project-stack">
                        React Three Fiber / TypeScript / Three.js / AWS
                    </p>
                </div>
                <img
                    src="/assets/table-tennis.png"
                    alt="First-person table tennis with a blue table, red paddles and a ball ready to serve"
                    loading="lazy"
                />
            </article>
            <article
                className="featured-project"
                aria-labelledby="transit-heading"
            >
                <div className="case-copy">
                    <p className="eyebrow">Raspberry Pi Transit Display</p>
                    <h3 id="transit-heading">
                        Live transit
                        <br />
                        arrivals.
                    </h3>
                    <p className="case-problem">
                        I built a display to check train arrivals before leaving
                        home.
                    </p>
                    <p className="case-solution">
                        The app uses React and Python to show OneBusAway
                        arrivals on a Raspberry Pi touchscreen.
                    </p>
                    <a
                        className="button-link"
                        href="https://github.com/joncady/OneBusAwayTransitTimesForPi"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        View source <span aria-hidden="true">↗</span>
                    </a>
                </div>
                <figure className="transit-figure">
                    <div className="device-shell">
                        <div className="device-camera" />
                        <img
                            src="/assets/transit.jpg"
                            alt="Transit display showing upcoming trains and minutes until arrival"
                            loading="lazy"
                        />
                    </div>
                    <figcaption>
                        Live transit arrivals on a Raspberry Pi touchscreen.
                    </figcaption>
                </figure>
                <div className="case-process">
                    <p className="eyebrow">My process</p>
                    <ul>
                        <li>
                            Connected OneBusAway arrivals to a Python service
                            and React interface.
                        </li>
                        <li>
                            Wrote and tested the display code for checking train
                            arrivals before leaving home.
                        </li>
                        <li>
                            Added scheduled wake times and idle polling
                            controls, and debugged the Raspberry Pi over SSH.
                        </li>
                        <li>
                            Used AI for API integration, writing code and tests,
                            and SSH debugging.
                        </li>
                    </ul>
                </div>
            </article>
            <article className="supporting-project">
                <div>
                    <p className="eyebrow">Stream Dashboard</p>
                    <h3>Updating live stream overlays</h3>
                    <p>
                        I wrote a multi-platform desktop application that
                        updates HTML overlays for live streams. It fetches
                        player tags and metadata from the start.gg API and sends
                        updates through Socket.IO in real time. It has been used
                        at the Port Priority Smash Bros. tournament series in
                        Seattle.
                    </p>
                    <a
                        className="text-link"
                        href="https://github.com/joncady/stream-dashboard"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        Stream Dashboard <span aria-hidden="true">↗</span>
                    </a>
                    <p className="project-stack">
                        React / Electron / Socket.IO
                    </p>
                </div>
                <img
                    src="/assets/dashboard.png"
                    alt="Stream Dashboard interface for updating tournament broadcast overlays"
                    loading="lazy"
                />
            </article>
            <section
                className="hackathon-section"
                aria-labelledby="hackathon-heading"
            >
                <div className="section-heading">
                    <h2 id="hackathon-heading">Hackathons</h2>
                    <p>I built these projects with teams at hackathons.</p>
                </div>
                <div className="hackathon-grid">
                    {hackathonProjects.map((project) => (
                        <article key={project.title}>
                            <img
                                src={`/assets/${project.src}`}
                                alt={`${project.title} project screenshot`}
                                loading="lazy"
                            />
                            <h3>{project.title}</h3>
                            <p>{project.content}</p>
                            <p className="project-stack">
                                {project.filters.join(" / ")}
                            </p>
                            {project.link && project.title !== "Vocaby" && (
                                <a
                                    className="text-link"
                                    href={project.link}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    View project ↗
                                </a>
                            )}
                        </article>
                    ))}
                </div>
            </section>
            <details className="project-archive">
                <summary>
                    Other projects <span>{archive.length} projects +</span>
                </summary>
                <div className="archive-grid">
                    {archive.map((project) => (
                        <article key={project.title}>
                            <h3>{project.title.replace(" ()", "")}</h3>
                            <p>{project.content}</p>
                            <p className="project-stack">
                                {project.filters.join(" / ")}
                            </p>
                            {project.link && project.title !== "Vocaby" ? (
                                <a
                                    href={project.link}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    View project ↗
                                </a>
                            ) : (
                                <span className="archive-note">
                                    {project.title === "Vocaby"
                                        ? "Historical project · live link under review"
                                        : "Historical project · preview only"}
                                </span>
                            )}
                        </article>
                    ))}
                </div>
            </details>
        </section>
    );
}
