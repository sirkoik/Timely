import TimespanConfig from '../interfaces/TimespanConfig';
import { formatDuration, intervalToDuration } from 'date-fns';

export const timespan = (
  date0: Date,
  date1: Date,
  config?: TimespanConfig
): { durationObj: Duration; str: string } => {
  const duration = intervalToDuration({ start: date0, end: date1 });

  return {
    durationObj: duration,
    str: formatDuration(duration),
  };
};
