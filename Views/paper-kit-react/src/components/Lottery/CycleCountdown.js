import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';

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
    ReactDOM.render(current_cycle-1, document.getElementById('prev_cycle'));

    // 抓取獎期
    ReactDOM.render("?", document.getElementById('result_num_01'));
    ReactDOM.render("?", document.getElementById('result_num_02'));
    ReactDOM.render("?", document.getElementById('result_num_03'));
    ReactDOM.render("?", document.getElementById('result_num_04'));
    ReactDOM.render("?", document.getElementById('result_num_05'));

    axios.post('http://localhost:8080/api/lottery_result').
    then( response => {
      if (response.data.status == "1") {
        var lottery_result = response.data.result.split("");
        ReactDOM.render(lottery_result[0], document.getElementById('result_num_01'));
        ReactDOM.render(lottery_result[1], document.getElementById('result_num_02'));
        ReactDOM.render(lottery_result[2], document.getElementById('result_num_03'));
        ReactDOM.render(lottery_result[3], document.getElementById('result_num_04'));
        ReactDOM.render(lottery_result[4], document.getElementById('result_num_05'));
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