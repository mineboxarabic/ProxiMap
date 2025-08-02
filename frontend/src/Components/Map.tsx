import { MapContainer, TileLayer, useMap, Marker, Popup, Circle } from "react-leaflet";
import { Box } from "@mui/system";
import "leaflet/dist/leaflet.css";
import useResource from "../Hooks/useResource";
import { useEffect, useState, Fragment } from "react";
import L from "leaflet";
import '../Style/Map.scss';
import MapEvents from "../Helpers/MapEvents";
import useInMapView from "../Hooks/Services/useInMapView";
import useGeneral from "../Hooks/useGeneral";

const Map = () => {



  const { services, isLoadingServices, errorServices, updateBounds} = useInMapView(false);
  const [servicesWithPositions, setServicesWithPositions] = useState<any[]>([]);
  const [height, setHeight] = useState('95vh');


  useEffect(() => {
    if (!isLoadingServices && services.length > 0) {
      const newServicesWithPositions = services.map((service: any) => {
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
              const circleStyle = { color: '#329FB2', fillColor: '#329FB2', fillOpacity: 0.2, weight: 1 };
                  return (
                    <Fragment key={service._id}>
                      <Marker
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
                      <Circle
                        center={[service.position.lat, service.position.lng]}
                        radius={service.range}
                        pathOptions={circleStyle}
                      />
                    </Fragment>
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