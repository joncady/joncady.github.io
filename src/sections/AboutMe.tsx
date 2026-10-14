import React from "react";
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
                        The program focuses on designing technology for people
                        (learn more{" "}
                        <a href="https://ischool.uw.edu/programs/informatics/what-is-informatics">
                            here
                        </a>
                        ).
                    </p>
                </div>
                <div className="other-pic">
                    <img
                        id="resize-pic"
                        src={"/assets/profile.jpg"}
                        alt="Jonathan Cady profile"
                    ></img>
                </div>
            </div>
        </section>
    );
};

export default AboutMe;
