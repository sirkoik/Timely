import CssBaseline from '@mui/material/CssBaseline'; // Material UI CSS baseline for better compatibility

// import logo from './logo.svg';
// import './App.css';
import Timer from './components/Timer';
import Header from './components/UI/Header';
import timers from './shared/timers';
import Grid from '@mui/material/Grid';
import { ThemeProvider, useMediaQuery } from '@mui/material';
import { createTheme } from '@mui/material';
import { useMemo } from 'react';

function App() {
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

      <Header />

      <main>
        <Grid container spacing={2} sx={{ flexGrow: 1, mt: 2 }}>
          <Grid item xs={12}>
            <Grid container justifyContent="center" spacing={4}>
              {timers.map((timer, index) => (
                <Grid
                  item
                  // sx={{ backgroundColor: 'green', border: '1px solid black' }}
                  spacing={2}
                >
                  {
                    <Timer
                      name={timer.name}
                      t1={timer.date}
                      category={timer.category}
                      key={index}
                      config={timer.config}
                    />
                  }
                </Grid>
              ))}
            </Grid>
          </Grid>
        </Grid>
      </main>
    </ThemeProvider>
  );
}

export default App;
