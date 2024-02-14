import { MapContainer, TileLayer, useMap, Marker, Popup } from "react-leaflet";
import { Box } from "@mui/system";
import "leaflet/dist/leaflet.css";
import useResource from "../Hooks/useResource";
import { useEffect, useState } from "react";
// @ts-expect-error TS(7016): Could not find a declaration file for module 'leaf... Remove this comment to see the full error message
import L from "leaflet";
import '../Style/Map.scss';
import MapEvents from "../Helpers/MapEvents";
import useInMapView from "../Hooks/Services/useInMapView";

const Map = () => {

  // @ts-expect-error TS(2554): Expected 1 arguments, but got 0.
  const { services, isLoadingServices, errorServices, updateBounds} = useInMapView();
  const [positions, setPositions] = useState([]);
  const [height, setHeight] = useState('95vh');


  useEffect(() => {
    if (!isLoadingServices && services.length > 0) {
      const positions = services.map((service) => {
        // @ts-expect-error TS(2339): Property 'position' does not exist on type 'never'... Remove this comment to see the full error message
        return { lat: service.position.coordinates[1], lng: service.position.coordinates[0] };
      });
      // @ts-expect-error TS(2345): Argument of type '{ lat: any; lng: any; }[]' is no... Remove this comment to see the full error message
      setPositions(positions);
    }
  }, [services]);

  return (

      <Box
        sx={{
            height: height,
        }}
      >
        
        <MapContainer
          // @ts-expect-error TS(2322): Type '{ children: (Element | Element[])[]; center:... Remove this comment to see the full error message
          center={[60.192059, 24.945831]}
          zoom={12}
          scrollWheelZoom={true}
          id="mapid"
        >
          <TileLayer
            // @ts-expect-error TS(2322): Type '{ attribution: string; url: string; }' is no... Remove this comment to see the full error message
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />

          {positions.length > 0 ? (
            positions.map((position, index) => {
              return (
                <Marker
                  key={`${index}`}
                  // @ts-expect-error TS(2339): Property 'lat' does not exist on type 'never'.
                  position={[position.lat, position.lng]}
                  // @ts-expect-error TS(2322): Type '{ children: Element; key: string; position: ... Remove this comment to see the full error message
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
