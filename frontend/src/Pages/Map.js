import { MapContainer, TileLayer, useMap, Marker, Popup, Circle, CircleMarker } from "react-leaflet";
import { Box } from "@mui/system";
import "leaflet/dist/leaflet.css";
import useResource from "../Hooks/useResource";
import { useEffect, useState } from "react";
import L from "leaflet";
import "../Style/Map.scss";
import MapEvents from "../Helpers/MapEvents";
import useInMapView from "../Hooks/Services/useInMapView";
import ServiceList from "../Components/ServiceList";
const Map = () => {
  const { services, isLoadingServices, errorServices, updateBounds } =
    useInMapView();
  const [positions, setPositions] = useState([]);
  const [position, setPosition] = useState(null);

  const [hovered, setHovered] = useState(null);

  const [height, setHeight] = useState("85vh");

  useEffect(() => {
    if (!isLoadingServices && services.length > 0) {
      const positions = services.map((service) => {
        return {
          lat: service.position.coordinates[1],
          lng: service.position.coordinates[0],
        };
      });
      setPositions(positions);
    }
  }, [services]);

  useEffect(() => {
    console.log(hovered);
  }, [hovered]);



  return (
    <Box
      sx={{
        width: "100%",
        display: "flex",
        flexDirection: "row",
      }}
    >
      <Box
        sx={{
          width: "70%",
          float: "left",
        }}
      >
        <Box sx={{ height: height }}>
          {/*TODO:add in case of error */}
          <MapContainer
            center={position ? [position.lat, position.lng] : [43.67248611471893 ,4.632794385153891 ]}
            zoom={12}
            scrollWheelZoom={true}
            id="mapid"
          >
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />

            {services.length > 0 ? (
              services.map((service, index) => {
                const isHovered = hovered?._id === service._id;
                const color = isHovered ? 'red' : '#FF8B87';
                const opacity = isHovered ? 1 : 0;
                return (
                  <Circle radius={service.range * 100} center={[service.position.coordinates[1], service.position.coordinates[0]]}
                  pathOptions={{color: color , opacity: opacity}}

                  //onCLick={setHovered(service)}
                  eventHandlers={
                    {
                      click: () => {
                        setHovered(service);
                      },
                    }                    
                  }
                  >
                    <Marker key={`${index}`} position={[service.position.coordinates[1], service.position.coordinates[0]]} icon={L.icon({
                      iconUrl:
                        "https://cdn.iconscout.com/icon/free/png-256/free-location-3079544-2561454.png",
                      iconSize: [30, 30],
                      iconAnchor: [12.5, 25],
                      popupAnchor: [0, -25],

                      eventHandlers: {
                        click: () => {
                          setHovered(service);
                        },
                      }
                    })}>
                      <Popup>
                        <h2>{service.name}</h2>
                        <h3>{service.description}</h3>
                      </Popup>
                    </Marker>
                    <Popup>
                    <h2>{service.name} can go for {service.range * 100}M From his house</h2>
                    </Popup>
                  </Circle>

                );
              })
            ) : (
              <h1>Loading...</h1>
            )}
            <MapEvents setBounds={updateBounds} setPosition={setPosition}/>
          </MapContainer>
        </Box>
      </Box>
      <Box sx={{ width: "30%" }}>
        <ServiceList height={height} setHovered={setHovered} />
      </Box>
    </Box>
  );
};

export default Map;
