import React from 'react';
import Bounce from 'react-reveal/Bounce';

const Interests = () => {
    return (
        <section id="interests">
            <hr></hr>
            <h2>Interests</h2>
            <hr></hr>
            <div>
                <ul className="list-unstyled">
                    <li className="media mb-3">
                        <Bounce>
                            <img src={require("../assets/bs.png")} alt="Beautiful Soup"></img>
                        </Bounce>
                        <div className="media-body">
                            <h5 className="mt-0 mb-1 font-weight-bold">Web Scraping</h5>
                            I have a passion for using technologies to scrape (or data mine) various websites! I
                            have used based Python packages like requests and Beautiful Soup
                            to retrieve and process webpages. For more complicated pages (with dynamic JavaScript),
                            I use Selenium. This can simulate a user logging into a page
                            and loading it normally. Scraping can also be done in PHP, and more importantly
                            JavaScript on the server side using Cheerio and Express.
                        </div>
                    </li>
                    <li className="media mb-3">
                        <Bounce>
                            <img src={require("../assets/api.png")} alt="API"></img>
                        </Bounce>
                        <div className="media-body">
                            <h5 className="mt-0 mb-1 font-weight-bold">Personal APIs</h5>
                            When unable to find an API to do the job, I create my own! This is in the form of
                            pulling local content on a server using PHP, or invoking other requests
                            using Express. For various projects, I have developed simple REST APIs that assist for
                            my front-end, either as a content generator or for authorization.
                            Simple Express servers can be deployed to hosting services, like Heroku, and used as a
                            public REST API! I have also gained in-depth with API frameworks through my experience at enterprise organziations,
                            such as UW-IT and Ticketmaster.
                        </div>
                    </li>
                    <li className="media mb-3">
                        <Bounce>
                            <img src={require("../assets/pi.jpeg")} alt="React"></img>
                        </Bounce>
                        <div className="media-body">
                            <h5 className="mt-0 mb-1 font-weight-bold">Internet of Things</h5>
                            I've recently been fascinated with Internet of Things (IoT) technology! Small devices
                            such as Raspberry Pis, or Arduinos can do really cool things. My favorite trick I've
                            done so far is setting up a server on my Raspberry Pi and having the Pi speak by using
                            text-to-speech (from an HTTP request). Paired with Node, an Arduino can also become a
                            smart device! Using Node modules that have been written to interact with an Arduino, you can
                            set up your own wifi-enabled devices. I hope to showcase some of projects with IoT here as
                            well!
                        </div>
                    </li>
                    <li className="media">
                        <Bounce>
                            <img src={require("../assets/skill_logos/react.png")} alt="React"></img>
                        </Bounce>
                        <div className="media-body">
                            <h5 className="mt-0 mb-1 font-weight-bold">React Development - My Future!</h5>
                            React is one of my new-found passions! I recently learned the basics in my courses and
                            now I'm able to make powerful single page applications that can
                            have user authentication and a real-time database (using Firebase!). I hope to develop
                            a useful React app in the future that is scalable and dynamic,
                            I just need an idea! My goal is to combine my other passions to create an app that uses
                            React for the front-end, a Python scraping back-end, and then
                            Firebase for user storage.
                        </div>
                    </li>
                </ul>
            </div>
        </section>
    );
}

export default Interests;