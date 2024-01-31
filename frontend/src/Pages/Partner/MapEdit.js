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
import { Alert, Typography } from "@mui/material";
import useCurrentUser from "../../Hooks/useCurrentUser";
import useCurrentPartnerServices from "../../Hooks/Services/useCurrentPartnerServices";
import ServicMarkersContainer from "./ServiceMarkersContainer";
import { Button } from "@mui/material";
import ServiceSettings from "./ServiceSettings";
import useGeneral from "../../Hooks/useGeneral";
import useLocalStorage from "../../Hooks/useLocalStorage";
import useResource from "../../Hooks/useResource";

import { Snackbar } from "@mui/material";
import { Fab } from "@mui/material";
//import {AddIcon, SdStorage} from '@mui/icons-material';
import AddIcon from '@mui/icons-material/Add';
import SdStorage from '@mui/icons-material/SdStorage';
import NavigationIcon from '@mui/icons-material/Navigation';
import NewServiceModal from "./NewServiceModal.js";

const MapEdit = ({nameOfClass, defaultModel}) => {
  const currentUser = useCurrentUser();
  
  const {
    resources: services,
    getAll: getAllServices,
    error: errorServices,
    loading: isLoadingServices,
  } = useResource(`/${nameOfClass}/partner/${currentUser?._id}`);



  const { historyOfChanges, setSelectedService, setHistoryOfChanges } =
    useGeneral();
  
  

  const [isSave, setIsSave] = useState(true);
  const [position, setPosition] = useState(null);
  
  

  //When we search we execute this function
  const onSearchSubmit = (value) => {
    const lat = value.lat;
    const lng = value.lng;
    setPosition({ lat, lng });
  };

  const {
    update: updateService,
    create: createService,
    error: errorUpdateService,
    setError: setErrorUpdateService,
    success: updateSuccess,
    setSuccess: setUpdateSuccess,
  } = useResource(`/${nameOfClass}`);

  useEffect(() => {
    getAllServices();
  }, []);

  const handlSaveChanges = () => {
    setIsSave(true);
    setSelectedService(null);

    if (historyOfChanges?.length > 0) {
      historyOfChanges.forEach((service) => {
        updateService(service);
      });
    }
  };

  useEffect(() => {
    setIsSave(false);
  }, [historyOfChanges]);


  const handleAddService = (tempModel) =>{
      const newService = tempModel;

      newService.partnerId = currentUser._id;
      newService.position = {
        type: "Point",
        coordinates: [newService.position.coordinates[0], newService.position.coordinates[1]],
      };
      createService(newService);


      console.log('add service');
  }

  const [addNewMarker, setAddNewMarker] = useState(false);
  const [showNewMarker, setShowNewMarker] = useState(false);
  const [serviceModel, setServiceModel] = useState(defaultModel);
  const [modal, setModal] = useState(false);
  const [addError, setAddError] = useState('');

  return (
    <Box className={"main-container"}>

      <NewServiceModal 
      open={modal}
        handleClose={()=>setModal(false)}
        handleAdd={handleAddService}
        error={addError}
        modelClass={defaultModel}
      />
      <Snackbar
        open={updateSuccess !== ""}
        autoHideDuration={6000}
        onClose={() => {
          setUpdateSuccess("");
        }}
      >
        <Alert
          onClose={() => {
            setUpdateSuccess("");
          }}
          severity="success"
          sx={{ width: "100%" }}
        >
          Update Successful!
        </Alert>
      </Snackbar>

      <Snackbar
        open={errorUpdateService !== ""}
        autoHideDuration={6000}
        onClose={() => {
          setErrorUpdateService("");
        }}
      >
        <Alert
          onClose={() => {
            setErrorUpdateService("");
          }}
          severity="error"
          sx={{ width: "100%" }}
        >
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

            <Box>
              <Typography
                variant="h5"
                sx={{
                  zIndex: 1000,
                  position: "absolute",
                  top: 200,
                  left: 0,
                  color: isSave ? "green" : "red",
                }}
              >
                {isSave ? "Saved" : "Not Saved"}
              </Typography>
            </Box>

            {errorServices && (
              <Box className={"error-container"}>
                <Alert
                  sx={{
                    width: "100%",
                    zIndex: 1000,
                    position: "absolute",
                    top: 0,
                    left: 0,
                    right: 0,
                    margin: "auto",
                    height: "100%",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    fontSize: "2rem",
                  }}
                  severity="error"
                >
                  {errorServices}
                </Alert>
              </Box>
            )}
            <ServicMarkersContainer
              services={services}
              isLoadingServices={isLoadingServices}
            />
            <Box
              sx={{ zIndex: 1000, position: "absolute", bottom: 0, right: 0 }}
            >
            <Fab
              onClick={()=>setModal(true)}
            sx={{mr:1,mb:3, p:4}} color="primary" aria-label="add">
            
              <AddIcon />
            </Fab>

            <Fab sx={{mr:1,mb:3, p:4}} color="secondary" aria-label="save" 
              onClick={handlSaveChanges}
            >
              <SdStorage />
            </Fab>

             
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
