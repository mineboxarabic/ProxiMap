import React from 'react';
import { Box } from '@mui/system';

const Chat = () => {
    return (
        <Box
            sx={{
                width: '80%',
                margin: 'auto',
                display: 'flex',
                height: '90vh',
            }}


            

        >

          <Box
             sx={{
                backgroundColor: 'blue',
                width: '30%',
            }}
            >
           
            </Box>

            <Box
                sx={{
                    backgroundColor: 'white',
                    width: '70%',
                }}
            >

            </Box>


  

            </Box>
        );
}

export default Chat;