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
                            <img src={require("../assets/hackathon.png")} alt="Hackathons"></img>
                        </Bounce>
                        <div className="media-body">
                            <h5 className="mt-0 mb-1 font-weight-bold">Hackathons</h5>
                            To put my coding skills to use and hopefully make some change in the world, I enter a bunch of
                            hackathons each year! I've listed some of my solutions in my web development experience up above,
                            so please check them out. Some examples include: Dubhacks, NWHacks, T-Mobile NB-IoT, and IBM Virtual
                            Hackathons, to name a few.
                        </div>
                    </li>
                    <li className="media mb-3">
                        <Bounce>
                            <img src={require("../assets/skill_logos/react.png")} alt="React"></img>
                        </Bounce>
                        <div className="media-body">
                            <h5 className="mt-0 mb-1 font-weight-bold">React Development</h5>
                            ReactJS is one of my passions! I am a big fan of the speed at which I can develop during hackathons
                            as well as on the job. Making responsive, single page applications is really fun and a flashy way to
                            show off my skills. I'm excited to continually learn new methodologies and state management libraries
                            to improve my understanding and develop more complex apps!
                        </div>
                    </li>
                </ul>
                <li className="media">
                    <Bounce>
                        <img src={require("../assets/fullstack.png")} alt="Full Stack Dev"></img>
                    </Bounce>
                    <div className="media-body">
                        <h5 className="mt-0 mb-1 font-weight-bold">Full Stack Development</h5>
                        I have a passion for frontend and backend technologies! I love to see (and plan)
                        the flow of data from a database to the user in their browser. Learning and adapting to new
                        methodologies of development is engaging and I try to learn new things every day. While I want
                        to code the services that clients interact with, having a hand in the entire system is exciting!
                        Because of this, I consider myself a full stack developer.
                </div>
                </li>
            </div>
        </section>
    );
}

export default Interests;