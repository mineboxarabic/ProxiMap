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
        marginBottom: "10px",
        //center the list
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <ButtonBase
        sx={{
          width: "95%",
          padding: "10px",
          backgroundColor: auth?.user?._id === partner?._id ? "#599965" : "#46909C",
          boxShadow:  auth?.user?._id === partner?._id ?'rgba(0, 0, 0, 0.12) 0px 1px 3px, rgba(0, 0, 0, 0.24) 0px 1px 2px' :  'rgb(38, 57, 77) 0px 20px 30px -10px;',

          borderRadius: "10px",
        }}  
      >
        <Box sx={{ width: "100%", height: "100%" }}> 
        <Typography variant="h5" sx={{color: "black", textAlign:"left"}}>{service.name}</Typography>

            <Box  sx={{display: "flex", flexDirection: "row"}}>
            
            <ListItemText 

            sx={{
           
            fontSize: "1rem",
            textAlign:"left"
            }}
            primary={`${service.range*100} m`} />

            <ListItemText primary={`${service.price} €`} sx={{textAlign:"left" , fontSize: "2rem" }}  />


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
