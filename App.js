// import { createRoot } from 'react-dom/client';
import React from 'react';
import ReactDOM from 'react-dom';

const element = React.createElement('h1', {style: {color: "red"}}, 'Hello, world');
console.log(element);

const JSXElement = (
    <>
        <h1>JSX Element</h1>
        <p>Test</p>
    </>
)
// JSX Element => React.createElement => Object => HTML Element

console.log(JSXElement);
ReactDOM.createRoot(document.getElementById('root')).render(JSXElement);