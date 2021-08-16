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
} from "reactstrap";

// core components
import HomeNavbar from "components/Navbars/HomeNavbar.js";
import SecondHeader from "components/Headers/SecondLottery.js";
import HomeFooter from "components/Footers/HomeFooter.js";

import history from './../../history';

function EnterGame() {
  history.push('/game/lottery');
}

function LotteryPage() {

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
      <SecondHeader />
      <div className="section profile-content">
        <Container>
          <div className="owner">
            <div className="avatar">
              <img
                alt="..."
                className="img-circle img-no-padding img-responsive"
                src={require("assets/img/faces/lottery.jpg").default}
              />
            </div>
            <div className="name">
              <h4 className="title">
                Fincon 彩票<br />
              </h4>
              <h6 className="description">現金 ｜ 信用 ｜ 試玩</h6>
            </div>
          </div>
          <Row>
            <Col className="ml-auto mr-auto text-center" md="6">
              <p>
                Fincon原生彩票系統, 文案描述文案描述文案描述文案描述文案描述文案描述文案描述文案描述
                文案描述文案描述文案描述文案描述文案描述文案描述文案描述文案描述文案描述文案描述
              </p>
              <br />
              <Button className="btn-round" color="danger" outline onClick={EnterGame}>
                <i className="fa fa-cog" /> 開始遊戲
              </Button>
            </Col>
          </Row>
        </Container>
      </div>
      <HomeFooter />
    </>
  );
}

export default LotteryPage;
