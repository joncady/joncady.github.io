import React, { Component } from 'react';
import Plx from 'react-plx';

const parallaxData = [
    {
        start: 'self',
        duration: 300,
        properties: [
            {
                startValue: 0,
                endValue: 5,
                property: 'blur'
            }
        ],
    },
];

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
            <Plx parallaxData={parallaxData}>
                <div className="picture-container">
                </div>
            </Plx>
        );
    }

}