import CssBaseline from '@mui/material/CssBaseline'; // Material UI CSS baseline for better compatibility

// import logo from './logo.svg';
// import './App.css';
import Timer from './components/Timer';
import Header from './components/UI/Header';
import timers from './shared/timers';
import Grid from '@mui/material/Grid';
import { Fab, ThemeProvider, useMediaQuery } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { createTheme } from '@mui/material';
import { useEffect, useMemo, useState } from 'react';
import AddTimer from './components/UI/AddTimer';
import About from './components/UI/About';
import TimersArray from './interfaces/TimersArray';

function App() {
  const [addTimerOpen, setAddTimerOpen] = useState(false);
  const [aboutOpen, setAboutOpen] = useState(false);
  const [appTimers, setAppTimers] = useState<TimersArray>([]);

  // set the initial value of the timers.
  useEffect(() => {
    setAppTimers(timers);
  }, []);

  const handleAdd = () => {
    setAddTimerOpen(true);
  };

  const handleAbout = () => {
    setAboutOpen(true);
  };

  // automatically set dark mode based on user system preferences
  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');

  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode: prefersDarkMode ? 'dark' : 'light',
        },
      }),
    [prefersDarkMode]
  );

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />

      <Header addTimer={handleAdd} about={handleAbout} />

      <main>
        <Fab
          color="primary"
          aria-label="add"
          sx={{ position: 'absolute', bottom: 16, right: 16 }}
          onClick={handleAdd}
        >
          <AddIcon />
        </Fab>
        <Grid container spacing={2} sx={{ flexGrow: 1, mt: 2 }}>
          <Grid item xs={12}>
            <Grid container justifyContent="center" spacing={4}>
              {appTimers.map((timer, index) => (
                <Grid
                  item
                  // sx={{ backgroundColor: 'green', border: '1px solid black' }}
                  key={index}
                >
                  {
                    <Timer
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
      </main>

      <AddTimer open={addTimerOpen} setOpen={setAddTimerOpen}></AddTimer>
      <About open={aboutOpen} setOpen={setAboutOpen}></About>
    </ThemeProvider>
  );
}

export default App;
