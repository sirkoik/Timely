import TimersArray from '../interfaces/TimersArray';
import { defaultTimerFns } from './defaultTimerFns';

const timers: TimersArray = [
  {
    name: 'End of year',
    date: defaultTimerFns.endOfYear(),
    category: 'Numerical dates',
    config: {
      seconds: false,
    },
  },
  {
    name: 'End of month',
    date: defaultTimerFns.endOfMonth(),
    category: 'Numerical dates',
  },
  {
    name: 'Fourth of July',
    date: defaultTimerFns.fourthOfJuly(),
    category: 'Holidays',
  },
  {
    name: 'Christmas Day',
    date: defaultTimerFns.christmasDay(),
    category: 'Holidays',
  },
];

export default timers;
