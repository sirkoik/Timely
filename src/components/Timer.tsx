import { MutableRefObject, useEffect, useRef, useState } from 'react';
import { Paper, Stack, Typography } from '@mui/material';
import { timespan } from '../shared/timespan';
import { TimespanConfig } from '../interfaces/TimespanConfig';

interface FormatDateProps {
  t1: Date;
  name: string;
  category: string;
  config?: TimespanConfig;
}

const timesp = (t1: Date, config?: TimespanConfig) =>
  timespan(new Date(), t1, config);

const Timer = ({
  t1,
  name,
  category,
  config,
}: FormatDateProps): JSX.Element => {
  const [timerValue, setTimerValue] = useState(timesp(t1, config));

  const requestRef: MutableRefObject<any> | undefined = useRef();
  const prevTimeRef = useRef(0);
  const intervalRef = useRef(0);

  const animate = (time: any) => {
    if (prevTimeRef.current !== undefined) {
      // const dt = time - prevTimeRef.current;
      const db = time - intervalRef.current;

      if (db >= 100) {
        intervalRef.current = time;
        setTimerValue(timesp(t1, config));
      }
    }

    prevTimeRef.current = time;
    requestRef.current = requestAnimationFrame(animate);
  };

  useEffect(() => {
    requestRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(requestRef.current);
  }, []);

  return (
    <Paper elevation={2} sx={{ p: 1, pb: 0 }}>
      <Typography variant="h5">{name}</Typography>
      <Stack
        direction="row"
        justifyContent="center"
        spacing={2}
        // sx={{ border: '1px solid white' }}
      >
        {timerValue.arr.map((item, index) => (
          <Stack sx={{ textAlign: 'center' }}>
            <Typography variant="h5">{item.value}</Typography>
            <Typography>{item.name}</Typography>
          </Stack>
        ))}
      </Stack>
      <Typography
        variant="h6"
        sx={{ textAlign: 'right', mt: 2, color: 'text.secondary' }}
      >
        {category}
      </Typography>
    </Paper>
  );
};

export default Timer;
