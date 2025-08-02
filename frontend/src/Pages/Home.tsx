import React, { useState, useEffect } from 'react';
import { 
  Box, 
  Container, 
  Typography, 
  Button, 
  Grid, 
  Card, 
  CardContent,
  Avatar,
  Chip,
  Stack,
  Fade,
  Slide,
  IconButton,
  useTheme,
  alpha
} from '@mui/material';
import { styled, keyframes } from '@mui/material/styles';
import {
  LocationOn,
  Search,
  Star,
  TrendingUp,
  Security,
  Speed,
  People,
  Handyman,
  Home as HomeIcon,
  CleaningServices,
  Build,
  Palette,
  ArrowForward,
  PlayArrow
} from '@mui/icons-material';
import useCurrentUser from '../Hooks/useCurrentUser';
import '../Style/modernHome.scss';

// Animations
const float = keyframes`
  0% { transform: translateY(0px); }
  50% { transform: translateY(-20px); }
  100% { transform: translateY(0px); }
`;

const gradientShift = keyframes`
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
`;

const slideInUp = keyframes`
  from {
    opacity: 0;
    transform: translateY(50px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

// Styled Components
const HeroSection = styled(Box)(({ theme }) => ({
  minHeight: '100vh',
  background: `linear-gradient(135deg, 
    ${alpha(theme.palette.background.default, 1)} 0%, 
    ${alpha(theme.palette.primary.main, 0.03)} 25%, 
    ${alpha(theme.palette.secondary.main, 0.02)} 50%, 
    ${alpha(theme.palette.primary.main, 0.05)} 75%, 
    ${alpha(theme.palette.background.default, 1)} 100%)`,
  backgroundSize: '400% 400%',
  animation: `${gradientShift} 20s ease infinite`,
  display: 'flex',
  alignItems: 'center',
  position: 'relative',
  overflow: 'hidden',
  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23329FB2' fill-opacity='0.02'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
  },
  '&::after': {
    content: '""',
    position: 'absolute',
    top: '10%',
    right: '5%',
    width: '500px',
    height: '500px',
    background: `url("data:image/svg+xml,%3Csvg width='500' height='500' viewBox='0 0 500 500' xmlns='http://www.w3.org/2000/svg'%3E%3Cdefs%3E%3CradialGradient id='globeGrad' cx='50%25' cy='30%25' r='70%25'%3E%3Cstop offset='0%25' style='stop-color:%23329FB2;stop-opacity:0.1'/%3E%3Cstop offset='100%25' style='stop-color:%2340E0D0;stop-opacity:0.05'/%3E%3C/radialGradient%3E%3C/defs%3E%3Ccircle cx='250' cy='250' r='200' fill='url(%23globeGrad)' stroke='%23329FB2' stroke-width='2' stroke-opacity='0.1'/%3E%3Cpath d='M 250,50 Q 350,150 250,250 Q 150,350 250,450' stroke='%23329FB2' stroke-width='1.5' stroke-opacity='0.15' fill='none'/%3E%3Cpath d='M 250,50 Q 150,150 250,250 Q 350,350 250,450' stroke='%23329FB2' stroke-width='1.5' stroke-opacity='0.15' fill='none'/%3E%3Cellipse cx='250' cy='250' rx='200' ry='100' stroke='%23329FB2' stroke-width='1.5' stroke-opacity='0.15' fill='none'/%3E%3Cellipse cx='250' cy='250' rx='200' ry='60' stroke='%2340E0D0' stroke-width='1' stroke-opacity='0.1' fill='none'/%3E%3Cline x1='50' y1='250' x2='450' y2='250' stroke='%23329FB2' stroke-width='1' stroke-opacity='0.1'/%3E%3Cg stroke='%2340E0D0' stroke-width='1' stroke-opacity='0.08' fill='none'%3E%3Cpath d='M 100,200 L 150,180 L 200,190 L 250,170 L 300,185' /%3E%3Cpath d='M 120,320 L 170,300 L 220,310 L 270,290 L 320,305' /%3E%3Cpath d='M 180,150 L 230,130 L 280,140 L 330,120 L 380,135' /%3E%3C/g%3E%3Cg fill='%23329FB2' fill-opacity='0.08'%3E%3Ccircle cx='150' cy='180' r='2'/%3E%3Ccircle cx='200' cy='190' r='1.5'/%3E%3Ccircle cx='300' cy='185' r='2'/%3E%3Ccircle cx='170' cy='300' r='1.5'/%3E%3Ccircle cx='270' cy='290' r='2'/%3E%3Ccircle cx='230' cy='130' r='1.5'/%3E%3Ccircle cx='330' cy='120' r='2'/%3E%3C/g%3E%3C/svg%3E")`,
    backgroundSize: 'contain',
    backgroundRepeat: 'no-repeat',
    opacity: 0.6,
    zIndex: 0,
    [theme.breakpoints.down('md')]: {
      width: '350px',
      height: '350px',
      top: '15%',
      right: '-10%',
    },
    [theme.breakpoints.down('sm')]: {
      width: '250px',
      height: '250px',
      top: '20%',
      right: '-15%',
    },
  },
}));

const FloatingCard = styled(Card)(({ theme }) => ({
  animation: `${float} 6s ease-in-out infinite`,
  background: `linear-gradient(135deg, ${alpha(theme.palette.common.white, 0.95)} 0%, ${alpha(theme.palette.primary.main, 0.02)} 100%)`,
  backdropFilter: 'blur(20px)',
  border: `1px solid ${alpha(theme.palette.primary.main, 0.1)}`,
  borderRadius: theme.spacing(3),
  transition: 'all 0.3s ease-in-out',
  '&:hover': {
    transform: 'translateY(-10px) scale(1.02)',
    boxShadow: `0 20px 40px ${alpha(theme.palette.primary.main, 0.15)}`,
    border: `1px solid ${alpha(theme.palette.primary.main, 0.2)}`,
  },
}));

const GlassCard = styled(Card)(({ theme }) => ({
  background: `linear-gradient(135deg, ${alpha(theme.palette.common.white, 0.6)} 0%, ${alpha(theme.palette.primary.main, 0.03)} 100%)`,
  backdropFilter: 'blur(10px)',
  border: `1px solid ${alpha(theme.palette.primary.main, 0.1)}`,
  borderRadius: theme.spacing(2),
  transition: 'all 0.3s ease-in-out',
  '&:hover': {
    transform: 'translateY(-5px)',
    background: `linear-gradient(135deg, ${alpha(theme.palette.common.white, 0.8)} 0%, ${alpha(theme.palette.primary.main, 0.05)} 100%)`,
    border: `1px solid ${alpha(theme.palette.primary.main, 0.2)}`,
    boxShadow: `0 8px 32px ${alpha(theme.palette.primary.main, 0.1)}`,
  },
}));

const StyledButton = styled(Button)(({ theme }) => ({
  background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.primary.dark} 100%)`,
  borderRadius: theme.spacing(3),
  padding: theme.spacing(1.5, 4),
  fontSize: '1.1rem',
  fontWeight: 600,
  textTransform: 'none',
  color: theme.palette.primary.contrastText,
  boxShadow: `0 4px 16px ${alpha(theme.palette.primary.main, 0.3)}`,
  transition: 'all 0.3s ease-in-out',
  '&:hover': {
    transform: 'translateY(-2px)',
    boxShadow: `0 8px 24px ${alpha(theme.palette.primary.main, 0.4)}`,
    background: `linear-gradient(135deg, ${theme.palette.primary.dark} 0%, ${theme.palette.primary.main} 100%)`,
  },
}));

