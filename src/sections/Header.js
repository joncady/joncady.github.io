import React, { Component } from 'react';
import { Parallax } from 'react-parallax';
import background from '../assets/seattle4.jpg';
import profile from '../assets/otherPic.jpg';

export default class Header extends Component {

    constructor(props) {
        super(props);
        this.state = {
            dropdownOpen: false,
            collapse: false
        }
    }

    render() {
        return (
            <Parallax blur={{ min: -12, max: 20 }}
                bgImage={background}
                bgImageAlt="background"
                strength={150}
                renderLayer={percentage => {
                    return (
                        <div className="picture-container">
                            <img id="profile" style={{transform: `scale(${1.5 - percentage})`}} src={profile} alt="Jonathan Cady profile"></img>
                        </div>
                    )
                }} >
                <div id="parallax-header"></div>
            </Parallax>
        );
    }

}