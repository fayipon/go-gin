import React from 'react';
import { Container } from 'react-bootstrap';

export const Layout = (props) => (
    <Container className="pt-5">
        {props.children}
    </Container>
)