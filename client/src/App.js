import React, { useState } from 'react';
import { Footer } from './components/layout/Footer';
import { Layout } from './components/layout/Layout';
import { Jumbotron } from './components/Jumbotron';
import { Navigation } from './components/layout/Navigation';
import SearchTwitter from './components/SearchTwitter';
import './App.css';

// npm install react-bootstrap bootstrap
// npm i axios
// npm i socket.io-client
// npm i styled-components

function App() {
  const [text, setText] = useState([]);
  const [extraKey, setExtraKey] = useState([]);

  const handleSubmit = (data) => {
    setText(data.data.msg.articles);
  };

  const handleExtraKeyword = (keyword) => {
    setExtraKey(keyword);
  };

  return (
    <div className="App">
      <React.Fragment>
        <Navigation />
        <Jumbotron />
        <Layout>
          <h6 className="mb-4 text-left">
            Step 1: Please enter a keyword or phrase to perform search for
            relevant tweets.
          </h6>
          <hr />
          <SearchTwitter search={handleSubmit} />
          <hr />
        </Layout>
        <Footer />
      </React.Fragment>
    </div>
  );
}

export default App;
