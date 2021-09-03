import React from "react";
import ReactDOM from 'react-dom';

// reactstrap components
import {
  Button,
  Container,
  Row,
  Col
} from "reactstrap";

// core components
import HomeNavbar from "components/Navbars/HomeNavbar.js";
import Header from "components/Headers/ThirdSport.js";
import HomeFooter from "components/Footers/HomeFooter.js";

import WebSocket from "components/Socket/SocketSport.js";

// ajax
import axios from 'axios';
import history from '../../history';
import { toast } from 'react-toastify'; //import toast


function GameSport() {

  React.useEffect(() => {

  });

  return (
    <>
      <HomeNavbar />
      <Header />
      <div className="sport_bg">
        <Container style={{
          minHeight: "650px"
        }}>
          <Row>
          <Col md={8} className="pr-0">

            <WebSocket />
          </Col>
          <Col md={4}>
            
          <div style={{
              marginTop:"10px",
              backgroundColor:"rgb(0 0 0 / 50%)",
              color:"#fff",
              padding:"10px"
            }}>
                <h4>聯賽名稱 #123456</h4>
                <Row className="mt-2">
                  <Col><h4>主隊 vs 客隊</h4></Col>
                </Row>
                <Row>
                  <Col className="mt-1"><h4>主隊 @ 0.97</h4></Col>
                </Row>
                <Row>
                  <Col className="pt-2"><input placeholder="投注金額" /></Col>
                </Row>
                <Row>
                  <Col className="pt-2"><button className="btn btn-danger">投注</button></Col>
                </Row>
            </div>
          </Col>
          </Row>
        </Container>
    </div>
      <HomeFooter />
    </>
  );
}

export default GameSport;
