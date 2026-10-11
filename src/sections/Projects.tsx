import React, { useState } from "react";
import { Col, Container, Form, Modal, Row } from "react-bootstrap";
import { webDevProjects, mobileDevProjects, Project } from "./Helpers";

const Projects = () => {
    const [modal, setModal] = useState(false);
    const [title, setTitle] = useState("");
    const [src, setSrc] = useState("");
    const [link, setLink] = useState<string | undefined>("");
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
                    <Col key={`item${i}`} xs={6} md={3}>
                        <div
                            className="boxes rounded"
                            role="button"
                            tabIndex={0}
                            aria-label={project.title}
                            onKeyDown={(event) => {
                                if (
                                    event.key === "Enter" ||
                                    event.key === " "
                                ) {
                                    event.preventDefault();
                                    setModalState(
                                        project.content,
                                        project.link,
                                        project.src,
                                        project.tech,
                                        project.title
                                    );
                                }
                            }}
                            style={{
                                backgroundImage: `url(./assets/${project.src})`,
                                ...(project.src === "transit.jpg"
                                    ? {
                                          backgroundSize: "contain",
                                          backgroundRepeat: "no-repeat",
                                          backgroundColor: "#101214"
                                      }
                                    : {})
                            }}
                            onClick={(event) => {
                                event.currentTarget.focus();
                                setModalState(
                                    project.content,
                                    project.link,
                                    project.src,
                                    project.tech,
                                    project.title
                                );
                            }}
                        >
                            <span className="project-label">
                                {project.title}
                            </span>
                        </div>
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
        link: string | undefined,
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
                                htmlFor="web-project-filter"
                                style={{
                                    marginBottom: "0",
                                    marginRight: "0.5em"
                                }}
                            >
                                Filter:
                            </Form.Label>
                            <Form.Select
                                id="web-project-filter"
                                value={webCurrentFilter}
                                onChange={({ target }) =>
                                    selectOnChange(target.value ?? "", "webDev")
                                }
                            >
                                <option value="">ALL PROJECTS</option>
                                {webDevOptions}
                            </Form.Select>
                        </Form.Group>
                    </Container>
                    <Container fluid>
                        <Row>
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
                                htmlFor="mobile-project-filter"
                                style={{
                                    marginBottom: "0",
                                    marginRight: "0.5em"
                                }}
                            >
                                Filter:
                            </Form.Label>
                            <Form.Select
                                id="mobile-project-filter"
                                value={mobileCurrentFilter}
                                onChange={({ target }) =>
                                    selectOnChange(
                                        target.value ?? "",
                                        "mobileDev"
                                    )
                                }
                            >
                                <option value="">ALL PROJECTS</option>
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
                <Modal
                    show={modal}
                    onHide={close}
                    aria-labelledby="project-modal-title"
                >
                    <Modal.Header
                        closeButton
                        closeLabel="Close project details"
                    />
                    <div
                        style={{
                            padding: "2rem",
                            textAlign: "center"
                        }}
                    >
                        <h2 id="project-modal-title">{title}</h2>
                        <div id="rounded">
                            <img
                                id="modal-pic"
                                alt={title}
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
                        {link ? (
                            <a
                                href={link}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="btn btn-dark"
                            >
                                View Project
                            </a>
                        ) : (
                            <button
                                type="button"
                                className="btn btn-dark"
                                disabled
                            >
                                Project link unavailable
                            </button>
                        )}
                    </div>
                </Modal>
            </div>
        </section>
    );
};

export default Projects;
