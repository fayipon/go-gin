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
import ReactDOM from "react-dom";
import {Router , Route, Redirect, Switch } from "react-router-dom";

//ToastContainer & CSS
import { ToastContainer } from 'react-toastify'; 
import 'react-toastify/dist/ReactToastify.css';

// styles
import "bootstrap/scss/bootstrap.scss";
import "assets/scss/paper-kit.scss?v=1.3.0";
import "assets/demo/demo.css?v=1.3.0";

//page 2
import Home from "views/pages/Home.js";
import SportPage from "views/pages/Sport.js";
import LotteryPage from "views/pages/Lottery.js";
import SlotPage from "views/pages/Slot.js";
import BaccaratPage from "views/pages/Baccarat";
import ChessPage from "views/pages/Chess.js";
import LoginPage from "views/pages/Login.js";
import RegisterPage from "views/pages/Register.js";

// game
import GameLottery from "views/games/GameLottery.js";
import GameBaccarat from "views/games/GameBaccarat.js";
import GameSport from "views/games/GameSport";
import GameChess from "views/games/GameChess.js";

// others
import history from './history';

ReactDOM.render(
    <Router history={history}>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      <Switch>
        
        <Route path="/game/lottery" render={(props) => <GameLottery {...props} />} />
        <Route path="/game/baccarat" render={(props) => <GameBaccarat {...props} />} />
        <Route path="/game/sport" render={(props) => <GameSport {...props} />} />
        <Route path="/game/chess" render={(props) => <GameChess {...props} />} />

        <Route path="/register" render={(props) => <RegisterPage {...props} />} />
        <Route path="/login" render={(props) => <LoginPage {...props} />} />
        <Route path="/event" render={(props) => <SlotPage {...props} />} />
        <Route path="/chess" render={(props) => <ChessPage {...props} />} />
        <Route path="/slot" render={(props) => <SlotPage {...props} />} />
        <Route path="/baccarat" render={(props) => <BaccaratPage {...props} />} />
        <Route path="/lottery" render={(props) => <LotteryPage {...props} />} />
        <Route path="/sport" render={(props) => <SportPage {...props} />} />
        <Route path="/home" render={(props) => <Home {...props} />} />
        <Route exact path="/" render={(props) => <LoginPage {...props} />} />

        <Redirect to="/" />
      </Switch>
    </Router>
  ,
  document.getElementById("root")
);
