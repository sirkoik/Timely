import { MutableRefObject, useEffect, useRef, useState } from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Container from '@mui/material/Container';
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
    <Card
      sx={{ display: 'inline-flex', justifyContent: 'center', m: 0.5 }}
      variant="outlined"
    >
      <CardContent>
        <Typography variant="h5">{name}</Typography>
        <Container sx={{ display: 'flex', justifyContent: 'space-evenly' }}>
          {timerValue.arr.map((item) => (
            <Container>
              <Typography variant="h5" sx={{ textAlign: 'center' }}>
                {item.value}
              </Typography>
              <Typography>{item.name}</Typography>
            </Container>
          ))}
        </Container>
        <Typography variant="h6">{category}</Typography>
      </CardContent>
    </Card>
  );
};

export default Timer;
