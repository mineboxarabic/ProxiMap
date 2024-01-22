import useGeneral from "../../Hooks/useGeneral";
import { useEffect, useState } from "react";
import { TextField } from "@mui/material";
import { Slider } from "@mui/material";
import { Checkbox } from "@mui/material";

import { FormControlLabel } from "@mui/material";
const ServiceSettings = () =>{
    const {selectedService, setSelectedService} = useGeneral();

    return(
        <div>
            <h1>Service Settings</h1>
            {selectedService ? 
            <>



            <TextField id="outlined-basic" label="Outlined" variant="outlined"
            value={selectedService.name}
            onChange={(e) => setSelectedService({...selectedService, name: e.target.value})}
            />

            <TextField id="outlined-basic" label="Outlined" variant="outlined"
            value={selectedService.description}
            onChange={(e) => setSelectedService({...selectedService, description: e.target.value})}
            />

            <TextField id="outlined-basic" label="Outlined" variant="outlined"
            value={selectedService.price}
            onChange={(e) => setSelectedService({...selectedService, price: e.target.value})}
            />

        <Slider defaultValue={50} aria-label="Default" valueLabelDisplay="auto"
        value={selectedService.range}
        max={5000}

        onChange={(e) => setSelectedService({...selectedService, range: e.target.value})}
        />

<FormControlLabel control={<Checkbox 
        checked={selectedService.availability}
        onChange={(e) => setSelectedService({...selectedService, availability: e.target.checked})}
        
    />} label="Availability" />


            </>: <h1>No service selected</h1>}
        </div>
    )
}

export default ServiceSettings;