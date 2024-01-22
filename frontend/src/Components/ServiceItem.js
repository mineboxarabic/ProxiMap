import React, { useState } from "react";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import ButtonBase from "@mui/material/ButtonBase";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import useResource from "../Hooks/useResource";
import Avatar from "@mui/material/Avatar";
import Chip from "@mui/material/Chip";
import { useEffect } from "react";
import useAuth from "../Hooks/useAuth";
const ServiceItem = ({className, service, setHovered, setSelected, setSelectedPartner }) => {


  const [partner, setPartner] = useState(service?.partnerDetails?.[0]);
  const [category, setCategory] = useState(service?.categoryDetails?.[0]);

  const {auth} = useAuth();



  return (
    <ListItem
    className={className}
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
          backgroundColor: auth?.user?._id === partner?._id ? "secondary.main" : "primary.main",
        }}
      >
        <Box sx={{ width: "100%", height: "100%" }}> 
        <Typography variant="h5" sx={{color: "black", textAlign:"left"}}>{service.name}</Typography>

            <Box  sx={{display: "flex", flexDirection: "row"}}>
            
            <ListItemText 

            sx={{
            color: "lightgray",
            fontSize: "1rem",
            textAlign:"left"
            }}
            primary={`${service.range*100} m`} />

            <ListItemText primary={`${service.price} €`} sx={{textAlign:"left" , color: "lightgray", fontSize: "2rem" }}  />


            </Box>
            <Box sx={{display: "flex", flexDirection: "row"}}>
               <Avatar alt={partner?.username} src={partner?.profile?.profilePicture} sx={{width: "50px", height: "50px"}} />
                <Typography variant="h6">@{partner?.username}</Typography>
                
            </Box>

            <Box sx={{display: "flex", flexDirection: "row", justifyContent: "space-between"}}>
              <Chip label={category?.name || "no category"} />
            </Box>


        </Box>
      </ButtonBase>
    </ListItem>
  );
};

export default ServiceItem;
