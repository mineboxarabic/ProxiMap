import React, { useEffect, useState } from 'react';
import { Box, TextField, Button, Typography } from '@mui/material';
import useAxiosPrivate from '../../Hooks/useAxiosPrivate';
import useCurrentUser from '../../Hooks/useCurrentUser';

const ChatPage = ({ selectedChat }) => {
    const [message, setMessage] = useState(''); // Reintroduced for sending messages
    const [messages, setMessages] = useState([]);

    const [otherParticipant, setOtherParticipant] = useState(''); // [1

    const axiosPrivate = useAxiosPrivate();
    const currentUser = useCurrentUser();

    useEffect(() => {
        console.log(selectedChat);
    }, [selectedChat]);

    const fetchMessages = async () => {
        if (!selectedChat || !selectedChat._id) return; // Ensure there's a chat selected

        try {
            const response = await axiosPrivate.get(`messages/chat/${selectedChat._id}`);
            setMessages(response.data.message);
            console.log("Messages fetched:", response.data.message);
        } catch (error) {
            console.error(error);
        }
    };

    const fetchOtherParticipant = async () => {
        if (!selectedChat || !selectedChat._id) return; // Ensure there's a chat selected

        try {
            const response = await axiosPrivate.get(`chats/${selectedChat._id}`);
            const otherParticipantId = response.data.chat.participants.find(id => id !== currentUser._id);
            const otherParticipantDetails = await axiosPrivate.get(`users/${otherParticipantId}`);
            setOtherParticipant(otherParticipantDetails.data.user.username);
            console.log("Other participant fetched:", otherParticipantDetails.data.user);
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        fetchMessages();
        fetchOtherParticipant();
    }, [selectedChat]);

    useEffect(() => {
        // Added for debugging purposes
        console.log("Messages state updated:", messages);
    }, [messages]);
    const sendMessage = () => {
        console.log("Sending message:", message);
        
        setMessages([...messages, {
            text: message,
            sender: currentUser._id,
        }]); 
        // Update messages state with new message
        
        setMessage(''); // Clear input after sending
    };

    return (
        <Box sx={{ p: 3 }}>
            {
                selectedChat ? (
                    <Box>
                        <Typography variant="h5" sx={{ mb: 2 }}>Chat with {selectedChat.username}</Typography>
                        <Box sx={{ maxHeight: '70vh', overflowY: 'auto', mb: 2 
                    }}>
                            {messages && messages.map((msg) => (
                                <Typography key={msg._id} sx={{ my: 1, 
                                textAlign: msg.sender === currentUser._id ? 'right' : 'left',
                                backgroundColor: msg.sender === currentUser._id ? 'lightblue' : 'lightgray',
                                borderRadius: '5px',
                                padding: '5px',
                                }}>
                                    <strong>{
                                        msg.sender === currentUser._id ? 'You' :
                                    otherParticipant
                                    }:</strong> {msg.text}
                                </Typography>
                            ))}
                        </Box>
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                            <TextField
                                fullWidth
                                variant="outlined"
                                placeholder="Type a message..."
                                value={message}
                                onChange={(e) => setMessage(e.target.value)}
                                sx={{ mr: 1 }}
                            />
                            <Button variant="contained" onClick={sendMessage}>Send</Button>
                        </Box>
                    </Box>
                ) : (
                    <Typography variant="h5" sx={{ mb: 2 }}>Select a chat to start messaging</Typography>
                )
            }

        </Box>
    );
};

export default ChatPage;
