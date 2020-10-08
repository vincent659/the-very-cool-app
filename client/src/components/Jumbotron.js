import React from 'react';
import { Jumbotron as Jumbo, Container } from 'react-bootstrap';
import styled from 'styled-components';
import equal from '../assets/equal.jpg';

const Styles = styled.div`
  .jumbo {
    background: url(${equal}) no-repeat fixed bottom;
    background-size: cover;
    color: #cccccc;
    height: 300px;
    position: relative;
    z-index: -2;
  }

  .overlay {
    background-color: #000;
    opacity: 0.6;
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    z-index: -1;
  }
`;

/* Jumbotron for calling extra attention on the header */
export const Jumbotron = () => {
  return (
    <Styles>
      <Jumbo fluid className="jumbo">
        <div className="overlay"></div>
        <Container>
          <h1 className="text-left">Media Analysis</h1>
          <p className="text-justify">
            The media can manipulate, influence, persuade and pressurise
            society, along with even controlling the world at times in both
            positive and negative ways; mentally, physically and emotionally.
          </p>
          <p className="text-justify">
            Controversial stories are reported and printed with no reliance of
            it being fact or not. The public is “meant” to believe everything
            they’re told and not question it. With it being so easy to say
            assert an opinion so easily after a few taps, it can lead to
            investigations and front page headlines.
          </p>
        </Container>
      </Jumbo>
    </Styles>
  );
};
