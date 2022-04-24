import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
  Container,
} from '@mui/material';

interface FormatAddTimerProps {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const About = ({ open, setOpen }: FormatAddTimerProps): JSX.Element => {
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Dialog open={open}>
      <DialogTitle>About</DialogTitle>
      <DialogContent>
        <DialogContentText variant="h2" align="center">
          Timely
        </DialogContentText>
        <DialogContentText align="right">v1</DialogContentText>
        <DialogContentText sx={{ mt: 2 }}>
          By Alexander Koik-Cestone
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Close</Button>
      </DialogActions>
    </Dialog>
  );
};

export default About;
