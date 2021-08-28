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

// ajax
import axios from 'axios';
import history from './../../history';
import { toast } from 'react-toastify'; //import toast

function GameChess() {

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
          
        </Container>
    </div>
      <HomeFooter />
    </>
  );
}

export default GameChess;
