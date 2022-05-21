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
    <Grid container spacing={0} sx={{ flexGrow: 1, mt: 8, p: 4 }}>
      <Grid container justifyContent="left" spacing={4}>
        {timersCtx.timers.length === 0 && <p>No timers loaded.</p>}
        {timersCtx.timers.map((timer, index) => (
          <Grid item key={index} xs={12} sm={6} lg={4} xl={3}>
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
  );
};

export default Timers;
