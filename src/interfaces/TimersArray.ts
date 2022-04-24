import TimerObj from './TimerObj';

export default interface TimersArray extends Array<TimerObj> {
  [index: number]: TimerObj;
}
