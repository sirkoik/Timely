import {
  Box,
  Button,
  DialogActions,
  DialogContent,
  DialogContentText,
  Tab,
  Tabs,
  TextField,
} from '@mui/material';
import DialogWrapper from './DialogWrapper';
import { useState } from 'react';
import TabPanel from './TabPanel';

interface AuthProps {
  open: boolean;
  setOpen: any;
}

interface AuthForm {
  username: string;
  password: string;
  passwordConfirm?: string;
  existing: boolean;
}

const emptyAuthForm = {
  username: '',
  password: '',
  passwordConfirm: '',
  existing: true,
};

const Auth = ({ open, setOpen }: AuthProps): JSX.Element => {
  const [tabValue, setTabValue] = useState<number>(0);
  const [formValues, setFormValues] = useState<AuthForm>(emptyAuthForm);

  // handle changes for input values.
  // updates state when fields update.
  const inputChangeHandler = (event: React.FormEvent<EventTarget>): void => {
    const { id, value } = event.target as HTMLInputElement;

    let prop = id;

    if (id === 'username-new') {
      prop = 'username';
    }

    if (id === 'password-new') {
      prop = 'password';
    }

    if (id === 'password-confirm-new') {
      prop = 'passwordConfirm';
    }
    setFormValues({ ...formValues, [prop]: value });
  };

  const handleTabsChange = (
    event: React.SyntheticEvent,
    newTabValue: number
  ) => {
    setTabValue(newTabValue);
  };

  // accessible props
  const a11yProps = (index: number) => {
    return {
      id: `simple-tab-${index}`,
      'aria-controls': `simple-tabpanel-${'index'}`,
    };
  };

  const handleLogin = (event: React.SyntheticEvent) => {
    if (formValues.username === '' || formValues.password === '') {
      alert('Please enter a username and password.');
      return false;
    }

    alert(
      `Logging in existing user. ${formValues.username} ${formValues.password}`
    );
    setOpen(false);
    setFormValues(emptyAuthForm);
  };

  const handleSignup = (event: React.SyntheticEvent) => {
    if (formValues.password !== formValues.passwordConfirm) {
      alert(
        `${formValues.password} ${formValues.passwordConfirm} - Password and confirm password values should match.`
      );
      return false;
    }

    alert(
      `Signing up new user. ${formValues.username} ${formValues.password} ${formValues.passwordConfirm}`
    );
    setOpen(false);
    setFormValues(emptyAuthForm);
  };

  return (
    <DialogWrapper title="Login" open={open}>
      <DialogContent>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Tabs
            aria-label="existing or new user login selection"
            value={tabValue}
            onChange={handleTabsChange}
          >
            <Tab label="Existing user" {...a11yProps(0)} />
            <Tab label="New user" {...a11yProps(1)} />
          </Tabs>
        </Box>

        <TabPanel value={tabValue} index={0}>
          <DialogContentText>
            Please enter your username and password.
          </DialogContentText>
          <TextField
            id="username"
            type="text"
            required
            label="username"
            margin="dense"
            onChange={inputChangeHandler}
            value={formValues.username}
            fullWidth
          />
          <TextField
            id="password"
            type="password"
            required
            label="password"
            margin="dense"
            onChange={inputChangeHandler}
            value={formValues.password}
            fullWidth
          />
          <DialogActions>
            <Button
              onClick={() => setOpen((prev: boolean) => !prev)}
              color="secondary"
              type="button"
            >
              Close
            </Button>
            <Button onClick={handleLogin} color="primary" type="submit">
              Login
            </Button>
          </DialogActions>
        </TabPanel>

        <TabPanel value={tabValue} index={1}>
          <DialogContentText>
            Please enter a username and password to sign up.
          </DialogContentText>
          <TextField
            id="username-new"
            type="text"
            required
            label="username"
            margin="dense"
            onChange={inputChangeHandler}
            value={formValues.username}
            fullWidth
          />
          <TextField
            id="password-new"
            type="password"
            required
            label="password"
            onChange={inputChangeHandler}
            value={formValues.password}
            margin="dense"
            fullWidth
          />
          <TextField
            id="password-confirm-new"
            type="password"
            required
            label="confirm password"
            onChange={inputChangeHandler}
            value={formValues.passwordConfirm}
            margin="dense"
            fullWidth
          />
          <DialogActions>
            <Button
              onClick={() => setOpen((prev: boolean) => !prev)}
              color="secondary"
              type="button"
            >
              Close
            </Button>
            <Button onClick={handleSignup} color="primary" type="submit">
              Sign up
            </Button>
          </DialogActions>
        </TabPanel>
      </DialogContent>
    </DialogWrapper>
  );
};

export default Auth;
