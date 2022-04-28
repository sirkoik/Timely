import { useContext, useEffect, useMemo, useState } from 'react';
import CssBaseline from '@mui/material/CssBaseline'; // Material UI CSS baseline for better compatibility
import { createTheme, Fab, ThemeProvider, useMediaQuery } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import AddTimer from './components/UI/AddTimer';
import { TimersContext } from './context/TimersContext';
import { default as originalTimersList } from './shared/timers';
import Header from './components/UI/Header';
import Timers from './components/Timers';
import About from './components/UI/About';

function App() {
  const [aboutOpen, setAboutOpen] = useState<boolean>(false);

  const timersCtx = useContext(TimersContext);

  // set the initial value of the timers.
  // TODO including timersCtx in the dependency array results in the timers list being repopulated from the original list when it shouldn't.
  useEffect(() => {
    // add an id to each object manually (for now).
    originalTimersList.forEach((timer, index) => (timer.id = index));
    timersCtx.populateTimers(originalTimersList);
  }, []);

  // add a new timer
  const handleAdd = () => {
    timersCtx.setEditId(undefined);
    timersCtx.setAddTimerOpen(true);
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
        {/* TODO refactor this main action button into MainAction */}
        <Fab
          color="primary"
          aria-label="add"
          sx={{ position: 'absolute', bottom: 16, right: 16 }}
          onClick={handleAdd}
        >
          <AddIcon />
        </Fab>

        <Timers />
      </main>

      <AddTimer
        open={timersCtx.addTimerOpen}
        setOpen={timersCtx.setAddTimerOpen}
      ></AddTimer>
      <About open={aboutOpen} setOpen={setAboutOpen}></About>
    </ThemeProvider>
  );
}

export default App;
