import { TimespanConfig } from '../interfaces/TimespanConfig';

interface TimersObj {
  name: string;
  date: Date;
  category: string;
  config?: TimespanConfig;
}

interface TimersArray extends Array<TimersObj> {
  [index: number]: TimersObj;
}

const timers: TimersArray = [
  {
    name: 'End of year',
    date: new Date('Jan 1 2023'),
    category: 'Numerical dates',
    config: {
      seconds: false,
    },
  },
  {
    name: 'End of month',
    date: new Date('Apr 30 2022'),
    category: 'Numerical dates',
  },
  {
    name: 'Fourth of July',
    date: new Date('Jul 4 2022'),
    category: 'Holidays',
  },
];

export default timers;
