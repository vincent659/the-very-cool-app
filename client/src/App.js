import React, { useState } from 'react';
import { Footer } from './components/layout/Footer';
import { Layout } from './components/layout/Layout';
import { Jumbotron } from './components/Jumbotron';
import { Navigation } from './components/layout/Navigation';
import SearchNews from './components/SearchNews';
import NewsItem from './components/NewsItem';
import SearchTwitter from './components/SearchTwitter';
import './App.css';

//
// npm install react-bootstrap bootstrap
// npm i axios
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
            relevant news. Select a desire news article by clicking 'Perform
            Analysis' to initiate analysation
          </h6>
          {/* User Input */}
          <SearchNews search={handleSubmit} className="mt-5" />
          {/* Article Content Card */}
          {text.slice(0, 5).map((i, index) => (
            <NewsItem key={index} data={i} extrKeyword={handleExtraKeyword} />
          ))}
          {/* Separation Line */}
          <hr />
          <SearchTwitter search={extraKey} />
        </Layout>
        <Footer />
      </React.Fragment>
    </div>
  );
}

export default App;
