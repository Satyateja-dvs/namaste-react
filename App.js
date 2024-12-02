// import { createRoot } from 'react-dom/client';
import React from 'react';
import ReactDOM from 'react-dom';

const element = React.createElement('h1', { style: { color: "red" } }, 'Hello, world');
console.log(element);

const JSXElement = (
  <>
    <h1>JSX Element</h1>
    <p>Test</p>
  </>
)

const HomePage = () => {
  const [data, setData] = React.useState('');

  const validateData = () => {
    setData("Data is valid");
  }

  return (
    <div>
      <input placeholder='Input Your Name'/>
      <button onClick={validateData}>Submit</button>
      <div className='hello'>
        {data}
      </div>
    </div>
  )
}

const root = document.getElementById('root');
ReactDOM.render(<HomePage />, root);