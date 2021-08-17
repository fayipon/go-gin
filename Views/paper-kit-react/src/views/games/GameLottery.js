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
  Col,
  Pagination, PaginationItem, PaginationLink,
  
  Nav,
  NavItem,
  NavLink,
  TabContent,
  TabPane,
} from "reactstrap";

// core components
import HomeNavbar from "components/Navbars/HomeNavbar.js";
import Header from "components/Headers/ThirdLottery.js";
import HomeFooter from "components/Footers/HomeFooter.js";

import BetArea from "components/Lottery/BetArea-01.js";

function GameLottery() {

  const [activeTab, setActiveTab] = React.useState("1");
  const toggle = (tab) => {
    if (activeTab !== tab) {
      setActiveTab(tab);
    }
  };
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
      <div className="section lottery_bg">
        <Container style={{
          
        }}>
            <Row style={{
              margin: "10px",
              borderRadius: "10px",
              boxShadow: "0 6px 10px -4px rgb(0 0 0 / 15%)",
              backgroundColor: "#efefef",
              minHeight: "120px",
            }}>
              <Col md="2">
                <img src={require("assets/img/lottery/icon_ssc.png").default} style={{
                  width:"120px",
                }} />
              </Col>
              <Col md="5">
                  <h4 className="mb-2">12345678期</h4>
                  <Pagination>
                    <PaginationItem className="active">
                      <PaginationLink href="#pablo" onClick={e => e.preventDefault()}>
                        1
                      </PaginationLink>
                    </PaginationItem>
                    <PaginationItem className="active">
                      <PaginationLink href="#pablo" onClick={e => e.preventDefault()}>
                        2 
                      </PaginationLink>
                    </PaginationItem>
                    <PaginationItem className="active">
                      <PaginationLink href="#pablo" onClick={e => e.preventDefault()}>
                        3
                      </PaginationLink>
                    </PaginationItem>
                    <PaginationItem className="active">
                      <PaginationLink href="#pablo" onClick={e => e.preventDefault()}>
                        4
                      </PaginationLink>
                    </PaginationItem>
                    <PaginationItem className="active">
                      <PaginationLink href="#pablo" onClick={e => e.preventDefault()}>
                        5
                      </PaginationLink>
                    </PaginationItem>
                  </Pagination>
              </Col>
              <Col md="5">
                  <h4>12345679期</h4>
                  <h2 id="counter" className="mt-2">99:59:59</h2>
              </Col>
            </Row>
            <Row style={{
              margin: "15px",
              borderRadius: "10px",
              boxShadow: "0 6px 10px -4px rgb(0 0 0 / 15%)",
              backgroundColor: "#efefef",
              minHeight: "320px",
            }}>
              <Col md="12">
              <div className="nav-tabs-navigation">
                <div className="nav-tabs-wrapper">
                  <Nav id="tabs" role="tablist" tabs>
                    <NavItem>
                      <NavLink id="type_1" className={activeTab === "1" ? "active" : ""} onClick={() => {
                          toggle("1");
                        }}
                      >
                        定位膽
                      </NavLink>
                    </NavItem>
                    <NavItem>
                      <NavLink id="type_2" className={activeTab === "2" ? "active" : ""}
                        onClick={() => {
                          toggle("2");
                        }}
                      >
                        大小單雙
                      </NavLink>
                    </NavItem>
                    <NavItem>
                      <NavLink id="type_3" className={activeTab === "3" ? "active" : ""}
                        onClick={() => {
                          toggle("3");
                        }}
                      >
                        龍虎和
                      </NavLink>
                    </NavItem>
                  </Nav>
                </div>
              </div>
              <TabContent activeTab={activeTab} className="text-center">
                <TabPane tabId="1">
                  <BetArea />
                </TabPane>
                <TabPane tabId="2">
                  <p>
                    
                    大小單雙玩法區塊
                  </p>
                </TabPane>
                <TabPane tabId="3">
                  <p>
                    龍虎和玩法區塊
                  </p>
                </TabPane>
              </TabContent>
              </Col>
            </Row>
            <Row style={{
              margin: "15px",
              borderRadius: "10px",
              boxShadow: "0 6px 10px -4px rgb(0 0 0 / 15%)",
              backgroundColor: "#efefef",
              minHeight: "120px",
            }}>
              <Col md="12">投注</Col>
            </Row>
            <Row style={{
              minHeight: "400px",
            }}>
              <Col md="12">遊戲紀錄</Col>
            </Row>
        </Container>
      </div>
      <HomeFooter />
    </>
  );
}

export default GameLottery;
