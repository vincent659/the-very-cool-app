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
            Sentiment analysis is extremely useful in social media monitoring as
            it allows us to gain an overview of the wider public opinion behind
            certain topics
          </p>
          <p className="text-justify">
            The applications of sentiment analysis are broad and powerful. The
            ability to extract insights from social data is a practice that is
            being widely adopted by organisations across the world.
          </p>
        </Container>
      </Jumbo>
    </Styles>
  );
};
