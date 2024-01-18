import React from "react";
import { Box, Drawer } from "@mui/material";



const ServiceDetailsDrawer = ({ service, open, onClose, partner }) => {

    return (
        <Drawer
        anchor="bottom"
        open={open}
        onClose={onClose}
        sx={{
            "& .MuiDrawer-paper": { 
                height: '50vh',
                width: '100%',
                borderRadius: '10px 10px 0px 0px',
            },
        }}
        >
            {service && 
                service.name
            }
            {
                partner &&
                partner.username
            }
        </Drawer>
    );

};


export default ServiceDetailsDrawer;