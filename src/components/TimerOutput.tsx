import {
  useEffect,
  useState,
  useRef,
  useCallback,
  MutableRefObject,
} from 'react';
import { Stack, Typography } from '@mui/material';
import { timespan } from '../shared/timespan';

const TimerOutput = (props: any): JSX.Element => {
  const [timerVal, setTimerVal] = useState<{ arr: any[]; str: string }>({
    arr: [],
    str: '',
  });

  // refresh timer out on an interval `tick` with requestAnimationFrame.
  // the animate function is dependent on props.t1. This way it gets the
  // right t1 when the state changes (i.e., a timer is deleted).

  const requestRef: MutableRefObject<number> = useRef(0);
  const prevTimeRef: MutableRefObject<number> = useRef(0);
  const tick = 500;

  const animate = useCallback(
    (time: number) => {
      const deltaTime = time - prevTimeRef.current;

      if (deltaTime >= tick) {
        const timerValue = timespan(new Date(), props.t1, props.config);
        setTimerVal(timerValue);

        prevTimeRef.current = time;
      }

      requestRef.current = requestAnimationFrame(animate);
    },
    [props.config, props.t1]
  );

  useEffect(() => {
    requestRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(requestRef.current);
  }, [animate]);

  // this works.
  // useEffect(() => {
  //   const timeout = setInterval(() => {
  //     const timerValue = timespan(new Date(), props.t1, props.config);
  //     setTimerVal(timerValue);
  //   }, 1000);

  //   return () => clearInterval(timeout);
  // }, [props.t1, props.config]);

  // console.log('TimerOutput updated', timerVal);

  return (
    <Stack direction="row" justifyContent="center" spacing={2}>
      {timerVal.arr.map((item, index) => (
        <Stack sx={{ textAlign: 'center' }} key={index}>
          <Typography variant="h5">{item.value}</Typography>
          <Typography>{item.name}</Typography>
        </Stack>
      ))}
    </Stack>
  );
};

export default TimerOutput;
