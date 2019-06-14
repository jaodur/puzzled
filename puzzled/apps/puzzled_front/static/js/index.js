import React from 'react';
import ReactDom from 'react-dom';

function Hello(props) {
    return <h1>Hey, {props.name}</h1>;

}

const element = <Hello name="test" />;

ReactDom.render(
    element,
    document.getElementById('react')
);