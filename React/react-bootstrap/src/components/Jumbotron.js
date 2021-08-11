import React from 'react';
import { Jumbotron as Jumbo, Container } from 'react-bootstrap';
import styled from 'styled-components';
import boatImage from '../assets/forest.jpeg';

const Styles = styled.div`
    .jumbo {
        background: url(${boatImage}) no-repeat fixed bottom;
        background-size : cover;
        color:#efefef;
        height:200px;
        position: relative;
        z-index: -2;
        padding-top:50px;
    }

    .overlay {
        background-color : #000;
        opacity: 0.6;
        position: absolute;
        top： 0;
        left: 0;
        bottom: 0;
        right: 0;
        z-index: -1;
    }
`;

export const Jumbotron = () => (
    <Styles>
        <Jumbo fluid className="jumbo">
            <div className="overlay"></div>
            <Container>
                <h1>welcome</h1>
                <p>12345</p>
            </Container>
        </Jumbo>
    </Styles>
)