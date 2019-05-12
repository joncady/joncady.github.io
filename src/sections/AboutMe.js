import React, { Component } from 'react';
import Plx from 'react-plx';

const parallaxData = [
    {
        start: 'self',
        duration: 200,
        properties: [
            {
                startValue: .7,
                endValue: 1,
                property: 'scale',
            },
        ],
    },
];

export default class AboutMe extends Component {

    render() {
        return (
            <section id="about-me">
                <div className="title">
                    <hr></hr>
                    <h2>About Me</h2>
                    <hr></hr>
                </div>
                <div id="about">
                    <div id="intro" className="lead">
                        <p>
                            I am a <span>third year student</span> studying Informatics at the University of Washington
                            Seattle!
                            What is Informatics exactly? Well, Informatics designs technology for the good of people.
                            Follow this <a href="https://ischool.uw.edu/programs/informatics/what-is-informatics">link</a> to
                            learn more.
                        </p>
                        <p>
                            I am primarily a <span>full stack developer</span> with experience using JavaScript
                            frameworks like React, Express, Node, etc. I
                            have background in Java and Python and would like to learn more and hopefully create my
                            own software.
                        </p>
                    </div>
                    <div className="other-pic">
                        <Plx parallaxData={parallaxData}>
                            <img id="resize-pic" src={require("../assets/profile.jpg")} alt="Jonathan Cady profile"></img>
                        </Plx>
                    </div>
                </div>
            </section>
        );
    }

}