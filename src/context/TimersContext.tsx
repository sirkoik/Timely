import { createContext, Dispatch, SetStateAction, useState } from 'react';
import TimerObj from '../interfaces/TimerObj';
import TimersArray from '../interfaces/TimersArray';
import TimespanConfig from '../interfaces/TimespanConfig';

interface formatAddTimerProps {
  name: string;
  date: Date;
  category: string;
  config?: TimespanConfig;
}

const TimersContext = createContext({
  timers: [] as TimersArray,
  addTimer: ({ name, date, category, config }: formatAddTimerProps): void => {},
  populateTimers: (timers: TimersArray): void => {},
});

const TimersProvider = (props: any) => {
  const [timers, setTimers] = useState<TimersArray>([]);

  // add a timer to the TimersArray.
  const addTimer = ({
    name,
    date,
    category,
    config,
  }: formatAddTimerProps): void => {
    const newTimer: TimerObj = {
      name: name,
      date: date,
      category: category,
      config: config,
    };

    setTimers([...timers, newTimer]);
  };

  const populateTimers = (timers: TimersArray): void => {
    setTimers(timers);
  };

  return (
    <TimersContext.Provider value={{ timers, addTimer, populateTimers }}>
      {props.children}
    </TimersContext.Provider>
  );
};

export { TimersContext, TimersProvider };
