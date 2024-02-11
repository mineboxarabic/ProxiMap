import React, { useState, useEffect } from 'react';
import { Box, FormControl, InputLabel, Select, MenuItem, Typography, Slider, FormGroup, FormControlLabel, Checkbox, TextField } from '@mui/material';
import Rating from '@mui/material/Rating';
import useAxiosPrivate from '../Hooks/useAxiosPrivate';
import useGeneral from '../Hooks/useGeneral';
import { Autocomplete } from '@mui/material';

function ServiceFilter({ onFilterChange }) {
  const [categoryId, setCategoryId] = useState('');
  const [priceRange, setPriceRange] = useState([0, 10]);
  const [availability, setAvailability] = useState(false);
  const [minimumRating, setMinimumRating] = useState(0);
  const [serviceType, setServiceType] = useState('');
  const [serviceStatus, setServiceStatus] = useState('');

  const [categories, setCategories] = useState([]);
  const axiosPrivate = useAxiosPrivate();
  const {filters, setFilters} = useGeneral();
  useEffect(() => {
    const fetchData = async () => {
        const response = await axiosPrivate.get('/categorys');
        setCategories(response.data.map(category => {return {id: category._id, name: category.name}}));
    };
    fetchData();
}, []);

  const handleCategoryChange = (event) => {
    setCategoryId(event.target.value);
  };

  const handlePriceChange = (event, newValue) => {
    setPriceRange(newValue);
  };

  const handleAvailabilityChange = (event) => {
    setAvailability(event.target.checked);
  };

  const handleRatingChange = (event, newValue) => {
    setMinimumRating(newValue);
  };

  const handleServiceTypeChange = (event) => {
    setServiceType(event.target.value);
  };

  const handleServiceStatusChange = (event) => {
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


    setFilters(
      {
        categoryId,
        priceRange,
        availability,
        minimumRating,
        serviceType,
        serviceStatus,
      }
    )
  }, [categoryId, priceRange, availability, minimumRating, serviceType, serviceStatus]);

  return (
    <Box sx={{ 
      
     padding: '20px' ,
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      gap: '20px',
      backgroundColor: 'dark.main',
      borderRadius: '10px 10px 0px 0px'
      }}>
      <FormControl fullWidth margin="normal">
        <InputLabel id="category-select-label">Category</InputLabel>
        <Select
          labelId="category-select-label"
          id="category-select"
          value={categoryId}
          label="Category"
         
          //Clear the category input 
        sx={{
          display: 'none'
        }}  
          

          onChange={handleCategoryChange}
        >
          {categories.map((category) => (
            <MenuItem key={category.id} value={category.id}>{category.name}</MenuItem>
          ))}
        </Select>

        <Autocomplete 
        options={categories}
        getOptionLabel={(option) => option.name}
       

        value={categories.find((o) => o.id === categoryId) ?? categories[0]}
        onChange={(event, newValue) => {
          if (newValue) {
            setCategoryId(newValue.id);
          }
          else{
            setCategoryId('');
          
          }
        }}
        renderInput={(params) => <TextField {...params} label="Category" variant="filled" />}
      />

      </FormControl>

      <Typography color={"light.main"} id="price-range-slider" gutterBottom>
        Price Range €
      </Typography>
      <Slider
        value={priceRange}
        onChange={handlePriceChange}
        valueLabelDisplay="auto"
        min={0}
        max={1000} // Assuming 100 is the maximum price possible
        margin="normal"
        sx={{
          width: '200px',
        }}
      />

      <FormGroup>
        <FormControlLabel control={<Checkbox sx={{
          color: 'light.main'
        
        }}
          checked={availability} onChange={handleAvailabilityChange} />}
          sx={{
          color: 'light.main'
        
        }}
          label="Available Only" />
      </FormGroup>

      <Typography sx={{
          color: 'light.main'
        
        }} variant='filled' component="legend">Minimum Rating</Typography>
      <Rating
      sx={{
 
        color: 'primary.main'
,
        //make the border color of the rating stars white
        '& .MuiRating-iconEmpty': {
          borderColor: 'white',
          color: 'light.main',

        }

      }}
        name="simple-controlled"
        value={minimumRating}
        disabled
      //  onChange={handleRatingChange}
        margin="normal"
      />

      <TextField
        label="Service Type"
        value={serviceType}
        onChange={handleServiceTypeChange}
        fullWidth
        margin="normal"
        variant="filled"
      />

      <FormControl fullWidth margin="normal">
        <InputLabel id="service-status-label">Service Status</InputLabel>
        <Select
          labelId="service-status-label"
          id="service-status-select"
          value={serviceStatus}
          label="Service Status"
          onChange={handleServiceStatusChange}
          sx={{
            color: 'dark.main',
            backgroundColor: 'light.main'
          }}
        >
          {statusOptions.map((status) => (
            <MenuItem key={status} value={status}>{status}</MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  );
}

export default ServiceFilter;
