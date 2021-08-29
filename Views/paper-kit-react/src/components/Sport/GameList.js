import React from 'react';
import {
  Row,
  Col
} from "reactstrap";

import axios from 'axios';
import { toast } from 'react-toastify'; //import toast


class GameList extends React.Component {

    constructor(props) {
        super(props);
        this.state = {gameLists: []};
    }

    componentDidMount() {

        const children = [];

        this.serverRequest = 
        axios.post('http://localhost:8080/api/sport_games').then( response => {
            if (response.data.status == "0") {
                // Error
                toast.error(response.data.message);
            } else {
                // 更新賽事列表
                var game = response.data.data;

                for(var i=0; i< game.length;i++) {
                    children.push(
                        <div style={{
                            marginRight:"10px",
                            marginLeft:"10px",
                            marginTop:"10px",
                            padding:"10px",
                            backgroundColor:"rgb(0 0 0 / 50%)",
                            color:"#fff"
                          }}>
                            <Row>
                              <Col className="text-center">{game[i].LeagueName} {game[i].HomeTeam}(主) VS {game[i].AwayTeam}(客)</Col>
                              
                            </Row>
                            <Row className="mb-2 sport-game-list">
                              <Col>
                                <div style={{
                                  backgroundImage: "url(" + require("assets/img/sport/team_icon.jpg").default + ")",
                                  backgroundPosition: "-80px 105px",
                                  width: "60px",
                                  height: "60px"
                                }} />
                                </Col>
                                <Col>
                                {game[i].HomeTeam} {game[i].HomeScore}
                              </Col>
                              <Col>輸贏{game[i].HomeWinRate}</Col>
                              <Col>+{game[i].HandicapValue} 讓分{game[i].HomeHandicapRate}</Col>
                              <Col>+{game[i].BsValue} 大小{game[i].HomeBsRate}</Col>
                            </Row>
                            <Row>
                              <Col>
                              <div style={{
                                  backgroundImage: "url(" + require("assets/img/sport/team_icon.jpg").default + ")",
                                  backgroundPosition: "-80px 105px",
                                  width: "60px",
                                  height: "60px",
                                }} />
                                </Col>
                                <Col>
                                {game[i].AwayTeam} {game[i].AwayScore}
                              </Col>
                              <Col>輸贏{game[i].AwayWinRate}</Col>
                              <Col>讓分{game[i].AwayHandicapRate}</Col>
                              <Col>大小{game[i].AwayBsRate}</Col>
                            </Row>
                        </div>
                        );
                }
                
                this.setState({
                    gameLists: children
                });
            }
        });    
    }

    componentWillUnmount() {
        this.serverRequest.abort();
    }

    render () {
      return (
      <div>
        {this.state.gameLists}
      </div>
      );
    }
  
  }
  
  
  
export default GameList;