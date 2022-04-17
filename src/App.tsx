import React from 'react';
// import logo from './logo.svg';
import './App.css';
import Timer from './components/Timer';
import timers from './shared/timers';

function App() {
  return (
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
  );
}

export default App;
