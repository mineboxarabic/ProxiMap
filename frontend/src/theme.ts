// src/theme.ts

import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#329FB2',
      light: '#4FB3C5',
      dark: '#2A8396',
      contrastText: '#ffffff',
    },
    secondary: {
      main: '#40E0D0', // Turquoise - complements the blue
      light: '#6EE6D9',
      dark: '#36C2B4',
      contrastText: '#ffffff',
    },
    background: {
      default: '#F8FBFF', // Very light blue-tinted white
      paper: '#FFFFFF',
    },
    grey: {
      50: '#F1F8FB',
      100: '#E3F1F6',
      200: '#C7E3ED',
      300: '#A8D4E3',
      400: '#8AC5D9',
      500: '#6BB6CF',
      600: '#4CA7C5',
      700: '#3D85A0',
      800: '#2E647B',
      900: '#1F4256',
    },
    info: {
      main: '#4FB3C5',
      light: '#7EC4D1',
      dark: '#3A879B',
    },
    success: {
      main: '#40E0D0',
      light: '#6EE6D9',
      dark: '#36C2B4',
    },
    warning: {
      main: '#FFB347',
      light: '#FFC266',
      dark: '#E6A03D',
    },
    error: {
      main: '#FF6B82',
      light: '#FF8BA0',
      dark: '#E65E73',
    },
  },
  typography: {
    fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
    h1: {
      fontWeight: 800,
    },
    h2: {
      fontWeight: 700,
    },
    h3: {
      fontWeight: 600,
    },
    h4: {
      fontWeight: 600,
    },
    h5: {
      fontWeight: 600,
    },
    h6: {
      fontWeight: 600,
    },
  },
  shape: {
    borderRadius: 12,
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 24,
          textTransform: 'none',
          fontWeight: 600,
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 16,
        },
      },
    },
  },
});

export default theme;
