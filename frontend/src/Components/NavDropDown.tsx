import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import { styled, alpha, useTheme } from '@mui/material/styles';
import { Typography } from '@mui/material';
import useAuth from '../Hooks/useAuth';

const ModernDropdownButton = styled(Button)(({ theme }) => ({
  color: theme.palette.primary.contrastText,
  fontSize: '0.95rem',
  fontWeight: 500,
  padding: theme.spacing(1, 2),
  margin: theme.spacing(0, 0.5),
  borderRadius: theme.spacing(3),
  textTransform: 'none',
  position: 'relative',
  overflow: 'hidden',
  transition: 'all 0.3s ease-in-out',
  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: '-100%',
    width: '100%',
    height: '100%',
    background: `linear-gradient(90deg, transparent, ${alpha(theme.palette.common.white, 0.2)}, transparent)`,
    transition: 'left 0.6s ease-in-out',
  },
  '&:hover': {
    background: alpha(theme.palette.common.white, 0.1),
    transform: 'translateY(-2px)',
    boxShadow: `0 4px 12px ${alpha(theme.palette.common.black, 0.2)}`,
    '&::before': {
      left: '100%',
    },
  },
  '&:active': {
    transform: 'translateY(0)',
  },
}));

const ModernMenuItem = styled(MenuItem)(({ theme }) => ({
  borderRadius: theme.spacing(1),
  margin: theme.spacing(0.5),
  transition: 'all 0.2s ease-in-out',
  '&:hover': {
    background: alpha(theme.palette.primary.main, 0.1),
    transform: 'translateX(8px)',
  },
}));
const NavDropDown = ({
  buttonText,
  menuItems
}: any) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const navigate = useNavigate();
  const theme = useTheme();

  const {auth} = useAuth();
  const role = auth?.user?.role;

  const menuItemsRoles = menuItems.map((item: any) => item.allowedRoles);
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
  }, [menuItemsRoles, role]);

  const handleClick = (event: any) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleCloseItem = (item: any) => {
    setAnchorEl(null);
    navigate(`/${item}`);
  }

  return (
    <>
      {isAllowed ? (
        <>
          <ModernDropdownButton
            id="dropdown-button"
            aria-controls="dropdown-menu"
            aria-haspopup="true"
            aria-expanded={Boolean(anchorEl) ? 'true' : undefined}
            onClick={handleClick}
            endIcon={<ArrowDropDownIcon />}
          >
            {buttonText}
          </ModernDropdownButton>

          <Menu
            id="dropdown-menu"
            anchorEl={anchorEl}
            keepMounted
            open={Boolean(anchorEl)}
            onClose={handleClose}
            sx={{
              '& .MuiPaper-root': {
                background: `linear-gradient(135deg, 
                  ${alpha(theme.palette.background.paper, 0.95)} 0%, 
                  ${alpha(theme.palette.background.default, 0.9)} 100%)`,
                backdropFilter: 'blur(20px)',
                borderRadius: 2,
                border: `1px solid ${alpha(theme.palette.divider, 0.1)}`,
                mt: 1,
                minWidth: 200,
              }
            }}
          >
            {menuItems.map((item: any, index: any) => 
              item.allowedRoles.includes(role) && (
                <ModernMenuItem key={index} onClick={() => handleCloseItem(item.path)}>
                  <Typography fontWeight={500}>{item.label}</Typography>
                </ModernMenuItem>
              )
            )}
          </Menu>
        </>
      ) : null}
    </>
  );
};

export default NavDropDown;
