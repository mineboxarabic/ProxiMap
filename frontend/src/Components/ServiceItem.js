import React, { useState } from "react";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import ButtonBase from "@mui/material/ButtonBase";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import useResource from "../Hooks/useResource";
import Avatar from "@mui/material/Avatar";
const ServiceItem = ({ service, setHovered, setSelected, setSelectedPartner }) => {


  const [partner, setPartner] = useState(service?.partnerDetails[0]);
  return (
    <ListItem
      key={service._id}
      disablePadding
      onMouseEnter={() => setHovered(service)}
      onClick={() => {setSelected(service); setSelectedPartner(partner)}}
      sx={{
        width: "100%",
        backgroundColor: "primary.main",
        borderRadius: "10px",
        marginBottom: "10px",
      }}
    >
      <ButtonBase
        sx={{
          width: "100%",
          padding: "10px",
          paddingTop: "20px",
          paddingBottom: "20px",
          backgroundColor: "primary.main",
        }}
      >
        <Box sx={{ width: "100%", height: "100%" }}> 
            <Box >
            <Typography variant="h5" sx={{color: "black", textAlign:"left"}}>{service.name}</Typography>
            
            <ListItemText 

            sx={{
            color: "lightgray",
            fontSize: "1rem",
            textAlign:"left"
            
            }}
            primary={`${service.range*100} m`} />


            </Box>
            <Box sx={{display: "flex", flexDirection: "row", justifyContent: "space-between"}}>
               <Avatar alt={partner?.username} src={partner?.profile?.profilePicture} sx={{width: "50px", height: "50px"}} />
                <Typography variant="h6">{partner?.username}</Typography>
            </Box>

        </Box>
      </ButtonBase>
    </ListItem>
  );
};

export default ServiceItem;
