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
            
          <div style={{
              marginRight:"10px",
              marginLeft:"10px",
              marginTop:"10px",
              padding:"10px",
              backgroundColor:"rgb(0 0 0 / 50%)",
              color:"#fff"
            }}>
              <Row>
                <Col className="text-center">聯賽名稱 A隊(主) VS B隊(客)</Col>
              </Row>
              <Row className="mb-2 sport-game-list">
                <Col>
                  <div style={{
                    backgroundImage: "url(" + require("assets/img/sport/team_icon.jpg").default + ")",
                    backgroundPosition: "-80px 105px",
                    width: "60px",
                    height: "60px"
                  }} />
                  </Col>
                  <Col>
                  A隊 10
                </Col>
                <Col>A隊獨贏</Col>
                <Col>A隊讓分</Col>
                <Col>A隊大小</Col>
              </Row>
              <Row>
                <Col>
                <div style={{
                    backgroundImage: "url(" + require("assets/img/sport/team_icon.jpg").default + ")",
                    backgroundPosition: "-80px 105px",
                    width: "60px",
                    height: "60px",
                  }} />
                  </Col>
                  <Col>
                  B隊 10
                </Col>
                <Col>B隊獨贏</Col>
                <Col>B隊讓分</Col>
                <Col>B隊大小</Col>
              </Row>
            </div>

            <div style={{
              marginRight:"10px",
              marginLeft:"10px",
              marginTop:"10px",
              padding:"10px",
              backgroundColor:"rgb(0 0 0 / 50%)",
              color:"#fff"
            }}>
              <Row>
                <Col className="text-center">聯賽名稱 A隊(主) VS B隊(客)</Col>
              </Row>
              <Row className="mb-2 sport-game-list">
                <Col>
                  <div style={{
                    backgroundImage: "url(" + require("assets/img/sport/team_icon.jpg").default + ")",
                    backgroundPosition: "-80px 105px",
                    width: "60px",
                    height: "60px"
                  }} />
                  </Col>
                  <Col>
                  A隊 10
                </Col>
                <Col>A隊獨贏</Col>
                <Col>A隊讓分</Col>
                <Col>A隊大小</Col>
              </Row>
              <Row>
                <Col>
                <div style={{
                    backgroundImage: "url(" + require("assets/img/sport/team_icon.jpg").default + ")",
                    backgroundPosition: "-80px 105px",
                    width: "60px",
                    height: "60px",
                  }} />
                  </Col>
                  <Col>
                  B隊 10
                </Col>
                <Col>B隊獨贏</Col>
                <Col>B隊讓分</Col>
                <Col>B隊大小</Col>
              </Row>
            </div>

          
              

            <div style={{
              marginRight:"10px",
              marginLeft:"10px",
              marginTop:"10px",
              padding:"10px",
              backgroundColor:"rgb(0 0 0 / 50%)",
              color:"#fff"
            }}>
              <Row>
                <Col className="text-center">聯賽名稱 A隊(主) VS B隊(客)</Col>
              </Row>
              <Row className="mb-2 sport-game-list">
                <Col>
                  <div style={{
                    backgroundImage: "url(" + require("assets/img/sport/team_icon.jpg").default + ")",
                    backgroundPosition: "-80px 105px",
                    width: "60px",
                    height: "60px"
                  }} />
                  </Col>
                  <Col>
                  A隊 10
                </Col>
                <Col>A隊獨贏</Col>
                <Col>A隊讓分</Col>
                <Col>A隊大小</Col>
              </Row>
              <Row>
                <Col>
                <div style={{
                    backgroundImage: "url(" + require("assets/img/sport/team_icon.jpg").default + ")",
                    backgroundPosition: "-80px 105px",
                    width: "60px",
                    height: "60px",
                  }} />
                  </Col>
                  <Col>
                  B隊 10
                </Col>
                <Col>B隊獨贏</Col>
                <Col>B隊讓分</Col>
                <Col>B隊大小</Col>
              </Row>
            </div>

            <WebSocket />

          </Col>
          <Col md={4}>
            
            
          <div style={{
              marginTop:"10px",
              backgroundColor:"rgb(0 0 0 / 23%)",
              height:"600px"
            }}>
                下注區塊

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
