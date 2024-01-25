import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import useAuth from '../Hooks/useAuth';
const NavDropDown = ({ buttonText, menuItems}) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const navigate = useNavigate();
  const {auth} = useAuth();
  const role = auth?.user?.role;

  const menuItemsRoles = menuItems.map((item) => item.allowedRoles);
  const [isAllowed, setAllowed] = useState(false);

  useEffect(() => {
    let allowed = false;
    for (let i = 0; i < menuItemsRoles.length; i++) {
      if (menuItemsRoles?.[i].includes(role)) {
        allowed = true;
        break;
      }
    }
    setAllowed(allowed);
  }, []);


  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
    console.log(isAllowed);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleCloseItem = (item) => {
    setAnchorEl(null);
    navigate(`/${item}`);
    console.log(item);
  }

  return (
    
    <>
      {isAllowed ? 
      <> 
      <Button

        id="dropdown-button"
        aria-controls="dropdown-menu"
        aria-haspopup="true"
        aria-expanded={Boolean(anchorEl) ? 'true' : undefined}
        onClick={handleClick}
        variant="text"
        color="inherit"

        endIcon={<ArrowDropDownIcon />}
      >
        {buttonText}
      </Button>



      <Menu
        id="dropdown-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        {menuItems.map((item, index) => 
          item.allowedRoles.includes(role) && (
          <MenuItem key={index} onClick={() => handleCloseItem(item.path)}>{item.label}</MenuItem>
        ))}
      </Menu>
      </> 
      : null}
    </> 
  );
};

export default NavDropDown;
