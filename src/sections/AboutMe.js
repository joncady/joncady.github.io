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
                            I am a <span>fourth year student</span> studying Informatics at the University of Washington
                            Seattle! What is Informatics exactly? Well, Informatics designs technology for the good of people.
                            Follow this <a href="https://ischool.uw.edu/programs/informatics/what-is-informatics">link</a> to
                            learn more. I tell people that I design systems with the user in mind, which I embody in my development.
                        </p>
                        <p>
                            I am primarily a <span>full stack developer</span> with experience using JavaScript
                            frameworks like React, Express, Node, etc, and backend frameworks like django, and Java Spring
                            Boot. I am always excited to learn new technology and
                            explore new opportunities.
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