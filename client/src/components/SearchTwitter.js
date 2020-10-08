import React, { useState } from 'react';
import axios from 'axios';
import Card from 'react-bootstrap/Card';

const SearchTwitter = (props) => {
  const [tweets, setTweets] = useState([]);
  const [error, setError] = useState(null);

  let temp = props.search;

  const handleTwitter = (e) => {
    e.preventDefault();
    const search = { msg: e.target.value };

    axios
      .post(`/api/v1/mashup/tweets`, search)
      .then((data) => {
        console.log(data.data.statuses.length);
        setError(null);
        // setTweets(data.data.statuses);
        data.data.statuses.length > 0
          ? setTweets(data.data.statuses)
          : setError(e);
      })
      .catch((e) => {
        setError(e);
      });
  };

  return (
    <div>
      <h6 className="mb-4 text-left">
        Step 2: Select a relevant keyword or phrase from the drop-down menu to
        perform public opinion search on twitter
      </h6>
      <select onChange={handleTwitter} className="mb-4">
        <option key="empty">Select key term...</option>
        {temp.map((data) => {
          if (data !== undefined) {
            return (
              <option value={data.label} key={data.id}>
                {data.label}
              </option>
            );
          }
        })}
      </select>
      {error ? (
        <div className="text-danger">
          No related tweets found. Please try to use another keyword or phrase
        </div>
      ) : (
        ''
      )}
      {tweets.map((data, index) => (
        <Card className="my-2" key={index}>
          <Card.Header as="h5">Tweet {index + 1} </Card.Header>
          <Card.Body>
            {/* <Card.Title>{index} Tweets</Card.Title> */}
            <Card.Text>{data.text}</Card.Text>
          </Card.Body>
        </Card>
      ))}
    </div>
  );
};

export default SearchTwitter;
