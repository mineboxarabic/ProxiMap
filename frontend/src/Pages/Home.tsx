import { MapContainer, TileLayer, useMap, Marker, Popup } from "react-leaflet";
import { Box } from "@mui/system";
import "leaflet/dist/leaflet.css";


// @ts-expect-error TS(2307): Cannot find module '../assets/images/map_backgroun... Remove this comment to see the full error message
import backgroundImg from '../assets/images/map_background.jpg';
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import ProductHero from "./Home/ProductHero";
import ProductValues from "./Home/ProductValues";

const Home = () => {
    //https://github.com/mui/material-ui/tree/master/docs/src/modules
  return (
    <Box  sx={{ height: "100vh", width: "100%" }}>
        <ProductHero />
        <ProductValues   />
        
        {/*
      <ProductCategories />
      <ProductHowItWorks />
      <ProductCTA />
      <ProductSmokingHero />
        */}


    </Box>
  );
};

export default Home;
