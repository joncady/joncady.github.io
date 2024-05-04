import React from "react";
import Plx, { PlxItem } from "react-plx";

const parallaxData: PlxItem[] = [
    {
        start: "self",
        duration: 200,
        properties: [
            {
                startValue: 0.7,
                endValue: 1,
                property: "scale"
            }
        ]
    }
];

const AboutMe = () => {
    return (
        <section id="about-me">
            <div className="title">
                <h2>About Me</h2>
            </div>
            <div id="about">
                <div id="intro" className="lead">
                    <p>
                        Born and raised in Washington state, I am a{" "}
                        <span>full-stack software engineer</span> working at
                        Amazon in the Seattle area. I have an undergraduate
                        degree in Informatics from the University of Washington.
                        What is Informatics exactly? Well, Informatics designs
                        technology for the good of people (learn more{" "}
                        <a href="https://ischool.uw.edu/programs/informatics/what-is-informatics">
                            here
                        </a>
                        ).
                    </p>
                </div>
                <div className="other-pic">
                    <Plx parallaxData={parallaxData}>
                        <img
                            id="resize-pic"
                            src={"/assets/profile.jpg"}
                            alt="Jonathan Cady profile"
                        ></img>
                    </Plx>
                </div>
            </div>
        </section>
    );
};

export default AboutMe;
