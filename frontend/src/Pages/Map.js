import { MapContainer, TileLayer, useMap, Marker, Popup } from "react-leaflet";
import { Box } from "@mui/system";
import "leaflet/dist/leaflet.css";

const Map = () => {
  return (
    <main>
        <h1>Map</h1>
    <Box sx={{ height: "70vh", width: "50%" }}>
        <MapContainer
            
        center={[51.505, -0.09]} zoom={13} scrollWheelZoom={false}>
        <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={[51.505, -0.09]}>
            <Popup>
            A pretty CSS3 popup. <br /> Easily customizable.
            </Popup>
        </Marker>
        </MapContainer>
    </Box>
    </main>
  );
};

export default Map;
