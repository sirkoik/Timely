import { Stack, Typography } from '@mui/material';
import { timespan } from '../shared/timespan';

const TimerOutput = (props: any): JSX.Element => {
  const timerValue = timespan(new Date(), props.t1, props.config);

  return (
    <Stack direction="row" justifyContent="center" spacing={2}>
      {timerValue.arr.map((item, index) => (
        <Stack sx={{ textAlign: 'center' }} key={index}>
          <Typography variant="h5">{item.value}</Typography>
          <Typography>{item.name}</Typography>
        </Stack>
      ))}
    </Stack>
  );
};

export default TimerOutput;
