import React from 'react';
import { Carousel } from 'react-bootstrap';
import styled from 'styled-components';
import aImage from '../assets/carousel_1.jpg';
import bImage from '../assets/carousel_2.jpg';
import cImage from '../assets/carousel_3.jpg';

const Styles = styled.div`
    .carousel-control-next span, .carousel-control-prev span {
        display:none;
    }
`;

export const HomeCarousel = (props) => (
    <Styles>
<Carousel fade>
  <Carousel.Item interval={5000}>
    <img
      className="d-block w-100"
      src={aImage}
      alt="活動1"
    />
    <Carousel.Caption>
        <h3>文案內容文案內容</h3>
    </Carousel.Caption>
  </Carousel.Item>
  <Carousel.Item interval={5000}>
    <img
      className="d-block w-100"
      src={bImage}
      alt="活動2"
    />
    <Carousel.Caption>
    </Carousel.Caption>
  </Carousel.Item>
  <Carousel.Item interval={5000}>
    <img
      className="d-block w-100"
      src={cImage}
      alt="活動3"
    />
    <Carousel.Caption>
    </Carousel.Caption>
  </Carousel.Item>
</Carousel>
    </Styles>
)