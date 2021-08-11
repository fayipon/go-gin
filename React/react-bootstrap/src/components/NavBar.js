import React from 'react';
import { Nav, Navbar } from 'react-bootstrap';
import styled from 'styled-components';
import { Link } from 'react-router-dom'

const Styles = styled.div`
    .navbar {
        background-color: #222;
    }

    .navbar-brand, .navbar-nav .nav-link {
        color: #bbb;
        &:hover {
            color: white;
        }
    }
`;

export const NavBar = () => (
    <Styles>
        <Navbar expand="lg">
            <Navbar.Brand to="/">API</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="ms-auto">
                    <Nav.Item><Nav.Link to="/">Home</Nav.Link></Nav.Item>
                    <Nav.Item><Nav.Link to="/about">About</Nav.Link></Nav.Item>
                    <Nav.Item><Nav.Link to="/contact">Contact</Nav.Link></Nav.Item>
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    </Styles>
)