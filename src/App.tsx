import React, { useEffect, useRef, useState } from "react";
import Navigation from "./sections/Navigation";
import Header from "./sections/Header";
import AboutMe from "./sections/AboutMe";
import Skills from "./sections/Skills";
import Projects from "./sections/Projects";
import Contact from "./sections/Contact";
import Footer from "./sections/Footer";
import Experience from "./sections/Experience";
import { OverlayTrigger, Tooltip } from "react-bootstrap";
import Travel from "./sections/Travel";

const App = () => {
    const [tooltipOpen, setToolTipOpen] = useState(false);
    const [showIcon, setShowIcon] = useState(false);
    const target = useRef(null);

    const toggle = () => {
        setToolTipOpen(!tooltipOpen);
    };

    useEffect(() => {
        const scrollEvent = () => {
            if (window.scrollY > 50) {
                setShowIcon(true);
            } else {
                setShowIcon(false);
            }
        };

        window.addEventListener("scroll", scrollEvent);
        return () => {
            window.removeEventListener("scroll", scrollEvent);
        };
    }, []);

    return (
        <div>
            <Navigation />
            <Header />
            <main>
                <div className="content">
                    <AboutMe />
                    <h2>Professional Experience</h2>
                    <Experience />
                    <Projects />
                    <Skills />
                    <h2>Hobbies</h2>
                    <Travel />
                    <Contact />
                </div>
            </main>
            <Footer />
            {showIcon && (
                <div>
                    <OverlayTrigger
                        placement="left"
                        overlay={
                            <Tooltip id="back-to-top">Back to the top!</Tooltip>
                        }
                    >
                        <a
                            id="back-to-top"
                            href="/#"
                            ref={target}
                            onClick={toggle}
                            className="back-to-top btn btn-dark btn-lg"
                            role="button"
                        >
                            <i className="fas fa-arrow-up"></i>
                        </a>
                    </OverlayTrigger>
                </div>
            )}
        </div>
    );
};

export default App;
