import React from 'react';
import styled from 'styled-components';

const Styles = styled.div`
  .footer {
    position: relative;
    bottom: 0;
    width: 100%;
    height: 2.5rem;
  }
`;
export const Footer = () => {
  return (
    <Styles>
      <footer className="mt-4">
        <div className="footer">
          &copy; TheMovement {new Date().getFullYear()}
        </div>
      </footer>
    </Styles>
  );
};
