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
import React from "react";


const ServiceSettings = ({
    handleDelete,
    isAsked
}: any) => {


    // @ts-expect-error TS(2339): Property 'selectedService' does not exist on type ... Remove this comment to see the full error message
    const { selectedService, setSelectedService } = useGeneral();
    const { getSelectedService, updateSelectedService, isServiceInHistory } = useServicesHistory();




    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState(0);
    const [range, setRange] = useState(0);
    const [availability, setAvailability] = useState(false);
    const [date, setDate] = useState('');

    const [currentService, setCurrentService] = useState(null);


    useEffect(() => {



        // @ts-expect-error TS(2554): Expected 0 arguments, but got 1.
        setCurrentService(isServiceInHistory(selectedService) ? getSelectedService(selectedService) : selectedService);



    }, [selectedService]);


    useEffect(() => {


        if (currentService) {
            if (isAsked) {


                // @ts-expect-error TS(2339): Property 'name' does not exist on type 'never'.
                setName(currentService.name);


                // @ts-expect-error TS(2339): Property 'description' does not exist on type 'nev... Remove this comment to see the full error message
                setDescription(currentService.description);


                // @ts-expect-error TS(2339): Property 'price' does not exist on type 'never'.
                setPrice(currentService.price);


                // @ts-expect-error TS(2339): Property 'date' does not exist on type 'never'.
                const date = new Date(currentService.date);
                const formattedDate = date?.toISOString().split('T')[0];
                setDate(formattedDate);
            } else {


                // @ts-expect-error TS(2339): Property 'name' does not exist on type 'never'.
                setName(currentService.name);


                // @ts-expect-error TS(2339): Property 'description' does not exist on type 'nev... Remove this comment to see the full error message
                setDescription(currentService.description);


                // @ts-expect-error TS(2339): Property 'price' does not exist on type 'never'.
                setPrice(currentService.price);


                // @ts-expect-error TS(2339): Property 'range' does not exist on type 'never'.
                setRange(currentService.range);


                // @ts-expect-error TS(2339): Property 'availability' does not exist on type 'ne... Remove this comment to see the full error message
                setAvailability(currentService.availability);
            }
        }
    }
        , [currentService]);



    useEffect(() => {
        if (!currentService) return;

        if (isAsked) {

            if (isServiceInHistory(currentService)) {
                updateSelectedService({


                    // @ts-expect-error TS(2554): Expected 0 arguments, but got 1.
                    ...getSelectedService(currentService),
                    name,
                    description,
                    price,
                    date
                });
            } else {

                updateSelectedService({


                    // @ts-expect-error TS(2698): Spread types may only be created from object types... Remove this comment to see the full error message
                    ...currentService,
                    name,
                    description,
                    price,
                    date
                });
            }
        } else {

            if (isServiceInHistory(currentService)) {
                updateSelectedService({


                    // @ts-expect-error TS(2554): Expected 0 arguments, but got 1.
                    ...getSelectedService(currentService),
                    name,
                    description,
                    price,
                    range,
                    availability
                });
            } else {
                updateSelectedService({


                    // @ts-expect-error TS(2698): Spread types may only be created from object types... Remove this comment to see the full error message
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


    return (
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
                            onChange={(e) => setName(e.target.value)}
                        />


                        <TextField type="number" id="outlined-basic" label="Price €" variant="filled"
                            value={price}


                            onChange={(e:any) => setPrice(e.target.value)}
                        />

            
                        <TextareaAutosize id="outlined-basic" label="Description" variant="filled"
                            value={description}
                            onChange={(e:any) => setDescription(e.target.value)}
                            minRows={3}
                            style={{

                                fontSize: '1rem',

                                width: '90%',

                                maxWidth: '500px',
                                minWidth: '200px'
                            }} // 
                        />
                    </Box>

                    {
                        !isAsked && <>
                            <Slider defaultValue={50} aria-label="Default" valueLabelDisplay="auto"
                                value={range}
                                max={5000}



                                // @ts-expect-error TS(2531): Object is possibly 'null'.
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
                            onChange={(e:any) => setDate(e.target.value)}
                        />
                    }
                    <Divider />

                    <Button variant="contained" color="error" onClick={handleDelete} >Delete</Button>


                </> :

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