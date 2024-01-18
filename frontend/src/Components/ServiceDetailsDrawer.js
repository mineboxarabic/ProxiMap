import React from "react";
import { Avatar, Box, Button, Divider, Drawer, Link } from "@mui/material";
import Typography from "@mui/material/Typography";
import Badge from "@mui/material/Badge";

const ServiceDetailsDrawer = ({ service, open, onClose }) => {
    const partner = service?.partnerDetails[0];

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
             {service && (
                <Box p={2}>
                    <Box sx={{display: "flex", marginBottom:"1rem"} }>
                        <Avatar alt={partner?.username} src={partner?.profile?.profilePicture} sx={{width: "50px", height: "50px"}} />
                        
                        <Box p={0} marginLeft={2} sx={{display: "flex", flexDirection: "column", justifyContent: "center"}}>
                        <Badge badgeContent={partner?.role} color="primary">
                            <Typography p={0}  variant="h6" gutterBottom><Link href={`/profile/${partner?._id}`} underline="none" color="inherit">@{partner?.username}</Link></Typography>
                        </Badge>
                            <Typography p={0} marginTop={-2} variant="p" gutterBottom>{partner?.profile?.bio}</Typography>
                        </Box>

                        <Button sx={{marginLeft: "auto"}} variant="outlined" color="primary">Contact</Button>
                        <Button sx={{marginLeft: "1rem"}} variant="outlined" color="error">Report</Button>

                    </Box>
                    <Divider />


                    <Typography marginTop={"1rem"} variant="h3" gutterBottom>
                        {service.name}
                    </Typography>
                    <Typography variant="h5" gutterBottom>
                        {service.description}
                    </Typography>



                </Box>
            )}
        </Drawer>
    );

};


export default ServiceDetailsDrawer;