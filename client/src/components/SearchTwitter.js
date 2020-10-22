import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import InputGroup from 'react-bootstrap/InputGroup';
import FormControl from 'react-bootstrap/FormControl';
import { Chart } from './Chart';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './FontawesomeIcons/faicon';

const SearchTwitter = (props) => {
  const [keyTerm, setKeyTerm] = useState([]);
  const [tweetPosts, setTweetPosts] = useState([]);
  const [sentimentAvgScore, setSentimentAvgScore] = useState('');
  const [sentimentScores, setSentimentScores] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (props.query != null) {
      const search = { msg: props.query };

      axios
        .post(`/api/v1/mashup/tweets`, search)
        .then((data) => {
          setError(null);
          if (data.data.statuses.length > 0) {
            setTweetPosts(data.data.statuses);
            setSentimentAvgScore(data.data.total);
            setSentimentScores(data.data.scores);
          }
        })
        .catch((e) => {
          setError(e);
        });
    }
  }, [props.query]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (keyTerm == '') {
      setError(e);
    } else {
      const search = { msg: keyTerm };

      axios
        .post(`/api/v1/mashup/tweets`, search)
        .then((data) => {
          setError(null);
          if (data.data.statuses.length > 0) {
            setTweetPosts(data.data.statuses);
            setSentimentAvgScore(data.data.total);
            setSentimentScores(data.data.scores);
          } else {
            setError(e);
          }
        })
        .catch((e) => {
          setError(e);
        });
    }
  };

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
      <h1>{`Average sentiment score for '${keyTerm}': ${
        sentimentAvgScore == 0 ? '' : sentimentAvgScore.toFixed(3)
      }`}</h1>
      <h1>
        {sentimentAvgScore >= 0.1 ? (
          <FontAwesomeIcon icon="laugh-beam" size="lg" color="yellow" />
        ) : sentimentAvgScore <= -0.1 ? (
          <FontAwesomeIcon icon="frown" size="lg" color="blue" />
        ) : (
          <FontAwesomeIcon icon="meh" size="lg" color="black" />
        )}
      </h1>

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
            <Card.Text>{data.text}</Card.Text>
          </Card.Body>
        </Card>
      ))}
    </div>
  );
};

export default SearchTwitter;
