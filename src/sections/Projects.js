import React, { Component } from 'react';
import { Row, Modal, Button, Input, FormGroup, Label, Container } from 'reactstrap';
import { webDevProjects, mobileDevProjects } from './Helpers';

export default class Projects extends Component {

    constructor() {
        super();

        const extractFilters = (project, set) => {
            project.filters.forEach((filter) => {
                console.log(filter)
                set.add(filter);
            })
        }

        let webDevFilters = new Set();
        webDevProjects.forEach((project) => extractFilters(project, webDevFilters));

        let mobileDevFilters = new Set();
        mobileDevProjects.forEach((project) => extractFilters(project, mobileDevFilters));

        console.log(mobileDevFilters)
        this.state = {
            modal: false,
            content: "",
            link: "",
            src: "",
            tech: "",
            title: "",
            webDevFilters: [...webDevFilters],
            webCurrentFilter: "",
            mobileFilters: [...mobileDevFilters],
            mobileCurrentFilter: ""
        }
    }


    toggle = () => {
        this.setState({
            modal: !this.state.modal
        });
    }

    renderWebDev() {
        let projects = webDevProjects;
        return projects.filter((project) => this.state.webCurrentFilter === "" || project.filters.includes(this.state.webCurrentFilter)).map((project, i) => {
            return (
                <div className="contain" key={i}>
                    <div className="boxes rounded" style={{ backgroundImage: `url(./images/${project.src})` }} onClick={() => this.setModalState(project.content, project.link, project.src, project.tech, project.title)} />
                </div>
            );
        });
    }

    renderMobile() {
        let projects = mobileDevProjects;
        return projects.filter((project) => this.state.mobileCurrentFilter === "" || project.filters.includes(this.state.mobileCurrentFilter)).map((project, i) => {
            return (
                <div className="contain" key={i}>
                    <div className="boxes rounded" style={{ backgroundImage: `url(./images/${project.src})` }} onClick={() => this.setModalState(project.content, project.link, project.src, project.tech, project.title)} />
                </div>
            );
        });
    }

    setModalState(content, link, src, tech, title) {
        this.setState({
            content,
            link,
            modal: true,
            src,
            tech,
            title
        });
    }

    selectOnChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    render() {
        let mobileDevSelect = this.state.mobileFilters.map((option) => {
            return <option value={option} key={option}>{option.toUpperCase()}</option>
        });
        let webDevSelect = this.state.webDevFilters.map((option) => {
            return <option value={option} key={option}>{option.toUpperCase()}</option>
        });
        return (
            <section id="my-projects">
                <hr></hr>
                <h2>Projects</h2>
                <hr></hr>
                <div id="projects">
                    <div id="web-dev">
                        <h3>Web Development</h3>
                        <Container className="filter-container">
                            <FormGroup style={{ display: "flex", alignItems: "center" }}>
                                <Label style={{ marginBottom: "0", marginRight: "0.5em" }}>Filter:</Label>
                                <Input type="select" name="webCurrentFilter" onChange={this.selectOnChange}>
                                    <option value=""></option>
                                    {webDevSelect}
                                </Input>
                            </FormGroup>
                        </Container>
                        <Row>
                            {this.renderWebDev()}
                        </Row>
                    </div>
                    <div id="mobile-dev">
                        <h3>Mobile Development</h3>
                        <Container className="filter-container">
                            <FormGroup style={{ display: "flex", alignItems: "center" }}>
                                <Label style={{ marginBottom: "0", marginRight: "0.5em" }}>Filter:</Label>
                                <Input type="select" name="mobileCurrentFilter" onChange={this.selectOnChange}>
                                    <option value=""></option>
                                    {mobileDevSelect}
                                </Input>
                            </FormGroup>
                        </Container>
                        <Row>
                            {this.renderMobile()}
                        </Row>
                    </div>
                </div>
                <div>
                    <Modal isOpen={this.state.modal} toggle={this.toggle}>
                        <div style={{ padding: '2rem', textAlign: 'center' }}>
                            <h2>{this.state.title}</h2>
                            <div id="rounded">
                                <img id="modal-pic" alt={this.state.src} src={`./images/${this.state.src}`}></img>
                            </div>
                            {this.state.tech && this.state.tech.map((icon) => {
                                return <i key={icon} className={`fab fa-${icon} fa-3x tech-icon`} title={icon}></i>
                            })}
                            <p style={{ marginTop: "0.5rem" }}>{this.state.content}</p>
                            <a href={this.state.link} target="_blank" rel="noopener noreferrer">
                                <Button style={{ backgroundColor: "#343a40" }}>View Project</Button>
                            </a>
                        </div>
                    </Modal>
                </div>
            </section>
        );
    }

}