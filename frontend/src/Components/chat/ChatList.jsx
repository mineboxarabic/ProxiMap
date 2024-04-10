import { useEffect, useState } from 'react';
import { Box, Card, CardContent, Typography, Avatar, CardHeader } from '@mui/material';
import useAxiosPrivate from '../../Hooks/useAxiosPrivate';
import useCurrentUser from '../../Hooks/useCurrentUser';

const ChatList = ({setSelectedChat}) => {
    const currentUser = useCurrentUser();
    const axiosPrivate = useAxiosPrivate();
    const [chats, setChats] = useState([]);
    const [chatComponents, setChatComponents] = useState([]);

    const getUserDetails = async (userId) => {
        try {
            const response = await axiosPrivate.get(`users/${userId}`);
            return response.data; // Adjust according to your actual API response
        } catch (error) {
            console.error('Error fetching user details:', error);
            return { username: 'Unknown', _id: userId, profile: { profilePicture: '' } }; // Default values
        }
    };

    useEffect(() => {
        const fetchChats = async () => {
            try {
                const response = await axiosPrivate.get(`chats/user/${currentUser._id}`);
                setChats(response.data.chat);
                await prepareChatUI(response.data.chat);
            } catch (error) {
                console.error(error);
            }
        };

        fetchChats();
    }, [axiosPrivate, currentUser._id]);

    const prepareChatUI = async (chats) => {
        const chatUIComponents = await Promise.all(chats.map(async (chat) => {
            const participantsDetails = await Promise.all(chat.participants.map(async (participantId) => {
                return await getUserDetails(participantId);
            }));

            // Filter out the current user to only show the other participant
            const otherParticipantDetailsx = participantsDetails.find(user => user.user._id !== currentUser._id);

            const otherParticipantDetails = otherParticipantDetailsx.user;
            return (
                <Card key={chat._id} sx={{ mb: 2, mx: 1 ,
                    width: '95%',
                    display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'center'
                    ,
                    'cursor': 'pointer'
                }}
                    onClick={() => setSelectedChat(chat)}
                >
                    <CardHeader
                        avatar={
                            <Avatar alt={otherParticipantDetails.username} src={otherParticipantDetails.profile? 
                                otherParticipantDetails.profile.profilePicture : ''
                            } />
                        }
                        title={otherParticipantDetails.username}
                    />
                 
                </Card>
            );
        }));

        setChatComponents(chatUIComponents);
    };

    return (
        <Box sx={{ mt: 2 }}>
            {chatComponents.length > 0 ? chatComponents : <Typography>No chats yet.</Typography>}
        </Box>
    );
};

export default ChatList;
