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
// @ts-expect-error TS(7016): Could not find a declaration file for module 'leaf... Remove this comment to see the full error message
import L from "leaflet";
import "../Style/Map.scss";
import MapEvents from "../Helpers/MapEvents";
import useInMapView from "../Hooks/Services/useInMapView";
// @ts-expect-error TS(2307): Cannot find module '../Components/ServiceList' or ... Remove this comment to see the full error message
import ServiceList from "../Components/ServiceList";
// @ts-expect-error TS(2307): Cannot find module '../Components/ServiceDetailsDr... Remove this comment to see the full error message
import ServiceDetailsDrawer from "../Components/ServiceDetailsDrawer";
import { Button } from "@mui/material";
// @ts-expect-error TS(2307): Cannot find module '../Components/MapSearchBar' or... Remove this comment to see the full error message
import MapSearchBar from "../Components/MapSearchBar";
import { Alert } from "@mui/material";
import useCurrentUser from "../Hooks/useCurrentUser";
// @ts-expect-error TS(2307): Cannot find module '../Components/Map/MarkerServic... Remove this comment to see the full error message
import MarkerService from "../Components/Map/MarkerService";
import Container from "@mui/material/Container";
import useGeneral from "../Hooks/useGeneral";
// @ts-expect-error TS(2307): Cannot find module '../Components/ServiceFilter' o... Remove this comment to see the full error message
import ServiceFilter from "../Components/ServiceFilter";

const Map = () => {
  const {
    services,
    isLoadingServices,
    updateBounds: updateServiceBounds,
    errorServices,
  } = useInMapView(false);
  const {
    services: askedServices,
    isLoadingServices: isLoadingAskedServices,
    updateBounds: updateAskedBounds,
    errorServices: errorAskedServices,
  } = useInMapView(true);
  // @ts-expect-error TS(2339): Property 'oVServices' does not exist on type 'unkn... Remove this comment to see the full error message
  const { oVServices, setOVServices, oVAskedServices, setOVAskedServices } =
    useGeneral();
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

  const updateBounds = (bounds: any) => {
    updateServiceBounds(bounds);
    updateAskedBounds(bounds);
  };

  const currentUser = useCurrentUser();
  //When we search we execute this function
  const onSearchSubmit = (value: any) => {
    const lat = value.lat;
    const lng = value.lng;
    // @ts-expect-error TS(2345): Argument of type '{ lat: any; lng: any; }' is not ... Remove this comment to see the full error message
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

  const onFilterChange = (filter: any) => {};

  return (
    <Box
      sx={{
        backgroundColor: "dark.main",
      }}
    >
      <ServiceFilter onFilterChange={onFilterChange} />

      <ServiceDetailsDrawer
        partner={selectedPartner}
        service={selected}
        open={isDrawerOpened}
        onClose={onCloseDrawer}
      />
      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
          padding: "0",
          width: "96%",
          margin: "auto",
          justifyContent: "center",
          // border: '10px solid white',
          borderRadius: "10px",
          backgroundColor: "dark.main",
        height: { xs: "100vh", md: "90vh" },

        }}
      >
        <Box
          sx={{
            width: { xs: "100%", md: "70%" },
            height: { xs: "100%", md: "100%" },
          }}
        >
          {/*TODO:add in case of error */}

          <MapContainer
            // @ts-expect-error TS(2322): Type '{ children: any[]; center: any[]; zoom: numb... Remove this comment to see the full error message
            center={
              position
                // @ts-expect-error TS(2339): Property 'lat' does not exist on type 'never'.
                ? [position.lat, position.lng]
                : [43.67248611471893, 4.632794385153891]
            }
            zoom={12}
            minZoom={6}
            maxZoom={18}
            scrollWheelZoom={true}
            id="mapid"
          >
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              // @ts-expect-error TS(2322): Type '{ url: string; attribution: string; }' is no... Remove this comment to see the full error message
              attribution="&amp;copy OpenStreetMap contributors"
            />
            <Box
              sx={{
                position: "absolute",
                top: "5rem",
              }}
            >
              <MapSearchBar onSearchSubmit={onSearchSubmit} />
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

            {errorAskedServices && (
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
                  {errorAskedServices}
                </Alert>
              </Box>
            )}

            {oVServices?.length > 0 ? (
              oVServices.map((service: any, index: any) => {
                return <MarkerService service={service} isAsked={false} />;
              })
            ) : (
              <h1>Loading...</h1>
            )}

            {oVAskedServices?.length > 0 ? (
              oVAskedServices.map((service: any, index: any) => {
                return <MarkerService service={service} isAsked={true} />;
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
            width: "30%",
            overflow: "auto",
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
