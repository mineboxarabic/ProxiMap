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
  import { useEffect, useState } from "react";
  import L from "leaflet";
  import "../../Style/Map.scss";
  import MapEvents from "../../Helpers/MapEvents";
  import useInMapView from "../../Hooks/Services/useInMapView";
  import ServiceList from "../../Components/ServiceList";
  import ServiceDetailsDrawer from "../../Components/ServiceDetailsDrawer";
  import MapSearchBar from "../../Components/MapSearchBar";
  import { Alert } from "@mui/material";
  import useCurrentUser from "../../Hooks/useCurrentUser";
import useCurrentPartnerServices from "../../Hooks/Services/useCurrentPartnerServices";
import ServicMarkersContainer from "./ServiceMarkersContainer";
import { Button } from "@mui/material";
import ServiceSettings from "./ServiceSettings";
import useGeneral from "../../Hooks/useGeneral";
import useLocalStorage from "../../Hooks/useLocalStorage";
import useResource from "../../Hooks/useResource";

import { Snackbar } from "@mui/material";

  const MapEdit = () => {
    const { services, isLoadingServices, updateBounds , errorServices} = useCurrentPartnerServices();
   
    const {selectedService, setSelectedService} = useGeneral();
    const {historyOfChanges, setHistoryOfChanges} = useGeneral();
  
    const [positions, setPositions] = useState([]);
    const [position, setPosition] = useState(null);

    //When we search we execute this function
    const onSearchSubmit = (value) => {
      const lat = value.lat;
      const lng = value.lng;
      setPosition({ lat, lng });
    };

    const {resources: service, setResource: setService , update: updateService
        , error: errorUpdateService, setError: setErrorUpdateService,
        loading: isLoadingUpdateService,
        success: updateSuccess, setSuccess: setUpdateSuccess
    } = useResource(`/services`);

        useEffect(() => {
            console.log('error', errorUpdateService);
        }, [errorUpdateService]);


  const handlSaveChanges = () => {
    if (historyOfChanges?.length > 0) {
        historyOfChanges.forEach((service) => {
            updateService(service);
        });
    }
  }
    //I use this useEffect to update the positions of the services onChange of the services
    useEffect(() => {
      if (!isLoadingServices && services?.length > 0) {
        const positions = services.map((service) => {
          return {
            lat: service?.position?.coordinates[1],
            lng: service?.position?.coordinates[0],
          };
        });
        setPositions(positions);
      }
    }, [services]);
  
  
    return (
      <Box className={"main-container"}>

       <Snackbar open={updateSuccess !== ''} autoHideDuration={6000} onClose={() => {setUpdateSuccess('');}}>
        <Alert onClose={() => {
          setUpdateSuccess('');
        }} severity="success" sx={{ width: '100%' }}>
          Update Successful!
        </Alert>
      </Snackbar>

      <Snackbar open={errorUpdateService !== ''} autoHideDuration={6000} onClose={() => {setErrorUpdateService('');}}>
        <Alert onClose={() => {
          setErrorUpdateService('');
        }} severity="error" sx={{ width: '100%' }}>
            {errorUpdateService}
        </Alert>
      </Snackbar>

        <Box className={"map-container"}>
          <Box className={"map"}>
  
  
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
              <Box className={"search-bar-container"}>
                <MapSearchBar onSearchSubmit={onSearchSubmit} />
              </Box>
  
              {errorServices && (
              <Box className={"error-container"}>
                <Alert 
                   sx={{ width: '100%' , zIndex: 1000, position: 'absolute', top: 0, left: 0, right: 0, margin: 'auto', height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center', fontSize: '2rem'}}
                severity="error">{errorServices}</Alert>
              </Box>
            )}
                <ServicMarkersContainer
                    services={services}
                    isLoadingServices={isLoadingServices}
                />
              <MapEvents
                position={position}
                setBounds={updateBounds}
                setPosition={setPosition}
              />
            <Box 
                sx={{ zIndex: 1000, 
                    position: 'absolute', 
                    bottom: 0, 
                    right: 0,
                }}

            >
                <Button 
                    sx={{ 
                        fontSize: '1.5rem',
                    }}
                variant="contained"
                 color="primary" 
                 
                 onClick={handlSaveChanges}
                 >
                    Save
                </Button>
              </Box>
            </MapContainer>
          </Box>
          <Box
            className={"service-list-container"}
            sx={{ width: { xs: "100%", md: "30%" } }}
          >
                {/*right side */}
                <ServiceSettings />
          </Box>
        </Box>
  

      </Box>
    );
  };
  
  export default MapEdit;
  