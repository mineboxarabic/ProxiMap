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

const Map = () => {
  const { services, isLoadingServices, updateBounds , errorServices} = useInMapView();


  const [isDrawerOpened, setIsDrawerOpened] = useState(false);

  const [positions, setPositions] = useState([]);
  const [position, setPosition] = useState(null);

  const [hovered, setHovered] = useState(null);
  const [selected, setSelected] = useState(null);
  const [selectedPartner, setSelectedPartner] = useState(null);

  const [height, setHeight] = useState("85vh");

  //This function is to close the drawer
  const onCloseDrawer = () => {
    setSelected(null);
  };

  const currentUser = useCurrentUser();
  //When we search we execute this function
  const onSearchSubmit = (value) => {
    const lat = value.lat;
    const lng = value.lng;
    setPosition({ lat, lng });
  };


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

  useEffect(() => {
    if (selected) {
      setIsDrawerOpened(true);
    } else {
      setIsDrawerOpened(false);
    }
  }, [selected]);

  return (
    <Box className={"main-container"}>
      <ServiceDetailsDrawer
        partner={selectedPartner}
        service={selected}
        open={isDrawerOpened}
        onClose={onCloseDrawer}
      />
      <Box className={"map-container"}>
        <Box className={"map"}>
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
            {services.length > 0 ? (
              services.map((service, index) => {
                const isHovered = hovered?._id === service._id;
                const opacity = isHovered ? 1 : 0;

                const isSameUser = currentUser._id === service.partnerId;
                
                
                const color = isSameUser ? isHovered ?  "darkred" : "red" : isHovered ? "darkblue" : "blue";

                return (
                  <Circle
                    key={index}
                    radius={service.range}
                    center={[
                      service.position.coordinates[1],
                      service.position.coordinates[0],
                    ]}
                    pathOptions={{ color: color, opacity: opacity }}
                    //onCLick={setHovered(service)}
                    eventHandlers={{
                      click: () => {
                        setHovered(service);
                        setSelected(service);
                      },
                    }}
                  >
                    <Marker
                      key={`${index}`}
                      position={[
                        service.position.coordinates[1],
                        service.position.coordinates[0],
                      ]}
                      icon={L.icon({
                        iconUrl:
                        isSameUser ? "https://cdn-icons-png.flaticon.com/512/7711/7711464.png" : "https://cdn.iconscout.com/icon/free/png-256/free-location-3079544-2561454.png",
                        iconSize: [30, 30],
                        iconAnchor: [12.5, 25],
                        popupAnchor: [0, -25],

                        eventHandlers: {
                          click: () => {
                            setHovered(service);
                            setSelected(service);
                          },
                        },
                      })}
                    >
                      <Popup>
                        <h2>{service.name}</h2>
                        <h3>{service.description}</h3>
                      </Popup>
                    </Marker>
                    <Popup>
                      <h2>
                        {service.name} can go for {service.range * 100}M From
                        his house
                      </h2>
                    </Popup>
                  </Circle>
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
        <Box className={"service-list-container"}>
          <ServiceList
            
            height={height}
            setSelectedPartner={setSelectedPartner}
            onCloseDrawer={onCloseDrawer}
            setSelected={setSelected}
            setHovered={setHovered}

          />
        </Box>
      </Box>

      <Box className={"footer"}>
        <h1>Footer</h1>
      </Box>
    </Box>
  );
};

export default Map;