const AnimatedSection = styled(Box)({
  animation: `${slideInUp} 0.8s ease-out`,
});

const Home = () => {
  const theme = useTheme();
  const currentUser = useCurrentUser();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const features = [
    {
      icon: <LocationOn sx={{ fontSize: 40 }} />,
      title: 'Find Nearby Services',
      description: 'Discover local services on our interactive map. Find exactly what you need, when you need it.',
      color: theme.palette.primary.main
    },
    {
      icon: <Security sx={{ fontSize: 40 }} />,
      title: 'Trusted Providers',
      description: 'All service providers are verified and rated by our community for your peace of mind.',
      color: theme.palette.secondary.main
    },
    {
      icon: <Speed sx={{ fontSize: 40 }} />,
      title: 'Instant Booking',
      description: 'Book services instantly with real-time availability and immediate confirmation.',
      color: theme.palette.info.main
    },
    {
      icon: <Star sx={{ fontSize: 40 }} />,
      title: 'Quality Guaranteed',
      description: 'Our rating system ensures you always get the best service from top-rated professionals.',
      color: theme.palette.success.main
    }
  ];

  const categories = [
    { icon: <HomeIcon />, name: 'Home Services', count: '150+' },
    { icon: <CleaningServices />, name: 'Cleaning', count: '80+' },
    { icon: <Build />, name: 'Repairs', count: '120+' },
    { icon: <Palette />, name: 'Painting', count: '65+' },
    { icon: <Handyman />, name: 'Handyman', count: '90+' },
  ];

  const stats = [
    { number: '10K+', label: 'Happy Customers' },
    { number: '2K+', label: 'Service Providers' },
    { number: '50+', label: 'Service Categories' },
    { number: '4.9', label: 'Average Rating' },
  ];

  return (
    <Box sx={{ overflow: 'hidden', pt: { xs: 8, md: 9 } }}>
      {/* Hero Section */}
      <HeroSection>
        <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 2 }}>
          <Grid container spacing={6} alignItems="center">
            <Grid item xs={12} md={6}>
              <Fade in={isVisible} timeout={1000}>
                <Box>
                  <Typography
                    variant="h1"
                    sx={{
                      fontSize: { xs: '2.5rem', md: '4rem' },
                      fontWeight: 800,
                      background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.secondary.main} 100%)`,
                      backgroundClip: 'text',
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                      mb: 2,
                      color: theme.palette.grey[900],
                    }}
                  >
                    Find Local Services Near You
                  </Typography>
                  <Typography
                    variant="h4"
                    sx={{
                      fontSize: { xs: '1.2rem', md: '1.5rem' },
                      color: theme.palette.grey[800],
                      mb: 4,
                      fontWeight: 400,
                    }}
                  >
                    Connect with trusted local service providers instantly. From home repairs to professional services, find everything you need in your neighborhood.
                  </Typography>
                  <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
                    {!currentUser ? (
                      <>
                        <StyledButton
                          variant="contained"
                          size="large"
                          href="/register"
                          endIcon={<ArrowForward />}
                        >
                          Get Started
                        </StyledButton>
                        <Button
                          variant="outlined"
                          size="large"
                          sx={{
                            borderRadius: 3,
                            borderColor: theme.palette.primary.main,
                            color: theme.palette.primary.main,
                            '&:hover': {
                              background: alpha(theme.palette.primary.main, 0.1),
                              borderColor: theme.palette.primary.dark,
                              color: theme.palette.primary.dark,
                            },
                          }}
                          startIcon={<PlayArrow />}
                        >
                          Watch Demo
                        </Button>
                      </>
                    ) : (
                      <StyledButton
                        variant="contained"
                        size="large"
                        href="/map"
                        endIcon={<Search />}
                      >
                        Explore Services
                      </StyledButton>
                    )}
                  </Stack>
                </Box>
              </Fade>
            </Grid>
            <Grid item xs={12} md={6}>
              <Slide direction="left" in={isVisible} timeout={1200}>
                <Box sx={{ position: 'relative' }}>
                  <FloatingCard sx={{ maxWidth: 400, mx: 'auto' }}>
                    <CardContent sx={{ p: 4 }}>
                      <Stack spacing={3}>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                          <Avatar sx={{ bgcolor: theme.palette.primary.main }}>
                            <LocationOn />
                          </Avatar>
                          <Box>
                            <Typography variant="h6" fontWeight={600} sx={{ color: theme.palette.grey[900] }}>
                              John's Plumbing
                            </Typography>
                            <Stack direction="row" spacing={1} alignItems="center">
                              <Star sx={{ color: theme.palette.warning.main, fontSize: 16 }} />
                            <Typography variant="body2" sx={{ color: theme.palette.grey[800], opacity: 0.7 }}>
                                4.9 (127 reviews)
                              </Typography>
                            </Stack>
                          </Box>
                        </Box>
                        <Typography variant="body2" sx={{ color: theme.palette.grey[700], opacity: 0.8 }}>
                          Emergency plumbing service available 24/7. Quick response time and professional repairs.
                        </Typography>
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                          <Chip
                            label="Available Now"
                            sx={{
                              bgcolor: theme.palette.success.main,
                              color: theme.palette.common.white,
                              fontWeight: 600,
                            }}
                            size="small"
                          />
                          <Typography variant="h6" color="primary" fontWeight={600}>
                            $50/hr
                          </Typography>
                        </Box>
                      </Stack>
                    </CardContent>
                  </FloatingCard>
                </Box>
              </Slide>
            </Grid>
          </Grid>
        </Container>
      </HeroSection>

      {/* Stats Section */}
      <AnimatedSection sx={{ 
        py: 8, 
        background: `linear-gradient(135deg, 
          ${theme.palette.primary.dark} 0%, 
          ${theme.palette.primary.main} 50%, 
          ${theme.palette.secondary.dark} 100%)`,
        position: 'relative',
        '&::before': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: `linear-gradient(45deg, ${alpha(theme.palette.primary.light, 0.1)} 25%, transparent 25%, transparent 75%, ${alpha(theme.palette.secondary.light, 0.05)} 75%)`,
          backgroundSize: '60px 60px',
          animation: 'move 3s linear infinite',
        },
      }}>
        <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1 }}>
          <Grid container spacing={4}>
            {stats.map((stat, index) => (
              <Grid item xs={6} md={3} key={index}>
                <Box sx={{ textAlign: 'center' }}>
                  <Typography
                    variant="h3"
                    sx={{
                      fontWeight: 800,
                      color: theme.palette.common.white,
                      mb: 1,
                      textShadow: `2px 2px 4px ${alpha(theme.palette.common.black, 0.3)}`,
                    }}
                  >
                    {stat.number}
                  </Typography>
                  <Typography 
                    variant="body1" 
                    sx={{ 
                      color: alpha(theme.palette.common.white, 0.9),
                      fontWeight: 500
                    }}
                  >
                    {stat.label}
                  </Typography>
                </Box>
              </Grid>
            ))}
          </Grid>
        </Container>
      </AnimatedSection>

      {/* Features Section */}
      <AnimatedSection sx={{ py: 12 }}>
        <Container maxWidth="lg">
          <Box sx={{ textAlign: 'center', mb: 8 }}>
            <Typography
              variant="h2"
              sx={{
                fontSize: { xs: '2rem', md: '3rem' },
                fontWeight: 700,
                mb: 2,
                color: 'text.primary',
              }}
            >
              Why Choose ProxiMap?
            </Typography>
            <Typography variant="h6" color="text.secondary" sx={{ maxWidth: 600, mx: 'auto' }}>
              Experience the future of local service discovery with our innovative platform
            </Typography>
          </Box>
          <Grid container spacing={4}>
            {features.map((feature, index) => (
              <Grid item xs={12} md={6} key={index}>
                <GlassCard sx={{ height: '100%' }}>
                  <CardContent sx={{ p: 4 }}>
                    <Box
                      sx={{
                        width: 80,
                        height: 80,
                        borderRadius: 2,
                        background: `linear-gradient(135deg, ${feature.color}20 0%, ${feature.color}10 100%)`,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        mb: 3,
                        color: feature.color,
                      }}
                    >
                      {feature.icon}
                    </Box>
                    <Typography variant="h5" fontWeight={600} gutterBottom color="text.primary">
                      {feature.title}
                    </Typography>
                    <Typography variant="body1" color="text.secondary" lineHeight={1.7}>
                      {feature.description}
                    </Typography>
                  </CardContent>
                </GlassCard>
              </Grid>
            ))}
          </Grid>
        </Container>
      </AnimatedSection>

      {/* Categories Section */}
      <AnimatedSection sx={{ 
        py: 12, 
        background: `linear-gradient(135deg, 
          ${alpha(theme.palette.background.default, 1)} 0%, 
          ${alpha(theme.palette.primary.main, 0.02)} 50%, 
          ${alpha(theme.palette.secondary.main, 0.01)} 100%)`
      }}>
        <Container maxWidth="lg">
          <Box sx={{ textAlign: 'center', mb: 8 }}>
            <Typography
              variant="h2"
              sx={{
                fontSize: { xs: '2rem', md: '3rem' },
                fontWeight: 700,
                mb: 2,
                color: 'text.primary',
              }}
            >
              Popular Categories
            </Typography>
            <Typography variant="h6" color="text.secondary">
              Explore our most requested service categories
            </Typography>
          </Box>
          <Grid container spacing={3}>
            {categories.map((category, index) => (
              <Grid item xs={6} md={2.4} key={index}>
                <Card
                  sx={{
                    p: 3,
                    textAlign: 'center',
                    cursor: 'pointer',
                    transition: 'all 0.3s ease-in-out',
                    background: `linear-gradient(135deg, ${theme.palette.common.white} 0%, ${alpha(theme.palette.primary.main, 0.02)} 100%)`,
                    border: `1px solid ${alpha(theme.palette.primary.main, 0.08)}`,
                    borderRadius: theme.spacing(2),
                    '&:hover': {
                      transform: 'translateY(-8px)',
                      boxShadow: `0 16px 40px ${alpha(theme.palette.primary.main, 0.15)}`,
                      background: `linear-gradient(135deg, ${theme.palette.common.white} 0%, ${alpha(theme.palette.primary.main, 0.05)} 100%)`,
                      border: `1px solid ${alpha(theme.palette.primary.main, 0.2)}`,
                    },
                  }}
                >
                  <Box
                    sx={{
                      width: 60,
                      height: 60,
                      borderRadius: '50%',
                      background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.primary.dark} 100%)`,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      mx: 'auto',
                      mb: 2,
                      color: theme.palette.primary.contrastText,
                    }}
                  >
                    {category.icon}
                  </Box>
                  <Typography variant="h6" fontWeight={600} gutterBottom color="text.primary">
                    {category.name}
                  </Typography>
                  <Chip
                    label={category.count}
                    size="small"
                    color="primary"
                    variant="outlined"
                  />
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      </AnimatedSection>

      {/* CTA Section */}
      <AnimatedSection
        sx={{
          py: 12,
          background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.secondary.main} 100%)`,
          position: 'relative',
          overflow: 'hidden',
          '&::before': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: `linear-gradient(45deg, ${alpha(theme.palette.primary.light, 0.1)} 25%, transparent 25%, transparent 75%, ${alpha(theme.palette.secondary.light, 0.1)} 75%)`,
            backgroundSize: '60px 60px',
            animation: 'move 3s linear infinite',
          },
        }}
      >
        <Container maxWidth="md">
          <Box sx={{ textAlign: 'center', position: 'relative', zIndex: 1 }}>
            <Typography
              variant="h2"
              sx={{
                fontSize: { xs: '2rem', md: '3rem' },
                fontWeight: 700,
                mb: 3,
                color: theme.palette.primary.contrastText,
              }}
            >
              Ready to Get Started?
            </Typography>
            <Typography
              variant="h6"
              sx={{
                mb: 4,
                color: alpha(theme.palette.primary.contrastText, 0.9),
                maxWidth: 600,
                mx: 'auto',
              }}
            >
              Join thousands of users who trust ProxiMap to connect them with the best services in their area.
            </Typography>
            <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} justifyContent="center">
              <Button
                variant="contained"
                size="large"
                sx={{
                  px: 4,
                  py: 1.5,
                  bgcolor: theme.palette.common.white,
                  color: theme.palette.primary.main,
                  fontWeight: 700,
                  borderRadius: 3,
                  '&:hover': {
                    bgcolor: alpha(theme.palette.common.white, 0.9),
                    transform: 'translateY(-2px)',
                  },
                }}
                href={currentUser ? '/map' : '/register'}
              >
                {currentUser ? 'Explore Services' : 'Sign Up Now'}
              </Button>
              <Button
                variant="outlined"
                size="large"
                sx={{
                  px: 4,
                  py: 1.5,
                  borderColor: alpha(theme.palette.primary.contrastText, 0.3),
                  color: theme.palette.primary.contrastText,
                  fontWeight: 700,
                  borderRadius: 3,
                  '&:hover': {
                    borderColor: theme.palette.primary.contrastText,
                    bgcolor: alpha(theme.palette.primary.contrastText, 0.1),
                    transform: 'translateY(-2px)',
                  },
                }}
              >
                Learn More
              </Button>
            </Stack>
          </Box>
        </Container>
      </AnimatedSection>
    </Box>
  );
};

export default Home;
