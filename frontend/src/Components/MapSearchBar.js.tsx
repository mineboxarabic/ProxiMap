import React, { useEffect, useState } from 'react';
import TextField from '@mui/material/TextField';
import Paper from '@mui/material/Paper';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';
import useGeoAPI from '../Hooks/useGeoAPI';
import Autocomplete from '@mui/material/Autocomplete';
const MapSearchBar = ({
  onSearchSubmit
}: any) => {
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
    <Paper
      component="form"
      onSubmit={handleSubmit}
     // className='search-bar'
      // @ts-expect-error TS(1117): An object literal cannot have multiple properties ... Remove this comment to see the full error message
      sx={{ p: '2px', display: 'absolute', top: '10px', left: '10px', zIndex: 1000, position: 'absolute', width: '300px', display: 'flex', alignItems: 'center' }}
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

      // @ts-expect-error TS(2339): Property 'name' does not exist on type 'never'.
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
