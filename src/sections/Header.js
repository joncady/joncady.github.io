import React, { Component } from 'react';

export default class Header extends Component {

    constructor() {
        super();
        this.state = {
            timer: null,
            helloTimer: null,
            index: null,
            word: ""
        }
    }

    componentDidMount() {
        let word = " I'm Jonathan Cady";
        let welcome = setInterval(() => {
            this.addLetters(word);
        },  100)
        this.setState({
            timer: welcome,
            index: 0,
            // helloTimer: setInterval(() => this.createHellos(), 2200)
        })
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
    //  createHellos() {
    //     if ($('.word').length == 20) {
    //         clearInterval(this.state.helloTimer);
    //     }
    //     let width = $('header').get(0).offsetWidth;
    //     let height = $('header').get(0).offsetHeight;
    //     this.addHello(width, height); 
    // }

    /*
     * Randomly generates hellos to populate the hello module
     */
    // addHello (width, height) {
    //     let randomWord = hellos[Math.floor(Math.random() * hellos.length)];
    //     let randomX = this.produceRandom(width);
    //     let randomY = this.produceRandom(height);
    //     while (this.conditions(randomX, randomY, width, height)) {
    //         randomX = this.produceRandom(width);
    //         randomY = this.produceRandom(height);
    //     }
    //     let word = document.createElement('div');
    //     word.classList.add('word');
    //     word.style.position = 'absolute';
    //     word.innerText = randomWord;
    //     word.style.top = randomY + 'px';
    //     word.style.left = randomX + 'px';
    //     $('#header').append(word);
    //     $('.word').animate({ opacity: 0.4}, 1000);
    // }

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
    // resetAll () {
    //     clearInterval(helloTimer);
    //     $('.word').animate({ opacity: 0 }, 300, function () {
    //         $('.word').remove();
    //     });
    //     this.setState({
    //         helloTimer: setInterval(createHellos, 1000)
    //     })
    // }

    produceRandom(value) {
        return Math.floor(Math.random() * value);
    }

    render() {
        return (
            <React.Fragment>
                <header>
                    <div id="header" aria-label="says hello in many different languages">
                        <div id="top">
                            <h1 id="me">Hi. {this.state.word}</h1>
                        </div>
                    </div>
                </header>
                <div id="about-hello" className="collapse mt-3">
                    <p className="card card-body card-size">
                        I designed the "hello" module to say hello in a variety of languages.
                        I am interested in languages and I try to find ways to
                        pair my love for coding and language!
                    </p>
                </div>
                <div className="dropdown show">
                    <div className="btn btn-dark-outline dropdown-toggle" id="dropdownMenuLink" data-toggle="dropdown"
                        aria-haspopup="true" aria-expanded="false">
                    </div>
                    <div className="dropdown-menu" aria-labelledby="dropdownMenuLink">
                        <button className="dropdown-item" id="reset" onClick={this.resetAll}>reset</button>
                        <button id="hello-button" className="dropdown-item" data-toggle="collapse" data-target="#about-hello"
                            aria-expanded="false" aria-controls="about-hello">about hellos</button>
                    </div>
                </div>
            </React.Fragment>
        );
    }

}