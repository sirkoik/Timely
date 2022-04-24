import { MutableRefObject, useEffect, useRef, useState } from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';

import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import { timespan } from '../shared/timespan';
import { TimespanConfig } from '../interfaces/TimespanConfig';
import Typography from '@mui/material/Typography';

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
      <Stack direction="row" spacing={2}>
        {timerValue.arr.map((item) => (
          <Stack>
            <Typography variant="h5" sx={{ textAlign: 'center' }}>
              {item.value}
            </Typography>
            <Typography sx={{ textAlign: 'center' }}>{item.name}</Typography>
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
