import { createContext, useEffect, useState } from 'react';
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
  populateTimers: (timers: TimersArray): void => {},
  addTimer: ({ name, date, category, config }: formatAddTimerProps): void => {},
  updateTimer: (id: number, updatedTimer: TimerObj): void => {},
  deleteTimer: (timerId: number | undefined): void => {},
  editId: 0 as number | undefined,
  setEditId: 0 as any, // TODO more specific type here
  addTimerOpen: false,
  setAddTimerOpen: 0 as any,
});

const TimersProvider = (props: any) => {
  const [timers, setTimers] = useState<TimersArray>([]);

  const [editId, setEditId] = useState<number | undefined>(undefined);
  const [addTimerOpen, setAddTimerOpen] = useState(false);

  useEffect(() => {
    console.log('Timers updated in context.', new Date().getTime(), timers);
  }, [timers]);

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

  // edit a timer.
  const updateTimer = (id: number, updatedTimer: TimerObj): void => {
    const newTimers = [...timers];
    const index = newTimers.findIndex((timer) => timer.id === id);
    newTimers[index] = updatedTimer;

    console.log('updating timers.');
    setTimers(newTimers);
  };

  // populate the list of timers with an input value
  const populateTimers = (timers: TimersArray): void => {
    console.log('populating timers.');
    setTimers(timers);
  };

  // delete a timer with a given id from the list of timers
  const deleteTimer = (timerId: number | undefined): void => {
    const newTimers = timers.filter((timer) => timer.id !== timerId);
    console.log('timer deleted. new timers', newTimers);
    setTimers(newTimers);
  };

  return (
    <TimersContext.Provider
      value={{
        timers,
        populateTimers,
        addTimer,
        updateTimer,
        deleteTimer,
        editId,
        setEditId,
        addTimerOpen,
        setAddTimerOpen,
      }}
    >
      {props.children}
    </TimersContext.Provider>
  );
};

export { TimersContext, TimersProvider };
