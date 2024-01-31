import useGeneral from "../../Hooks/useGeneral";
import { useEffect, useState } from "react";
import { TextField } from "@mui/material";
import { Slider } from "@mui/material";
import { Checkbox } from "@mui/material";

import { FormControlLabel } from "@mui/material";
import { Box } from "@mui/system";
import { Button } from "@mui/material";
import useResource from "../../Hooks/useResource";

const ServiceSettings = ({handleDelete}) =>{
    const {selectedService, setSelectedService} = useGeneral();


    return(
        <div>
            <h1>Service Settings</h1>
            {selectedService ?
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
            value={selectedService.name}
            onChange={(e) => setSelectedService({...selectedService, name: e.target.value})}
            />

            <TextField id="outlined-basic" label="Description" variant="outlined"
            value={selectedService.description}
            onChange={(e) => setSelectedService({...selectedService, description: e.target.value})}
            />

            <TextField type="number" id="outlined-basic" label="Price €" variant="outlined"
            value={selectedService.price}
            onChange={(e) => setSelectedService({...selectedService, price: parseInt(e.target.value)})}
            />
                </Box>

        <Slider defaultValue={50} aria-label="Default" valueLabelDisplay="auto"
        value={selectedService.range}
        max={5000}

        onChange={(e) => setSelectedService({...selectedService, range: e.target.value})}
        />

    <FormControlLabel control={<Checkbox 
            defaultValue={selectedService.availability}
            checked={selectedService.availability}
            onChange={(e) => setSelectedService({...selectedService, availability: e.target.checked})}
            
        />} label="Availability" />

        <Button variant="contained" color="error" onClick={handleDelete} >Delete</Button>


            </>: <h1>No service selected</h1>}
        </div>
    )
}

export default ServiceSettings;