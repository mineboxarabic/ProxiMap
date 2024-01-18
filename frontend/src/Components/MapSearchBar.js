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

    


  return (
    <Paper
      component="form"
      sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', width: 400 }}
      onSubmit={handleSubmit}
    >
      {/*<Autocomplete
        freeSolo
        
        onInputChange={handleSearchChange}
        inputValue={searchTerm}
        renderInput={(params) => (
          <TextField
            {...params}
            sx={{ ml: 1, flex: 1 }}
            placeholder="Search in map"
            inputProps={{ ...params.inputProps, 'aria-label': 'search in map' }}
          />
        )}
        />*/}
        <TextField
        sx={{ ml: 1, flex: 1 }}
        placeholder="Search in map"
        onChange={handleSearchChange}
        value={searchTerm}
        inputProps={{ 'aria-label': 'search in map' }}
        />

      <IconButton type="submit" sx={{ p: '10px' }} aria-label="search">
        <SearchIcon />
      </IconButton>

      
    </Paper>
  );
};

export default MapSearchBar;
