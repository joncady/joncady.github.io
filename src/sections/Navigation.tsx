import React, { useState } from "react";
export default function Navigation() {
    const [open, setOpen] = useState(false);
    return (
        <nav className="site-nav" aria-label="Main navigation">
            <a className="wordmark" href="#" onClick={() => setOpen(false)}>
                Jonathan Cady
            </a>
            <button
                className="menu-toggle"
                aria-label="Toggle navigation"
                aria-expanded={open}
                aria-controls="site-links"
                onClick={() => setOpen(!open)}
            >
                {open ? "Close −" : "Menu +"}
            </button>
            <div
                id="site-links"
                className={open ? "nav-links is-open" : "nav-links"}
            >
                <a href="#my-projects" onClick={() => setOpen(false)}>
                    01 / Work
                </a>
                <a href="#experience" onClick={() => setOpen(false)}>
                    02 / Experience
                </a>
                <a href="#travel" onClick={() => setOpen(false)}>
                    03 / Travel Log
                </a>
                <a
                    className="nav-contact"
                    href="#contact"
                    onClick={() => setOpen(false)}
                >
                    Contact ↗
                </a>
            </div>
        </nav>
    );
}
