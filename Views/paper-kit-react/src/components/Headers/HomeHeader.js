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
import { Button, Container } from "reactstrap";

// core components

function HomeHeader() {
  let pageHeader = React.createRef();

  React.useEffect(() => {
    if (window.innerWidth < 991) {
      const updateScroll = () => {
        let windowScrollTop = window.pageYOffset / 3;
        pageHeader.current.style.transform =
          "translate3d(0," + windowScrollTop + "px,0)";
      };
      window.addEventListener("scroll", updateScroll);
      return function cleanup() {
        window.removeEventListener("scroll", updateScroll);
      };
    }
  });

  return (
    <>
      <div
        style={{
          backgroundImage:
            "url(" + require("assets/img/daniel-olahh.jpg").default + ")",
        }}
        className="page-header"
        data-parallax={true}
        ref={pageHeader}
      >
        <div className="filter" />
        <Container>
          <div className="motto text-center">
            <h1>Fincon</h1>
            <h3>專業開發博奕系統20年</h3>
            <br />
            <Button
              href="https://www.youtube.com/watch?v=dQw4w9WgXcQ"
              className="btn-round mr-3"
              color="neutral"
              target="_blank"
              outline
            >
              <i className="fa fa-play" />
              立即試玩
            </Button>
            <Button className="btn-round" color="neutral" type="button" outline>
              
            <i className="fa fa-play" />
              移動端
            </Button>
          </div>
        </Container>
      </div>
    </>
  );
}

export default HomeHeader;
