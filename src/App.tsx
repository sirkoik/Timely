import React from 'react';
import logo from './logo.svg';
import './App.css';
import { timespan } from './shared/timespan';

function App() {
  const timeTillEndOfYear = timespan(new Date(), new Date('Jan 1 2023'));

  return (
    <div className="App">
      <header className="App-header">{timeTillEndOfYear}</header>
      <main></main>
    </div>
  );
}

export default App;
