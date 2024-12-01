// import { createRoot } from 'react-dom/client';
import React from 'react';
import ReactDOM from 'react-dom';

const element = React.createElement('h1', { }, 'Hello, world!');
ReactDOM.createRoot(document.getElementById('root')).render(element);