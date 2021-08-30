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
          marginRight:"10px",
          marginLeft:"10px",
          marginTop:"10px",
          padding:"10px",
          backgroundColor:"rgb(0 0 0 / 50%)",
          color:"#fff"
        }}>
        <Row>
          <Col className="text-center">{obj.LeagueName} {obj.HomeTeam}(主) VS {obj.AwayTeam}(客)</Col>
        </Row>
        <Row className="mb-2 sport-game-list">
          <Col><div style={{
              backgroundImage: "url(" + require("assets/img/sport/team_icon.jpg").default + ")",
              backgroundPosition: "-80px 105px",
              width: "60px",
              height: "60px"
            }} /></Col>
          <Col>{obj.HomeTeam} {obj.HomeScore}</Col>
          <Col>輸贏{obj.HomeWinRate}</Col>
          <Col>+{obj.HandicapValue} 讓分{obj.HomeHandicapRate}</Col>
          <Col>+{obj.BsValue} 大小{obj.HomeBsRate}</Col>
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
            {obj.AwayTeam} {obj.AwayScore}
          </Col>
          <Col>輸贏{obj.AwayWinRate}</Col>
          <Col>讓分{obj.AwayHandicapRate}</Col>
          <Col>大小{obj.AwayBsRate}</Col>
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
