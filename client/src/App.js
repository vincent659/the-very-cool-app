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
// npm i socket.io-client
// npm i styled-components
// npm install react-router-dom
// npm install --save react-chartjs-2 chart.js

function App() {
  // const [text, setText] = useState([]);
  // const [extraKey, setExtraKey] = useState([]);

  // const handleSubmit = (data) => {
  //   setText(data.data.msg.articles);
  // };

  // const handleExtraKeyword = (keyword) => {
  //   setExtraKey(keyword);
  // };

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
