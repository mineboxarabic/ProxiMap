import React, { useEffect, useState } from 'react';
import TextField from '@mui/material/TextField';
import Paper from '@mui/material/Paper';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';
import useGeoAPI from '../Hooks/useGeoAPI';
import Autocomplete from '@mui/material/Autocomplete';
const MapSearchBar = ({ onSearchSubmit }) => {
    const {setAddress, getSuggestions, loading, suggest} = useGeoAPI();
    const [searchTerm, setSearchTerm] = useState('');

    const [selectedOption, setSelectedOption] = useState(null);

    
    const handleSearchChange = (e) => {
      setSearchTerm(e.target.value);
      setTimeout(() => {
        setAddress(e.target.value);
      }, 1000);

    }

    useEffect(() => {
      console.log(selectedOption);
    }, [selectedOption]);

    const handleSubmit = (e) => {
 


      
    }

  return (
    <Paper
      component="form"
      onSubmit={handleSubmit}
      className='search-bar'
    >

        <Autocomplete

          id="combo-box-demo"
          options={suggest}
          sx={{ ml: 1, flex: 1 }}
          renderInput={(params) => <TextField {...params} 
          placeholder="Search in map"
          onChange={handleSearchChange}
          label="Search in map" />
        
    }

      getOptionLabel={(option) => option.name || ''}
      onChange={(event, newValue) => {
        setSelectedOption(newValue);
        console.log(newValue);
        if(newValue){
          onSearchSubmit(newValue);
        }
      } }
        />

      <IconButton type="submit" sx={{ p: '10px' }} aria-label="search">
        <SearchIcon />
      </IconButton>

      
    </Paper>
  );
};

export default MapSearchBar;
