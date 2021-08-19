import React from 'react';

// reactstrap components
import { Row, Col } from "reactstrap";
import Btn from "components/Lottery/BtnBetAreaDT.js";

class BetAreaBSOE extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        const { forwardedRef } = this.props;
        return (
            <div id="betarea_02" ref={forwardedRef}>
                <Row>
                    <Col md={2} className="pt-2"><h5>萬位vs個位</h5></Col>
                    <Col md={6} className="betarea">
                        <Btn value="龍" />
                        <Btn value="虎" />
                        <Btn value="和" />
                    </Col>
                </Row>
            </div>
        )
    }
}

export default BetAreaBSOE;