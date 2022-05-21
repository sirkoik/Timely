import {
  startOfWeek,
  endOfWeek,
  startOfMonth,
  endOfMonth,
  startOfYear,
  endOfYear,
  getYear,
} from 'date-fns';

export const defaultTimerFns = {
  startOfWeek: () => startOfWeek(new Date()),
  endOfWeek: () => endOfWeek(new Date()),
  startOfMonth: () => startOfMonth(new Date()),
  endOfMonth: () => endOfMonth(new Date()),
  startOfYear: () => startOfYear(new Date()),
  endOfYear: () => endOfYear(new Date()),
  fourthOfJuly: () => new Date(getYear(new Date()), 6, 4),
  christmasEve: () => new Date(getYear(new Date()), 11, 24),
  christmasDay: () => new Date(getYear(new Date()), 11, 25),
  newYearsDay: () => new Date(getYear(new Date()) + 1, 0, 1),
};
