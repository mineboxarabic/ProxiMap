import * as React from "react";

import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";
//import Typography from '../components/Typography';
import { Typography } from "@mui/material";

import ExploreIcon from "@mui/icons-material/Explore";
import EventIcon from "@mui/icons-material/Event";
import HandymanIcon from "@mui/icons-material/Handyman";
import { styled } from "@mui/material/styles";

const item = {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  px: 5,
};
const TypoStyled = styled(Typography)(({ theme }) => ({
  // @ts-expect-error TS(2339): Property 'light' does not exist on type 'Palette'.
  color: theme.palette.light.main,
}));
function ProductValues() {
  return (
    <Box
      component="section"
      sx={{ display: "flex", overflow: "hidden", bgcolor: "dark.main" }}
    >
      <Container sx={{ mt: 15, mb: 30, display: "flex", position: "relative" }}>
        <Box
          component="img"
          src="/static/themes/onepirate/productCurvyLines.png"
          alt="curvy lines"
          sx={{ pointerEvents: "none", position: "absolute", top: -180 }}
        />
        <Grid container spacing={5}>
          <Grid item xs={12} md={4}>
            <Box sx={item}>
              <ExploreIcon sx={{ fontSize: 60 , color:"white"}} />
              <TypoStyled variant="h4" sx={{ my: 5, textAlign:'center' }}>
                Discover Local Gems
              </TypoStyled>
              <TypoStyled variant="h5">
                {
                  "Dive into the heart of your community with our curated selection of local shops, cozy cafes, and unique pop-up events. Find your new favorite spot just around the corner!"
                }
              </TypoStyled>
            </Box>
          </Grid>
          <Grid item xs={12} md={4}>
            <Box sx={item}>
              <EventIcon sx={{ fontSize: 60 , color:"white"}} />
              <TypoStyled variant="h4" sx={{ my: 5 , textAlign:'center'}}>
                Community Events
              </TypoStyled>
              <TypoStyled variant="h5">
                {
                  "From neighborhood block parties to local workshops, stay updated with the latest happenings. Get involved and connect with your neighbors!"
                }
              </TypoStyled>
            </Box>
          </Grid>
          <Grid item xs={12} md={4}>
            <Box sx={item}>
              <HandymanIcon sx={{ fontSize: 60 , color:"white"}} />
              <TypoStyled variant="h4" sx={{ my: 5 , textAlign:'center'}}>
                Local Services
              </TypoStyled>
              <TypoStyled variant="h5">
                {
                  "Need a hand? Our platform connects you with trusted local service providers—from plumbers to tutors. Support local businesses and get the job done!"
                }
              </TypoStyled>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}

export default ProductValues;
