import TimersArray from '../interfaces/TimersArray';

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
    date: new Date('May 31 2022 11:59:59 PM'),
    category: 'Numerical dates',
  },
  {
    name: 'Fourth of July',
    date: new Date('Jul 4 2022'),
    category: 'Holidays',
  },
];

export default timers;
