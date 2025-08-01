import React, { useState, useEffect } from 'react';
import { 
  Box, 
  FormControl, 
  InputLabel, 
  Select, 
  MenuItem, 
  Typography, 
  Slider, 
  FormGroup, 
  FormControlLabel, 
  Checkbox, 
  TextField,
  Grid,
  Chip,
  Stack,
  Divider
} from '@mui/material';
import { useTheme, alpha } from '@mui/material/styles';
import Rating from '@mui/material/Rating';
import useAxiosPrivate from '../Hooks/useAxiosPrivate';
import useGeneral from '../Hooks/useGeneral';
import { Autocomplete } from '@mui/material';

function ServiceFilterNew({
  onFilterChange
}: any) {
  const theme = useTheme();
  const [categoryId, setCategoryId] = useState('');
  const [priceRange, setPriceRange] = useState([0, 10]);
  const [availability, setAvailability] = useState(false);
  const [minimumRating, setMinimumRating] = useState(0);
  const [serviceType, setServiceType] = useState('');
  const [serviceStatus, setServiceStatus] = useState('');

  const [categories, setCategories] = useState([]);
  const axiosPrivate = useAxiosPrivate();

  // @ts-expect-error TS(2339): Property 'filters' does not exist on type '{}'.
  const {filters, setFilters} = useGeneral();
  
  useEffect(() => {
    const fetchData = async () => {
        const response = await axiosPrivate.get('/categorys');
        setCategories(response.data.map((category: any) => {return {id: category._id, name: category.name}}));
    };
    fetchData();
  }, []);

  const handleCategoryChange = (event: any) => {
    setCategoryId(event.target.value);
  };

  const handlePriceChange = (event: any, newValue: any) => {
    setPriceRange(newValue);
  };

  const handleAvailabilityChange = (event: any) => {
    setAvailability(event.target.checked);
  };

  const handleRatingChange = (event: any, newValue: any) => {
    setMinimumRating(newValue);
  };

  const handleServiceTypeChange = (event: any) => {
    setServiceType(event.target.value);
  };

  const handleServiceStatusChange = (event: any) => {
    setServiceStatus(event.target.value);
  };

  // Service status options
  const statusOptions = ['pending', 'accepted', 'rejected'];

  // Propagate changes to the parent component
  useEffect(() => {
    onFilterChange({
      categoryId,
      priceRange,
      availability,
      minimumRating,
      serviceType,
      serviceStatus,
    });

    setFilters({
      categoryId,
      priceRange,
      availability,
      minimumRating,
      serviceType,
      serviceStatus,
    });
  }, [categoryId, priceRange, availability, minimumRating, serviceType, serviceStatus]);

  return (
    <Box>
      <Grid container spacing={3}>
        {/* Category Selection */}
        <Grid item xs={12}>
          <Typography 
            variant="subtitle2" 
            sx={{ 
              mb: 1, 
              color: theme.palette.text.primary,
              fontWeight: 600 
            }}
          >
            Category
          </Typography>
          <Autocomplete 
            options={categories}
            getOptionLabel={(option: any) => option?.name || ''}
            value={categories.find((o: any) => o.id === categoryId) || null}
            onChange={(event, newValue) => {
              if (newValue) {
                setCategoryId((newValue as any).id);
              } else {
                setCategoryId('');
              }
            }}
            renderInput={(params) => (
              <TextField 
                {...params} 
                placeholder="Select category..."
                variant="outlined"
                size="small"
                sx={{
                  '& .MuiOutlinedInput-root': {
                    backgroundColor: theme.palette.background.paper,
                    borderRadius: theme.spacing(1.5),
                    '& fieldset': {
                      border: `1px solid ${alpha(theme.palette.primary.main, 0.2)}`,
                    },
                    '&:hover fieldset': {
                      border: `1px solid ${alpha(theme.palette.primary.main, 0.4)}`,
                    },
                    '&.Mui-focused fieldset': {
                      border: `2px solid ${theme.palette.primary.main}`,
                    },
                  },
                }}
              />
            )}
          />
        </Grid>

        {/* Price Range */}
        <Grid item xs={12}>
          <Typography 
            variant="subtitle2" 
            sx={{ 
              mb: 2, 
              color: theme.palette.text.primary,
              fontWeight: 600 
            }}
          >
            Price Range: €{priceRange[0]} - €{priceRange[1]}
          </Typography>
          <Slider
            value={priceRange}
            onChange={handlePriceChange}
            valueLabelDisplay="auto"
            min={0}
            max={1000}
            sx={{
              color: theme.palette.primary.main,
              '& .MuiSlider-thumb': {
                boxShadow: `0 4px 12px ${alpha(theme.palette.primary.main, 0.4)}`,
                '&:hover': {
                  boxShadow: `0 6px 16px ${alpha(theme.palette.primary.main, 0.6)}`,
                },
              },
              '& .MuiSlider-track': {
                background: `linear-gradient(90deg, ${theme.palette.primary.main} 0%, ${theme.palette.secondary.main} 100%)`,
              },
              '& .MuiSlider-rail': {
                backgroundColor: alpha(theme.palette.grey[400], 0.3),
              },
            }}
          />
        </Grid>

        {/* Rating */}
        <Grid item xs={12}>
          <Typography 
            variant="subtitle2" 
            sx={{ 
              mb: 1, 
              color: theme.palette.text.primary,
              fontWeight: 600 
            }}
          >
            Minimum Rating
          </Typography>
          <Rating
            value={minimumRating}
            onChange={handleRatingChange}
            precision={0.5}
            sx={{
              '& .MuiRating-iconFilled': {
                color: theme.palette.warning.main,
              },
              '& .MuiRating-iconHover': {
                color: theme.palette.warning.light,
              },
            }}
          />
        </Grid>

        <Grid item xs={12}>
          <Divider sx={{ my: 1 }} />
        </Grid>

        {/* Service Type */}
        <Grid item xs={12} sm={6}>
          <Typography 
            variant="subtitle2" 
            sx={{ 
              mb: 1, 
              color: theme.palette.text.primary,
              fontWeight: 600 
            }}
          >
            Service Type
          </Typography>
          <TextField
            value={serviceType}
            onChange={handleServiceTypeChange}
            placeholder="Enter service type..."
            variant="outlined"
            size="small"
            fullWidth
            sx={{
              '& .MuiOutlinedInput-root': {
                backgroundColor: theme.palette.background.paper,
                borderRadius: theme.spacing(1.5),
                '& fieldset': {
                  border: `1px solid ${alpha(theme.palette.primary.main, 0.2)}`,
                },
                '&:hover fieldset': {
                  border: `1px solid ${alpha(theme.palette.primary.main, 0.4)}`,
                },
                '&.Mui-focused fieldset': {
                  border: `2px solid ${theme.palette.primary.main}`,
                },
              },
            }}
          />
        </Grid>

        {/* Service Status */}
        <Grid item xs={12} sm={6}>
          <Typography 
            variant="subtitle2" 
            sx={{ 
              mb: 1, 
              color: theme.palette.text.primary,
              fontWeight: 600 
            }}
          >
            Status
          </Typography>
          <FormControl fullWidth size="small">
            <Select
              value={serviceStatus}
              onChange={handleServiceStatusChange}
              displayEmpty
              sx={{
                backgroundColor: theme.palette.background.paper,
                borderRadius: theme.spacing(1.5),
                '& .MuiOutlinedInput-notchedOutline': {
                  border: `1px solid ${alpha(theme.palette.primary.main, 0.2)}`,
                },
                '&:hover .MuiOutlinedInput-notchedOutline': {
                  border: `1px solid ${alpha(theme.palette.primary.main, 0.4)}`,
                },
                '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                  border: `2px solid ${theme.palette.primary.main}`,
                },
              }}
            >
              <MenuItem value="">
                <em>Any Status</em>
              </MenuItem>
              {statusOptions.map((status) => (
                <MenuItem key={status} value={status}>
                  <Chip
                    label={status.charAt(0).toUpperCase() + status.slice(1)}
                    size="small"
                    color={
                      status === 'accepted' ? 'success' : 
                      status === 'rejected' ? 'error' : 'default'
                    }
                    variant="outlined"
                  />
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>

        {/* Availability Checkbox */}
        <Grid item xs={12}>
          <FormControlLabel
            control={
              <Checkbox
                checked={availability}
                onChange={handleAvailabilityChange}
                sx={{
                  color: alpha(theme.palette.primary.main, 0.6),
                  '&.Mui-checked': {
                    color: theme.palette.primary.main,
                  },
                }}
              />
            }
            label={
              <Typography variant="body2" sx={{ fontWeight: 500 }}>
                Only show available services
              </Typography>
            }
          />
        </Grid>
      </Grid>
    </Box>
  );
}

export default ServiceFilterNew;
