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
import ReactDOM from 'react-dom';
import { Link } from "react-router-dom";
// nodejs library that concatenates strings
import classnames from "classnames";

// ajax
import axios from 'axios';
import history from './../../history';

// reactstrap components
import {
  Collapse,
  NavbarBrand,
  Navbar,
  NavItem,
  NavLink,
  Nav,
  Container,
  Button,
} from "reactstrap";

// check User is login
function checkUserLogin() {
  axios.get('http://localhost:8080/api/get_user_balance').
  then( response => {
      if (response.data.status == "0") {
          // 未登入 , 跳轉到登入
          history.push('/login');
      } else {
          // 更新餘額
          
        ReactDOM.render(response.data.balance,document.getElementById('user_balance'))
      } 
  })
}

// logoutBtn onClick Event
function handleClick() {
  axios.get('http://localhost:8080/api/logout',this.state).
  then( response => {
      if (response.data.status == "1") {
          // 已登出 , 跳轉到登入頁
          history.push('/login');
      } 
  })
}

function ExamplesNavbar() {
  const [navbarColor, setNavbarColor] = React.useState("navbar-transparent");
  const [navbarCollapse, setNavbarCollapse] = React.useState(false);
  
  const toggleNavbarCollapse = () => {
    setNavbarCollapse(!navbarCollapse);
    document.documentElement.classList.toggle("nav-open");
  };

  checkUserLogin();
  
  React.useEffect(() => {
    const updateNavbarColor = () => {
      if (
        document.documentElement.scrollTop > 299 ||
        document.body.scrollTop > 299
      ) {
        setNavbarColor("");
      } else if (
        document.documentElement.scrollTop < 300 ||
        document.body.scrollTop < 300
      ) {
        setNavbarColor("navbar-transparent");
      }
    };

    window.addEventListener("scroll", updateNavbarColor);

    return function cleanup() {
      window.removeEventListener("scroll", updateNavbarColor);
    };
  });

  return (
    <Navbar
      className={classnames("fixed-top", navbarColor)}
      color-on-scroll="300"
      expand="lg"
    >
      <Container>
        <div className="navbar-translate">
          <NavbarBrand
            data-placement="bottom"
            to="/home"
       //     target="_blank"
            title="Fincon DEMO"
            tag={Link}
          >
            Fincon 演示系統
          </NavbarBrand>
          <button
            aria-expanded={navbarCollapse}
            className={classnames("navbar-toggler navbar-toggler", {
              toggled: navbarCollapse,
            })}
            onClick={toggleNavbarCollapse}
          >
            <span className="navbar-toggler-bar bar1" />
            <span className="navbar-toggler-bar bar2" />
            <span className="navbar-toggler-bar bar3" />
          </button>
        </div>
        <Collapse
          className="justify-content-end"
          navbar
          isOpen={navbarCollapse}
        >
          <Nav navbar>
            <NavItem>
              <NavLink to="/lottery" tag={Link}>
                彩票
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink to="/baccarat" tag={Link}>
                真人
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink to="/sport" tag={Link}>
                體育
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink to="/slot" tag={Link}>
                電子
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink to="/chess" tag={Link}>
                棋牌
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink to="/event" tag={Link}>
                電競
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink to="/event" tag={Link}>
                活動
              </NavLink>
            </NavItem>
            
            <NavItem>
              <NavLink
                data-placement="bottom"
                href="https://github.com/fayipon/go-gin"
                target="_blank"
                title="Star on GitHub"
              >
                <i className="fa fa-github" />
                <p className="d-lg-none">GitHub</p>
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink
                data-placement="bottom"
              >
                <p className="">餘額 : <span id="user_balance">999999</span></p>
              </NavLink>
            </NavItem>
            <NavItem>
              <Button className="btn-round" color="danger" onClick={handleClick}>
                 登出
              </Button>
            </NavItem>
          </Nav>
        </Collapse>
      </Container>
    </Navbar>
  );
}

export default ExamplesNavbar;
