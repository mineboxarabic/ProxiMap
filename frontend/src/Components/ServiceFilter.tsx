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

function ServiceFilter({
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


            // @ts-expect-error TS(2339): Property 'id' does not exist on type 'never'.
            <MenuItem key={category.id} value={category.id}>{category.name}</MenuItem>
          ))}
        </Select>

        <Autocomplete 
        options={categories}


        // @ts-expect-error TS(2339): Property 'name' does not exist on type 'never'.
        getOptionLabel={(option) => option.name}
       



        // @ts-expect-error TS(2339): Property 'id' does not exist on type 'never'.
        value={categories.find((o) => o.id === categoryId) ?? categories[0]}
        onChange={(event, newValue) => {
          if (newValue) {


            // @ts-expect-error TS(2339): Property 'id' does not exist on type 'never'.
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
      // @ts-expect-error TS(2769): No overload matches this call.
      // @ts-expect-error TS(2769): No overload matches this call.
      // @ts-expect-error TS(2769): No overload matches this call.
      <Slider
        value={priceRange}
        onChange={handlePriceChange}
        valueLabelDisplay="auto"
        min={0}
        max={1000} // Assuming 100 is the maximum price possible

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
        
        // @ts-expect-error TS(2769): No overload matches this call.
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
