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
        const geoJsonLayer = L.geoJSON(countryGeoJSON as any).addTo(map);
    
            
    


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
    const [country, setCountry] = useState(getAllCountries.find((c: any) => c.code === 'FR'));

  

    //When we search we execute this function
    const onSearchSubmit = (value: any) => {
      const lat = value.lat;
      const lng = value.lng;


      // @ts-expect-error TS(2345): Argument of type '{ lat: any; lng: any; }' is not ... Remove this comment to see the full error message
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
      >
        
      <ServiceDetailsDrawer partner={selectedPartner} service={selected} open={isDrawerOpened} onClose={onCloseDrawer}/>


<Container maxWidth="xs" sx={{marginTop: '1rem', marginBottom: '1rem'}}>
<ThemedAutocomplete
    options={getAllCountries}
    value={country}
    onChange={(event: any, newValue: any) => {
      setCountry(newValue);
    }}
    getOptionDisabled={(option: any) => option.code !== 'FR'}
    getOptionLabel={(option: any) => option.name || ""}
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


                // @ts-expect-error TS(2339): Property 'lat' does not exist on type 'never'.
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
  