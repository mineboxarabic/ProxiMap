import {
  MapContainer,
  TileLayer,
} from "react-leaflet";
import { Box } from "@mui/system";
import "leaflet/dist/leaflet.css";
import { useEffect, useState } from "react";
import "../../Style/Map.scss";
import MapEvents from "../../Helpers/MapEvents";
import { Alert, Typography } from "@mui/material";
import useCurrentUser from "../../Hooks/useCurrentUser";
// @ts-expect-error TS(2307): Cannot find module './ServiceMarkersContainer' or ... Remove this comment to see the full error message
import ServicMarkersContainer from "./ServiceMarkersContainer";
// @ts-expect-error TS(2307): Cannot find module './ServiceSettings' or its corr... Remove this comment to see the full error message
import ServiceSettings from "./ServiceSettings";

import { Snackbar } from "@mui/material";
import { Fab } from "@mui/material";
//import {AddIcon, SdStorage} from '@mui/icons-material';
import AddIcon from "@mui/icons-material/Add";
import SdStorage from "@mui/icons-material/SdStorage";
import NavigationIcon from "@mui/icons-material/Navigation";
import NewServiceModal from "./NewServiceModal.js";
import useServicesHistory from "../../Hooks/useServicesHistory.js";
import useResource from "../../Hooks/useResource.js";

const MapEdit = ({
  nameOfClass,
  defaultModel
}: any) => {
  const currentUser = useCurrentUser();

  const {
    resources: services,
    setResources: setServices,
    getAll: getAllServices,
    error: errorServices,
    loading: isLoadingServices,
  } = useResource(`/${nameOfClass}/partner/${currentUser?._id}`);

  const { updateDB, historyOfChanges,selectService, setSelectedService, selectedService,removeServiceFromHistory ,emptyHistory} = useServicesHistory();

  const [isSave, setIsSave] = useState(true);
  const [position, setPosition] = useState(null);

  //When we search we execute this function
  const onSearchSubmit = (value: any) => {
    
    const lat = value.lat;
    const lng = value.lng;
    // @ts-expect-error TS(2345): Argument of type '{ lat: any; lng: any; }' is not ... Remove this comment to see the full error message
    setPosition({ lat, lng });
  };

  const {
    update: updateService,
    create: createService,
    error: serviceError,
    setError: setServiceError,
    success: serviceSuccess,
    setSuccess: setServiceSuccess,
    remove: removeService,
    updateMultiple: updateServices,
  } = useResource(`/${nameOfClass}`);

  useEffect(() => {
    getAllServices();
  }, []);



  const handlSaveChanges = () => {
    setIsSave(true);
    setSelectedService(null);

    historyOfChanges.forEach((service: any) => {
      updateService(service);
    }
    );
  };




  useEffect(() => {
    emptyHistory();
  }, []);

  const handleDelete = () => {

    console.log('selectedServicessss', selectedService._id);


    removeService(selectedService._id);

    removeServiceFromHistory(selectedService);
    setSelectedService(null);



  };

  useEffect(() => {
    setIsSave(false);
  }, [historyOfChanges]);

  const handleAddService = async (tempModel: any) => {
    const newService = tempModel;

    nameOfClass === "services" ? (newService.userId = currentUser._id) : (newService.userId = currentUser._id);
    // @ts-expect-error TS(2531): Object is possibly 'null'.
    const centerPoint = currentBounds.getCenter();
    newService.position = {
      type: "Point",
      coordinates: [centerPoint.lng, centerPoint.lat],
    };
    console.log('newService', newService);

    await createService(newService);
    
  };

  useEffect(() => {
    const isSuccessful = serviceSuccess !== "";
    const isError = serviceError !== "";

    if (isSuccessful) {
      getAllServices();
      // @ts-expect-error TS(2345): Argument of type 'boolean' is not assignable to pa... Remove this comment to see the full error message
      setModal(false);

    }

    if (isError) {
      setServiceError("");
    }
  }, [serviceSuccess]);

  const [currentBounds, setCurrentBounds] = useState(null);
  const [modal, setModal] = useState(serviceSuccess);
  return (
    <Box>
      <NewServiceModal
        open={modal}
        // @ts-expect-error TS(2345): Argument of type 'boolean' is not assignable to pa... Remove this comment to see the full error message
        handleClose={() => setModal(false)}
        handleAdd={handleAddService}
        error={serviceError}
        modelClass={defaultModel}
        isAsked={nameOfClass === "services" ? false : true}
      />
      <Snackbar
        open={serviceSuccess !== ""}
        autoHideDuration={6000}
        onClose={() => {
          setServiceSuccess("");
        }}
      >
        <Alert
          onClose={() => {
            setServiceSuccess("");
          }}
          severity="success"
          sx={{ width: "100%" }}
        >
          Update Successful!
        </Alert>
      </Snackbar>

      <Snackbar
        open={serviceError !== ""}
        autoHideDuration={6000}
        onClose={() => {
          setServiceError("");
        }}
      >
        <Alert
          onClose={() => {
            setServiceError("");
          }}
          severity="error"
          sx={{ width: "100%" }}
        >
          {serviceError}
        </Alert>
      </Snackbar>

      <Box sx={{
            display: "flex",
            flexDirection:"row",
            width: "97%",
            justifyContent: "space-between",
            marginTop: "0.5rem",
            marginLeft: "auto",
            marginRight: "auto",
          }}>
        <Box
          sx={{
            height: "91vh",
            width: "70%",
            borderRadius: '1rem',
            overflow: 'hidden',

            
          }}
        >

          <MapContainer
            // @ts-expect-error TS(2322): Type '{ children: ("" | Element)[]; center: any[];... Remove this comment to see the full error message
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
              // @ts-expect-error TS(2322): Type '{ url: string; attribution: string; }' is no... Remove this comment to see the full error message
              attribution="&amp;copy OpenStreetMap contributors"
            />
            <Box sx={{
              position: 'absolute',
              zIndex:1000,
              width: '30%',
            }}>
              {/*<MapSearchBar onSearchSubmit={onSearchSubmit} />*/}
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
            <ServicMarkersContainer isAsked = {nameOfClass === "services" ? false : true}
             services={services}isLoadingServices={isLoadingServices}/>
            <Box
              sx={{ zIndex: 1000, position: "absolute", bottom: 0, right: 0 }}
            >
              <Fab
                // @ts-expect-error TS(2345): Argument of type 'boolean' is not assignable to pa... Remove this comment to see the full error message
                onClick={() => setModal(true)}
                sx={{ mr: 1, mb: 3, p: 4 }}
                color="primary"
                aria-label="add"
              >
                <AddIcon />
              </Fab>

              <Fab
                sx={{ mr: 1, mb: 3, p: 4 }}
                color="secondary"
                aria-label="save"
                onClick={handlSaveChanges}
              >
                <SdStorage />
              </Fab>
            </Box>
            <MapEvents setBounds={setCurrentBounds} setPosition={setPosition} />
          </MapContainer>

        </Box>
        <Box
          sx={{ width: { xs: "100%", md: "30%" } }}
        >
          {/*right side */}
          <ServiceSettings isAsked={nameOfClass === "services" ? false : true} 
           handleDelete={handleDelete} />
        </Box>
      </Box>
    </Box>
  );
};

export default MapEdit;
