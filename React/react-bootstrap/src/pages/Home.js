import React from 'react';

import styled from 'styled-components';
import { Container } from 'react-bootstrap';
import { HomeCarousel } from '../components/HomeCarousel';
import { Footer } from '../components/Footer';

const Styles = styled.div`
    .content {
        min-height:67.3vh;
    }
`;

class Home extends React.Component {
    
    constructor(props) {
      super(props);
      this.state = {
        error: null,
        loading: false,
        message: null
      };
    }
  
    // 載入時發送API獲取頁面數據
    componentDidMount() {
      this.ajax();
    }
  
    render() {
        const { error, loading, message } = this.state;
        if (error) {
            return (
                <div>Error: {error.message}</div>
            );
        } else if (!loading) {
            return (
                <div>Loading...</div>
            );
        } else {
            return (
              <Styles>
                <HomeCarousel />
                <Container className="content">
                  <div>
                      <h2>首頁</h2>
                      <p>{message}</p>
                  </div>
                </Container>
                <Footer / >
              </Styles>
            );
        }
    }

    ajax() {
      fetch("http://localhost:8080/api/login", {
          method: "GET",
          headers: new Headers({
              'Content-Type': 'application/json',
          })
      })
      .then(res => res.json())
      .then(
        (result) => {
          console.log(result);
          this.setState({
              loading: true,
              message: result.message
          });
        },
        (error) => {
          this.setState({
              loading: true,
              error
          });
        }
      )
    }
}

export default Home;