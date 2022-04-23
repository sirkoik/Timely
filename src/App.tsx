import CssBaseline from '@mui/material/CssBaseline'; // Material UI CSS baseline for better compatibility
import Container from '@mui/material/Container';

// import logo from './logo.svg';
// import './App.css';
import Timer from './components/Timer';
import Header from './components/UI/Header';
import timers from './shared/timers';

function App() {
  return (
    <>
      <CssBaseline />

      <Header />

      <main>
        <Container>
          {timers.map((timer, index) => (
            <Timer
              name={timer.name}
              t1={timer.date}
              category={timer.category}
              key={index}
              config={timer.config}
            />
          ))}
        </Container>
      </main>
    </>
  );
}

export default App;
