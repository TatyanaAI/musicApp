import React, { useState } from 'react';
import { Link } from "react-router-dom";
import Button from "@material-ui/core/Button";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";

const UserMenu = ({ user, onLogoutClick }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <Button
        aria-controls="simple-menu"
        aria-haspopup="true"
        onClick={handleClick}
        color="inherit"
      >
        Hello, {user.username}
      </Button>
      <Menu
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        {user && user.role === "admin" && <MenuItem component={Link} to="/admin" color="inherit"> Admin Panel </MenuItem> }
        <MenuItem component={Link} to="/add_artist" color="inherit">
          Add Artist</MenuItem>
        <MenuItem component={Link} to="/add_album" color="inherit">
          Add Album</MenuItem>
        <MenuItem component={Link} to="/add_track" color="inherit">
          Add Track</MenuItem>
        <MenuItem component={Link} to="/track_history" color="inherit">
          Track history</MenuItem>
        <MenuItem onClick={onLogoutClick}>Logout</MenuItem>
      </Menu>
    </>
  );
};

export default UserMenu;
