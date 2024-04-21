import React from "react";
import { Container, Nav, Navbar, NavbarToggle } from "react-bootstrap";

const Navigation = () => {
    return (
        <Navbar expand="md" bg="dark" data-bs-theme="dark">
            <Container fluid>
                <Navbar.Brand href="#">Jonathan Cady</Navbar.Brand>
                <NavbarToggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse>
                    <Nav>
                        <Nav.Link href="#">Home</Nav.Link>
                        <Nav.Link href="#about-me">About Me</Nav.Link>
                        <Nav.Link href="#skills">Skills</Nav.Link>
                        <Nav.Link href="#experience">Experience</Nav.Link>
                        <Nav.Link href="#my-projects">Projects</Nav.Link>
                        <Nav.Link href="#interests">Interests</Nav.Link>
                        <Nav.Link href="#contact">Contact</Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
};

export default Navigation;
