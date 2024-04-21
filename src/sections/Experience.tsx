import React from "react";
import Plx, { PlxItem } from "react-plx";

const Experience = () => {
    const experience = [
        {
            title: "Student Developer",
            organization: "Husky Tech",
            date: ["Jan. 2019", "June 2020"],
            description: `I was a student developer on the Husky Tech team! We promote networking and career advancement to students at UW.
                I work on developing our website and launching new features.`,
            link: "https://www.uwhuskytech.com/",
            logo: "ht.png"
        },
        {
            title: "Student Developer",
            organization: "UW-IT Student Programs",
            date: ["Feb. 2019", "June 2019"],
            description: `I worked as a student developer in my university's IT department! We work on the course registration
                system and ensure technology is accesible to students. Specifically, I worked on application and service level APIs in Java using
                the Spring framwork.`,
            link: "https://www.washington.edu/uwit/",
            logo: "uwit.png"
        },
        {
            title: "Software Engineering Intern and Part-time",
            organization: "Ticketmaster",
            date: ["Jun. 2019", "Dec. 2019"],
            description: `I worked as a Software Engineering intern at Ticketmaster in Seattle! I worked on full stack
                projects using Java and React.`,
            link: "https://www.ticketmaster.com/",
            logo: "ticketmaster.png"
        },
        {
            title: "Teaching Assistant: Client-Side Development",
            organization: "Information School @ UW Seattle",
            date: ["Sept. 2019", "Jun. 2020"],
            description: `I taught frontend development to students! They learned HTML, CSS, and JS (including ReactJS) during this quarter long class.`,
            link: "https://ischool.uw.edu/",
            logo: "ischool.png"
        },
        {
            title: "Software Development Engineer II",
            organization: "Amazon",
            date: ["Aug. 2020", "Current"],
            description: `I began my career at Amazon as an engineer on an experimentation team in the Alexa organization. I worked on high-velocity growth experiments, primarily to drive increased customer 
                engagment across all Alexa surfaces. On my current team, I manage infrastructure that supports Alexa marketing iniatives and internal data pipelines. Over the past 3.5 years, I've learned to
                build serverless and asyncronous software solutions using proprietary Java frameworks and the AWS CDK. Additionally, I've developed multiple features using React Native for both the Amazon 
                Shopping and Alexa apps. I also designed an Alexa skill in Typescript from the ground up to support short-term experiments.`,
            link: "https://www.amazon.com/",
            logo: "amazon.png"
        }
    ];

    return (
        <section id="experience">
            <div className="title">
                <h2>Experience</h2>
            </div>
            {experience.map((role, i) => {
                const parallaxData: PlxItem[] = [
                    {
                        start: "self",
                        duration: 400,
                        startOffset: -65,
                        easing: "easeInOut",
                        properties: [
                            {
                                startValue: (i % 2 === 0 ? 1 : -1) * 200,
                                endValue: 0,
                                property: "translateX"
                            },
                            {
                                startValue: 0,
                                endValue: 1,
                                property: "opacity"
                            }
                        ]
                    }
                ];
                return (
                    <Plx
                        parallaxData={parallaxData}
                        key={i}
                        style={{ margin: "2rem" }}
                    >
                        <h3>{role.title}</h3>
                        <div className="experience-area">
                            {role.logo && (
                                <a href={role.link}>
                                    <img
                                        className="org-logo"
                                        alt={role.logo}
                                        src={`../assets/${role.logo}`}
                                    ></img>
                                </a>
                            )}
                            <div className="text-center">
                                <p className="font-weight-bold">
                                    {role.organization}
                                </p>
                                <p>{role.date[0] + " - " + role.date[1]}</p>
                                <p className="role-desc">{role.description}</p>
                            </div>
                        </div>
                    </Plx>
                );
            })}
        </section>
    );
};

export default Experience;
