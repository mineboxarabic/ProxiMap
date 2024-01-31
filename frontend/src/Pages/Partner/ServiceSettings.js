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

    const [name, setName] = useState(selectedService.name);
    const [description, setDescription] = useState(selectedService.description);
    const [price, setPrice] = useState(selectedService.price);
    const [range, setRange] = useState(selectedService.range);
    const [availability, setAvailability] = useState(selectedService.availability);



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
            value={name}
            onChange={(e) => setName(e.target.value)}
            onBlure={() => setSelectedService({...selectedService, name: name})}
            />

            <TextField id="outlined-basic" label="Description" variant="outlined"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            onBlure={() => setSelectedService({...selectedService, description: description})}

            />

            <TextField type="number" id="outlined-basic" label="Price €" variant="outlined"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            onBlure={() => setSelectedService({...selectedService, price: price})}
            />
                </Box>

        <Slider defaultValue={50} aria-label="Default" valueLabelDisplay="auto"
        value={range}
        max={5000}

        onChange={(e) => setRange(e.target.value)}
        onBlure={() => setSelectedService({...selectedService, range: range})}
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