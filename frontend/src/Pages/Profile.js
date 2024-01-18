import React, { useState } from 'react';
import { Tabs, Tab, Box, TextField, Button } from '@mui/material';

function ProfilePage() {
  const [tabIndex, setTabIndex] = useState(0);

  const handleTabChange = (event, newValue) => {
    setTabIndex(newValue);
  };

  return (
    <div>
      <Tabs value={tabIndex} onChange={handleTabChange}>
        <Tab label="Edit Profile" />
        <Tab label="Change Password" />
        <Tab label="About Me" />
      </Tabs>
      <TabPanel value={tabIndex} index={0}>
        {/* Password Change Form */}
        <TextField label="New Password" type="password" />
        <Button>Update Password</Button>
      </TabPanel>
      <TabPanel value={tabIndex} index={1}>
        {/* General Edit Form */}
        <TextField label="Name" />
        <TextField label="Email" />
        <Button>Update Profile</Button>
      </TabPanel>
      <TabPanel value={tabIndex} index={2}>
        {/* About Me Section */}
        <Box>
          <p>Your About Me Text Here</p>
        </Box>
      </TabPanel>
    </div>
  );
}

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          {children}
        </Box>
      )}
    </div>
  );
}

export default ProfilePage;
