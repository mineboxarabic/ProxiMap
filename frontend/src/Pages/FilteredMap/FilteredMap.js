import {
    MapContainer,
    TileLayer,
    useMap,
    Marker,
    Popup,
    Circle,
    CircleMarker,
  } from "react-leaflet";
  import { Box } from "@mui/system";
  import "leaflet/dist/leaflet.css";
  import useResource from "../../Hooks/useResource";
  import { useEffect, useState } from "react";
  import L from "leaflet";
  import "../../Style/Map.scss";
  import MapEvents from "../../Helpers/MapEvents";
  import useInMapView from "../../Hooks/Services/useInMapView";
  import ServiceList from "../../Components/ServiceList";
  import ServiceDetailsDrawer from "../../Components/ServiceDetailsDrawer";
  import { Button } from "@mui/material";
  import MapSearchBar from "../../Components/MapSearchBar";
  import { Alert } from "@mui/material";
  import useCurrentUser from "../../Hooks/useCurrentUser";
  import MarkerService from "../../Components/Map/MarkerService";
  import countryGeoJSON from '../../data/france.json';
  import { Autocomplete } from "@mui/material";
  import TextField from "@mui/material/TextField";
import useGeoAPI from "../../Hooks/useGeoAPI";
import getAllCountries from "../../data/allCountries.json";
import { Container } from "@mui/material";
import { ThemedAutocomplete } from "./ThemedAutocomplete";

  function SetBounds() {
    const map = useMap();
  
    useEffect(() => {
      if (!countryGeoJSON) {
        console.error('GeoJSON data is not loaded correctly');
        return;
      }
  
      try {
        const geoJsonLayer = L.geoJSON(countryGeoJSON).addTo(map);
        map.fitBounds(geoJsonLayer.getBounds());
        map.setMaxBounds(geoJsonLayer.getBounds());
        map.setMinZoom(map.getZoom());
        //remove blue outlines
        map.getContainer().style.outline = 'none';


        geoJsonLayer.setStyle({
       //Remove the every color of the country
          fillColor: 'transparent',
          fillOpacity: 0,
          color: 'transparent',
          weight: 0,
        });
    
            
    


      } catch (error) {
        console.error('Failed to add GeoJSON layer:', error);
      }
    }, [map]);





    return null;
  }
  
  const FilteredMap = () => {

    const currentUser = useCurrentUser();

    //const { services, isLoadingServices, updateBounds:updateServiceBounds , errorServices} = useInMapView(false);
   // const { services:askedServices, isLoadingServices:isLoadingAskedServices, updateBounds:updateAskedBounds , errorServices:errorAskedServices} = useInMapView(true);
    
   
   
   //To open the drawer
   const [isDrawerOpened, setIsDrawerOpened] = useState(false);
  //To go to a position if we search
   const [position, setPosition] = useState(null);
   //To keep track of the selected partner
   const [selectedPartner, setSelectedPartner] = useState(null);
    //To keep track of the selected service
    const [selected, setSelected] = useState(null);
    //Selected contry
    const [country, setCountry] = useState(getAllCountries.find(c => c.code === 'FR'));

  

    //When we search we execute this function
    const onSearchSubmit = (value) => {
      const lat = value.lat;
      const lng = value.lng;
      setPosition({ lat, lng });
    };
  
    const onCloseDrawer = () => {
      setSelected(null);
    }

  
  
  
    useEffect(() => {
      if (selected) {
        setIsDrawerOpened(true);
      } else {
        setIsDrawerOpened(false);
      }
    }, [selected]);
  
    return (
        <Box 
          sx={{
            backgroundColor: '#1B262C',
  
          }}
        >
          
        <ServiceDetailsDrawer partner={selectedPartner} service={selected} open={isDrawerOpened} onClose={onCloseDrawer}/>


<Container maxWidth="xs" sx={{marginTop: '1rem', marginBottom: '1rem'}}>
<ThemedAutocomplete
      options={getAllCountries}
      value={country}
      onChange={(event, newValue) => {
        setCountry(newValue);
      }}
      getOptionDisabled={(option) => option.code !== 'FR'}
      getOptionLabel={(option) => option.name || ""}
    />

</Container>
        <Box
        
          sx={{
            display: "flex",
            flexDirection: { xs: "column", md: "row"},
            height: { xs: "100vh", md: "90vh"},
            padding: '0',
            width: '96%',
            margin: 'auto',
            justifyContent: 'center',
            borderRadius: '10px',
            backgroundColor: '#1B262C',
          }}
        >
  
  
          <Box sx={{
            width: { xs: '100%', md: '70%'},
            height: { xs: '100%', md: '100%'},
            
          }}>
            {/*TODO:add in case of error */}
  
        
            <MapContainer
              center={
                position
                  ? [position.lat, position.lng]
                  : [43.67248611471893, 4.632794385153891]
              }
              zoom={12}
              scrollWheelZoom={true}
              id="mapid"
            >
              <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution="&amp;copy OpenStreetMap contributors"
              />
              <Box 
              sx={{
                position: 'absolute',
                top: '5rem',
              }}
              >
                <MapSearchBar onSearchSubmit={onSearchSubmit} />
              </Box>
  

              <MapEvents
                position={position}
              //  setBounds={updateBounds}
                setPosition={setPosition}
              />
              <SetBounds />
            </MapContainer>
          </Box>
  
  
  
          <Box 
            sx={{
              width: '30%',
              overflow: 'auto',
            }}
          >
          {  <ServiceList
              
           
              setSelectedPartner={setSelectedPartner}
              onCloseDrawer={onCloseDrawer}
              setSelected={setSelected}

  
          />}
          </Box>
        </Box>
  
  
      </Box>
    );
  };
  
  export default FilteredMap;
  