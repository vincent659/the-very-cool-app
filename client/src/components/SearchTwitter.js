import React, { useState, useEffect } from 'react';
// import socketIOClient from 'socket.io-client';
import axios from 'axios';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import InputGroup from 'react-bootstrap/InputGroup';
import FormControl from 'react-bootstrap/FormControl';
// const ENDPOINT = 'http://127.0.0.1:5000';

const SearchTwitter = (props) => {
  const [keyTerm, setKeyTerm] = useState([]);
  // const [response, setResponse] = useState('');
  const [error, setError] = useState(null);

  // useEffect(() => {
  //   const socket = socketIOClient(ENDPOINT);
  //   socket.on('FromAPI', (data) => {
  //     setResponse(data);
  //   });
  // }, []);

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
          // data.data.statuses.length > 0
          //   ? setKeyTerm(data.data.statuses)
          //   : setError(e);
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
      {/* {keyTerm.map((data, index) => (
        <Card className="my-2" key={index}>
          <Card.Header as="h5">Tweet {index + 1} </Card.Header>
          <Card.Body>
            <Card.Text>{data.text}</Card.Text>
          </Card.Body>
        </Card>
      ))} */}
    </div>
  );
};

export default SearchTwitter;
