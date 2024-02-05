import Box from "@mui/material/Box";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import useResource from "../Hooks/useResource";
import { useEffect } from "react";
import ButtonBase from "@mui/material/ButtonBase";
import useGeneral from "../Hooks/useGeneral";
import ServiceItem from "./ServiceItem";
import Divider from "@mui/material/Divider";
import { Typography } from "@mui/material";
const ServiceList = ({
  setHovered,
  height,
  setSelected,
  onCloseDrawer,
  setSelectedPartner,
}) => {
  const { oVServices, oVAskedServices } = useGeneral();

  onCloseDrawer = () => {
    setSelected(null);
  };

  return (
    <Box>
      <List
        sx={{
          //center the list
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        {oVServices?.length > 0 ? (
          oVServices.map((service, index) => {
            return (
              <>
                <Divider />
                <ServiceItem
                  key={index}
                  service={service}
                    setSelectedPartner={setSelectedPartner}
                  setHovered={setHovered}
                  setSelected={setSelected}
                  isAsked={true}
                />
              </>
            );
          })
        ) : (
          <ListItem>
            <Typography
              variant="h4"
              sx={{
                color: "black",
                textAlign: "center",
                width: "100%",
                marginTop: "20px",
                //make bold,
                weight: "bold",
              }}
            >
              No services found in this area
            </Typography>
          </ListItem>
        )}

        {oVAskedServices?.length > 0 ? (
          oVAskedServices.map((service, index) => {
            return (
              <>
                <Divider />
                <ServiceItem
                  key={index}
                  setSelectedPartner={setSelectedPartner}
                  service={service}
                  setHovered={setHovered}
                  setSelected={setSelected}
                  isAsked={true}
                />
              </>
            );
          })
        ) : (
          <ListItem>
            <Typography
              variant="h4"
              sx={{
                color: "black",
                textAlign: "center",
                width: "100%",
                marginTop: "20px",
                //make bold,
                weight: "bold",
              }}
            >
              No services found in this area
            </Typography>
          </ListItem>
        )}
      </List>
    </Box>
  );
};

export default ServiceList;
