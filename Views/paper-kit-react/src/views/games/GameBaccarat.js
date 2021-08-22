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
import Header from "components/Headers/ThirdBaccarat.js";
import HomeFooter from "components/Footers/HomeFooter.js";

import Poker from "components/Baccarat/Poker.js";

import video from "assets/video/720p.mp4";
// ajax
import axios from 'axios';
import history from './../../history';
import { toast } from 'react-toastify'; //import toast

function GameBaccarat() {

  const [activeTab, setActiveTab] = React.useState("1");
  const toggle = (tab) => {
    if (activeTab !== tab) {
      setActiveTab(tab);
    }

  };
  
  document.documentElement.classList.remove("nav-open");

  React.useEffect(() => {
  });


  return (
    <>
      <HomeNavbar />
      <Header />
      <div className="lottery_bg">
        <Container style={{
          minHeight: "650px"
        }}>

          <video autoPlay loop muted style={{position:"absolute",width: "1100px"}}>
            <source src={video} / >
          </video>
          <Row style={{
              marginLeft:"0px",
              marginRight:"0px",
            }}>
                    <Col md={3} style={{
                      backgroundColor:"rgb(0 0 0 / 50%)",
                      color:"#fff",
                      height:"250px",
                      display: "flex"
                    }}>
                      <h2>閒</h2>
                      <br / >
                      <Poker color="1" card="1" />
                      <Poker color="2" card="1" />
                    </Col>
                    <Col md={5}></Col>
                    <Col md={3} style={{
                      backgroundColor:"rgb(0 0 0 / 50%)",
                      color:"#fff",
                      height:"250px",
                      display: "flex",
                      marginRight:"0px",
                      marginLeft: "82px",
                    }}>
                      <h2>庄</h2>
                      <br / >
                      <Poker color="1" card="1" />
                      <Poker color="2" card="1" />
                    </Col>
            </Row>
            <Row style={{
              marginLeft:"0px",
              marginRight:"10px",
              height:"170px",
            }}>
               <h2 style={{
                 width:"100%",
                 textAlign:"center",
                 zIndex:"1",
                 color: "rgb(23 255 41)",
                 fontSize: "50px",
                 backgroundColor: "transparent",
                 textShadow: "rgb(3, 3, 3) 4px 4px 4px",
               }}>字幕字幕字幕字幕</h2> 
            </Row>
            <Row style={{
              marginLeft:"0px",
              marginRight:"10px",
            }}>
                    <Col style={{
                      backgroundColor:"rgb(0 0 0 / 50%)",
                      color:"#fff",
                      height:"200px",
                      textAlign:"center",
                      display: "flex"
                    }}>
                      
                      <Poker color="1" card="1" />
                      <Poker color="2" card="1" />
                      <Poker color="3" card="1" />
                      <Poker color="4" card="1" />
                    </Col>
              </Row>
        </Container>
    </div>
      <HomeFooter />
    </>
  );
}

export default GameBaccarat;
