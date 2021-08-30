import React from 'react';
import {
  Row,
  Col
} from "reactstrap";

class GameList extends React.Component {

    render () {
      const games = this.props.gameLists;
      const listItems = games.map((obj) =>

        <div key={obj.CycleValue} style={{
          marginRight:"0px",
          marginLeft:"10px",
          marginTop:"10px",
          padding:"10px",
          backgroundColor:"rgb(0 0 0 / 50%)",
          color:"#fff"
        }}>
        <Row>
          <Col className="text-center">{obj.LeagueName} #{obj.CycleValue}</Col>
        </Row>
        <Row className="mb-2 sport-game-list">
          <Col md={1}><div style={{
              backgroundImage: "url(" + require("assets/img/sport/team_icon.jpg").default + ")",
              backgroundPosition: "-80px 105px",
              width: "60px",
              height: "60px"
            }} /></Col>
          <Col md={2} className="pl-4">{obj.HomeTeam} {obj.HomeScore}</Col>
          <Col md={2}>輸贏{obj.HomeWinRate}</Col>
          <Col md={1} className="text-right">+{obj.HandicapValue} </Col>
          <Col md={2}>讓分{obj.HomeHandicapRate}</Col>
          <Col md={1} className="text-right">+{obj.BsValue} </Col>
          <Col md={2}>大小{obj.HomeBsRate}</Col>
        </Row>
        <Row className="mb-2 sport-game-list">
          <Col md={1}>
          <div style={{
              backgroundImage: "url(" + require("assets/img/sport/team_icon.jpg").default + ")",
              backgroundPosition: "-80px 105px",
              width: "60px",
              height: "60px",
            }} />
            </Col>
            <Col md={2} className="pl-4">{obj.AwayTeam} {obj.AwayScore}</Col>
          <Col md={2}>輸贏{obj.AwayWinRate}</Col>
          <Col md={1} className="text-right"></Col>
          <Col md={2}>讓分{obj.AwayHandicapRate}</Col>
          <Col md={1} className="text-right"></Col>
          <Col md={2}>大小{obj.AwayBsRate}</Col>
        </Row>
    </div>
      );

      return (
        <div>
          {listItems}
       </div>
      );
    }
  
  }
  
export default GameList;
