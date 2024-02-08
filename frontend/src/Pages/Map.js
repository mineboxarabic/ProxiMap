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
import useResource from "../Hooks/useResource";
import { useEffect, useState } from "react";
import L from "leaflet";
import "../Style/Map.scss";
import MapEvents from "../Helpers/MapEvents";
import useInMapView from "../Hooks/Services/useInMapView";
import ServiceList from "../Components/ServiceList";
import ServiceDetailsDrawer from "../Components/ServiceDetailsDrawer";
import { Button } from "@mui/material";
import MapSearchBar from "../Components/MapSearchBar";
import { Alert } from "@mui/material";
import useCurrentUser from "../Hooks/useCurrentUser";
import MarkerService from "../Components/Map/MarkerService";
import Container from "@mui/material/Container";
import useGeneral from "../Hooks/useGeneral";
import ServiceFilter from "../Components/ServiceFilter";

const Map = () => {
  const { services, isLoadingServices, updateBounds:updateServiceBounds , errorServices} = useInMapView(false);
  const { services:askedServices, isLoadingServices:isLoadingAskedServices, updateBounds:updateAskedBounds , errorServices:errorAskedServices} = useInMapView(true);
  const { oVServices,setOVServices, oVAskedServices, setOVAskedServices } = useGeneral();
  const [isDrawerOpened, setIsDrawerOpened] = useState(false);

  const [position, setPosition] = useState(null);

  const [hovered, setHovered] = useState(null);
  const [selected, setSelected] = useState(null);
  const [selectedPartner, setSelectedPartner] = useState(null);

  const [height, setHeight] = useState("85vh");

  //This function is to close the drawer
  const onCloseDrawer = () => {
    setSelected(null);
  };

  const updateBounds = (bounds) => {
    updateServiceBounds(bounds);
    updateAskedBounds(bounds);
  }

  const currentUser = useCurrentUser();
  //When we search we execute this function
  const onSearchSubmit = (value) => {
    const lat = value.lat;
    const lng = value.lng;
    setPosition({ lat, lng });
  };

  useEffect(() => { 
    console.log("services", services.length);

  }, [services]);



  useEffect(() => {
    if (selected) {
      setIsDrawerOpened(true);
    } else {
      setIsDrawerOpened(false);
    }
  }, [selected]);

  const onFilterChange = (filter) => {
     /* const {categoryId, priceRange, minimumRating, serviceType, serviceStatus} = filter;
    let filteredServices = services.filter(service => {
      let isValid = true;
      if(categoryId){
        isValid = isValid && service.categoryId == categoryId;
      }
      return isValid;

    });
    console.log(filteredServices);
    */



  }
  useEffect(() => {
    console.log(oVServices);
  } , [oVServices]);
  return (
      <Box 
        sx={{
          backgroundColor: 'dark.main',

        }}
      >

      <ServiceDetailsDrawer partner={selectedPartner} service={selected} open={isDrawerOpened} onClose={onCloseDrawer}/>
      <Box
      
        sx={{
          display: "flex",
          flexDirection: { xs: "column", md: "row"},
          height: { xs: "100vh", md: "90vh"},
          padding: '0',
          width: '96%',
          margin: 'auto',
          justifyContent: 'center',
         // border: '10px solid white',
          borderRadius: '10px',
          backgroundColor: 'dark.main',
        }}
      >


        <Box sx={{
          width: { xs: '100%', md: '70%'},
          height: { xs: '100%', md: '100%'},
          
        }}>
          {/*TODO:add in case of error */}

        <ServiceFilter onFilterChange={onFilterChange}/>
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


            {
            errorServices && (
            <Box className={"error-container"}>
              <Alert 
                 sx={{ width: '100%' , zIndex: 1000, position: 'absolute', top: 0, left: 0, right: 0, margin: 'auto', height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center', fontSize: '2rem'}}
              severity="error">{errorServices}</Alert>
            </Box>
            )
          
            }

            {
            errorAskedServices && (
            <Box className={"error-container"}>
              <Alert 
                 sx={{ width: '100%' , zIndex: 1000, position: 'absolute', top: 0, left: 0, right: 0, margin: 'auto', height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center', fontSize: '2rem'}}
              severity="error">{errorAskedServices}</Alert>
            </Box>
            )
          
            }



            {

            oVServices?.length > 0 ? (
              oVServices.map((service, index) => {
                return (
                  <MarkerService service={service} isAsked={false}/>
                );
              })


            ) : (
              <h1>Loading...</h1>
            )}

          {

          oVAskedServices?.length > 0 ? (
            oVAskedServices.map((service, index) => {
              return (
                <MarkerService service={service}  isAsked={true}/>
              );
            })
          ) : (
            <h1>Loading...</h1>
          )}
            <MapEvents
              position={position}
              setBounds={updateBounds}
              setPosition={setPosition}
            />
          </MapContainer>
        </Box>



        <Box 
          sx={{
            width: '30%',
            overflow: 'auto',
         
                
       
          }}
        >
          <ServiceList
            
            //height={height}
            setSelectedPartner={setSelectedPartner}
            onCloseDrawer={onCloseDrawer}
            setSelected={setSelected}
            setHovered={setHovered}

          />
        </Box>
      </Box>


    </Box>
  );
};

export default Map;
