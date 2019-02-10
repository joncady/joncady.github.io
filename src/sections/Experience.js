import React, { Component } from 'react';
import Plx from 'react-plx';

export default class Experience extends Component {

    render() {
        let experience = [
            {
                title: "Student Developer",
                organization: "Husky Tech",
                date: ["Jan. 2019", "Current"],
                description: `I am student developer on the Husky Tech team! We promote networking and career advancement to students at UW.
                I work on developing our website and launching new features.`,
                link: "https://www.uwhuskytech.com/",
                logo: "ht.png"
            },
            {
                title: "Front End Lead",
                organization: "uDev",
                date: ["Jan. 2019", "Current"],
                description: `I teach students at UW web development! As the front end lead, I am in charge of prepping instructional materials
                and providing support to club members.`,
                link: "https://edge.udev.tech/",
                logo: ""
            },
            {
                title: "Student Developer",
                organization: "UW-IT Student Programs",
                date: ["Feb. 2019", "Current"],
                description: `I will soon be starting as a student developer in my university's IT department! We work on the course registration
                system and ensure technology is accesible to students.`,
                link: "https://www.washington.edu/uwit/",
                logo: "uwit.png"
            },
        ];

        return (
            <section id="experience">
                <div className="title">
                    <hr></hr>
                    <h2>Experience</h2>
                    <hr></hr>
                </div>
                {experience.map((role, i) => {
                    const parallaxData = [
                        {
                            start: 'self',
                            duration: 400,
                            startOffset: -75,
                            easing: 'easeInOut',
                            properties: [
                                {
                                    startValue: (i % 2 === 0 ? 1 : -1) * 200,
                                    endValue: 0,
                                    property: 'translateX',
                                },
                                {
                                    startValue: 0,
                                    endValue: 1,
                                    property: "opacity"
                                }
                            ],
                        },
                    ];
                    return (
                        <Plx parallaxData={parallaxData} key={i} style={{ margin: '2rem' }}>
                            <h3>{role.title}</h3>
                            <div className="experience-area">
                                {role.logo && <a href={role.link}>
                                    <img className="org-logo" alt={role.logo} src={require(`../assets/${role.logo}`)}></img>
                                </a>}
                                <div className="text-center">
                                    <p>{role.organization}</p>
                                    <p>{role.date[0] + " - " + role.date[1]}</p>
                                    <p className="role-desc">{role.description}</p>
                                </div>
                            </div>
                        </Plx>
                    );
                })}
            </section>
        );
    }

}