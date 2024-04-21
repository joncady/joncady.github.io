import React from "react";

const Interests = () => {
    return (
        <section id="interests">
            <h2>Interests</h2>
            <div>
                <ul className="list-unstyled">
                    <li className="media mb-3">
                        <div>
                            <img src={"/assets/travel.png"} alt="Travel"></img>
                        </div>
                        <div className="media-body">
                            <h5 className="mt-0 mb-1 font-weight-bold">
                                Travel
                            </h5>
                            I have post pictures from my travels on my travel{" "}
                            <a href="https://www.instagram.com/travelerjc/">
                                Instagram
                            </a>
                            .
                        </div>
                    </li>
                    <li className="media">
                        <div>
                            <img
                                src={"../assets/fullstack.png"}
                                alt="Full Stack Dev"
                            ></img>
                        </div>
                        <div className="media-body">
                            <h5 className="mt-0 mb-1 font-weight-bold">
                                Full Stack Development
                            </h5>
                            I have a passion for frontend and backend
                            technologies! I love to see (and plan) the flow of
                            data from a database to the user in their browser.
                            Learning and adapting to new methodologies of
                            development is engaging and I try to learn new
                            things every day. While I want to code the services
                            that clients interact with, having a hand in the
                            entire system is exciting! Because of this, I
                            consider myself a full stack developer.
                        </div>
                    </li>
                </ul>
            </div>
        </section>
    );
};

export default Interests;
