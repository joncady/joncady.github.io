import React, { Component } from 'react';

export default class Projects extends Component {

    render() {
        return (
            <section id="my-projects">
                <hr></hr>
                <h2>My Projects</h2>
                <hr></hr>
                <div id="projects" className="mt-5">
                    <div id="web-dev">
                        <h3>Web Development</h3>
                        <div className="big-box">
                            {/* <a className="rounded project-card" href="https://students.washington.edu/joncady/projects/grocery_list_project">
                                <div className="boxes rounded" id="project-one">
                                    <p>Grocery List Project (Javascript, PHP, SQL)</p>
                                </div>
                                <div className="project-info">I <em>developed</em> a grocery list app using a personal SQL
                                    server and PHP connection to interface with it.</div>
                            </a> */}
                            <a className="rounded project-card" href="https://jit98.shinyapps.io/BE-shrug/">
                                <div className="boxes rounded" id="project-two">
                                    <p>Yelp Business App (R, Shiny, Yelp API)</p>
                                </div>
                                <div className="project-info">I <em>collaborated</em> with a team to create a web app that
                                    utilizes the Yelp API to present information on businesses.</div>
                            </a>
                            <a className="rounded project-card" href="https://students.washington.edu/joncady/projects/news/">
                                <div className="boxes rounded" id="project-three">
                                    <p>News at a Glance (JavaScript, News API)</p>
                                </div>
                                <div className="project-info">I <em>call</em> the News API in this project to create a
                                    quick look at the top news stories of the day.</div>
                            </a>
                            <a className="rounded project-card" href="https://github.com/joncady/rmpUW">
                                <div className="boxes rounded" id="project-one">
                                    <p>Rate My Professor MyPlanExtension (CSS, JavaScript, PHP)</p>
                                </div>
                                <div className="project-info">I <em>designed</em> a Chrome extension that displays the
                                    professor's RateMyProfessor score next to their className.</div>
                            </a>
                            <a className="rounded project-card" href="https://students.washington.edu/joncady/projects/dubhacks/landing.html">
                                <div className="boxes rounded" id="project-two">
                                    <p>FeelingFeed (JavaScript, Bootstrap, PHP)</p>
                                </div>
                                <div className="project-info">I <em>developed</em> a full, dynamic website with my
                                    teammates at a Hackathon.</div>
                            </a>
                            <a className="rounded project-card" href="https://info340b-a18.github.io/react-project-music-viz/">
                                <div className="boxes rounded" id="project-three">
                                    <p>SpotiViz (React, Node)</p>
                                </div>
                                <div className="project-info">I <em>constructed</em> a React app with a classNamemate
                                    that visualizes an album timeline using the Spotify API</div>
                            </a>
                            <a className="rounded project-card" href="https://joncady.github.io/help.me/">
                                <div className="boxes rounded" id="project-one">
                                    <p>help.me (React, Firebase)</p>
                                </div>
                                <div className="project-info">I <em>collorated</em> with a team during a hackathon to
                                    create an emotional support chat bot that has user authentication</div>
                            </a>
                            <a className="rounded project-card" href="https://students.washington.edu/joncady/cv/">
                                <div className="boxes rounded" id="project-two">
                                    <p>Basic CV Example (JavaScript, Node, Express)</p>
                                </div>
                                <div className="project-info">I <em>connected</em> my simple front-end, which sends a
                                    photo,
                                    and my Express back-end, which forwards it to a Microsoft Vision API
                                </div>
                            </a>
                        </div>
                    </div>
                    <div id="software-dev">
                        <h3>Software Development</h3>
                        <div className="big-box">
                            <a className="rounded project-card" href="https://github.com/joncady/scoreboard_and_overlays">
                                <div id="project-one" className="boxes rounded">
                                    <p>Stream Editor Python Program (Python)</p>
                                </div>
                                <div className="project-info">I <em>created</em> a Python program that outputs an XML file
                                    that can be easily interfaced by a stream overlay.</div>
                            </a>
                            <a className="rounded project-card" href="https://github.com/joncady/python_web_scraping">
                                <div id="project-two" className="boxes rounded">
                                    <p>Wikipedia and Lyrics Scraping - <em>In Progress</em> (Python)</p>
                                </div>
                                <div className="project-info">I <em>scrape</em> public websites and return interesting
                                    information based on a user request.</div>
                            </a>
                            <a className="rounded project-card" href="#software-dev">
                                <div id="project-three" className="boxes rounded">
                                    <p>Faceboook Messenger Chatbot - <em>In Progress</em> (Python)</p>
                                </div>
                                <div className="project-info">I <em>linked</em> my Faceboook account to a Python package
                                    that enacts various commands based on received messages.</div>
                            </a>
                            <a className="rounded project-card" href='https://github.com/joncady/highlight_generator'>
                                <div id="project-one" className="boxes rounded">
                                    <p>Highlight Generator (Python)</p>
                                </div>
                                <div className="project-info">I <em>utilize</em> moviepy to create a program that combines
                                    video clips and adds music.</div>
                            </a>
                        </div>
                    </div>
                    <div id="mobile-dev">
                        <h3>Mobile Development</h3>
                        <div className="big-box">
                            <a className="rounded project-card" href="https://github.com/joncady/monitoodApp">
                                <div id="project-one" className="boxes rounded">
                                    <p>Monitood: Monitor your Food (React Native)</p>
                                </div>
                                <div className="project-info">I <em>designed</em> the front-end of a React Native app that
                                    stores
                                    user information in a Python back-end.</div>
                            </a>
                        </div>
                    </div>
                </div>
            </section>
        );
    }

}