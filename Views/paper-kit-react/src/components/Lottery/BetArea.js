import React from 'react';

// reactstrap components
import { Row, Col } from "reactstrap";
import Btn from "components/Lottery/BtnBetArea.js";

class BetArea extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        const { forwardedRef } = this.props;
        return (
            <div id="betarea_01" ref={forwardedRef}>
                <Row>
                    <Col md={2} className="pt-2"><h5>萬位</h5></Col>
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
                    <Col md={2} className="pt-2"><h5>千位</h5></Col>
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
                    <Col md={2} className="pt-2"><h5>百位</h5></Col>
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
                    <Col md={2} className="pt-2"><h5>十位</h5></Col>
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
                    <Col md={2} className="pt-2"><h5>個位</h5></Col>
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