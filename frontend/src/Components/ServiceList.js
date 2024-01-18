import Box from "@mui/material/Box";    
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import useResource from "../Hooks/useResource";
import { useEffect } from "react";
import ButtonBase from "@mui/material/ButtonBase";
import useGeneral from "../Hooks/useGeneral";
import ServiceItem from "./ServiceItem";
const ServiceList = ({setHovered,height,setSelected,onCloseDrawer, setSelectedPartner}) => {
    const {oVServices} = useGeneral();


    onCloseDrawer = () => {
        setSelected(null);
    }

    useEffect(() => {
        console.log(oVServices);
    }, [oVServices]);

    return (
        <Box sx={{ maxHeight: height, overflow: 'auto' }}>
            <List>
                {oVServices?.length > 0 && oVServices.map((service) => {
                    return (
                        <ServiceItem setSelectedPartner={setSelectedPartner} service={service} setHovered={setHovered} setSelected={setSelected} />
                    );
                })}
            </List>
        </Box>
    )
}

export default ServiceList