import React, { MutableRefObject, useEffect, useRef, useState } from 'react';
import { timespan } from '../shared/timespan';
import { TimespanConfig } from '../interfaces/TimespanConfig';

interface FormatDateProps {
  t1: Date;
  name: string;
  config?: TimespanConfig;
}

const refreshTimespan = (t1: Date, config?: TimespanConfig) =>
  timespan(new Date(), t1, config);

const Timer = ({ t1, name, config }: FormatDateProps): JSX.Element => {
  const [timerValue, setTimerValue] = useState(refreshTimespan(t1, config));

  const requestRef: MutableRefObject<any> | undefined = useRef();
  const prevTimeRef = useRef(0);
  const intervalRef = useRef(0);

  const animate = (time: any) => {
    if (prevTimeRef.current !== undefined) {
      // const dt = time - prevTimeRef.current;
      const db = time - intervalRef.current;

      if (db >= 100) {
        intervalRef.current = time;
        setTimerValue(refreshTimespan(t1, config));
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
    <div>
      {name}: {timerValue}
    </div>
  );
};

export default Timer;
