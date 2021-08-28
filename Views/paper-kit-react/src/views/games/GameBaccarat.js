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

import CycleCountdown from "components/Baccarat/CycleCountdown.js";
import Poker from "components/Baccarat/Poker.js";
import Chip from "components/Baccarat/Chip.js";

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

  const player_bet_ref = React.createRef();
  const tie_bet_ref = React.createRef();
  const banker_bet_ref = React.createRef();

  React.useEffect(() => {
    ReactDOM.render(<CycleCountdown /> , document.getElementById('counter'));
  });

  // 抓取當前選擇的籌碼
  function get_current_cash() {
    var current = 0;
    
    var obj = document.querySelector('.chip1');
    if (obj.className == "chip1 active") current = 5;

    obj = document.querySelector('.chip2');
    if (obj.className == "chip2 active") current = 10;

    obj = document.querySelector('.chip3');
    if (obj.className == "chip3 active") current = 50;

    obj = document.querySelector('.chip4');
    if (obj.className == "chip4 active") current = 100;

    obj = document.querySelector('.chip5');
    if (obj.className == "chip5 active") current = 500;

    return current;
  }
  
  function player_bet() {
    var current = parseInt(get_current_cash());
    if (current == 0) {
      toast.error("請先選擇籌碼");
    }
    var current_bet = parseInt(player_bet_ref.current.value);
    current_bet = current_bet + current;
    player_bet_ref.current.value = current_bet;

    // 發送下注請求
    axios.post('http://localhost:8080/api/baccarat_bet',{
      // 彩種
      game_id:1,
			// 玩法
      game_type_id:1,
			// 金額
      total_amount: current
    }).
    then( response => {
      if (response.data.status == "1") {
        toast.success("下注成功！餘額：" + response.data.balance);
        ReactDOM.render(response.data.balance,document.getElementById('user_balance'))
      } else {
        toast.error(response.data.message);
      }
    })
  }

  function tie_bet() {
    var current = parseInt(get_current_cash());
    if (current == 0) {
      toast.error("請先選擇籌碼");
    }
    var current_bet = parseInt(tie_bet_ref.current.value);
    current_bet = current_bet + current;
    tie_bet_ref.current.value = current_bet;

        // 發送下注請求
        axios.post('http://localhost:8080/api/baccarat_bet',{
          // 彩種
          game_id:1,
          // 玩法
          game_type_id:2,
          // 金額
          total_amount: current
        }).
        then( response => {
          if (response.data.status == "1") {
            toast.success("下注成功！餘額：" + response.data.balance);
            ReactDOM.render(response.data.balance,document.getElementById('user_balance'))
          } else {
            toast.error(response.data.message);
          }
        })
  }

  function banker_bet() {
    var current = parseInt(get_current_cash());
    if (current == 0) {
      toast.error("請先選擇籌碼");
    }
    var current_bet = parseInt(banker_bet_ref.current.value);
    current_bet = current_bet + current;
    banker_bet_ref.current.value = current_bet;

        // 發送下注請求
        axios.post('http://localhost:8080/api/baccarat_bet',{
          // 彩種
          game_id:1,
          // 玩法
          game_type_id:3,
          // 金額
          total_amount: current
        }).
        then( response => {
          if (response.data.status == "1") {
            toast.success("下注成功！餘額：" + response.data.balance);
            ReactDOM.render(response.data.balance,document.getElementById('user_balance'))
          } else {
            toast.error(response.data.message);
          }
        })
  }

  return (
    <>
      <HomeNavbar />
      <Header />
      <div className="baccarat_bg">
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
                    <Col md={4} style={{
                      color:"#fff",
                      height:"250px",
                    }}>
                      <div id="player_cards">
                        <div className="text-center" style={{paddingRight:"50px"}}>
                          <h2>閒</h2>
                        </div>
                        <div id="player_cards_result" style={{
                          display: "flex",
                          }}>
                          <Poker color="1" card="10" />
                          <Poker color="1" card="10" />
                          <Poker color="1" card="10" />
                        </div>
                      </div>
                    </Col>
                    <Col md={3}></Col>
                    <Col md={4} style={{
                      color:"#fff",
                      height:"250px",
                      marginLeft: "82px",
                    }}>
                      <div id="banker_cards">
                        <div className="text-center" style={{paddingRight:"50px"}}>
                          <h2>庄</h2>
                        </div>
                        <div id="banker_cards_result" style={{
                          display: "flex",
                          }}>
                          <Poker color="1" card="10" />
                          <Poker color="1" card="10" />
                          <Poker color="1" card="10" />
                        </div>
                      </div>
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
               }} id="baccarat_message"></h2> 
            </Row>
            <Row style={{
              marginLeft:"0px",
              marginRight:"10px",
            }}>
                  <Col md={3} style={{
                    backgroundColor:"rgb(0 0 0 /0%)",
                    color:"#fff",
                    height:"200px",
                  }}>
                    局號 : <span id="current_cycle"></span>
                    
                  <h2 id="counter" className="mt-2"></h2>
                  
                  </Col>
                    <Col md={6} style={{
                      backgroundColor:"rgb(0 0 0 / 0%)",
                      color:"#fff",
                      height:"200px"
                    }}>
                      <div style={{display:"flex",marginLeft: "88px"}}>
                        <div className="baccarat_bet_area" onClick={player_bet}>
                          <h2>閒</h2>
                          <span>1 : 1</span>
                          <input id="player_bet_total" className="player_bet_input" ref={player_bet_ref} type="text" value="0" maxLength="8"/>
                        </div>
                        <div className="baccarat_bet_area" onClick={tie_bet}>
                          <h2>和</h2>
                          <span>1 : 8</span>
                          <input id="tie_bet_total" className="player_bet_input" ref={tie_bet_ref} type="text" value="0" maxLength="8"/>
                        </div>
                        <div className="baccarat_bet_area" onClick={banker_bet}>
                          <h2>庄</h2>
                          <span style={{
                            marginLeft:"20px"
                          }}>1 : 0.95</span>
                          <input id="banker_bet_total" className="player_bet_input" ref={banker_bet_ref} type="text" value="0" maxLength="8"/>
                        </div>
                      </div>
                      <div style={{display:"flex",marginLeft: "80px"}}>
                        <Chip color="1" value="5" defaultActive="1" />
                        <Chip color="2" value="10" />
                        <Chip color="3" value="50" />
                        <Chip color="4" value="100" />
                        <Chip color="5" value="500" />
                      </div>
                    </Col>
                    <Col md={3} style={{
                      backgroundColor:"rgb(0 0 0 / 0%)",
                      color:"#fff",
                      height:"200px",
                    }}>
                      other
                    </Col>
              </Row>
        </Container>
    </div>
      <HomeFooter />
    </>
  );
}

export default GameBaccarat;
