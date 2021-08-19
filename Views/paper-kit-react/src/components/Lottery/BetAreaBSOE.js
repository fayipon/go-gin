import React from 'react';

// reactstrap components
import { Row, Col } from "reactstrap";
import Btn from "components/Lottery/BtnBetAreaBSOE.js";

class BetAreaBSOE extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        const { forwardedRef } = this.props;
        return (
            <div id="betarea_02" ref={forwardedRef}>
                <Row>
                    <Col md={2} className="pt-2"><h5>萬位</h5></Col>
                    <Col md={6} className="betarea">
                        <Btn value="大" />
                        <Btn value="小" />
                        <Btn value="單" />
                        <Btn value="雙" />
                    </Col>
                </Row>
                <Row>
                    <Col md={2} className="pt-2"><h5>千位</h5></Col>
                    <Col md={6} className="betarea">
                        <Btn value="大" />
                        <Btn value="小" />
                        <Btn value="單" />
                        <Btn value="雙" />
                    </Col>
                </Row>
                <Row>
                    <Col md={2} className="pt-2"><h5>百位</h5></Col>
                    <Col md={6} className="betarea">
                        <Btn value="大" />
                        <Btn value="小" />
                        <Btn value="單" />
                        <Btn value="雙" />
                    </Col>
                </Row>
                <Row>
                    <Col md={2} className="pt-2"><h5>十位</h5></Col>
                    <Col md={6} className="betarea">
                        <Btn value="大" />
                        <Btn value="小" />
                        <Btn value="單" />
                        <Btn value="雙" />
                    </Col>
                </Row>
                <Row>
                    <Col md={2} className="pt-2"><h5>個位</h5></Col>
                    <Col md={6} className="betarea">
                        <Btn value="大" />
                        <Btn value="小" />
                        <Btn value="單" />
                        <Btn value="雙" />
                    </Col>
                </Row>
            </div>
        )
    }
}

export default BetAreaBSOE;