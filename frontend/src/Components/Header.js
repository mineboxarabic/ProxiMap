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
import { Badge } from '@mui/material';
const pages = ['Products', 'Pricing', 'Blog'];
const settings = [ 'Account', 'Dashboard', 'Logout'];

const crudPages = [
  {path:'users',label:'Users', allowedRoles:[ADMIN]},
  {path:'services',label:'Services', allowedRoles:[ADMIN, MANAGER, STAFF]},
  {path:'products',label:'Products', allowedRoles:[ADMIN, MANAGER, STAFF]},
  {path:'orders',label:'Orders', allowedRoles:[ADMIN, MANAGER, STAFF]},
  {path:'categorys',label:'Categorys', allowedRoles:[ADMIN, MANAGER, STAFF]},
]

const pagesNav = [
  {path:'/home',label:'Home', allowedRoles:['*']},
  {path:'/map',label:'Map', allowedRoles:['*']},
  {path:'/about',label:'About', allowedRoles:['*']},
  {path:'/contact',label:'Contact', allowedRoles:['*']},
  {path:'/services/edit',label:'My services', allowedRoles:[ADMIN, PARTNER]},
  {path:'/services/edit/user',label:'My asked services', allowedRoles:['*']},
]

const getRoleColor = (role) => {
  switch (role) {
    case ADMIN:
      return 'error';
    case USER:
      return 'primary'; 
    case PARTNER:
      return 'success';
    case MANAGER:
      return 'info';
    case STAFF:
      return  'warning';
    default:
      return 'default';
  }

}

function Header() {
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const {auth,setAuth} = useAuth();
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
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            LOGO
          </Typography>

          {
            auth?.user ?
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
         
           
              {pagesNav.map((page) => 
                {
                  let allowed = false;
                  if(page.allowedRoles.includes(role) || page.allowedRoles.includes('*'))  allowed = true;
                
                  if(allowed)
                  return <Button

                  key={page.path}
                  onClick={()=>{ navigate(page.path, { replace: true });}}
                  sx={{ my: 2, color: 'white', display: 'block'
                }}
                  
                >
                  {page.label}
                </Button>
                }
              )
          }


              <NavDropDown buttonText="CRUD panel" menuItems={crudPages} />

          </Box>:
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
          {/*Here it's empty cus i just want the flex grow to be on */}
          </Box>
            }
            
         { 
         auth?.user ?
         
         <Box sx={{ flexGrow: 0 }}>
            
            <Box sx={{ flexGrow: 0, display: { xs: 'none', md: 'flex' } }}>
              
            <Typography sx={{ display: { xs: 'none', md: 'block' },
            mr: 2,
          }} variant="h6" noWrap component="div">
              {auth?.user?.username}
            </Typography>
            
            
            <Tooltip title="Open settings">
            <Badge badgeContent={auth?.user?.role} 
            color={getRoleColor(auth?.user?.role)}>
              
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar alt={auth?.user?.username} src={auth?.user?.profile?.profilePicture} />
              </IconButton>
            </Badge>



            </Tooltip>

            </Box>


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