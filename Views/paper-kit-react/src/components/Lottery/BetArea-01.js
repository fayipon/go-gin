import React from 'react';

// reactstrap components
import { Row, Col, Pagination, PaginationItem, PaginationLink } from "reactstrap";

class BetArea extends React.Component {

    render() {
        return (
        <div>
        <Row className="mb-2">
            <Col md={2}>
            萬位
            </Col>
            <Col md={6} className="betarea">
                <a className="betarea_btn">0</a>
                <a className="betarea_btn">1</a>
                <a className="betarea_btn">2</a>
                <a className="betarea_btn">3</a>
                <a className="betarea_btn">4</a>
                <a className="betarea_btn">5</a>
                <a className="betarea_btn">6</a>
                <a className="betarea_btn">7</a>
                <a className="betarea_btn">8</a>
                <a className="betarea_btn active">9</a>

            </Col>
        </Row>
        <Row className="mb-2">
                <Col md={2}>
                千位
                </Col>
                <Col md={6} className="betarea">
                    <a className="betarea_btn">0</a>
                    <a className="betarea_btn">1</a>
                    <a className="betarea_btn">2</a>
                    <a className="betarea_btn">3</a>
                    <a className="betarea_btn">4</a>
                    <a className="betarea_btn">5</a>
                    <a className="betarea_btn">6</a>
                    <a className="betarea_btn">7</a>
                    <a className="betarea_btn">8</a>
                    <a className="betarea_btn active">9</a>

                </Col>
            </Row>
            <Row className="mb-2">
                <Col md={2}>
                百位
                </Col>
                <Col md={6} className="betarea">
                    <a className="betarea_btn">0</a>
                    <a className="betarea_btn">1</a>
                    <a className="betarea_btn">2</a>
                    <a className="betarea_btn">3</a>
                    <a className="betarea_btn">4</a>
                    <a className="betarea_btn">5</a>
                    <a className="betarea_btn">6</a>
                    <a className="betarea_btn">7</a>
                    <a className="betarea_btn">8</a>
                    <a className="betarea_btn active">9</a>

                </Col>
            </Row>
            <Row className="mb-2">
                <Col md={2}>
                十位
                </Col>
                <Col md={6} className="betarea">
                    <a className="betarea_btn">0</a>
                    <a className="betarea_btn">1</a>
                    <a className="betarea_btn">2</a>
                    <a className="betarea_btn">3</a>
                    <a className="betarea_btn">4</a>
                    <a className="betarea_btn">5</a>
                    <a className="betarea_btn">6</a>
                    <a className="betarea_btn">7</a>
                    <a className="betarea_btn">8</a>
                    <a className="betarea_btn active">9</a>

                </Col>
            </Row>
            <Row className="mb-2">
                <Col md={2}>
                個位
                </Col>
                <Col md={6} className="betarea">
                    <a className="betarea_btn">0</a>
                    <a className="betarea_btn">1</a>
                    <a className="betarea_btn">2</a>
                    <a className="betarea_btn">3</a>
                    <a className="betarea_btn">4</a>
                    <a className="betarea_btn">5</a>
                    <a className="betarea_btn">6</a>
                    <a className="betarea_btn">7</a>
                    <a className="betarea_btn">8</a>
                    <a className="betarea_btn active">9</a>

                </Col>
            </Row>
        
        </div>
        )
    }
}


export default BetArea;