import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import Poker from "components/Baccarat/Poker.js";

class CycleCountdown extends React.Component {

    constructor(props) {
        super(props);

        this.state = {time:{}, seconds: props.seconds};
        this.timer = 0;
        
        this.countDown = this.countDown.bind(this);

        this.startTimer();
        this.setCycle();
    }

    secondsToTime(secs){

        var today = new Date();

        var hours = 0;
        var minutes = 0;
        var seconds = 59-today.getSeconds();
        this.state.seconds = seconds;

        if (hours < 10) hours = "0" + hours;
        if (minutes < 10) minutes = "0" + minutes;
        if (seconds < 10) seconds = "0" + seconds;

        // 倒數五秒
        if (seconds > "15") {
          document.getElementById('player_cards').style.display = "none";
          document.getElementById('banker_cards').style.display = "none";
        } else {
          document.getElementById('player_cards').style.display = "block";
          document.getElementById('banker_cards').style.display = "block";
        }

        if (seconds > "20") {
          ReactDOM.render("", document.getElementById('baccarat_message'));
        }
        if (seconds == "20") {
          ReactDOM.render("下注倒數5...", document.getElementById('baccarat_message'));
        }
        if (seconds == "19") {
          ReactDOM.render("下注倒數4...", document.getElementById('baccarat_message'));
        }
        if (seconds == "18") {
          ReactDOM.render("下注倒數3...", document.getElementById('baccarat_message'));
        }
        if (seconds == "17") {
          ReactDOM.render("下注倒數2...", document.getElementById('baccarat_message'));
        }
        if (seconds == "16") {
          ReactDOM.render("下注倒數1...", document.getElementById('baccarat_message'));
        }
        if (seconds == "15") {
          ReactDOM.render("開獎中...", document.getElementById('baccarat_message'));
          this.getCycle();
        }
        // 更新期數
        if (seconds == "59") {
          this.setCycle();
        }

        let obj = {
        "h": hours,
        "m": minutes,
        "s": seconds
        };
        return obj;
    }

  setCycle() {

    var today = new Date();
    var year = today.getFullYear();
    var month = today.getMonth()+1;
    var day = today.getDate();
    var hour = today.getHours();
    var mins = today.getMinutes();

    if (month < 10) month = "0" +　month;
    if (day < 10) day = "0" +day;
    var cycle = hour * 60 + mins;
    if ((cycle < 1000) && (cycle > 100)) cycle = "0" + cycle;
    if ((cycle < 100) && (cycle > 10)) cycle = "00" + cycle;
    if ((cycle < 10) && (cycle > 0)) cycle = "000" + cycle;

    var current_cycle = month + day + cycle;
    ReactDOM.render(current_cycle, document.getElementById('current_cycle'));

    // 清空單局下注總計
    document.getElementById('player_bet_total').value = "0";
    document.getElementById('tie_bet_total').value = "0";
    document.getElementById('banker_bet_total').value = "0";
  } 

  getCycle() {

    // 抓取獎期
    axios.post('http://localhost:8080/api/baccarat_result').
    then( response => {
      if (response.data.status == "1") {
        var result = response.data.result.split(",");

        // 閒
        var card1_color = Math.floor(result[0]/13) + 1;
        var card1_card = result[0]%13;
        
        var card2_color = Math.floor(result[1]/13) + 1;
        var card2_card = result[1]%13;

        var card3_color = Math.floor(result[2]/13) + 1;
        var card3_card = result[2]%13;
 
        // 庄
        var card4_color = Math.floor(result[4]/13) + 1;
        var card4_card = result[4]%13;
        
        var card5_color = Math.floor(result[5]/13) + 1;
        var card5_card = result[5]%13;

        var card6_color = Math.floor(result[6]/13) + 1;
        var card6_card = result[6]%13;
        
        if (result[2] == -1) { 
          ReactDOM.render([
            <Poker color={card1_color} card={card1_card} order="1" />,
            <Poker color={card2_color} card={card2_card} order="2" />, 
          ], document.getElementById('player_cards_result'));
        } else {
          ReactDOM.render([
            <Poker color={card1_color} card={card1_card} order="1" />,
            <Poker color={card2_color} card={card2_card} order="2" />, 
            <Poker color={card3_color} card={card3_card} order="3" />,
          ], document.getElementById('player_cards_result'));
        }

        if (result[6] == -1) { 
          ReactDOM.render([
            <Poker color={card4_color} card={card4_card} order="1" />,
            <Poker color={card5_color} card={card5_card} order="2" />, 
          ], document.getElementById('banker_cards_result'));
        } else {
          ReactDOM.render([
            <Poker color={card4_color} card={card4_card} order="1" />,
            <Poker color={card5_color} card={card5_card} order="2" />, 
            <Poker color={card6_color} card={card6_card} order="3" />,
          ], document.getElementById('banker_cards_result'));
        }
        
        ReactDOM.render([
          <Poker color={card4_color} card={card4_card} order="1" />,
          <Poker color={card5_color} card={card5_card} order="2" />, 
          <Poker color={card6_color} card={card6_card} order="3" />,
        ], document.getElementById('banker_cards_result'));

        // 結果
        console.log("結果" + result[8]);

        if (result[8] == 1) {
          ReactDOM.render("閒贏", document.getElementById('baccarat_message'));
        }
        if (result[8] == 2) {
          ReactDOM.render("和局", document.getElementById('baccarat_message'));
        }
        if (result[8] == 3) {
          ReactDOM.render("庄贏", document.getElementById('baccarat_message'));
        }
      } 
    })
  }

  componentDidMount() {
    let timeLeftVar = this.secondsToTime(this.state.seconds);
    this.setState({ time: timeLeftVar });
  }

  startTimer() {
    if ((this.timer == 0)) {
      this.timer = setInterval(this.countDown, 1000);
    }
  }

  countDown() {
    // Remove one second, set state so a re-render happens.
    let seconds = this.state.seconds - 1;
    this.setState({
      time: this.secondsToTime(seconds),
      seconds: seconds,
    });
    
    // Check if we're at zero.
    if (seconds == 0) { 
   //   clearInterval(this.timer);
    }
  }

  render() {
    return(
      <div>
        {this.state.time.h}:{this.state.time.m}:{this.state.time.s}
      </div>
    );
  }
}

export default CycleCountdown;