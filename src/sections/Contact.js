import React, { Component } from 'react';

export default class Contact extends Component {

    render() {
        return (
            <section id="contact">
                <hr></hr>
                <h2>Contact</h2>
                <hr></hr>
                <p className="mt-5">If you would like to reach out to me, email works well!</p>
                <address>
                    <a href="https://github.com/joncady">
                        <div className="contact-container">
                            <i className="fab fa-github fa-lg"></i>
                        </div>
                    </a>
                    <a href="mailto:jonrcady@gmail.com">
                        <div id="email" className="contact-container">
                            <i className="fas fa-envelope fa-lg"></i>
                        </div>
                        <div id="written">
                            <span><strong>jonrcady@gmail.com</strong></span>
                        </div>
                    </a>
                    <a href="https://www.linkedin.com/in/jonathanrcady/">
                        <div className="contact-container">
                            <i className="fab fa-linkedin fa-lg"></i>
                        </div>
                    </a>
                </address>
            </section>
        );
    }

}

