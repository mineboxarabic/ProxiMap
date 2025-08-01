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
import { Link, useNavigate } from 'react-router-dom';
import MessageIcon from '@mui/icons-material/Message';
import { styled, keyframes, alpha, useTheme } from '@mui/material/styles';
import { Slide, Fade, Chip, Stack, Divider } from '@mui/material';
import {
  AddLocation,
  Notifications,
  Person,
  Settings,
  ExitToApp,
  Dashboard,
  Close as CloseIcon
} from '@mui/icons-material';

// @ts-expect-error TS(7016): Could not find a declaration file for module 'js-c... Remove this comment to see the full error message
import Cookies from 'js-cookie';
import useAuth from '../Hooks/useAuth';
import {axiosPrivate} from '../api/axios';
import useLogout from '../Hooks/useLogout';
import NavDropDown from './NavDropDown';
import { useEffect, useState } from 'react';
import { ADMIN, USER, PARTNER, MANAGER, STAFF } from '../Helpers/Roles';
import { Badge } from '@mui/material';
const pages = ['Products', 'Pricing', 'Blog'];
const settings = [ 'Account', 'Dashboard', 'Logout'];

// Animations
const slideDown = keyframes`
  from {
    opacity: 0;
    transform: translateY(-10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const glow = keyframes`
  0% { box-shadow: 0 0 5px rgba(50, 159, 178, 0.3); }
  50% { box-shadow: 0 0 20px rgba(50, 159, 178, 0.6); }
  100% { box-shadow: 0 0 5px rgba(50, 159, 178, 0.3); }
