import React, { Component } from 'react';
import { Row, Modal, Button } from 'reactstrap';

export default class Projects extends Component {

    constructor() {
        super();
        this.state = {
            modal: false
        }
    }

    toggle = () => {
        this.setState({
            modal: !this.state.modal
        });
    }

    renderWebDev() {
        let projects = [
            {
                title: "Yelp Business App (R, Shiny, Yelp API)",
                link: "https://jit98.shinyapps.io/BE-shrug/",
                content: "I collaborated with a team to create a web app that utilizes the Yelp API to present information on businesses."
            },
            {
                title: "News at a Glance (JavaScript, News API)",
                link: "https://students.washington.edu/joncady/projects/news/",
                content: "I call the News API in this project to create a quick look at the top news stories of the day."
            },
            {
                title: "Rate My Professor MyPlanExtension (CSS, JavaScript, PHP)",
                link: "https://github.com/joncady/rmpUW",
                content: "I designed a Chrome extension that displays the professor's RateMyProfessor score next to their class name."
            },
            {
                title: "FeelingFeed (JavaScript, Bootstrap, PHP)",
                link: "https://students.washington.edu/joncady/projects/dubhacks/landing.html",
                content: "I developed a full, dynamic website with my teammates at a Hackathon."
            },
            {
                title: "SpotiViz (React, Node)",
                link: "https://info340b-a18.github.io/react-project-music-viz/",
                content: "I constructed a React app with a classNamemate that visualizes an album timeline using the Spotify API."
            },
            {
                title: "help.me (React, Firebase)",
                link: "https://joncady.github.io/help.me/",
                content: "I collorated with a team during a hackathon to create an emotional support chat bot that has user authentication."
            },
            {
                title: "Basic CV Example (JavaScript, Node, Express)",
                link: "https://students.washington.edu/joncady/cv/",
                content: "I connected my simple front-end, which sends a photo, and my Express back-end, which forwards it to a Microsoft Vision API."
            },
            {
                title: "Fire Emblem Adventures (JavaScript, HTML, CSS)",
                link: "https://students.washington.edu/joncady/projects/feadventures/",
                content: "I designed a 2D game using only vanilla JavaScript, HTML, and CSS. I created classes to encapsulate behavior for players, enemies, and obstacles."
            },
            {
                title: "Satellite Smash Brand Website (React, Firebase)",
                link: "http://satellitesmash.com",
                content: "I developed a React app that includes a player database, as well as a news feed. I used client rounting to emulate a multi-page site."
            },
            {
                title: "DuetWithMe (React, Node, Speech-to-Text)",
                link: "https://devpost.com/software/duetwithme-fu9y5p",
                content: "I collaborated with a team during a hackathon to create a interactive web app that can respond to voice commands and plays with you!"
            }
        ];
        return projects.map((project) => {
            return (
                <div className="boxes rounded" onClick={() => this.setModalState(project.content, project.link)}>
                    <p>{project.title}</p>
                </div>
            );
        });
    }

    renderSoftwareDev() {
        let projects = [
            {
                title: "Stream Editor Python Program (Python)",
                link: "https://github.com/joncady/scoreboard_and_overlays",
                content: "I created a Python program that outputs an XML file that can be easily interfaced by a stream overlay."
            },
            {
                title: "Wikipedia and Lyrics Scraping - In Progress (Python)",
                link: "https://github.com/joncady/python_web_scraping",
                content: "I scrape public websites and return interesting information based on a user request."
            },
            {
                title: "Faceboook Messenger Chatbot - In Progress (Python)",
                link: "#software-dev",
                content: "I linked my Faceboook account to a Python package that enacts various commands based on received messages."
            },
            {
                title: "Highlight Generator (Python)",
                link: "https://github.com/joncady/highlight_generator",
                content: "I utilize moviepy to create a program that combines video clips and adds music."
            }
        ];
        return projects.map((project) => {
            return (
                <div className="boxes rounded" onClick={() => this.setModalState(project.content, project.link)}>
                    <p>{project.title}</p>
                </div>
            );
        });
    }

    renderMobile() {
        let projects = [
            {
                title: "Monitood: Monitor your Food (React Native)",
                link: "https://github.com/joncady/monitoodApp",
                content: "I designed the front-end of a React Native app that stores user information in a Python back-end."
            }
        ];
        return projects.map((project) => {
            return (
                <div className="boxes rounded" onClick={() => this.setModalState(project.content, project.link)}>
                    <p>{project.title}</p>
                </div>
            );
        });
    }

    setModalState(content, link) {
        this.setState({
            content: content,
            link: link,
            modal: true
        });
    }

    render() {
        return (
            <section id="my-projects">
                <hr></hr>
                <h2>My Projects</h2>
                <hr></hr>
                <div id="projects" className="mt-5">
                    <div id="web-dev">
                        <h3>Web Development</h3>
                        <Row>
                            {this.renderWebDev()}
                        </Row>
                    </div>
                    <div id="software-dev">
                        <h3>Software Development</h3>
                        <Row>
                            {this.renderSoftwareDev()}
                        </Row>
                    </div>
                    <div id="mobile-dev">
                        <h3>Mobile Development</h3>
                        <Row>
                            {this.renderMobile()}
                        </Row>
                    </div>
                </div>
                <div>
                    <Modal isOpen={this.state.modal} toggle={this.toggle}>
                        <div style={{ padding: '2rem', textAlign: 'center' }}>
                            <h2>About this project:</h2>
                            <p>{this.state.content}</p>
                            <a href={this.state.link}>
                                <Button>View Project</Button>
                            </a>
                        </div>
                    </Modal>
                </div>
            </section>
        );
    }

}