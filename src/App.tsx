import React from 'react';
import logo from './logo.svg';

import { Counter } from './features/counter/Counter';
import './App.css';
import RenderInput from './RenderInput';
import FrameworkList, { Framwwork } from './FrameworkList';
import MockServer from './MockServer';
import Redux from './Redux';

const outputConsole = (value: string) => {
  console.log(value);
};

const framwworks: Framwwork[] = [
  { id: 0, item: 'React' },
  { id: 1, item: 'Angular' },
  { id: 2, item: 'Vue' },
];

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <Counter />
        <RenderInput outputConsole={outputConsole} />
        <FrameworkList frameworks={framwworks} />
        <MockServer />
        <Redux />

        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <span>
          <span>Learn </span>
          <a
            className="App-link"
            href="https://reactjs.org/"
            target="_blank"
            rel="noopener noreferrer"
          >
            React
          </a>
          <span>, </span>
          <a
            className="App-link"
            href="https://redux.js.org/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Redux
          </a>
          <span>, </span>
          <a
            className="App-link"
            href="https://redux-toolkit.js.org/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Redux Toolkit
          </a>
          ,<span> and </span>
          <a
            className="App-link"
            href="https://react-redux.js.org/"
            target="_blank"
            rel="noopener noreferrer"
          >
            React Redux
          </a>
        </span>
      </header>
    </div>
  );
}

export default App;
