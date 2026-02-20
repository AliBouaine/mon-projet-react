import React from "react";
import { Navbar, Nav, Container } from "react-bootstrap";
import { NavLink } from "react-router-dom";

const NavigationBar = () => {
  return (
    <Navbar bg="dark" variant="dark" expand="lg">
      <Container>
        <Navbar.Brand>Event Manager</Navbar.Brand>

        <Nav className="me-auto">
          <NavLink
            to="/"
            className={({ isActive }) =>
              isActive ? "nav-link text-warning" : "nav-link"
            }
          >
            Events
          </NavLink>
          <NavLink to="/add" className="nav-link">
            Add New Event
          </NavLink>
        </Nav>
      </Container>
    </Navbar>
  );
};

export default NavigationBar;