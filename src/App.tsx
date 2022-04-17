import React, { MutableRefObject, useEffect, useRef, useState } from 'react';
// import logo from './logo.svg';
import './App.css';
import { timespan } from './shared/timespan';

const refreshTimespan = () => timespan(new Date(), new Date('Jan 1 2023'));

function App() {
  const [timer, setTimer] = useState(refreshTimespan());

  const requestRef: MutableRefObject<any> | undefined = useRef();
  const prevTimeRef = useRef(0);
  const intervalRef = useRef(0);

  const animate = (time: any) => {
    if (prevTimeRef.current !== undefined) {
      // const dt = time - prevTimeRef.current;
      const db = time - intervalRef.current;

      if (db >= 100) {
        intervalRef.current = time;
        setTimer(refreshTimespan());
      }
    }

    prevTimeRef.current = time;
    requestRef.current = requestAnimationFrame(animate);
  };

  useEffect(() => {
    requestRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(requestRef.current);
  }, []);

  return (
    <div className="App">
      <header className="App-header">{timer}</header>
      <main></main>
    </div>
  );
}

export default App;
