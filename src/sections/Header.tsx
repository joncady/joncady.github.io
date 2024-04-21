import React from "react";
import Plx from "react-plx";

const parallaxData = [
    {
        start: "self",
        duration: 300,
        properties: [
            {
                startValue: 0,
                endValue: 5,
                property: "blur"
            }
        ]
    }
];

const Header = () => {
    return (
        <Plx parallaxData={parallaxData}>
            <div className="picture-container"></div>
        </Plx>
    );
};

export default Header;
