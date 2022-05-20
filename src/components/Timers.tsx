import React, {
  useContext,
  useState,
  useEffect,
  useRef,
  MutableRefObject,
} from 'react';
import Grid from '@mui/material/Grid';
import { TimersContext } from '../context/TimersContext';
import Timer from './Timer';

const Timers = (): JSX.Element => {
  const timersCtx = useContext(TimersContext);

  console.log(
    'the entire Timers component has been re-rendered. this may not be performant with a large number of timers.'
  );

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
