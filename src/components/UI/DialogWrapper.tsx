import { Dialog, DialogTitle } from '@mui/material';

interface DialogProps {
  title: string;
  open: any;
  children?: React.ReactNode;
}

// title: title of the dialog.
// open: state variable determining whether the dialog is open or not.
// children: JSX children of the component.

const DialogWrapper = ({ title, open, children }: DialogProps): JSX.Element => {
  return (
    <Dialog open={open}>
      <DialogTitle>{title}</DialogTitle>
      {children}
    </Dialog>
  );
};

export default DialogWrapper;
