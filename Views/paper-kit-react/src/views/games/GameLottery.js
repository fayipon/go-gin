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
import ReactDOM from 'react-dom';

// reactstrap components
import {
  Button,
  Container,
  Row,
  Col,
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

import BetArea from "components/Lottery/BetArea.js";

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

  // 下注事件
  function betEvent() {
  
    // 取得選取資料
    var obj = document.querySelectorAll('.betarea_btn');
    var tmp_data = "";
    obj.forEach(d => {
      if (d.className == "betarea_btn active") {
        tmp_data += "1,";
        d.classList.remove("active");
      } else {
        tmp_data += "0,";
      }
    })

    // 共幾注 清零
    ReactDOM.render("0",document.getElementById('bet_count'));
    
    // 投注金額 , 歸零
    ReactDOM.render("0",document.getElementById('bet_amount'))
  }

  // 單注金額, 變更事件
  function amountEvent() {
        // 計算注數
        var obj = document.querySelectorAll('.betarea_btn');
        var bet_count = 0;
        obj.forEach(d => {
            if (d.className == "betarea_btn active") {
                bet_count++;
            } 
        });
        ReactDOM.render(bet_count,document.getElementById('bet_count'))
        
        // 計算下注金額
        var amount = document.getElementById('amount').value;
        if (amount == "") {
            document.getElementById('amount').value = 1;
        }
        ReactDOM.render(amount*bet_count,document.getElementById('bet_amount'))
  }

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
                  <div className="betarea">
                    <a className="result_num">0</a>
                    <a className="result_num">1</a>
                    <a className="result_num">2</a>
                    <a className="result_num">3</a>
                    <a className="result_num">4</a>
                  </div>
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
              minHeight: "80px",
            }}>
              <Col md="12">
                  <div className="pt-3">
                  <Row>
                      <Col md={2}><h5>共 <span id="bet_count">0</span> 注</h5></Col>
                      <Col md={2}>
                        <h5>單注金額 </h5>
                      </Col>
                      <Col md={2}><input type="text" id="amount" onChange={amountEvent} /></Col>
                      <Col md={2}>
                        <h5>共 <span id="bet_amount">0</span> 元</h5>
                      </Col>
                      <Col md={2}>
                        <Button className="btn btn-danger" onClick={betEvent}>立即投注</Button>
                      </Col>
                    </Row>
                  </div>
              </Col>
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