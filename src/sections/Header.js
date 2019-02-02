import React, { Component } from 'react';
import { Parallax } from 'react-parallax';

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
            index: 0
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

    render() {
        return (
            <Parallax blur={{ min: -12, max: 20 }}
                bgImage={require('../assets/seattle4.jpg')}
                bgImageAlt="background"
                strength={200}>
                <div id="parallax-header">
                    {/* <h1 className="text-uppercase" style={{color: 'white'}}>Hi. {this.state.word}</h1> */}
                </div>
            </Parallax>
        );
    }

}