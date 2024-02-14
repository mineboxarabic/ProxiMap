import React, { useEffect } from "react";
import { Avatar, Box, Button, Divider, Drawer, Link } from "@mui/material";
import Typography from "@mui/material/Typography";
import Badge from "@mui/material/Badge";
import useCurrentUser from "../Hooks/useCurrentUser";
// @ts-expect-error TS(2307): Cannot find module './UserDetailsModal' or its cor... Remove this comment to see the full error message
import UserDetailsModal from "./UserDetailsModal";

const ServiceDetailsDrawer = ({
  service,
  open,
  onClose
}: any) => {
  //IF the service has an attribute called userId then it's asked
  const isAsked = service?.userId ? true : false;
  const partner = service?.partnerDetails?.[0] || service?.usersDetails?.[0];

  const currentUser = useCurrentUser();

  const isSameUser = currentUser?._id === partner?._id || currentUser?._id === service?.userId;
  useEffect(() => {
    console.log(isAsked);
  }, [service]);

  return (
    <Drawer
      anchor="bottom"

      open={open}
      onClose={onClose}
      sx={{
        "& .MuiDrawer-paper": {
          height: "50vh",
          width: "100%",
          borderRadius: "10px 10px 0px 0px",
          backgroundColor:"light.main",


        },
   
      }}
    >
      

      {service && (
        <Box  p={2}>
          <Box className="drawer-user-detail-container" sx={{ display: "flex", marginBottom: "1rem" }}>
           
           
           <div className="drawer-user-detail">
            <Avatar
              alt={partner?.username}
              src={partner?.profile?.profilePicture}
              sx={{ width: "50px", height: "50px" }}
            />

            <Box
              p={0}
              marginLeft={2}
                className="drawer-user-detail-text"
            >
              <Badge className="badge" badgeContent={partner?.role} color="primary">
                <Typography p={0} variant="h6" gutterBottom>
                  <Link
                    href={`services/edit`}
                    underline="none"
                    color="inherit"
                    sx={{
                      display: "none",
                    }}
                  >
                    @{partner?.username}
                  </Link>
                  <UserDetailsModal user={partner} />
                </Typography>
                </Badge>
   
              // @ts-expect-error TS(2769): No overload matches this call.
              <Typography p={0} marginTop={-2} variant="p" gutterBottom>
                {partner?.profile?.bio}
              </Typography>
            </Box>
            </div>



            <Box className="drawer-buttons" sx={{ marginLeft: "auto" }}>
              {isSameUser && (
                <Button variant="outlined" color="primary" onClick={
                  () =>{
                    window.location.href = `/services/edit`;
                  }
                }>
                  Edit
                </Button>
              )}

              <Button variant="outlined" color="primary">
                Contact
              </Button>
              <Button variant="outlined" color="error">
                Report
              </Button>
            </Box>
          </Box>
          <Box >

            {
              !isAsked &&
           <Typography sx={{
            marginTop: "0.1rem",
            marginBottom: "0.1rem",
            color: service?.availability ? "success.main" : "error.main",
          
          }} variant="h6" gutterBottom>
            {service?.availability ? "Available" : "Not available"}
          </Typography>
            }
 {
  isAsked && (
    //Render date
    <Typography sx={{
      marginTop: "0.1rem",
      marginBottom: "0.1rem",
      color: "dark.main",
    }} variant="h6" gutterBottom>
      {new Date(service?.date).toLocaleDateString()}
    </Typography>
  )
 }

            {
              service?.status && (
                <Typography sx={{
                  marginTop: "0.1rem",
                  marginBottom: "0.1rem",
                  color: () => {
                    if (service?.status === "pending") {
                      return "warning.main";
                    } else if (service?.status === "accepted") {
                      return "success.main";
                    } else if (service?.status === "rejected") {
                      return "error.main";
                    }
                  }
                }} variant="h6" gutterBottom>
                  {service?.status}
                </Typography>
              )
            }


          </Box>
          <Divider />
                {
                  isAsked && (
                    <Typography sx={{
                      marginTop: "0.1rem",
                      marginBottom: "0.1rem",
                      color: "primary.main",
                    }} variant="h6" gutterBottom>
                      Asked service
                    </Typography>
                  )
                }
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
