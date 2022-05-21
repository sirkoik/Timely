import React, { useContext, useState } from 'react';
import {
  Card,
  CardHeader,
  CardContent,
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

import { format } from 'date-fns';

import TimespanConfig from '../interfaces/TimespanConfig';
import { TimersContext } from '../context/TimersContext';
import TimerOutput from './TimerOutput';

interface FormatDateProps {
  id: number | undefined;
  t1: Date;
  name: string;
  category: string;
  config?: TimespanConfig;
}

const Timer = ({
  id,
  t1,
  name,
  category,
  config,
}: FormatDateProps): JSX.Element => {
  const timersCtx = useContext(TimersContext);

  console.log('A Timer component has rendered. The ID is: ', id);

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

  // TODO add call for delete confirm dialog
  const handleDelete = () => {
    timersCtx.deleteTimer(id);
    handleClose();
  };

  return (
    <Card elevation={2} sx={{ p: 1, pb: 0 }}>
      <CardHeader
        title={name}
        subheader={format(t1, 'P')}
        action={
          <IconButton aria-label="actions" onClick={handleMenuIconClick}>
            <MoreVertIcon />
          </IconButton>
        }
      />
      <CardContent>
        <TimerOutput t1={t1} config={config} />
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
