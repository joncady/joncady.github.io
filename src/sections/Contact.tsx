import React from "react";
export default function Contact() {
    return (
        <section className="contact-section section-shell" id="contact">
            <p className="eyebrow">Contact</p>
            <h2>Contact me</h2>
            <a className="contact-email" href="mailto:jonrcady@gmail.com">
                Email me <span aria-hidden="true">↗</span>
            </a>
            <div className="social-links">
                <a
                    href="https://github.com/joncady"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    GitHub ↗
                </a>
                <a
                    href="https://www.linkedin.com/in/jonathanrcady/"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    LinkedIn ↗
                </a>
            </div>
        </section>
    );
}
