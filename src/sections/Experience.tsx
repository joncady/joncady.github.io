import React from "react";

const Experience = () => {
    const earlierRoles = [
        {
            title: "Teaching Assistant · Client-Side Development",
            organization: "UW Information School",
            dates: "Sept. 2019 – June 2020",
            description:
                "Taught HTML, CSS, JavaScript, and React in the client-side development course.",
            link: "https://ischool.uw.edu/"
        },
        {
            title: "Software Engineering Intern and Part-time",
            organization: "Ticketmaster",
            dates: "June – Dec. 2019",
            description:
                "Built full-stack features with Java and React alongside the Seattle engineering team.",
            link: "https://www.ticketmaster.com/"
        },
        {
            title: "Student Developer",
            organization: "Husky Tech",
            dates: "Jan. 2019 – June 2020",
            description:
                "Developed website features supporting student networking and career advancement at UW.",
            link: "https://huskytech.org/#/"
        },
        {
            title: "Student Developer",
            organization: "UW-IT Student Programs",
            dates: "Feb. – June 2019",
            description:
                "Built Java and Spring APIs for the university’s course registration services.",
            link: "https://www.washington.edu/uwit/"
        }
    ];

    return (
        <section id="experience" aria-labelledby="experience-heading">
            <h2 id="experience-heading">Professional Experience</h2>
            <article className="current-role">
                <div className="role-header">
                    <div>
                        <h3>Software Development Engineer II</h3>
                        <p className="role-meta">
                            <a href="https://www.amazon.com/">Amazon</a> · Aug.
                            2020 – Present
                        </p>
                    </div>
                    <img
                        src="/assets/amazon.png"
                        alt=""
                        className="experience-logo"
                    />
                </div>
                <details className="amazon-background">
                    <summary>Earlier Amazon work</summary>
                    <p>
                        I began my career at Amazon as an engineer on an
                        experimentation team in the Alexa organization. I worked
                        on high-velocity growth experiments, primarily to drive
                        increased customer engagment across all Alexa surfaces.
                        On my current team, I manage infrastructure that
                        supports Alexa marketing iniatives and internal data
                        pipelines. Over the past 3.5 years, I've learned to
                        build serverless and asyncronous software solutions
                        using proprietary Java frameworks and the AWS CDK.
                        Additionally, I've developed multiple features using
                        React Native for both the Amazon Shopping and Alexa
                        apps. I also designed an Alexa skill in Typescript from
                        the ground up to support short-term experiments.
                    </p>
                </details>
                <p>
                    Worked on Alexa Smart Home, building model evaluation
                    pipelines and web apps for data labeling.
                </p>
                <p>
                    Developed and supported an evaluation MCP for running
                    experiments with AI tools.
                </p>
            </article>
            <details className="earlier-experience">
                <summary>Earlier experience · UW and Ticketmaster</summary>
                <div className="earlier-roles">
                    {earlierRoles.map((role) => (
                        <article key={role.organization}>
                            <h3>{role.title}</h3>
                            <p className="role-meta">
                                <a href={role.link}>{role.organization}</a> ·{" "}
                                {role.dates}
                            </p>
                            <p>{role.description}</p>
                        </article>
                    ))}
                </div>
            </details>
        </section>
    );
};

export default Experience;
