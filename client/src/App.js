import React, { useState } from 'react';
import { Footer } from './components/layout/Footer';
import { Layout } from './components/layout/Layout';
import { Jumbotron } from './components/Jumbotron';
import { Navigation } from './components/layout/Navigation';
import Home from './Home';
// import SearchTwitter from './components/SearchTwitter';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import './App.css';

// npm install react-bootstrap bootstrap
// npm i axios
// npm i styled-components
// npm install react-router-dom
// npm install --save react-chartjs-2 chart.js
// npm i --save @fortawesome/fontawesome-svg-core
// npm install --save @fortawesome/free-solid-svg-icons
// npm install --save @fortawesome/react-fontawesome

function App() {
  return (
    <div className="App">
      <React.Fragment>
        <BrowserRouter>
          <Navigation />
          <Jumbotron />
          <Layout>
            <Switch>
              <Route exact path="/" component={Home} />
              <Route exact path="/tweets/:query" component={Home} />
            </Switch>
          </Layout>
          <Footer />
        </BrowserRouter>
      </React.Fragment>
    </div>
  );
}

export default App;