`;

// Styled Components
const ModernAppBar = styled(AppBar)(({ theme }) => ({
  background: `linear-gradient(135deg, 
    ${theme.palette.primary.main} 0%, 
    ${theme.palette.secondary.main} 100%)`,
  backdropFilter: 'blur(20px)',
  borderBottom: `1px solid ${alpha(theme.palette.primary.light, 0.2)}`,
  boxShadow: `0 8px 32px ${alpha(theme.palette.primary.main, 0.2)}`,
  transition: 'all 0.3s ease-in-out',
}));

const LogoBox = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  gap: theme.spacing(1),
  transition: 'all 0.3s ease-in-out',
  '&:hover': {
    transform: 'scale(1.05)',
    filter: 'brightness(1.1)',
  },
}));

const NavButton = styled(Button)(({ theme }) => ({
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

const UserSection = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  gap: theme.spacing(2),
}));

const ModernAvatar = styled(Avatar)(({ theme }) => ({
  border: `3px solid ${alpha(theme.palette.common.white, 0.3)}`,
  transition: 'all 0.3s ease-in-out',
  '&:hover': {
    transform: 'scale(1.1)',
    boxShadow: `0 0 20px ${alpha(theme.palette.primary.light, 0.6)}`,
    borderColor: theme.palette.primary.light,
  },
}));

const ActionButton = styled(IconButton)(({ theme }) => ({
  color: theme.palette.primary.contrastText,
  background: alpha(theme.palette.common.white, 0.1),
  borderRadius: theme.spacing(1.5),
  margin: theme.spacing(0, 0.5),
  transition: 'all 0.3s ease-in-out',
  '&:hover': {
    background: alpha(theme.palette.common.white, 0.2),
    transform: 'translateY(-2px)',
    boxShadow: `0 4px 12px ${alpha(theme.palette.common.black, 0.2)}`,
  },
}));

const MobileMenuBox = styled(Box)(({ theme }) => ({
  background: `linear-gradient(135deg, 
    ${alpha(theme.palette.background.paper, 0.95)} 0%, 
    ${alpha(theme.palette.background.default, 0.9)} 100%)`,
  backdropFilter: 'blur(20px)',
  borderRadius: theme.spacing(2),
  border: `1px solid ${alpha(theme.palette.divider, 0.1)}`,
  animation: `${slideDown} 0.3s ease-out`,
}));

const RoleChip = styled(Chip)(({ theme }) => ({
  fontWeight: 600,
  fontSize: '0.75rem',
  height: 24,
  animation: `${glow} 2s ease-in-out infinite`,
}));

const MobileMenuItem = styled(MenuItem)(({ theme }) => ({
  borderRadius: theme.spacing(1),
  margin: theme.spacing(0.5),
  transition: 'all 0.2s ease-in-out',
  '&:hover': {
    background: alpha(theme.palette.primary.main, 0.1),
    transform: 'translateX(8px)',
  },
}));

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
  const [isScrolled, setIsScrolled] = useState(false);
  const theme = useTheme();

  const {auth,setAuth} = useAuth();
  const role = auth?.user?.role || 'User';
  const navigate = useNavigate();
  const logout = useLogout();

  useEffect(() => {
    console.log(`user: ${auth}`);
    
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [auth]);

  const handleLogout = async () => {
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

  const handleNavigation = (path: string) => {
    navigate(path, { replace: true });
    handleCloseNavMenu();
  };

  return (
    <ModernAppBar 
      position="fixed" 
      sx={{
        background: isScrolled 
          ? `linear-gradient(135deg, 
              ${theme.palette.primary.main} 0%, 
              ${theme.palette.secondary.main} 100%)`
          : `linear-gradient(135deg, 
              ${alpha(theme.palette.primary.main, 0.98)} 0%, 
              ${alpha(theme.palette.secondary.main, 0.95)} 100%)`,
        boxShadow: isScrolled 
          ? `0 12px 40px ${alpha(theme.palette.primary.main, 0.3)}`
          : `0 8px 32px ${alpha(theme.palette.primary.main, 0.2)}`,
      }}
    >
      <Container maxWidth="xl">
        <Toolbar disableGutters sx={{ minHeight: { xs: 64, md: 72 } }}>
          {/* Desktop Logo */}
          <LogoBox sx={{ display: { xs: 'none', md: 'flex' } }}>
            <AddLocation sx={{ fontSize: 32, color: 'primary.contrastText' }} />
            <Typography
              variant="h5"
              component={Link}
              to="/"
              sx={{
                fontWeight: 800,
                letterSpacing: '.2rem',
                color: 'primary.contrastText',
                textDecoration: 'none',
                background: `linear-gradient(45deg, ${theme.palette.primary.contrastText}, ${alpha(theme.palette.primary.light, 0.8)})`,
                backgroundClip: 'text',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}
            >
              ProxiMap
            </Typography>
          </LogoBox>

          {/* Mobile Menu Icon */}
          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <ActionButton
              size="large"
              aria-label="navigation menu"
              onClick={handleOpenNavMenu}
            >
              <MenuIcon />
            </ActionButton>

            {/* Mobile Menu */}
            <Menu
              id="mobile-menu"
              anchorEl={anchorElNav}
              anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
              keepMounted
              transformOrigin={{ vertical: 'top', horizontal: 'left' }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{ 
                display: { xs: 'block', md: 'none' },
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
              {pagesNav.map((page) => {
                const allowed = page.allowedRoles.includes(role) || page.allowedRoles.includes('*');
                if (!allowed) return null;
                
                return (
                  <MobileMenuItem 
                    key={page.path} 
                    onClick={() => handleNavigation(page.path)}
                  >
                    <Typography textAlign="center" fontWeight={500}>
                      {page.label}
                    </Typography>
                  </MobileMenuItem>
                );
              })}
              
              <Divider sx={{ my: 1, opacity: 0.3 }} />
              <NavDropDown buttonText="CRUD Panel" menuItems={crudPages} />
            </Menu>
          </Box>

          {/* Mobile Logo */}
          <LogoBox sx={{ display: { xs: 'flex', md: 'none' }, flexGrow: 1, justifyContent: 'center' }}>
            <AddLocation sx={{ fontSize: 28, color: 'primary.contrastText' }} />
            <Typography
              variant="h6"
              component={Link}
              to="/"
              sx={{
                fontWeight: 700,
                letterSpacing: '.15rem',
                color: 'primary.contrastText',
                textDecoration: 'none',
              }}
            >
              ProxiMap
            </Typography>
          </LogoBox>

          {/* Desktop Navigation */}
          {auth?.user ? (
            <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' }, ml: 4 }}>
              {pagesNav.map((page) => {
                const allowed = page.allowedRoles.includes(role) || page.allowedRoles.includes('*');
                if (!allowed) return null;
                
                return (
                  <NavButton
                    key={page.path}
                    onClick={() => handleNavigation(page.path)}
                  >
                    {page.label}
                  </NavButton>
                );
              })}
              
              <Box sx={{ ml: 2 }}>
                <NavDropDown buttonText="CRUD Panel" menuItems={crudPages} />
              </Box>
            </Box>
          ) : (
            <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }} />
          )}

          {/* User Section */}
          {auth?.user ? (
            <UserSection>
              {/* Messages Button */}
              <Tooltip title="Messages" arrow>
                <Link to="/chat" style={{ textDecoration: 'none' }}>
                  <ActionButton sx={{ display: { xs: 'none', md: 'flex' } }}>
                    <Badge badgeContent={0} color="error">
                      <MessageIcon />
                    </Badge>
                  </ActionButton>
                </Link>
              </Tooltip>

              {/* Notifications Button */}
              <Tooltip title="Notifications" arrow>
                <ActionButton sx={{ display: { xs: 'none', md: 'flex' } }}>
                  <Badge badgeContent={0} color="error">
                    <Notifications />
                  </Badge>
                </ActionButton>
              </Tooltip>

              {/* Username */}
              <Typography 
                sx={{ 
                  display: { xs: 'none', md: 'block' },
                  color: 'primary.contrastText',
                  fontWeight: 600,
                  mr: 1
                }} 
                variant="body1"
              >
                {auth?.user?.username}
              </Typography>

              {/* Role Badge */}
              <RoleChip
                label={auth?.user?.role}
                color={getRoleColor(auth?.user?.role)}
                size="small"
                sx={{ display: { xs: 'none', md: 'flex' } }}
              />

              {/* User Avatar Menu */}
              <Tooltip title="Account settings" arrow>
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                  <ModernAvatar 
                    alt={auth?.user?.username} 
                    src={auth?.user?.profile?.profilePicture}
                    sx={{ 
                      width: 40, 
                      height: 40,
                      bgcolor: theme.palette.primary.light 
                    }}
                  >
                    {auth?.user?.username?.charAt(0).toUpperCase()}
                  </ModernAvatar>
                </IconButton>
              </Tooltip>

              {/* User Menu */}
              <Menu
                sx={{ 
                  mt: '50px',
                  '& .MuiPaper-root': {
                    background: `linear-gradient(135deg, 
                      ${alpha(theme.palette.background.paper, 0.95)} 0%, 
                      ${alpha(theme.palette.background.default, 0.9)} 100%)`,
                    backdropFilter: 'blur(20px)',
                    borderRadius: 2,
                    border: `1px solid ${alpha(theme.palette.divider, 0.1)}`,
                    minWidth: 200,
                  }
                }}
                id="user-menu"
                anchorEl={anchorElUser}
                anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
                keepMounted
                transformOrigin={{ vertical: 'top', horizontal: 'right' }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
              >
                <MobileMenuItem onClick={() => { navigate('/profile', { replace: true }); handleCloseUserMenu(); }}>
                  <Person sx={{ mr: 2, fontSize: 20 }} />
                  <Typography>Profile</Typography>
                </MobileMenuItem>
                
                <MobileMenuItem onClick={handleCloseUserMenu}>
                  <Dashboard sx={{ mr: 2, fontSize: 20 }} />
                  <Typography>Dashboard</Typography>
                </MobileMenuItem>
                
                <MobileMenuItem onClick={handleCloseUserMenu}>
                  <Settings sx={{ mr: 2, fontSize: 20 }} />
                  <Typography>Settings</Typography>
                </MobileMenuItem>
                
                <Divider sx={{ my: 1, opacity: 0.3 }} />
                
                <MobileMenuItem onClick={handleLogout}>
                  <ExitToApp sx={{ mr: 2, fontSize: 20, color: theme.palette.error.main }} />
                  <Typography sx={{ color: theme.palette.error.main }}>
                    Logout
                  </Typography>
                </MobileMenuItem>
              </Menu>
            </UserSection>
          ) : (
            /* Login Button for Non-authenticated Users */
            <Box sx={{ flexGrow: 0 }}>
              <Stack direction="row" spacing={1}>
                <Button
                  component={Link}
                  to="/login"
                  variant="outlined"
                  sx={{
                    color: 'primary.contrastText',
                    borderColor: alpha(theme.palette.primary.contrastText, 0.5),
                    borderRadius: 3,
                    px: 3,
                    fontWeight: 600,
                    textTransform: 'none',
                    '&:hover': {
                      borderColor: theme.palette.primary.contrastText,
                      background: alpha(theme.palette.common.white, 0.1),
                      transform: 'translateY(-2px)',
                    },
                  }}
                >
                  Login
                </Button>
                <Button
                  component={Link}
                  to="/register"
                  variant="contained"
                  sx={{
                    bgcolor: theme.palette.common.white,
                    color: theme.palette.primary.main,
                    borderRadius: 3,
                    px: 3,
                    fontWeight: 700,
                    textTransform: 'none',
                    boxShadow: `0 4px 16px ${alpha(theme.palette.common.black, 0.2)}`,
                    '&:hover': {
                      bgcolor: alpha(theme.palette.common.white, 0.9),
                      transform: 'translateY(-2px)',
                      boxShadow: `0 6px 20px ${alpha(theme.palette.common.black, 0.3)}`,
                    },
                  }}
                >
                  Sign Up
                </Button>
              </Stack>
            </Box>
          )}
        </Toolbar>
      </Container>
    </ModernAppBar>
  );
}
export default Header;