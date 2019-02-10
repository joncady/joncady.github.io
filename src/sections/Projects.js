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
                content: "I collaborated with a team to create a web app that utilizes the Yelp API to present information on businesses.",
                src: "yelp.PNG"
            },
            {
                title: "News at a Glance (JavaScript, News API)",
                link: "https://students.washington.edu/joncady/projects/news/",
                content: "I call the News API in this project to create a quick look at the top news stories of the day.",
                src: "news.PNG"
            },
            {
                title: "Rate My Professor MyPlanExtension (CSS, JavaScript, PHP)",
                link: "https://github.com/joncady/rmpUW",
                content: "I designed a Chrome extension that displays the professor's RateMyProfessor score next to their class name. (Probably deprecated, is not currently working)",
                src: "rmp.PNG"
            },
            {
                title: "FeelingFeed (JavaScript, Bootstrap, PHP)",
                link: "https://students.washington.edu/joncady/projects/dubhacks/landing.html",
                content: "I developed a full, dynamic website with my teammates at a Hackathon.",
                src: "feeling.png"
            },
            {
                title: "SpotiViz (React, Node)",
                link: "https://info340b-a18.github.io/react-project-music-viz/",
                content: "I constructed a React app with classmates that visualizes an album timeline using the Spotify API.",
                src: "spotify.PNG"
            },
            {
                title: "help.me (React, Firebase)",
                link: "https://joncady.github.io/help.me/",
                content: "I collorated with a team during a hackathon to create an emotional support chat bot that has user authentication.",
                src: "help.PNG"
            },
            {
                title: "Fire Emblem Adventures (JavaScript, HTML, CSS)",
                link: "https://students.washington.edu/joncady/projects/feadventures/",
                content: "I designed a 2D game using only vanilla JavaScript, HTML, and CSS. I created classes to encapsulate behavior for players, enemies, and obstacles.",
                src: "fe.PNG"
            },
            {
                title: "Satellite Smash Brand Website (React, Firebase)",
                link: "http://satellitesmash.com",
                content: "I developed a React app that includes a player database, as well as a news feed. I used client rounting to emulate a multi-page site.",
                src: "ss.PNG"
            },
            {
                title: "DuetWithMe (React, Node, Speech-to-Text)",
                link: "https://devpost.com/software/duetwithme-fu9y5p",
                content: "I collaborated with a team during a hackathon to create a interactive web app that can respond to voice commands and plays with you!",
                src: "duet.PNG"
            },
            {
                title: "Draw with Me (React, Socket IO, Node)",
                link: "https://joncady.me/draw-with-me",
                content: "I designed a interactive drawing app that allows friends to draw live over the internet and save their pictures!",
                src: "draw.PNG"
            }
        ];
        return projects.map((project, i) => {
            return (
                <div className="contain" key={i}>
                    <div className="boxes rounded" style={{ backgroundImage: `url(./images/${project.src})` }} onClick={() => this.setModalState(project.content, project.link, project.src)} />
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
            },
            {
                title: "Computer Vision Simon Says (Python, Open CV)",
                link: "",
                content: "I utilize Open CV to play an online Simon Says game using computer vision.",
                src: "simon.png"
            }
        ];
        return projects.map((project, i) => {
            return (
                <div className="contain" key={i}>
                    <div className="boxes rounded" style={{ backgroundImage: `url(./images/${project.src})` }} onClick={() => this.setModalState(project.content, project.link, project.src)} />
                </div>
            );
        });
    }

    renderMobile() {
        let projects = [
            {
                title: "Monitood: Monitor your Food (React Native)",
                link: "https://github.com/joncady/monitoodApp",
                content: "I designed the front-end of a React Native app that stores user information in a Python back-end.",
                src: "monitood.png"
            }
        ];
        return projects.map((project, i) => {
            return (
                <div className="contain" key={i}>
                    <div className="boxes rounded" style={{ backgroundImage: `url(./images/${project.src})` }} onClick={() => this.setModalState(project.content, project.link, project.src)} />
                </div>
            );
        });
    }

    setModalState(content, link, src) {
        this.setState({
            content: content,
            link: link,
            modal: true,
            src: src
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
                    {/* <div id="software-dev">
                        <h3>Software Development</h3>
                        <Row>
                            {this.renderSoftwareDev()}
                        </Row>
                    </div> */}
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
                            <div id="rounded">
                                <img id="modal-pic" alt={this.state.src} src={`./images/${this.state.src}`}></img>
                            </div>
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