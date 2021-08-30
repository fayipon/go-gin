import React, { Component } from 'react';
import { w3cwebsocket as W3CWebSocket } from "websocket";

import axios from 'axios';
import { toast } from 'react-toastify'; //import toast
import GameList from "components/Sport/GameList.js";

const client = new W3CWebSocket('ws://127.0.0.1:8080/ws?channel=sport');

class WebSocket extends Component {

  constructor(props) {
    super(props)
  
    this.state = {
      gameLists: []
    }
    
  }
  
  componentDidMount() {

    axios.post('http://localhost:8080/api/sport_games').then( response => {
      if (response.data.status == "0") {
          // Error
          toast.error(response.data.message);
      } else {
          // 更新賽事列表
          this.setState({
            gameLists: response.data.data});     
        }
       
    });    
        
  }

  componentWillMount() {

    client.onopen = () => {
      console.log('WebSocket Client Connected');
    };

    client.onmessage = (evt) => {

      const json = JSON.parse(evt.data)

      console.log(json.data);

      if (json.data != null) {

        this.setState({
          gameLists:json.data
        });
      }

    };
  }
  
  render() {
    return (
        <div>
          <GameList gameLists={this.state.gameLists} />
        </div>
    );
  }
}

export default WebSocket;
