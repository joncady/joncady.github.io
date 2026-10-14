import React from "react";
export default function Header() {
    return (
        <header className="hero" id="home">
            <div className="hero-copy">
                <p className="eyebrow">
                    <span className="status-dot" aria-hidden="true" /> Software
                    engineer · Seattle, WA
                </p>
                <div className="hero-identity">
                    <img
                        className="profile-photo"
                        src="/assets/profile.jpg"
                        alt="Jonathan Cady"
                        fetchPriority="high"
                    />
                    <h1>Jonathan Cady</h1>
                </div>
                <p className="hero-description">
                    I’m a full-stack software engineer at Amazon in Seattle. I
                    studied Informatics at the University of Washington. I was
                    born and raised in Washington state.
                </p>
            </div>
            <div className="hero-photo">
                <img
                    src="/assets/seattle4.jpg"
                    alt="Seattle skyline with the Space Needle"
                    fetchPriority="high"
                />
                <span className="photo-caption">Seattle, Washington</span>
            </div>
        </header>
    );
}
