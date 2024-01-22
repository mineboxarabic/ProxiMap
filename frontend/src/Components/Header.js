import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import AdbIcon from '@mui/icons-material/Adb';
import { Link, useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import useAuth from '../Hooks/useAuth';
import {axiosPrivate} from '../api/axios';
import useLogout from '../Hooks/useLogout';
import NavDropDown from './NavDropDown';

import { ADMIN, USER, PARTNER, MANAGER, STAFF } from '../Helpers/Roles';
const pages = ['Products', 'Pricing', 'Blog'];
const settings = [ 'Account', 'Dashboard', 'Logout'];

const crudPages = [
  {path:'users',label:'Users', allowedRoles:[ADMIN]},
  {path:'services',label:'Services', allowedRoles:[ADMIN, MANAGER, STAFF]},
  {path:'products',label:'Products', allowedRoles:[ADMIN, MANAGER, STAFF]},
  {path:'orders',label:'Orders', allowedRoles:[ADMIN, MANAGER, STAFF]},
  {path:'categorys',label:'Categorys', allowedRoles:[ADMIN, MANAGER, STAFF]},
]


function Header() {
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const {auth,setAuth} = useAuth();
  const isLogged = auth?.user ? true : false;
  const role = auth?.user?.role;
  const navigate = useNavigate();
  const logout = useLogout();


  const handleLogout =async () => {
    await logout();
    navigate('/login', { replace: true });
  };
  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <AdbIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} />
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="#app-bar-with-responsive-menu"
            sx={{
              mr: 2,
              display: { xs: 'none', md: 'flex' },
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            LOGO
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: 'block', md: 'none' },
              }}
            >
              {pages.map((page) => (
                <MenuItem key={page} onClick={handleCloseNavMenu}>
                  <Typography textAlign="center">{page}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>

          
          <AdbIcon sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} />
          <Typography
            variant="h5"
            noWrap
            component="a"
            href="#app-bar-with-responsive-menu"
            sx={{
              mr: 2,
              display: { xs: 'flex', md: 'none' },
              flexGrow: 1,
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            LOGO
          </Typography>

          {
            isLogged ?
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
         
              <Button
                key={"Home"}
                onClick={()=>{ navigate('/home', { replace: true });}}
                sx={{ my: 2, color: 'white', display: 'block' }}
              >
                Home
              </Button>

              <Button
                key={"Map"}
                onClick={()=>{ navigate('/map', { replace: true });}}
                sx={{ my: 2, color: 'white', display: 'block' }}
              >
                Map
              </Button>
          
              <Button
                key={"About"}
                onClick={()=>{ navigate('/about', { replace: true });}}
                sx={{ my: 2, color: 'white', display: 'block' }}
              >
                About
              </Button>

              <NavDropDown buttonText="CRUD panel" menuItems={crudPages} />

          </Box>:
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
          {/*Here it's empty cus i just want the flex grow to be on */}
          </Box>
            }
            
         { 
         isLogged ?
         
         <Box sx={{ flexGrow: 0 }}>
            
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar alt={auth?.user?.username} src={auth?.user?.profile?.profilePicture} />
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: '45px' }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >

              <MenuItem onClick={()=>{ navigate('/profile', { replace: true });}}>
                <Typography textAlign="center">Profile</Typography>
              </MenuItem>

              {settings.map((setting) => (

                setting === 'Logout' ?
                <MenuItem key={setting} onClick={handleLogout}>
                  <Typography textAlign="center">{setting}</Typography>
                </MenuItem>:

                <MenuItem key={setting} onClick={handleCloseUserMenu}>
                  <Typography textAlign="center">{setting}</Typography>
                </MenuItem>

                
              ))}
            </Menu>
          </Box>
          :

        <Box sx={{ flexGrow: 0 }}>
            <Link to='/login'>
              <Button variant="contained">Log In</Button>
            </Link>

        </Box>
          
        }
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default Header;