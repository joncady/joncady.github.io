import React, { Component } from 'react';

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
                            Follow this <a href="https://ischool.uw.edu/programs/informatics/what-is-informatics">link</a>
                            to learn more.
                        </p>
                        <p>
                            I am primarily a <span>front-end web developer</span> with experience using JavaScript
                            frameworks like React, Express, Node, etc. I
                            have a background in Java and Python and would like to learn more and hopefully create my
                            own software.
                        </p>
                        <p>
                            Linguistics is my minor and I enjoy talking about language and how it relates to coding.
                        </p>
                    </div>
                    <div className="picture-container">
                        <img id="profile" src={require("../assets/otherPic.jpg")} alt="Jonathan Cady profile"></img>
                    </div>
                </div>
            </section>
        );
    }

}