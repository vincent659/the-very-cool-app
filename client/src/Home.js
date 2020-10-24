import React, { useState } from 'react';
import SearchTwitter from './components/SearchTwitter';
// import { RouteComponentProps } from 'react-router-dom';

const Home = (match) => {
  const [text, setText] = useState([]);
  const [extraKey, setExtraKey] = useState([]);

  // console.log(match.match.params.query);
  // console.log(location);

  const handleSubmit = (data) => {
    setText(data.data.msg.articles);
  };

  const handleExtraKeyword = (keyword) => {
    setExtraKey(keyword);
  };

  return (
    <div>
      <h6 className="mb-4 text-left">
        Please enter a keyword or phrase to perform search for relevant tweets.
      </h6>
      {/* <hr /> */}
      <SearchTwitter search={handleSubmit} query={match.match.params.query} />
      <hr />
    </div>
  );
};

export default Home;
