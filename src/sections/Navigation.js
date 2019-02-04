import React, { Component } from 'react';
import { NavbarToggler, Collapse } from 'reactstrap';

export default class Navigation extends Component {

    constructor() {
        super();
        this.state = {
            isOpen: false
        };
    }

    toggle = () => {
        this.setState({
            isOpen: !this.state.isOpen
        });
    }

    closeNav = () => {
        console.log("here")
        this.setState({ isOpen: false });
    }

    render() {
        return (
            <nav className="navbar navbar-expand-md fixed-top navbar-dark bg-dark">
                <a className="navbar-brand" href="/#">Jonathan Cady</a>
                <NavbarToggler onClick={this.toggle} />
                <Collapse isOpen={this.state.isOpen} navbar>
                    <ul className="navbar-nav mr-auto">
                        <li className="nav-item active">
                            <a className="nav-link" href="/#" onClick={this.closeNav}>Home<span className="sr-only" >(current)</span></a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="#about-me" onClick={this.closeNav}>About Me</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="#skills" onClick={this.closeNav}>Skills</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="#experience" onClick={this.closeNav}>Experience</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="#my-projects" onClick={this.closeNav}>My Projects</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="#interests" onClick={this.closeNav}>My Interests</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="#contact" onClick={this.closeNav}>Contact</a>
                        </li>
                    </ul>
                </Collapse>
            </nav>
        );
    }

}

