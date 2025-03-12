import { Navbar, Container, Nav } from "react-bootstrap";
import { NavLink } from "react-router";

import './styles.css'

export default function NavigationBar() {
    return (
        <Navbar expand="lg" className="bg-body-tertiary">
            <Container>
                <Navbar.Brand href="#home">DanceUP</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="me-auto">
                    <NavLink className="nav-link" to="/">Home</NavLink>
                    {/* <NavLink className="nav-link" to="/contact">Contact</NavLink> */}
                    {/* <NavLink className="nav-link" to="/contact">Pricing</NavLink> */}
                    <NavLink className="nav-link" to="/students">Students</NavLink>
                </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
}