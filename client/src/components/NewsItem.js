import React, { useState } from 'react';
import axios from 'axios';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';

const NewsItem = (props) => {
  const { title, description, source } = props.data;
  const [score, setScore] = useState('');
  const [error, setError] = useState(null);

  const handleMonkeyLearn = (e) => {
    e.preventDefault();
    const des = { msg: description };
    axios
      .post(`/api/v1/mashup/analysis`, des)
      .then((data) => {
        setScore(data.data.dataSentiment[0]);
        props.extrKeyword(data.data.dataExtract);
      })
      .catch((e) => {
        setError(e);
      });
  };

  return (
    <div className="my-2">
      <Card>
        <Card.Header as="h5">{title}</Card.Header>
        <Card.Body>
          <Card.Title>Article Summary</Card.Title>
          <Card.Text>{description}</Card.Text>
          <Button onClick={(e) => handleMonkeyLearn(e)} variant="primary">
            Perform Analysis
          </Button>
          {error ? (
            <div className="text-danger">
              Cannot perform analysis, due to having no article summary. Please
              choose another article or perform a new search.
            </div>
          ) : (
            ''
          )}
          <hr />
          <span
            className={
              score.tag_name === 'Positive'
                ? 'text-success'
                : score.tag_name === 'Negative'
                ? 'text-warning'
                : ''
            }
          >
            Polarity:{' '}
            {score.tag_name == null
              ? "Please click 'Perform Analysis'"
              : score.tag_name + ' opinion'}
          </span>
          <br />
          <span
            className={
              score.confidence >= 0.75
                ? 'text-success'
                : score.confidence >= 0.5 && score.confidence < 0.75
                ? ''
                : score.confidence >= 0 && score.confidence < 0.5
                ? 'text-warning'
                : ''
            }
          >
            Confidence:{' '}
            {score.confidence == null
              ? "Please click 'Perform Analysis'"
              : (score.confidence * 100).toFixed(1) + '% / 100%'}
          </span>
        </Card.Body>
      </Card>
    </div>
  );
};

export default NewsItem;
