import React, { useState } from 'react';
import { Modal, Box, Typography, Avatar, List, ListItem, ListItemText } from '@mui/material';
import { Divider } from '@mui/material';
import Badge from '@mui/material/Badge';

function UserDetailsModal({ user }) {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <>
      <Typography variant='h6' onClick={handleOpen} sx={{ cursor: 'pointer', textDecoration: 'underline' }}>
        @{user?.username}
      </Typography>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="user-details-title"
        aria-describedby="user-details-description"
      >
        <Box sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: 'auto',
          maxWidth: '90%',
          bgcolor: 'background.paper',
          border: '2px solid #000',
          boxShadow: 24,
          p: 4,
          borderRadius: 2,
        }}>
          <Typography id="user-details-title" variant="h6" component="h2" gutterBottom>
            {user?.username}'s Profile
          </Typography>
          <Divider sx={{ my: 2 }} />
          <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mb: 2 }}>
            <Badge badgeContent={user?.role} color="primary">
            <Avatar
              alt={user?.username}
              src={user?.profile?.profilePicture}
              sx={{ width: 90, height: 90, mb: 2 }}
            />
            </Badge>
            <Typography variant="body1" sx={{ mb: 2 }}>
              {user?.profile?.bio}
            </Typography>
          </Box>
          <List>
            <ListItem>
              <ListItemText primary="Email" secondary={user?.email} />
            </ListItem>
            <ListItem>
              <ListItemText primary="Role" secondary={user?.role} />
            </ListItem>
            <ListItem>
              <ListItemText 
                primary="Address" 
                secondary={`${user?.profile?.address.street}, ${user?.profile?.address.city}, ${user?.profile?.address.state}, ${user?.profile?.address.zip}`} 
              />
            </ListItem>
            <ListItem>
              <ListItemText 
                primary="Joined" 
                secondary={new Date(user?.createdAt['$date']).toLocaleDateString()} 
              />
            </ListItem>
          </List>
        </Box>
      </Modal>
    </>
  );
}

export default UserDetailsModal;
