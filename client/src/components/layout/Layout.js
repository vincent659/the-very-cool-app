import React from 'react';
import {Container} from 'react-bootstrap';

/* Layout Page that implements Container */
export const Layout = (props) => {
    return (
        <Container>
            {props.children}
        </Container>
    )
}
