import { MapContainer, TileLayer, useMap, Marker, Popup } from "react-leaflet";
import { Box } from "@mui/system";
import "leaflet/dist/leaflet.css";
import useResource from "../Hooks/useResource";
import { useEffect, useState } from "react";
import L from "leaflet";
import '../Style/Map.scss';
import MapEvents from "../Helpers/MapEvents";
import useInMapView from "../Hooks/Services/useInMapView";
import { Position } from "../Classes/Interfaces";

const Map = () => {



  // @ts-expect-error TS(2554): Expected 1 arguments, but got 0.
  const { services, isLoadingServices, errorServices, updateBounds} = useInMapView();
  const [servicesWithPositions, setServicesWithPositions] = useState<any[]>([]);
  const [height, setHeight] = useState('95vh');


  useEffect(() => {
    if (!isLoadingServices && services.length > 0) {
      const newServicesWithPositions = services.map((service) => {
        return {
          ...service,
          position: {
            lat: service.position.coordinates[1],
            lng: service.position.coordinates[0],
          },
        };
      });
      setServicesWithPositions(newServicesWithPositions);
    }
  }, [services]);

  return (

      <Box
        sx={{
            height: height,
        }}
      >
        
        <MapContainer
          center={[60.192059, 24.945831]}
          zoom={12}
          scrollWheelZoom={true}
          id="mapid"
        >
          <TileLayer


            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />

          {servicesWithPositions.length > 0 ? (
            servicesWithPositions.map((service) => {
              return (
                <Marker
                  key={service._id}

                
                  position={[service.position.lat, service.position.lng]}


                  icon={L.icon({
                    iconUrl:
                      "https://cdn.iconscout.com/icon/free/png-256/free-location-3079544-2561454.png",
                    iconSize: [25, 25],
                    iconAnchor: [12.5, 25],
                    popupAnchor: [0, -25],
                  })}
                >
                  <Popup>
                    A pretty CSS3 popup. <br /> Easily customizable.
                  </Popup>
                </Marker>
              );
            })
          ) : (
            <h1>Loading...</h1>
          )}
        <MapEvents setBounds={updateBounds} />

        </MapContainer>

      </Box>
  );
};

export default Map;
