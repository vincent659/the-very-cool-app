import React, { useState } from 'react';
import axios from 'axios';
import Button from 'react-bootstrap/Button';
import InputGroup from 'react-bootstrap/InputGroup';
import FormControl from 'react-bootstrap/FormControl';

const SearchNews = (props) => {
  const [keyTerm, setKeyTerm] = useState('');
  const [error, setError] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (keyTerm == '') {
      setError(e);
    } else {
      const search = { msg: keyTerm };
      axios
        .post(`/api/v1/mashup/news`, search)
        .then((data) => {
          setError(null);
          data.data.msg.articles.length > 0 ? props.search(data) : setError(e);
        })
        .catch((e) => {
          setError(e);
        });
    }
  };

  return (
    <div className="my-2">
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
          No related news found. Please try to use another keyword or phrase
        </div>
      ) : (
        ''
      )}
    </div>
  );
};

export default SearchNews;
