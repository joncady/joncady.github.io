import React, { Component } from 'react';

export default class Navigation extends Component {

    checkScreen() {
        console.log("toggle");
    }

    render() {
        return (
            <nav className="navbar navbar-expand-md fixed-top navbar-dark bg-dark">
                <a className="navbar-brand" href="#header">Jonathan Cady</a>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarText" aria-controls="navbarText"
                    aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarText">
                    <ul className="navbar-nav mr-auto">
                        <li className="nav-item active">
                            <a className="nav-link" href="#header">Home<span className="sr-only" onClick={this.checkScreen()}>(current)</span></a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="#about-me" onClick={this.checkScreen()}>About Me</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="#skills" onClick={this.checkScreen()}>Skills</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="#my-projects" onClick={this.checkScreen()}>My Projects</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="#interests" onClick={this.checkScreen()}>My Interests</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="#contact" onClick={this.checkScreen()}>Contact</a>
                        </li>
                    </ul>
                </div>
            </nav>
        );
    }

}

