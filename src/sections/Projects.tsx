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
                    <p className="eyebrow">Transit Times / Upcycled hardware</p>
                    <h3 id="transit-heading">
                        A second life for
                        <br />
                        live arrivals.
                    </h3>
                    <p className="case-problem">
                        I started with a Raspberry Pi touchscreen to check train
                        arrivals before leaving home. Now I’ve turned an
                        upcycled PROXmobil3 transit card reader into an arrivals
                        display and a card-controlled photo frame.
                    </p>
                    <p className="case-solution">
                        The native Rust and Slint app shows live OneBusAway
                        arrivals. Tapping an enrolled card opens its photo album
                        from USB; the display returns to arrivals when the photo
                        session ends. This is a working prototype.
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
                <figure className="transit-figure transit-demo">
                    <video
                        controls
                        playsInline
                        preload="metadata"
                        poster="/assets/transit-pm3-poster.jpg"
                        width="540"
                        height="960"
                        aria-label="PROXmobil3 transit display demo"
                        aria-describedby="transit-demo-caption"
                    >
                        <source
                            src="/assets/transit-pm3-demo.mp4"
                            type="video/mp4"
                        />
                        <a href="/assets/transit-pm3-demo.mp4">
                            Watch the transit demo
                        </a>
                    </video>
                    <figcaption id="transit-demo-caption">
                        Nine-second silent demo: U District arrivals, then
                        different cards selecting photo albums. The return to
                        arrivals happens after the clip ends.
                    </figcaption>
                </figure>
                <div className="case-process">
                    <p className="eyebrow">
                        What changed from the first version
                    </p>
                    <ul>
                        <li>
                            Upcycled a PROXmobil3 transit card reader with an
                            800 × 480 screen, moving beyond the original
                            Raspberry Pi and 480 × 320 touchscreen.
                        </li>
                        <li>
                            Built a native Rust and Slint app in place of the
                            React/Python browser kiosk, with automatic arrival
                            paging, caching and network-error backoff. Built and
                            deployed to the terminal over SSH.
                        </li>
                        <li>
                            Added card-selected USB photo albums and an
                            automatic return to live arrivals. A desktop sync
                            tool prepares resized copies while preserving the
                            original photos.
                        </li>
                        <li>
                            Added a ready light and brief left-to-right feedback
                            when an enrolled card is recognized. Cards select
                            albums locally; the app does not process fares.
                        </li>
                    </ul>
                    <p className="project-stack">
                        Rust / Slint / OneBusAway / USB &amp; card reader
                    </p>
                </div>
            </article>
            <article
                className="supporting-project"
                aria-labelledby="okabebot-heading"
            >
                <div>
                    <p className="eyebrow">OkabeBot / AI hardware lab</p>
                    <h3 id="okabebot-heading">
                        A companion for your desk and your day.
                    </h3>
                    <p>
                        I expanded a push-to-talk Codex companion into a
                        configurable hardware and notification platform.
                        Animated pixel characters speak, react to music and TV,
                        and present updates on a Raspberry Pi display, with a
                        tablet-friendly dashboard for conversations and an
                        inbox.
                    </p>
                    <p>
                        Optional integrations bring together GitHub activity and
                        deployments, calendar agendas and countdowns, Spotify
                        playback, and Home Assistant notifications. Codex
                        completion cards and focus timers share the same
                        display; home integrations require account setup and
                        validation.
                    </p>
                    <p>
                        MCP tools connect the camera, speaker, display and
                        SwitchBot. Local speech recognition, configurable voice
                        engines, and local or SSH device connections support
                        different setups. The current deployment pairs a
                        computer with two Pi Zero satellites; an optional AWS
                        relay queues signed GitHub events while the controller
                        is offline.
                    </p>
                    <a
                        className="text-link"
                        href="https://github.com/joncady/OkabeBot"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        Explore OkabeBot on GitHub{" "}
                        <span aria-hidden="true">↗</span>
                    </a>
                    <p className="project-stack">
                        Python / Codex / MCP / Raspberry Pi / Whisper / AWS
                    </p>
                </div>
                <figure className="okabebot-figure">
                    <img
                        src="/assets/okabebot-collage.png"
                        alt="Collage of OkabeBot integration previews for GitHub, calendar, home activity, music, TV and sports, and Codex completion"
                        loading="lazy"
                    />
                    <figcaption>
                        Illustrative integration previews with sample messages.
                    </figcaption>
                </figure>
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
