import {
  useEffect,
  useState,
  useRef,
  useCallback,
  MutableRefObject,
} from 'react';
import { Stack, Typography } from '@mui/material';
import { timespan } from '../shared/timespanDateFns';

// ensure that only strings can be passed as key values
interface DurationKeysTyped extends Duration {
  [key: string]: number | undefined;
}

const TimerOutput = (props: any): JSX.Element => {
  const [timerVal, setTimerVal] = useState<{
    durationObj: DurationKeysTyped;
    str: string;
  }>({
    durationObj: {},
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

  const dur: DurationKeysTyped = timerVal.durationObj;
  // const dur: Duration[index: string] = timerVal.durationObj;

  // dur[key] !== 0 (hide zero-length time elements) can be made into an optional condition.
  return (
    <Stack direction="row" justifyContent="center" spacing={2}>
      {Object.keys(dur).map(
        (key, index) =>
          dur[key] !== 0 && (
            <Stack sx={{ textAlign: 'center' }} key={index}>
              <Typography variant="h5">{dur[key]}</Typography>
              <Typography>{key}</Typography>
            </Stack>
          )
      )}
    </Stack>
  );
};

export default TimerOutput;
