import React, {
  MutableRefObject,
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react';
import {
  Card,
  CardHeader,
  CardContent,
  Stack,
  Typography,
  IconButton,
  Menu,
  MenuItem,
  ListItemIcon,
  ListItemText,
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { timespan } from '../shared/timespan';
import TimespanConfig from '../interfaces/TimespanConfig';
import { TimersContext } from '../context/TimersContext';

interface FormatDateProps {
  id: number | undefined;
  t1: Date;
  name: string;
  category: string;
  config?: TimespanConfig;
}

const timesp = (t1: Date, config?: TimespanConfig) =>
  timespan(new Date(), t1, config);

const Timer = ({
  id,
  t1,
  name,
  category,
  config,
}: FormatDateProps): JSX.Element => {
  const timersCtx = useContext(TimersContext);
  const [timerValue, setTimerValue] = useState(timesp(t1, config));

  // menu anchor
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleMenuIconClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleEdit = () => {
    timersCtx.setEditId(id);
    timersCtx.setAddTimerOpen(true);
    handleClose();
  };

  const handleDelete = () => {
    //alert(`Placeholder: delete timer with id=${id}`);
    timersCtx.deleteTimer(id);
    handleClose();
  };

  // references for requestAnimationFrame
  const requestRef: MutableRefObject<any> | undefined = useRef();
  const prevTimeRef = useRef(0);
  const intervalRef = useRef(0);

  const animate = (time: any) => {
    if (prevTimeRef.current !== undefined) {
      // const dt = time - prevTimeRef.current;
      const db = time - intervalRef.current;

      if (db >= 100) {
        intervalRef.current = time;
        setTimerValue(timesp(t1, config));
      }
    }

    prevTimeRef.current = time;
    requestRef.current = requestAnimationFrame(animate);
  };

  useEffect(() => {
    requestRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(requestRef.current);
  }, []);

  return (
    <Card elevation={2} sx={{ p: 1, pb: 0 }}>
      <CardHeader
        title={name}
        action={
          <IconButton aria-label="actions" onClick={handleMenuIconClick}>
            <MoreVertIcon />
          </IconButton>
        }
      />
      <CardContent>
        <Stack direction="row" justifyContent="center" spacing={2}>
          {timerValue.arr.map((item, index) => (
            <Stack sx={{ textAlign: 'center' }} key={index}>
              <Typography variant="h5">{item.value}</Typography>
              <Typography>{item.name}</Typography>
            </Stack>
          ))}
        </Stack>
        <Typography
          variant="h6"
          sx={{ textAlign: 'right', mt: 2, color: 'text.secondary' }}
        >
          {category}
        </Typography>
      </CardContent>
      {/* <CardActions disableSpacing sx={{ justifyContent: 'flex-end' }}>
        <IconButton aria-label="edit timer">
          <EditIcon />
        </IconButton>
        <IconButton aria-label="delete timer">
          <DeleteIcon />
        </IconButton>
      </CardActions> */}
      <Menu
        id={`menu${id}`}
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{ 'aria-labelledby': 'app-button' }}
      >
        <MenuItem onClick={handleEdit}>
          <ListItemIcon>
            <EditIcon />
          </ListItemIcon>
          <ListItemText>Edit</ListItemText>
        </MenuItem>
        <MenuItem onClick={handleDelete}>
          <ListItemIcon>
            <DeleteIcon />
          </ListItemIcon>
          <ListItemText>Delete</ListItemText>
        </MenuItem>
      </Menu>
    </Card>
  );
};

export default Timer;
