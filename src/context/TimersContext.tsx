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
  deleteTimer: (timerId: number | undefined): void => {},
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

  // populate the list of timers with an input value
  const populateTimers = (timers: TimersArray): void => {
    setTimers(timers);
  };

  // delete a timer with a given id from the list of timers
  const deleteTimer = (timerId: number | undefined): void => {
    const newTimers = timers.filter((timer) => timer.id !== timerId);
    setTimers(newTimers);
  };

  return (
    <TimersContext.Provider
      value={{ timers, addTimer, populateTimers, deleteTimer }}
    >
      {props.children}
    </TimersContext.Provider>
  );
};

export { TimersContext, TimersProvider };
