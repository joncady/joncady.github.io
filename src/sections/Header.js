import React, { Component } from 'react';
import { Parallax } from 'react-parallax';

export default class Header extends Component {

    constructor(props) {
        super(props);
        this.state = {
            dropdownOpen: false,
            collapse: false
        }
    }

    toggleArea = () => {
        this.setState({ collapse: !this.state.collapse });
    }


    toggle = () => {
        this.setState(prevState => ({
            dropdownOpen: !prevState.dropdownOpen
        }));
    }


    render() {
        return (
            <Parallax blur={{ min: -12, max: 20 }}
                bgImage={require('../assets/seattle4.jpg')}
                bgImageAlt="background"
                strength={200}
                renderLayer={percentage => {
                    return (
                        <div className="picture-container">
                            <img id="profile" style={{transform: `scale(${1.5 - percentage})`, filter: `blur(${percentage - .5}px)`}} src={require("../assets/otherPic.jpg")} alt="Jonathan Cady profile"></img>
                        </div>
                    )
                }} >
                <div id="parallax-header"></div>
            </Parallax>
        );
    }

}