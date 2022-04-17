import { CssBaseline } from '@mui/material'; // Material UI CSS baseline for better compatibility
import Button from '@mui/material/Button';
import React from 'react';
// import logo from './logo.svg';
import './App.css';
import Timer from './components/Timer';
import timers from './shared/timers';

function App() {
  return (
    <>
      <CssBaseline />
      <div className="App">
        <header className="App-header">
          {timers.map((timer, index) => (
            <Timer
              name={timer.name}
              t1={timer.date}
              key={index}
              config={timer.config}
            />
          ))}
        </header>
        <main></main>
      </div>
    </>
  );
}

export default App;
