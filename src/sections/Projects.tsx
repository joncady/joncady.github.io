import React, { useState } from "react";
import { Button, Col, Container, Form, Modal, Row } from "react-bootstrap";
import { webDevProjects, mobileDevProjects, Project } from "./Helpers";

const Projects = () => {
    const [modal, setModal] = useState(false);
    const [title, setTitle] = useState("");
    const [src, setSrc] = useState("");
    const [link, setLink] = useState("");
    const [tech, setTech] = useState<string[]>([]);
    const [content, setContent] = useState("");
    const [webCurrentFilter, setWebCurrentFilter] = useState("");
    const [mobileCurrentFilter, setMobileCurrentFilter] = useState("");

    const webDevFiltersList = webDevProjects.reduce((prevValue, project) => {
        return [...prevValue, ...project.filters];
    }, [] as string[]);
    const webDevFilters = new Set(webDevFiltersList);
    const mobileDevFiltersList = mobileDevProjects.reduce(
        (prevValue, project) => {
            return [...prevValue, ...project.filters];
        },
        [] as string[]
    );
    const mobileDevFilters = new Set(mobileDevFiltersList);

    const close = () => {
        setModal(false);
    };

    const renderProjects = (projects: Project[], currentFilter: string) => {
        return projects
            .filter(
                (project) =>
                    currentFilter === "" ||
                    project.filters.includes(currentFilter)
            )
            .map((project, i) => {
                return (
                    <Col key={`item${i}`}>
                        {" "}
                        <div
                            className="boxes rounded"
                            style={{
                                backgroundImage: `url(./assets/${project.src})`
                            }}
                            onClick={() =>
                                setModalState(
                                    project.content,
                                    project.link,
                                    project.src,
                                    project.tech,
                                    project.title
                                )
                            }
                        />
                    </Col>
                );
            });
    };

    const selectOnChange = (value: string, selectName: string) => {
        if (selectName === "webDev") {
            setWebCurrentFilter(value);
        } else if (selectName === "mobileDev") {
            setMobileCurrentFilter(value);
        }
    };

    const setModalState = (
        content: string,
        link: string,
        src: string,
        tech: string[],
        title: string
    ) => {
        setModal(true);
        setContent(content);
        setLink(link);
        setSrc(src);
        setTech(tech);
        setTitle(title);
    };

    const mobileDevOptions = Array.from(mobileDevFilters).map((option) => {
        return (
            <option key={option} value={option}>
                {option.toUpperCase()}
            </option>
        );
    });
    const webDevOptions = Array.from(webDevFilters).map((option) => {
        return (
            <option key={option} value={option}>
                {option.toUpperCase()}
            </option>
        );
    });
    return (
        <section id="my-projects">
            <h2>Projects</h2>
            <div id="projects">
                <div id="web-dev">
                    <h3>Web Development</h3>
                    <Container>
                        <Form.Group
                            style={{
                                display: "flex",
                                alignItems: "center"
                            }}
                        >
                            <Form.Label
                                style={{
                                    marginBottom: "0",
                                    marginRight: "0.5em"
                                }}
                            >
                                Filter:
                            </Form.Label>
                            <Form.Select
                                value={webCurrentFilter}
                                onChange={({ target }) =>
                                    selectOnChange(target.value ?? "", "webDev")
                                }
                            >
                                {webDevOptions}
                            </Form.Select>
                        </Form.Group>
                    </Container>
                    <Container fluid>
                        <Row>
                            {" "}
                            {renderProjects(webDevProjects, webCurrentFilter)}
                        </Row>
                    </Container>
                </div>
                <div id="mobile-dev">
                    <h3>Mobile Development</h3>
                    <Container>
                        <Form.Group
                            style={{
                                display: "flex",
                                alignItems: "center"
                            }}
                        >
                            <Form.Label
                                style={{
                                    marginBottom: "0",
                                    marginRight: "0.5em"
                                }}
                            >
                                Filter:
                            </Form.Label>
                            <Form.Select
                                value={mobileCurrentFilter}
                                onChange={({ target }) =>
                                    selectOnChange(
                                        target.value ?? "",
                                        "mobileDev"
                                    )
                                }
                            >
                                {mobileDevOptions}
                            </Form.Select>
                        </Form.Group>
                    </Container>
                    <Row>
                        {renderProjects(mobileDevProjects, mobileCurrentFilter)}
                    </Row>
                </div>
            </div>
            <div>
                <Modal show={modal} onHide={close}>
                    <div
                        style={{
                            padding: "2rem",
                            textAlign: "center"
                        }}
                    >
                        <h2>{title}</h2>
                        <div id="rounded">
                            <img
                                id="modal-pic"
                                alt={src}
                                src={`/assets/${src}`}
                            ></img>
                        </div>
                        {tech &&
                            tech.map((icon) => {
                                return (
                                    <i
                                        key={icon}
                                        className={`fab fa-${icon} fa-3x tech-icon`}
                                        title={icon}
                                    ></i>
                                );
                            })}
                        <p style={{ marginTop: "0.5rem" }}>{content}</p>
                        <a
                            href={link}
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            <Button
                                style={{
                                    backgroundColor: "#343a40"
                                }}
                            >
                                View Project
                            </Button>
                        </a>
                    </div>
                </Modal>
            </div>
        </section>
    );
};

export default Projects;
