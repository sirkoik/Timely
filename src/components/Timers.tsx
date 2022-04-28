import React, { useContext } from 'react';
import Grid from '@mui/material/Grid';
import { TimersContext } from '../context/TimersContext';
import Timer from './Timer';

const Timers = (): JSX.Element => {
  const timersCtx = useContext(TimersContext);

  return (
    <Grid container spacing={2} sx={{ flexGrow: 1, mt: 2 }}>
      <Grid item xs={12}>
        <Grid container justifyContent="center" spacing={4}>
          {timersCtx.timers.length === 0 && <p>No timers loaded.</p>}
          {timersCtx.timers.map((timer, index) => (
            <Grid
              item
              // sx={{ backgroundColor: 'green', border: '1px solid black' }}
              key={index}
            >
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
