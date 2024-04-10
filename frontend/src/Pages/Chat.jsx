import React, { useEffect } from 'react';
import { Box } from '@mui/system';
import ChatList from '../Components/chat/ChatList';
import { useState } from 'react';
import ChatPage from '../Components/chat/ChatPage';


const Chat = () => {



    const [selectedChat, setSelectedChat] = useState(null);

    useEffect(() => {
        console.log(selectedChat);
    }, [selectedChat]);

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
           <ChatList setSelectedChat={setSelectedChat}/>
            </Box>

            <Box
                sx={{
                    backgroundColor: 'white',
                    width: '70%',
                }}
            >
                <ChatPage selectedChat={selectedChat} />
            </Box>


  

            </Box>
        );
}

export default Chat;