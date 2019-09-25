import React, { Component } from 'react';
import Bounce from 'react-reveal/Bounce';
import ReactLogo from '../assets/skill_logos/react.png';
import FirebaseLogo from '../assets/skill_logos/firebase.png';
import DjangoLogo from '../assets/skill_logos/django.png';
import RLogo from '../assets/skill_logos/r.png';
import SQLLogo from '../assets/skill_logos/sql.png';
import NodeLogo from '../assets/skill_logos/node.png';
import PythonLogo from '../assets/skill_logos/python.png';
import SpringLogo from '../assets/skill_logos/spring.png';
import JavaLogo from '../assets/skill_logos/java.png';
import ReduxLogo from '../assets/skill_logos/redux.png';

export default class Skills extends Component {

    render() {
        return (
            <section id="skills">
                <hr />
                <h2>Skills</h2>
                <hr />
                <div id="logo-space">
                    <Bounce>
                        <a href="https://reactjs.org/"><img src={ReactLogo} alt="React" /></a>
                    </Bounce>
                    <Bounce>
                        <a href="https://redux.js.org/"><img src={ReduxLogo} alt="Reux"></img></a>
                    </Bounce>
                    <Bounce>
                        <a href="https://firebase.google.com"><img src={FirebaseLogo} alt="Firebase" /></a>
                    </Bounce>
                    <Bounce>
                        <a href="https://en.wikipedia.org/wiki/SQL"><img src={SQLLogo} alt="SQL" /></a>
                    </Bounce>
                    <Bounce>
                        <a href="https://nodejs.org"><img src={NodeLogo} alt="Node" /></a>
                    </Bounce>
                    <Bounce>
                        <a href="https://www.java.com"><img src={JavaLogo} alt="Java" /></a>
                    </Bounce>
                    <Bounce>
                        <a href="https://spring.io/"><img src={SpringLogo} alt="Spring"></img></a>
                    </Bounce>
                    <Bounce>
                        <a href="https://www.python.org/"><img src={PythonLogo} alt="Python" /></a>
                    </Bounce>
                    <Bounce>
                        <a href="https://www.r-project.org/"><img src={RLogo} alt="R" /></a>
                    </Bounce>
                    <Bounce>
                        <a href="https://www.djangoproject.com/"><img src={DjangoLogo} alt="Django"></img></a>
                    </Bounce>
                </div>
            </section>
        );
    }

}