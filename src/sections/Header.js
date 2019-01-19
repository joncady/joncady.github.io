import React, { Component } from 'react';
import hellos from '../SayHello';
import { ButtonDropdown, DropdownToggle, DropdownMenu, Collapse } from 'reactstrap';

export default class Header extends Component {

    constructor() {
        super();
        this.state = {
            timer: null,
            helloTimer: null,
            index: null,
            word: "",
            helloEls: [],
            dropdownOpen: false,
            collapse: false
        }
    }

    componentDidMount() {
        let word = " I'm Jonathan Cady";
        let welcome = setInterval(() => {
            this.addLetters(word);
        }, 100)
        this.setState({
            timer: welcome,
            index: 0,
            // helloTimer: setInterval(() => this.createHellos(), 2200)
        })
    }

    toggleArea = () => {
        this.setState({ collapse: !this.state.collapse });
    }
    

    toggle = () => {
        this.setState(prevState => ({
            dropdownOpen: !prevState.dropdownOpen
        }));
    }

    addLetters = (word) => {
        let index = this.state.index;
        if (index < word.length) {
            this.setState({
                word: this.state.word + word.charAt(index),
                index: index + 1
            })
        } else {
            clearTimeout(this.state.timer);
        }
    }

    /*
     * This function randomly spawns text that appears throughout the div
     */
    createHellos = () => {
        if (this.state.helloEls.length === 20) {
            clearInterval(this.state.helloTimer);
        }
        let width = document.querySelector('header').offsetWidth;
        let height = document.querySelector('header').offsetHeight;
        this.addHello(width, height);
    }

    /*
     * Randomly generates hellos to populate the hello module
     */
    addHello(width, height) {
        let randomWord = hellos[Math.floor(Math.random() * hellos.length)];
        let randomX = this.produceRandom(width);
        let randomY = this.produceRandom(height);
        while (this.conditions(randomX, randomY, width, height)) {
            randomX = this.produceRandom(width);
            randomY = this.produceRandom(height);
        }
        let hello = <div key={"hello" + this.state.helloEls + 1} style={{ position: 'absolute', left: `${randomX}px`, top: `${randomY}px` }} className="word fadein">{randomWord}</div>;
        this.setState({
            helloEls: this.state.helloEls.concat(hello)
        });
        // $('.word').animate({ opacity: 0.4}, 1000);
    }

    conditions(xVal, yVal, width, height) {
        // checks if word would be generated too close to upper and lower boundaries
        if (yVal > (height - 10)) {
            return true;
            // checks if word would be generated too close to side
        } else if (xVal < 10 || xVal > (width - 30)) {
            return true;
        } else {
            return false;
        }
    }

    /*
     * Resets all 'hellos' in the module
     */
    resetAll = () => {
        this.setState({
            helloEls: [],
            helloTimer: setInterval(this.createHellos, 1000),
            dropdownOpen: false
        })
    }

    produceRandom(value) {
        return Math.floor(Math.random() * value);
    }

    render() {
        return (
            <React.Fragment>
                <header>
                    <div id="header" aria-label="says hello in many different languages">
                        {this.state.helloEls}
                        <div id="top">
                            <h1 id="me">Hi. {this.state.word}</h1>
                        </div>
                    </div>
                </header>
                <ButtonDropdown color="primary" isOpen={this.state.dropdownOpen} toggle={this.toggle}>
                    <DropdownToggle caret>
                    </DropdownToggle>
                    <DropdownMenu>
                        <button className="dropdown-item" id="reset" onClick={this.resetAll}>reset</button>
                        <button id="hello-button" className="dropdown-item" onClick={() => this.setState({ dropdownOpen: false, collapse: !this.state.collapse })} data-toggle="collapse" data-target="#about-hello"
                            aria-expanded="false" aria-controls="about-hello">about hellos</button>
                    </DropdownMenu>
                </ButtonDropdown>
                <Collapse isOpen={this.state.collapse}>
                    <p className="card card-body card-size">
                        I designed the "hello" module to say hello in a variety of languages.
                        I am interested in languages and I try to find ways to
                        pair my love for coding and language!
                    </p>
                </Collapse>
            </React.Fragment>
        );
    }

}