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
import CycleCountdown from "components/Lottery/CycleCountdown.js";
import BetArea from "components/Lottery/BetArea.js";
import BetAreaBSOE from "components/Lottery/BetAreaBSOE.js";
import BetAreaDT from "components/Lottery/BetAreaDT.js";

// ajax
import axios from 'axios';
import history from './../../history';
import { toast } from 'react-toastify'; //import toast

function GameLottery() {

  const [activeTab, setActiveTab] = React.useState("1");
  const toggle = (tab) => {
    if (activeTab !== tab) {
      setActiveTab(tab);
      cleanSelectBtn();
    }

  };
  
  document.documentElement.classList.remove("nav-open");

  React.useEffect(() => {

      ReactDOM.render(<CycleCountdown /> , document.getElementById('counter'));
  });

  // 清除已選按紐
  function cleanSelectBtn() {
    
    var obj = document.querySelectorAll('.betarea_btn');
    obj.forEach(d => {
      if (d.className == "betarea_btn active") {
        d.classList.remove("active");
      }
    })

    var obj = document.querySelectorAll('.betareabsoe_btn');
    obj.forEach(d => {
      if (d.className == "betareabsoe_btn active") {
        d.classList.remove("active");
      }
    })
    
    var obj = document.querySelectorAll('.betareadtbtn');
    obj.forEach(d => {
      if (d.className == "betareadt_btn active") {
        d.classList.remove("active");
      }
    })

    // 共幾注 清零
    ReactDOM.render("0",document.getElementById('bet_count'));
    
    // 投注金額 , 歸零
    ReactDOM.render("0",document.getElementById('bet_amount'));
  }

  // 下注事件
  function betEvent() {
  
    // 取得選取資料
    var tmp_data = "";
    var is_selected = false;
    var count = 0;

    // 取得選取的玩法
    var game_type_id = 1;
    var game_type = document.querySelectorAll('#game_type');
    game_type.forEach(d => {
      if (d.className == "active nav-link") {  
        switch (d.innerHTML) {
           case "定位膽":
             game_type_id = 1;

             var obj = document.querySelectorAll('.betarea_btn');
             obj.forEach(d => {
               if (d.className == "betarea_btn active") {
                 tmp_data += "1,";
                 d.classList.remove("active");
                 is_selected = true;
                 count++;
               } else {
                 tmp_data += "0,";
               }
             })
         
             break;
          case "大小單雙":
            game_type_id = 2;

            var obj = document.querySelectorAll('.betareabsoe_btn');
            obj.forEach(d => {
              if (d.className == "betareabsoe_btn active") {
                tmp_data += "1,";
                d.classList.remove("active");
                is_selected = true;
                count++;
              } else {
                tmp_data += "0,";
              }
            })

            break;
          case "龍虎和":
            game_type_id = 3;
            
            var obj = document.querySelectorAll('.betareadt_btn');
            obj.forEach(d => {
              if (d.className == "betareadt_btn active") {
                tmp_data += "1,";
                d.classList.remove("active");
                is_selected = true;
                count++;
              } else {
                tmp_data += "0,";
              }
            })

             break;
        }
       }
     })

    if (!is_selected) {
      toast.error("請選擇下注號碼");
      return false;
    }

    // 單注金額
    var single_amount = parseFloat(document.getElementById('amount').value);
    

    // 發送下注請求
    axios.post('http://localhost:8080/api/lottery_bet',{
      // 彩種
      game_id:1,
			// 玩法
      game_type_id:game_type_id,
			// 下注內容
      bet_info: tmp_data,
			// 單注金額
      single_amount: single_amount,
			// 注數
      bet_count:count,
    }).
    then( response => {
      if (response.data.status == "1") {
        toast.success("下注成功！餘額：" + response.data.balance);
        ReactDOM.render(response.data.balance,document.getElementById('user_balance'))
      } else {
        toast.error(response.data.message);
      }
    })

    // 共幾注 清零
    ReactDOM.render("0",document.getElementById('bet_count'));
    
    // 投注金額 , 歸零
    ReactDOM.render("0",document.getElementById('bet_amount'));
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
                  <h4 className="mb-2">第<span id="prev_cycle"></span>期</h4>
                  <div className="betarea">
                    <a className="result_num" id="result_num_01">?</a>
                    <a className="result_num" id="result_num_02">?</a>
                    <a className="result_num" id="result_num_03">?</a>
                    <a className="result_num" id="result_num_04">?</a>
                    <a className="result_num" id="result_num_05">?</a>
                  </div>
              </Col>
              <Col md="5">
                  <h4>第<span id="current_cycle"></span>期</h4>
                  <h2 id="counter" className="mt-2"></h2>
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
                      <NavLink id="game_type" className={activeTab === "1" ? "active" : ""} onClick={() => {
                          toggle("1");
                        }}
                      >
                        定位膽
                      </NavLink>
                    </NavItem>
                    <NavItem>
                      <NavLink id="game_type" className={activeTab === "2" ? "active" : ""}
                        onClick={() => {
                          toggle("2");
                        }}
                      >
                        大小單雙
                      </NavLink>
                    </NavItem>
                    <NavItem>
                      <NavLink id="game_type" className={activeTab === "3" ? "active" : ""}
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
                  <BetAreaBSOE />
                </TabPane>
                <TabPane tabId="3">
                  <BetAreaDT />
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
                      <Col md={2}></Col>
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
