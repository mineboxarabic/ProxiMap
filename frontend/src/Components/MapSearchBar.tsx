import React, { useEffect, useState } from 'react';
import TextField from '@mui/material/TextField';
import Paper from '@mui/material/Paper';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';
import { useTheme, alpha, styled } from '@mui/material/styles';
import { InputAdornment } from '@mui/material';
import useGeoAPI from '../Hooks/useGeoAPI';
import Autocomplete from '@mui/material/Autocomplete';

// Styled Components
const ModernSearchPaper = styled(Paper)(({ theme }) => ({
  background: `linear-gradient(135deg, ${alpha(theme.palette.common.white, 0.95)} 0%, ${alpha(theme.palette.primary.main, 0.05)} 100%)`,
  backdropFilter: 'blur(20px)',
  border: `1px solid ${alpha(theme.palette.primary.main, 0.2)}`,
  borderRadius: theme.spacing(4),
  transition: 'all 0.3s ease-in-out',
  boxShadow: `0 8px 32px ${alpha(theme.palette.primary.main, 0.15)}`,
  '&:hover': {
    transform: 'translateY(-2px)',
    boxShadow: `0 12px 40px ${alpha(theme.palette.primary.main, 0.25)}`,
    border: `1px solid ${alpha(theme.palette.primary.main, 0.3)}`,
  },
  '&:focus-within': {
    transform: 'translateY(-2px)',
    boxShadow: `0 12px 40px ${alpha(theme.palette.primary.main, 0.3)}`,
    border: `1px solid ${theme.palette.primary.main}`,
  },
}));
const MapSearchBar = ({
  onSearchSubmit
}: any) => {
    const theme = useTheme();
    const {setAddress, getSuggestions, loading, suggest} = useGeoAPI();
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedOption, setSelectedOption] = useState(null);

    
    const handleSearchChange = (e: any) => {
      setSearchTerm(e.target.value);
      setTimeout(() => {
        setAddress(e.target.value);
      }, 1000);

    }

    useEffect(() => {
      console.log(selectedOption);
    }, [selectedOption]);

    const handleSubmit = (e: any) => {
 


      
    }

  return (
    <ModernSearchPaper
      onSubmit={handleSubmit}
      elevation={0}
      sx={{ 
        p: theme.spacing(0.5), 
        display: 'flex', 
        alignItems: 'center',
        width: { xs: 280, sm: 350, md: 400 },
        minWidth: 280,
      }}
    >
        <Autocomplete
          id="location-search"
          options={suggest}
          sx={{ 
            flex: 1,
            '& .MuiOutlinedInput-root': {
              '& fieldset': {
                border: 'none',
              },
              '&:hover fieldset': {
                border: 'none',
              },
              '&.Mui-focused fieldset': {
                border: 'none',
              },
            },
            '& .MuiInputBase-root': {
              paddingRight: '8px !important',
            },
          }}
          renderInput={(params) => (
            <TextField 
              {...params} 
              placeholder="Search for locations..."
              onChange={handleSearchChange}
              variant="outlined"
              size="small"
              InputProps={{
                ...params.InputProps,
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon 
                      sx={{ 
                        color: theme.palette.primary.main,
                        ml: 1
                      }} 
                    />
                  </InputAdornment>
                ),
              }}
              sx={{
                '& .MuiInputBase-input': {
                  fontSize: '0.95rem',
                  fontWeight: 500,
                  color: theme.palette.text.primary,
                  '&::placeholder': {
                    color: theme.palette.text.secondary,
                    opacity: 0.8,
                  },
                },
              }}
            />
          )}
          getOptionLabel={(option: any) => option?.name || ''}
          onChange={(event, newValue) => {
            setSelectedOption(newValue);
            console.log(newValue);
            if(newValue){
              onSearchSubmit(newValue);
            }
          }}
          loading={loading}
          loadingText="Searching locations..."
          noOptionsText="No locations found"
        />
    </ModernSearchPaper>
  );
};

export default MapSearchBar;
