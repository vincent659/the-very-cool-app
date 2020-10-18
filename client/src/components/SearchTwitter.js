import React, { useState, useEffect } from 'react';
// import socketIOClient from 'socket.io-client';
import axios from 'axios';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import InputGroup from 'react-bootstrap/InputGroup';
import FormControl from 'react-bootstrap/FormControl';
import { useParams } from 'react-router';
import { Chart } from './Chart';

// const ENDPOINT = 'http://127.0.0.1:5000';

const SearchTwitter = (props) => {
  const [keyTerm, setKeyTerm] = useState([]);
  const [tweetPosts, setTweetPosts] = useState([]);
  const [sentimentAvgScore, setSentimentAvgScore] = useState('');
  const [sentimentScores, setSentimentScores] = useState([]);
  // const [response, setResponse] = useState('');
  const [error, setError] = useState(null);

  // console.log(props.query);
  // let search = window.location.search;
  // let params = new URLSearchParams(search);
  // let foo = params.get('query');
  // let { id } = useParams();
  // console.log(id);
  // console.log(props.query);

  useEffect(() => {
    if (props.query != null) {
      console.log(props.query);
      const search = { msg: props.query };

      axios
        .post(`/api/v1/mashup/tweets`, search)
        .then((data) => {
          console.log(data);

          // console.log(data.data.statuses.length);
          setError(null);
          // setKeyTerm(data.data.statuses);
          if (data.data.statuses.length > 0) {
            setTweetPosts(data.data.statuses);
            setSentimentAvgScore(data.data.total);
            setSentimentScores(data.data.scores);
            console.log(data.data.scores);
            // console.log('im here');
          }
        })
        .catch((e) => {
          setError(e);
        });
    }
    // setKeyTerm(data);
  }, [props.query]);

  // console.log(response);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (keyTerm == '') {
      setError(e);
    } else {
      const search = { msg: keyTerm };

      axios
        .post(`/api/v1/mashup/tweets`, search)
        .then((data) => {
          console.log(data);
          // console.log(data.data.statuses.length);
          setError(null);
          // setKeyTerm(data.data.statuses);
          if (data.data.statuses.length > 0) {
            console.log(data);
            setTweetPosts(data.data.statuses);
            setSentimentAvgScore(data.data.total);
            setSentimentScores(data.data.scores);
            console.log(data.data.scores);
            // console.log('im here');
          } else {
            setError(e);
          }
        })
        .catch((e) => {
          setError(e);
        });
    }
  };
  // console.log('im out');

  // console.log(sentimentAvgScore);

  return (
    <div>
      <form onSubmit={(e) => handleSubmit(e)}>
        <InputGroup
          value={keyTerm}
          onChange={(e) => setKeyTerm(e.target.value)}
        >
          <InputGroup.Prepend>
            <Button
              as="input"
              type="submit"
              value="Submit"
              variant="outline-secondary"
            ></Button>
          </InputGroup.Prepend>
          <FormControl aria-describedby="basic-addon1" />
        </InputGroup>
      </form>
      {error ? (
        <div className="text-danger">
          No related tweets found. Please try to use another keyword or phrase
        </div>
      ) : (
        ''
      )}
      <h1>{`Average sentiment score for the topic of '${keyTerm}': ${
        sentimentAvgScore == 0 ? '' : sentimentAvgScore.toFixed(5)
      }`}</h1>
      {/* {sentimentScores.map((data, index) => (
        <h1 key={index}>{data}</h1>
      ))} */}
      <Chart data={sentimentScores} name={keyTerm} />

      <h1>
        {/* The total scores for{' '} */}
        {`Total tweets displayed: ${sentimentScores.length}`}
      </h1>
      {tweetPosts.map((data, index) => (
        <Card className="my-2" key={index}>
          <Card.Header
            as="h5"
            className="d-flex justify-content-between align-items-center"
          >
            {/* <div>Tweet {index + 1} </div> */}
            <div>
              <img
                src={data.user.profile_image_url}
                alt=""
                className="rounded-circle mr-2"
              />
              {data.user.screen_name}
            </div>
            <div>{data.created_at}</div>
          </Card.Header>
          <Card.Body>
            {/* <Card.Text>{data.created_at}</Card.Text> */}
            <Card.Text>{data.text}</Card.Text>
            {/* <Card.Text>{data.user.screen_name}</Card.Text> */}
            {/* {data.scores.map((param) => {
              <Card.Text>{param}</Card.Text>;
            })} */}
            {/* <Card.Text>{data.scores}</Card.Text> */}
          </Card.Body>
        </Card>
      ))}
    </div>
  );
};

export default SearchTwitter;
