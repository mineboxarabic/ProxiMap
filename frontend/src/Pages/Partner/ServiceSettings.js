import useGeneral from "../../Hooks/useGeneral";
import { useEffect, useState } from "react";
import { TextField, Typography } from "@mui/material";
import { Slider } from "@mui/material";
import { Checkbox } from "@mui/material";

import { FormControlLabel } from "@mui/material";
import { Box } from "@mui/system";
import { Button } from "@mui/material";
import useResource from "../../Hooks/useResource";
import { Divider } from "@mui/material";
import useServicesHistory from "../../Hooks/useServicesHistory";

const ServiceSettings = ({handleDelete}) =>{
    const {selectedService, setSelectedService} = useGeneral();
    const {getSelectedService, updateSelectedService} = useServicesHistory();


    
    
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState(0);
    const [range, setRange] = useState(0);
    const [availability, setAvailability] = useState(false);

    const [currentService, setCurrentService] = useState(null);


    useEffect(() => {

        setCurrentService(getSelectedService());



    }, [selectedService]);


    useEffect(() => {
        if(currentService){
            setName(currentService.name);
            setDescription(currentService.description);
            setPrice(currentService.price);
            setRange(currentService.range);
            setAvailability(currentService.availability);
        }
    }
    , [currentService]);



    useEffect(() => {
        if(!currentService) return;
        updateSelectedService({
            ...currentService,
            name,
            description,
            price,
            range,
            availability
        });


    }, [name, description, price, range, availability]);


    return(
        <Box
            sx={
                {
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    '& > :not(style)': { m: 1, width: '90%' },
                    height: '100%',
                    backgroundColor: '#f5f5f5',

                }
            }
        >
            <h1>Service Settings</h1>
            <Divider />
            {currentService ?
            <>
                <Box 
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        '& > :not(style)': { m: 1, width: '90%' },

                    }}
                >

            <TextField id="outlined-basic" label="Dame" variant="outlined"
            value={name}
            onChange={  (e) => setName(e.target.value)}
            />

            <TextField id="outlined-basic" label="Description" variant="outlined"
            value={description}
            onChange={(e) => setDescription(e.target.value)}

            />

            <TextField type="number" id="outlined-basic" label="Price €" variant="outlined"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            />
                </Box>

        <Slider defaultValue={50} aria-label="Default" valueLabelDisplay="auto"
        value={range}
        max={5000}

        onChange={(e) => setRange(e.target.value)}
        />

    <FormControlLabel control={<Checkbox 
            defaultValue={availability}
            checked={availability}
            onChange={(e) => setAvailability(e.target.checked)}
        />} label="Availability" />
            <Divider />

        <Button variant="contained" color="error" onClick={handleDelete} >Delete</Button>


            </>: 
            
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    height: '100%',
                    '& > :not(style)': { m: 1, width: '90%' },
                    backgroundColor: '#f5f5f5',

                }}
            >
                
                <Typography variant="h4" component="div" gutterBottom>
                    No service selected
                </Typography>

                </Box>}
        </Box>
    )
}

export default ServiceSettings;