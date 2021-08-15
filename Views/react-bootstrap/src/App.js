import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Home from './pages/Home';
import { Sport } from './pages/Sport';
import { Slot } from './pages/Slot';
import { Lottery } from './pages/Lottery';
import { Chess } from './pages/Chess';
import { ESport } from './pages/ESport';
import { Login } from './pages/Login';
import { Logout } from './pages/Logout';

import { Layout } from './components/Layout';
import { NavBar } from './components/NavBar';

function App() {
  return (
    <React.Fragment>
    <Router>
      <NavBar />
      <Layout>
            <Route exact path="/" component={Home} />
            <Route exact path="/sport" component={Sport} />
            <Route exact path="/slot" component={Slot} />
            <Route exact path="/lottery" component={Lottery} />
            <Route exact path="/chess" component={Chess} />
            <Route exact path="/esport" component={ESport} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/logout" component={Logout} />
      </Layout>
      </Router>
    </React.Fragment>
  );
}

export default App;
