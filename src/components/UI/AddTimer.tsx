import React, { useState } from 'react';
import {
  Autocomplete,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField,
} from '@mui/material';
import { addTimer } from '../../models/timer';

const categories = ['Custom date', 'Numerical dates', 'Holidays'];

// note that date is stored as a string
interface AddTimerForm {
  name: string;
  date: string;
  category: string;
}

interface FormatAddTimerProps {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const AddTimer = ({ open, setOpen }: FormatAddTimerProps): JSX.Element => {
  const [formValues, setFormValues] = useState<AddTimerForm>({
    name: '',
    date: '',
    category: '',
  });

  const inputChangeHandler = (event: React.FormEvent<EventTarget>): void => {
    const { id, value } = event.target as HTMLInputElement;
    console.log(formValues);
    setFormValues({ ...formValues, [id]: value });
  };

  // autoComplete requires the value prop and is triggered by onInputChange
  // https://stackoverflow.com/questions/58666189/getting-the-value-in-the-react-material-ui-autocomplete
  const acChangeHandler = (
    event: React.FormEvent<EventTarget>,
    value: string | null
  ): void => {
    if (typeof value === 'string') {
      setFormValues({ ...formValues, category: value });
    }
  };

  const handleAdd = (): void => {
    // addTimer();
    console.log('here are the final form values', formValues);
    setOpen(false);
  };

  const handleClose = (): void => {
    setOpen(false);
  };

  return (
    <Dialog open={open}>
      <DialogTitle>Add Timer</DialogTitle>
      <DialogContent>
        <DialogContentText>
          To add a timer, provide a name and choose the time and date you want
          to count to.
        </DialogContentText>
        <TextField
          autoFocus
          id="name"
          required
          label="Timer name (required)"
          type="text"
          margin="dense"
          onChange={inputChangeHandler}
          fullWidth
        ></TextField>
        <TextField
          id="date"
          required
          label="Timer date and time (required)"
          type="datetime-local"
          margin="dense"
          onChange={inputChangeHandler}
          fullWidth
        ></TextField>
        <Autocomplete
          id="category"
          options={categories}
          handleHomeEndKeys
          disablePortal
          freeSolo
          onChange={acChangeHandler}
          onInputChange={acChangeHandler}
          sx={{ mt: 1 }}
          renderInput={(params) => <TextField {...params} label="Category" />}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="secondary">
          Cancel
        </Button>
        <Button onClick={handleAdd} color="primary" type="submit">
          Add timer
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddTimer;
