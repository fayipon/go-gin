import React from "react";
import ReactDOM from 'react-dom';
import YoutubeBackground from 'react-youtube-background';

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
      <Container>
      <YoutubeBackground videoId="vnRlUFAF4lE" style={{
          height:"820px",
      }}>
    
        <Row className="float-left">
            <Col md={3}>1111111</Col>
            <Col md={6}>22222</Col>
            <Col md={3}>33333</Col>
        </Row>

    </YoutubeBackground>
    </Container>
      <HomeFooter />
    </>
  );
}

export default GameBaccarat;
