import React, { useEffect } from "react";
import Navigation from "./sections/Navigation";
import Header from "./sections/Header";
import Projects from "./sections/Projects";
import Experience from "./sections/Experience";
import Travel from "./sections/Travel";
import Contact from "./sections/Contact";
import Footer from "./sections/Footer";

export default function App() {
    useEffect(() => {
        const id = window.location.hash.slice(1);
        if (id)
            document.getElementById(id)?.scrollIntoView({ behavior: "auto" });
    }, []);
    return (
        <>
            <a className="skip-link" href="#main-content">
                Skip to content
            </a>
            <Navigation />
            <Header />
            <main id="main-content" tabIndex={-1}>
                <Projects />
                <Experience />
                <Travel />
                <Contact />
            </main>
            <Footer />
        </>
    );
}
