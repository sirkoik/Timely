export const timespan = (date0: Date, date1: Date, config?: any): string => {
  const ts0 = date0.getTime();
  const ts1 = date1.getTime();

  let remainder = ts1 - ts0;

  // number of days
  let outputString = '';

  if (!config || (config && config.days)) {
    const days = Math.floor(remainder / (86400 * 1000));
    if (days > 0) {
      outputString += ` ${days} days`;
      remainder = remainder % (86400 * 1000);
    }
  }

  console.log('remainder', remainder);

  if (!config || (config && config.hours)) {
    const hours = Math.floor(remainder / (3600 * 1000));
    if (hours > 0) {
      outputString += ` ${hours} hours`;
      remainder = remainder % (3600 * 1000);
    }
  }

  if (!config || (config && config.minutes)) {
    const minutes = Math.floor(remainder / (60 * 1000));
    if (minutes > 0) {
      outputString += ` ${minutes} minutes`;
      remainder = remainder % (60 * 1000);
    }
  }

  if (!config || (config && config.seconds)) {
    const seconds = remainder / 1000;
    if (seconds > 0) {
      outputString += ` ${seconds} seconds`;
    }
  }

  return outputString;
};
