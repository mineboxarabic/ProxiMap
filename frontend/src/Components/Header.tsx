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


// @ts-expect-error TS(7016): Could not find a declaration file for module 'js-c... Remove this comment to see the full error message
import Cookies from 'js-cookie';
import useAuth from '../Hooks/useAuth';
import {axiosPrivate} from '../api/axios';
import useLogout from '../Hooks/useLogout';
import NavDropDown from './NavDropDown';
import { useEffect } from 'react';
import AddLocationIcon from '@mui/icons-material/AddLocation';
import { ADMIN, USER, PARTNER, MANAGER, STAFF } from '../Helpers/Roles';
import { Badge } from '@mui/material';
const pages = ['Products', 'Pricing', 'Blog'];
const settings = [ 'Account', 'Dashboard', 'Logout'];

const crudPages = [
  {path:'users',label:'Users', allowedRoles:[ADMIN]},
  {path:'services',label:'Services', allowedRoles:[ADMIN, MANAGER, STAFF]},
  {path:'askedServices',label:'Asked Services', allowedRoles:[ADMIN, MANAGER, STAFF]},
  {path:'orders',label:'Orders', allowedRoles:[ADMIN, MANAGER, STAFF]},
  {path:'categorys',label:'Categorys', allowedRoles:[ADMIN, MANAGER, STAFF]},
]

const pagesNav = [
  {path:'/home',label:'Home', allowedRoles:['*']},
  {path:'/map/inview',label:'Map', allowedRoles:['*']},
  {path:'/map',label:'Filtered Map', allowedRoles:['*']},
  {path:'/about',label:'About', allowedRoles:['*']},
  {path:'/contact',label:'Contact', allowedRoles:['*']},
  {path:'/services/edit',label:'My services', allowedRoles:[ADMIN, PARTNER]},
  {path:'/services/edit/user',label:'My asked services', allowedRoles:['*']},
]


const getRoleColor = (role: any) => {
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
  const role = auth?.user?.role || 'User';
  const navigate = useNavigate();
  const logout = useLogout();
  useEffect(() => {
    console.log(`user: ${auth}`);
  }, [auth])

  const handleLogout =async () => {
    await logout();
    navigate('/login', { replace: true });
  };
  const handleOpenNavMenu = (event: any) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event: any) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  return (


    // @ts-expect-error TS(2769): No overload matches this call.
    <AppBar position="static" color='dark'>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <AddLocationIcon sx={{ display: { xs: 'none', md: 'flex' }
          ,
          color: 'light.main'
          , mr: 1 }} />
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
              //color: 'inherit',
              color: 'light.main',
              textDecoration: 'none',
            }}
          >
            ProxiMap
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
              <MenuIcon sx={{
                color: 'light.main'
              
              }} />
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

              {
                pagesNav.map((page) =>
                {
                  let allowed = false;
                  if(page.allowedRoles.includes(role) || page.allowedRoles.includes('*'))  allowed = true;
                  if(allowed)
                  return <MenuItem key={page.path} onClick={()=>{ navigate(page.path, { replace: true });}}>
                  <Typography textAlign="center">{page.label}</Typography>
                </MenuItem>
              }
              )
              }

              <NavDropDown buttonText="CRUD panel" menuItems={crudPages} />
              
            </Menu>
          </Box>

          
          <AddLocationIcon sx={{ display: { xs: 'flex', md: 'none' },
          
          color: 'light.main',
          mr: 1 }} />
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
              //color: 'inherit',
              color: 'light.main',
              textDecoration: 'none',
            }}
          >
            ProxiMap
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
                  sx={{ my: 2, color: 'light.main', display: 'block'
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
          
            color: 'light.main'
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