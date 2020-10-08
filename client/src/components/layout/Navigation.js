import React from 'react';
import { Navbar } from 'react-bootstrap';
import styled from 'styled-components';
import rights from '../../assets/rights.jpg';

const Styles = styled.div`
  .navbar {
    background-color: white;
    text-align: left;
  }

  .photo {
    height: 40px;
    width: 40px;
    margin-bottom: 1.5rem;
  }

  .navbar-brand,
  .navbar-nav .nav-link {
    color: black;

    &:hover {
      color: grey;
    }
  }
`;

/* Navigation Bar */
export const Navigation = () => {
  return (
    <Styles>
      <Navbar>
        <Navbar.Brand>
          <img src={rights} className="photo" alt="" />
          <span className="h1" variant="secondary">
            TheMovement
          </span>
        </Navbar.Brand>
      </Navbar>
    </Styles>
  );
};
