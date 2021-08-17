import React from 'react';

// reactstrap components
import { Row, Col } from "reactstrap";
import Btn from "components/Lottery/BtnBetArea.js";

class BetArea extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                <Row>
                    <Col md={2} className="pt-2">萬位</Col>
                    <Col md={6} className="betarea">
                        <Btn value="0" />
                        <Btn value="1" />
                        <Btn value="2" />
                        <Btn value="3" />
                        <Btn value="4" />
                        <Btn value="5" />
                        <Btn value="6" />
                        <Btn value="7" />
                        <Btn value="8" />
                        <Btn value="9" />
                    </Col>
                </Row>
                <Row>
                    <Col md={2} className="pt-2">千位</Col>
                    <Col md={6} className="betarea">
                        <Btn value="0" />
                        <Btn value="1" />
                        <Btn value="2" />
                        <Btn value="3" />
                        <Btn value="4" />
                        <Btn value="5" />
                        <Btn value="6" />
                        <Btn value="7" />
                        <Btn value="8" />
                        <Btn value="9" />
                    </Col>
                </Row>
                <Row>
                    <Col md={2} className="pt-2">百位</Col>
                    <Col md={6} className="betarea">
                        <Btn value="0" />
                        <Btn value="1" />
                        <Btn value="2" />
                        <Btn value="3" />
                        <Btn value="4" />
                        <Btn value="5" />
                        <Btn value="6" />
                        <Btn value="7" />
                        <Btn value="8" />
                        <Btn value="9" />
                    </Col>
                </Row>
                <Row>
                    <Col md={2} className="pt-2">十位</Col>
                    <Col md={6} className="betarea">
                        <Btn value="0" />
                        <Btn value="1" />
                        <Btn value="2" />
                        <Btn value="3" />
                        <Btn value="4" />
                        <Btn value="5" />
                        <Btn value="6" />
                        <Btn value="7" />
                        <Btn value="8" />
                        <Btn value="9" />
                    </Col>
                </Row>
                <Row>
                    <Col md={2} className="pt-2">個位</Col>
                    <Col md={6} className="betarea">
                        <Btn value="0" />
                        <Btn value="1" />
                        <Btn value="2" />
                        <Btn value="3" />
                        <Btn value="4" />
                        <Btn value="5" />
                        <Btn value="6" />
                        <Btn value="7" />
                        <Btn value="8" />
                        <Btn value="9" />
                    </Col>
                </Row>
            </div>
        )
    }
}

export default BetArea;