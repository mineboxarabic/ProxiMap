import Box from "@mui/material/Box";    
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import useResource from "../Hooks/useResource";
import { useEffect } from "react";
import ButtonBase from "@mui/material/ButtonBase";
import useGeneral from "../Hooks/useGeneral";
const ServiceList = ({setHovered,height}) => {
    const {oVServices} = useGeneral();


    useEffect(() => {
        console.log(oVServices);
    }, [oVServices]);

    return (
        <Box sx={{ maxHeight: height, overflow: 'auto' }}>
            <List>
                {oVServices?.length > 0 && oVServices.map((service) => {
                    return (
                        <ListItem key={service._id}
                            disablePadding
                            onMouseEnter={() => setHovered(service)}
                            sx={{ 
                                width: '100%',
                                backgroundColor: 'primary.main',
                                borderRadius: '10px',
                                marginBottom: '10px',
                            }}
                        >
                            <ButtonBase

                             sx={{ 
                                width: '100%',
                                padding: '10px',
                                paddingTop: '20px',
                                paddingBottom: '20px',
                                backgroundColor: 'primary.main',
                            }}>
                                <ListItemText primary={service.name} />
                                <ListItemText primary={service.range} />
                            </ButtonBase>
                        </ListItem>
                    );
                })}
            </List>
        </Box>
    )
}

export default ServiceList