import React, { useContext, useEffect, useState } from 'react';
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
import { TimersContext } from '../../context/TimersContext';

const categories = ['Custom date', 'Numerical dates', 'Holidays'];
interface AddTimerForm {
  id: number | undefined;
  name: string;
  date: Date;
  category: string;
}

interface FormatAddTimerProps {
  id?: number | undefined;
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

// need to set state for id when adding.
const AddTimer = ({ open, setOpen }: FormatAddTimerProps): JSX.Element => {
  const [formValues, setFormValues] = useState<AddTimerForm>({
    id: undefined,
    name: '',
    date: new Date(),
    category: '',
  });

  const timersCtx = useContext(TimersContext);
  const id = timersCtx.editId; // TODO make this stateful in the component?

  useEffect(() => {
    if (id !== undefined) {
      const timerLookup = timersCtx.timers.find((timer) => timer.id === id);
      console.log(timerLookup);

      setFormValues({
        id: id,
        name: timerLookup?.name || '',
        date: timerLookup?.date || new Date(),
        category: timerLookup?.category || '',
      });
    }
  }, [id, timersCtx.timers]);

  const inputChangeHandler = (event: React.FormEvent<EventTarget>): void => {
    const { id, value } = event.target as HTMLInputElement;

    const newValue: string | Date = id === 'date' ? new Date(value) : value;

    setFormValues({ ...formValues, [id]: newValue });
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
    if (id === undefined) {
      timersCtx.addTimer(formValues);
    } else {
      timersCtx.updateTimer(id, formValues);
    }

    console.log('here are the final form values', formValues);
    setOpen(false);
  };

  const handleClose = (): void => {
    setOpen(false);
  };

  // convert JS Date to a format that is compatible with the datetime-local form input field
  // https://stackoverflow.com/a/66558369/5511776
  const datetimeLocalFormDate = new Date(
    formValues.date.getTime() - formValues.date.getTimezoneOffset() * 60000
  )
    .toISOString()
    .slice(0, -1);

  return (
    <Dialog open={open}>
      <DialogTitle>{id !== undefined ? 'Edit Timer' : 'Add Timer'}</DialogTitle>
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
          value={formValues.name}
        ></TextField>
        <TextField
          id="date"
          required
          label="Timer date and time (required)"
          type="datetime-local"
          margin="dense"
          onChange={inputChangeHandler}
          fullWidth
          value={datetimeLocalFormDate}
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
          value={formValues.category}
          renderInput={(params) => <TextField {...params} label="Category" />}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="secondary">
          Cancel
        </Button>
        <Button onClick={handleAdd} color="primary" type="submit">
          {id !== undefined ? 'Confirm changes' : 'Add timer'}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddTimer;
