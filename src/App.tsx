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
    useEffect(() => {
        if (window.location.hash === "#travel") {
            document
                .getElementById("travel")
                ?.scrollIntoView({ behavior: "auto" });
        }
    }, []);
    const [tooltipOpen, setToolTipOpen] = useState(false);
    const [showIcon, setShowIcon] = useState(false);
    const [travelInView, setTravelInView] = useState(false);
    useEffect(() => {
        const travel = document.getElementById("travel");
        if (!travel) return;
        const observer = new IntersectionObserver(([entry]) =>
            setTravelInView(entry.isIntersecting)
        );
        observer.observe(travel);
        return () => observer.disconnect();
    }, []);
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
            <a className="skip-link" href="#main-content" tabIndex={0}>
                Skip to content
            </a>
            <Navigation />
            <Header />
            <main id="main-content" tabIndex={-1}>
                <div className="content">
                    <AboutMe />
                    <Experience />
                    <Projects />
                    <Skills />
                    <h2>Travel</h2>
                    <Travel />
                    <Contact />
                </div>
            </main>
            <Footer />
            {showIcon && !travelInView && (
                <div>
                    <OverlayTrigger
                        placement="left"
                        overlay={
                            <Tooltip id="back-to-top">Back to the top!</Tooltip>
                        }
                    >
                        <a
                            id="back-to-top"
                            href="#"
                            aria-label="Back to top"
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
