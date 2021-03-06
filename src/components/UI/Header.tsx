import MenuIcon from '@mui/icons-material/Menu';
import {
  AppBar,
  Box,
  Button,
  Divider,
  IconButton,
  Menu,
  MenuItem,
  Toolbar,
  Typography,
} from '@mui/material';
import React, { useState } from 'react';

interface FormatHeaderProps {
  addTimer: () => void;
  about: () => void;
}

const Header = ({ addTimer, about }: FormatHeaderProps): JSX.Element => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleMenuIconClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const runMenuFn = (fn: any) => {
    handleClose();
    fn();
  };

  return (
    <header>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar>
          <Toolbar>
            <IconButton
              id="app-button"
              size="large"
              edge="start"
              color="inherit"
              aria-label="menu"
              sx={{ mr: 2 }}
              onClick={handleMenuIconClick}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              Timely
            </Typography>
            <Button color="inherit">Login</Button>
          </Toolbar>
          <Menu
            id="app-menu"
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            MenuListProps={{ 'aria-labelledby': 'app-button' }}
          >
            <MenuItem onClick={handleClose}>Login</MenuItem>
            <Divider />
            <MenuItem onClick={() => runMenuFn(addTimer)}>Add Timer</MenuItem>
            <MenuItem>Edit Timers</MenuItem>
            <Divider />
            <MenuItem onClick={() => runMenuFn(about)}>About</MenuItem>
          </Menu>
        </AppBar>
      </Box>
    </header>
  );
};

export default Header;
