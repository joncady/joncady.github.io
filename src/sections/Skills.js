import React, { Component } from 'react';

export default class Skills extends Component {

    render() {
        return (
            <section id="skills">
                <hr />
                <h2>Skills</h2>
                <hr />
                <div id="logo-space">
                    <a href="https://reactjs.org/"><img src={require("../assets/skill_logos/react.png")} alt="React" /></a>
                    <a href="https://firebase.google.com"><img src={require("../assets/skill_logos/firebase.png")} alt="Firebase" /></a>
                    <a href="https://en.wikipedia.org/wiki/SQL"><img src={require("../assets/skill_logos/sql.png")} alt="SQL" /></a>
                    <a href="https://nodejs.org"><img src={require("../assets/skill_logos/node.png")} alt="Node" /></a>
                    <a href="https://www.java.com"><img src={require("../assets/skill_logos/java.png")} alt="Java" /></a>
                    <a href="https://www.python.org/"><img src={require("../assets/skill_logos/python.png")} alt="Python" /></a>
                    <a href="https://www.r-project.org/"><img src={require("../assets/skill_logos/r.png")} alt="R" /></a>
                </div>
            </section>
        );
    }

}