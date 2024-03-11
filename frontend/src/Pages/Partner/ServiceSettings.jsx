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
import { TextareaAutosize } from '@mui/base/TextareaAutosize';


const ServiceSettings = ({handleDelete, isAsked}) =>{
    const {selectedService, setSelectedService} = useGeneral();
    const {getSelectedService, updateSelectedService,isServiceInHistory} = useServicesHistory();


    
    
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState(0);
    const [range, setRange] = useState(0);
    const [availability, setAvailability] = useState(false);
    const [date, setDate] = useState('');

    const [currentService, setCurrentService] = useState(null);


    useEffect(() => {

        setCurrentService(isServiceInHistory(selectedService) ? getSelectedService(selectedService) : selectedService);



    }, [selectedService]);


    useEffect(() => {
        
        
        if(currentService){
            if(isAsked){
                setName(currentService.name);
                setDescription(currentService.description);
                setPrice(currentService.price);
                const date = new Date(currentService.date);
                const formattedDate = date?.toISOString().split('T')[0];
                setDate(formattedDate);
            }else{
                setName(currentService.name);
                setDescription(currentService.description);
                setPrice(currentService.price);
                setRange(currentService.range);
                setAvailability(currentService.availability);
            }
        }
    }
    , [currentService]);



    useEffect(() => {
        if(!currentService) return;

        if(isAsked)
    {

        if(isServiceInHistory(currentService)){
            updateSelectedService({
                ...getSelectedService(currentService),
                name,
                description,
                price,
                date
            });
        }else{

        updateSelectedService({
            ...currentService,
            name,
            description,
            price,
            date
        });
    }
    }else{

        if(isServiceInHistory(currentService)){
            updateSelectedService({
                ...getSelectedService(currentService),
                name,
                description,
                price,
                range,
                availability
            });
        }else{
            updateSelectedService({
                ...currentService,
                name,
                description,
                price,
                range,
                availability
            });
        }


    }
      

    }, [name, description, price, range, availability, date]);


    return(
        <Box
            sx={
                {
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    '& > :not(style)': { m: 1, width: '90%' },
                    height: '100%',
                    backgroundColor: 'dark.main',

                }
            }
        >
            <Typography variant="h3"
                color={'light.main'}
            >Service Settings</Typography>
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

            <TextField id="outlined-basic" label="Dame" variant="filled"
            value={name}
            onChange={  (e) => setName(e.target.value)}
            />


            <TextField type="number" id="outlined-basic" label="Price €" variant="filled"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            />

            <TextareaAutosize id="outlined-basic" label="Description" variant="filled"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            minRows={3}
            style={{ 
                
                    fontSize: '1rem',

                width: '90%',
                
                maxWidth: '500px',
                 minWidth: '200px' }} // 
            />
                </Box>

{
    !isAsked &&<> 
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

        </>
    }

    {
        isAsked && <TextField
        id="date"
        label="Date"
        type="date"
        //defaultValue={date}
        value={date}
        InputLabelProps={{
            shrink: true,
        }}
        onChange={(e) => setDate(e.target.value)}
        />
    }
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
                    backgroundColor: 'dark.main',

                }}
            >
                
                <Typography color={'light.main'} variant="h4" component="div" gutterBottom>
                    No service selected
                </Typography>

                </Box>}
        </Box>
    )
}

export default ServiceSettings;