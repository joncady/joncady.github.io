import React from "react";

interface Skill {
    link: string;
    altText: string;
    imageSrc: string;
}

const skills: Skill[] = [
    {
        link: "https://reactjs.org/",
        altText: "React",
        imageSrc: "/assets/skill_logos/react.png"
    },
    {
        link: "https://redux.js.org/",
        altText: "Redux",
        imageSrc: "/assets/skill_logos/redux.png"
    },
    {
        link: "https://firebase.google.com",
        altText: "Firebase",
        imageSrc: "/assets/skill_logos/firebase.png"
    },
    {
        link: "https://en.wikipedia.org/wiki/SQL",
        altText: "SQL",
        imageSrc: "/assets/skill_logos/sql.png"
    },
    {
        link: "https://nodejs.org",
        altText: "Node",
        imageSrc: "/assets/skill_logos/node.png"
    },
    {
        link: "https://www.java.com",
        altText: "Java",
        imageSrc: "/assets/skill_logos/java.png"
    },
    {
        link: "https://spring.io/",
        altText: "Spring",
        imageSrc: "/assets/skill_logos/spring.png"
    },
    {
        link: "https://www.python.org/",
        altText: "Python",
        imageSrc: "/assets/skill_logos/python.png"
    },
    {
        link: "https://www.r-project.org/",
        altText: "R",
        imageSrc: "/assets/skill_logos/r.png"
    },
    {
        link: "https://www.djangoproject.com/",
        altText: "Django",
        imageSrc: "/assets/skill_logos/django.png"
    },
    {
        link: "https://developer.apple.com/swift/",
        altText: "Swift",
        imageSrc: "/assets/skill_logos/swift.png"
    }
];

function Skill({ skill }: { skill: Skill }) {
    return (
        <div>
            <a href={skill.link}>
                <img src={skill.imageSrc} alt={skill.altText} />
            </a>
        </div>
    );
}

const Skills = () => {
    return (
        <section id="skills">
            <h2>Skills</h2>
            <div id="logo-space">
                {skills.map((skill, index) => (
                    <Skill key={index} skill={skill} />
                ))}
            </div>
        </section>
    );
};

export default Skills;
