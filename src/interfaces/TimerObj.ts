import TimespanConfig from './TimespanConfig';

export default interface TimerObj {
  name: string;
  date: Date;
  category: string;
  config?: TimespanConfig;
}
