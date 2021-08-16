/*!

=========================================================
* Paper Kit React - v1.3.0
=========================================================

* Product Page: https://www.creative-tim.com/product/paper-kit-react

* Copyright 2021 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/paper-kit-react/blob/main/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import React from "react";

// reactstrap components
import {
  Button,
  Container,
  Row,
  Col
} from "reactstrap";

// core components
import HomeNavbar from "components/Navbars/HomeNavbar.js";
import Header from "components/Headers/ThirdLottery.js";
import HomeFooter from "components/Footers/HomeFooter.js";

function GameLottery() {

  document.documentElement.classList.remove("nav-open");
  React.useEffect(() => {
    document.body.classList.add("landing-page");
    return function cleanup() {
      document.body.classList.remove("landing-page");
    };
  });
  return (
    <>
      <HomeNavbar />
      <Header />
      <div className="section profile-content">
        <Container>
            <Row style={{
              margin: "10px",
              borderRadius: "12px",
              boxShadow: "0 6px 10px -4px rgb(0 0 0 / 15%)",
              backgroundColor: "#efefef",
              minHeight: "120px",
            }}>
              <Col md="3">
                <img src={require("assets/img/lottery/icon_ssc.png").default} style={{
                  width:"120px",
                }} />
              </Col>
              <Col md="3">倒數</Col>
              <Col md="3">當前期</Col>
              <Col md="3">開獎紀錄</Col>
            </Row>
            <Row style={{
              margin: "15px",
              borderRadius: "12px",
              boxShadow: "0 6px 10px -4px rgb(0 0 0 / 15%)",
              backgroundColor: "#efefef",
              minHeight: "120px",
            }}>
              <Col md="12">玩法選擇</Col>
            </Row>
            <Row style={{
              margin: "15px",
              borderRadius: "12px",
              boxShadow: "0 6px 10px -4px rgb(0 0 0 / 15%)",
              backgroundColor: "#efefef",
              minHeight: "300px",
            }}>
              <Col md="12">下注區塊</Col>
            </Row>
            <Row style={{
              margin: "15px",
              borderRadius: "12px",
              boxShadow: "0 6px 10px -4px rgb(0 0 0 / 15%)",
              backgroundColor: "#efefef",
              minHeight: "120px",
            }}>
              <Col md="12">投注</Col>
            </Row>
            <Row>
              <Col md="12">遊戲紀錄</Col>
            </Row>
        </Container>
      </div>
      <HomeFooter />
    </>
  );
}

export default GameLottery;
