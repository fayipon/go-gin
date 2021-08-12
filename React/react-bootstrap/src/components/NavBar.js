import React from 'react';
import { Nav, Navbar, NavItem, Container } from 'react-bootstrap';
import styled from 'styled-components';
import { LinkContainer } from "react-router-bootstrap";

const Styles = styled.div`
    .navbar {
        background-color: #222;
    }

    .navbar-brand, .navbar-nav .nav-item {
        color: #bbb;
        padding-left:5px;
        padding-right:5px;
        &:hover {
            color: white;
        }
    }
`;

export const NavBar = () => (
    <Styles>
        <Navbar expand="lg">
            <Container>
                <LinkContainer to="/">
                    <Navbar.Brand>DEMO</Navbar.Brand>
                </LinkContainer>

                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav>
                        <LinkContainer to="/sport">
                            <NavItem>體育</NavItem>
                        </LinkContainer>
                        <LinkContainer to="/slot">
                            <NavItem>電子</NavItem>
                        </LinkContainer>
                        <LinkContainer to="/lottery">
                            <NavItem>彩票</NavItem>
                        </LinkContainer>
                        <LinkContainer to="/chess">
                            <NavItem>棋牌</NavItem>
                        </LinkContainer>
                        <LinkContainer to="/esport">
                            <NavItem>電競</NavItem>
                        </LinkContainer>
                    </Nav>
                    <Nav className="ms-auto">
                        <LinkContainer to="/login">
                            <NavItem>登入</NavItem>
                        </LinkContainer>
                        <LinkContainer to="/logout">
                            <NavItem>登出</NavItem>
                        </LinkContainer>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    </Styles>
)