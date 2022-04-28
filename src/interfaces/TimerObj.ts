import TimespanConfig from './TimespanConfig';

export default interface TimerObj {
  id?: number;
  name: string;
  date: Date;
  category: string;
  config?: TimespanConfig;
}
