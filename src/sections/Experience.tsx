import React from "react";
const earlierRoles = [
    {
        title: "Teaching Assistant · Client-Side Development",
        organization: "UW Information School",
        dates: "2019–2020",
        description:
            "Taught HTML, CSS, JavaScript, and React in the client-side development course."
    },
    {
        title: "Software Engineering Intern and Part-time",
        organization: "Ticketmaster",
        dates: "2019",
        description:
            "Built full-stack features with Java and React alongside the Seattle engineering team."
    },
    {
        title: "Student Developer",
        organization: "Husky Tech",
        dates: "2019–2020",
        description:
            "Developed website features supporting student networking and career advancement at UW."
    },
    {
        title: "Student Developer",
        organization: "UW-IT Student Programs",
        dates: "2019",
        description:
            "Built Java and Spring APIs for the university’s course registration services."
    }
];
export default function Experience() {
    return (
        <section
            id="experience"
            className="experience-section section-shell"
            aria-labelledby="experience-heading"
        >
            <div className="experience-intro">
                <p className="eyebrow">02 / My experience</p>
                <h2 id="experience-heading">My experience</h2>
                <p>
                    My experience includes software engineering at Amazon,
                    Ticketmaster, and UW, and teaching client-side development.
                </p>
            </div>
            <div className="experience-history">
                <article className="current-role">
                    <p className="role-meta">Amazon / Aug. 2020 – Present</p>
                    <h3>Software Development Engineer II</h3>
                    <ul>
                        <li>
                            Worked on Alexa Smart Home, creating model
                            evaluation pipelines and web applications for
                            labeling data.
                        </li>
                        <li>
                            Developed and supported an evaluation MCP for
                            performing experiments using AI tools.
                        </li>
                    </ul>
                    <details className="amazon-background">
                        <summary>Earlier Amazon work</summary>
                        <p>
                            Started on an experimentation team in the Alexa
                            organization. Built growth experiments across Alexa
                            surfaces, infrastructure for Alexa marketing, and
                            internal data pipelines. Developed serverless and
                            asynchronous software with Java and AWS CDK, React
                            Native features for Amazon Shopping and Alexa, and
                            an Alexa skill in TypeScript for short-term
                            experiments.
                        </p>
                    </details>
                </article>
                <details className="earlier-experience">
                    <summary>Earlier experience / UW & Ticketmaster</summary>
                    <div className="earlier-roles">
                        {earlierRoles.map((role) => (
                            <article key={role.organization}>
                                <p className="role-meta">
                                    {role.organization} / {role.dates}
                                </p>
                                <h3>{role.title}</h3>
                                <p>{role.description}</p>
                            </article>
                        ))}
                    </div>
                </details>
            </div>
        </section>
    );
}
