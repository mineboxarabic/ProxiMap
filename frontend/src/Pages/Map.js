import { MapContainer, TileLayer, useMap, Marker, Popup } from "react-leaflet";
import { Box } from "@mui/system";
import "leaflet/dist/leaflet.css";
import useResource from "../Hooks/useResource";
import { useEffect , useState} from "react";
import L from "leaflet";
const Map = () => {
  const { resources: services, getAll:getAllServices ,setResources:setServices ,loading:isLoadingServices} = useResource("/services");
  
  const [positions, setPositions] = useState([]); //[{lat: 51.505, lng: -0.09}

  const getAllServicesMap = async () => {
    await getAllServices();
  }

  useEffect(() => {
    getAllServicesMap();
  } , []);


  useEffect(() => {

    if(!isLoadingServices){
        const positions = services.map((service) => {
          return {lat: service.position.lat, lng: service.position.lng}
        })
    }
    console.log(positions.length);
  }
  , [services, isLoadingServices])



  return (
    <main>
        <h1>Map</h1>
    <Box sx={{ height: "70vh", width: "50%" }}>
        <MapContainer

        center={[43.67640691069694, 4.627836379640283]} zoom={13} scrollWheelZoom={false}>
        <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {positions.length > 0 ? positions.map((position) => {
          console.log("lenttts",position.lng)

           return <Marker key={position.lat} position={[position.lat, position.lng]}
              icon={L.icon({
                iconUrl: 'https://cdn.iconscout.com/icon/free/png-256/free-location-3079544-2561454.png',
                iconSize: [25, 25],
                iconAnchor: [12.5, 25],
                popupAnchor: [0, -25]
              })
              }
            >
            <Popup>
                A pretty CSS3 popup. <br /> Easily customizable.
            </Popup>
            </Marker>
        }
        ):
          <h1>Loading...</h1>
        }
       
        </MapContainer>
    </Box>
    </main>
  );
};

export default Map;
