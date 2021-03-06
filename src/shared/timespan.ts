import TimespanConfig from '../interfaces/TimespanConfig';

// TODO make output array type more specific
export const timespan = (
  date0: Date,
  date1: Date,
  config?: TimespanConfig
): { arr: Array<any>; str: string } => {
  const ts0 = date0.getTime();
  const ts1 = date1.getTime();

  // start with the full timespan and gradually pare it down with modulus division.
  let remainder = ts1 - ts0;

  let outputString = '';
  const outputArr = [];

  if (config?.days === undefined || (config && config.days)) {
    const days = Math.floor(remainder / (86400 * 1000));
    if (days > 0) {
      outputString += ` ${days} days`;
      outputArr.push({ name: 'days', value: days });
      remainder = remainder % (86400 * 1000);
    }
  }

  if (config?.hours === undefined || (config && config.hours)) {
    const hours = Math.floor(remainder / (3600 * 1000));
    if (hours > 0) {
      outputString += ` ${hours} hours`;
      outputArr.push({ name: 'hours', value: hours });
      remainder = remainder % (3600 * 1000);
    }
  }

  if (config?.minutes === undefined || (config && config.minutes)) {
    const minutes = Math.floor(remainder / (60 * 1000));
    if (minutes > 0) {
      outputString += ` ${minutes} minutes`;
      outputArr.push({ name: 'minutes', value: minutes });
      remainder = remainder % (60 * 1000);
    }
  }

  if (config?.seconds === undefined || (config && config.seconds)) {
    // Math.round returns results like "60 seconds" - rounds up.
    // Math.floor implies that a fractional second is zero.
    const seconds = Math.floor(remainder / 1000);
    if (seconds > 0) {
      outputString += ` ${seconds} seconds`;
      outputArr.push({ name: 'seconds', value: seconds });
    }
  }

  return { arr: outputArr, str: outputString };
};
