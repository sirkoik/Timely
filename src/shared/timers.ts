import { TimespanConfig } from '../interfaces/TimespanConfig';

interface TimersObj {
  name: string;
  date: Date;
  config?: TimespanConfig;
}

interface TimersArray extends Array<TimersObj> {
  [index: number]: TimersObj;
}

const timers: TimersArray = [
  {
    name: 'End of year',
    date: new Date('Jan 1 2023'),
    config: {
      seconds: false,
    },
  },
  {
    name: 'End of month',
    date: new Date('Apr 30 2022'),
  },
];

export default timers;
