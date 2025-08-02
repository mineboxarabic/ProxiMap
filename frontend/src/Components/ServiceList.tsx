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
  setSelectedPartner
}: any) => {


  // @ts-expect-error TS(2339): Property 'oVServices' does not exist on type '{}'.
  const { oVServices, oVAskedServices } = useGeneral();



  onCloseDrawer = () => {
    setSelected(null);
  };

  return (
    <Box
      sx={{
        height: '100%',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column'
      }}
    >
      <List
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          overflow: "auto",
          height: "100%",
          padding: 1,
          '&::-webkit-scrollbar': {
            width: '8px',
          },
          '&::-webkit-scrollbar-track': {
            background: 'rgba(0,0,0,0.1)',
            borderRadius: '10px',
          },
          '&::-webkit-scrollbar-thumb': {
            background: 'rgba(50, 159, 178, 0.3)',
            borderRadius: '10px',
            '&:hover': {
              background: 'rgba(50, 159, 178, 0.5)',
            },
          },
        }}
      >
        {oVServices?.length > 0 && (
          oVServices.map((service: any, index: any) => {
            return (
              <>
                <Divider />
                <ServiceItem
                  key={index}
                  service={service}
                  setSelectedPartner={setSelectedPartner}
                  setHovered={setHovered}
                  setSelected={setSelected}
                  isAsked={false}
                />
              </>
            );
          })
        ) }

        {oVAskedServices?.length > 0 && (
          oVAskedServices.map((service: any, index: any) => {
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
        ) }
        {
          oVServices?.length === 0 && oVAskedServices?.length === 0 &&
        (
          <ListItem>
            <Typography
              variant="h4"
              sx={{
                color: "light.main",
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
