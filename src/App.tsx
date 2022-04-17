import CssBaseline from '@mui/material/CssBaseline'; // Material UI CSS baseline for better compatibility

import React from 'react';
// import logo from './logo.svg';
// import './App.css';
import Timer from './components/Timer';
import Header from './components/UI/Header';
import timers from './shared/timers';

function App() {
  return (
    <>
      <CssBaseline />
      <header className="App-header">
        <Header />
      </header>
      <main>
        {timers.map((timer, index) => (
          <Timer
            name={timer.name}
            t1={timer.date}
            key={index}
            config={timer.config}
          />
        ))}
      </main>
    </>
  );
}

export default App;
