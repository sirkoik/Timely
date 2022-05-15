import React, { useContext, useState, useEffect } from 'react';
import Grid from '@mui/material/Grid';
import { TimersContext } from '../context/TimersContext';
import Timer from './Timer';

const Timers = (): JSX.Element => {
  const timersCtx = useContext(TimersContext);
  const [refresh, setRefresh] = useState<number>(0);

  // refresh all timers (Timers and all child components) by updating the state on an the interval `tick`
  const tick = 1000;
  useEffect(() => {
    const timer = setInterval(() => {
      setRefresh((prev) => prev + 1);
    }, tick);

    return () => {
      clearInterval(timer);
    };
  }, []);

  return (
    <Grid container spacing={2} sx={{ flexGrow: 1, mt: 2 }}>
      <Grid item xs={12}>
        <Grid container justifyContent="center" spacing={4}>
          {timersCtx.timers.length === 0 && <p>No timers loaded.</p>}
          {timersCtx.timers.map((timer, index) => (
            <Grid item key={index}>
              {
                <Timer
                  id={timer.id}
                  name={timer.name}
                  t1={timer.date}
                  category={timer.category}
                  config={timer.config}
                />
              }
            </Grid>
          ))}
        </Grid>
      </Grid>
    </Grid>
  );
};

export default Timers;
