import React from 'react';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField,
} from '@mui/material';

interface FormatAddTimerProps {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const AddTimer = ({ open, setOpen }: FormatAddTimerProps): JSX.Element => {
  const handleAdd = () => {
    alert('This is a placeholder for the add timer code.');
    setOpen(false);
  };

  const handleClose = () => {
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
          fullWidth
        ></TextField>
        <TextField
          id="date"
          required
          label="Timer date and time (required)"
          type="datetime-local"
          margin="dense"
          fullWidth
        ></TextField>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <Button onClick={handleAdd}>Add timer</Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddTimer;
