import React, { useEffect, useState } from 'react';
import { Tabs, Tab, Box, TextField, Button } from '@mui/material';
import useCurrentUser from '../Hooks/useCurrentUser';
import Avatar from '@mui/material/Avatar';
import Grid from '@mui/material/Grid';
import useResource from '../Hooks/useResource';
import Alert from '@mui/material/Alert';
import Snackbar from '@mui/material/Snackbar';
import useAxiosPrivate from '../Hooks/useAxiosPrivate';
import Card from '@mui/material/Card';
import styled from '@emotion/styled';

const StyledTab = styled(Tab)(({ theme }) => ({
  width: '30%',
  // @ts-expect-error TS(2339): Property 'breakpoints' does not exist on type 'The... Remove this comment to see the full error message
  [theme.breakpoints.up('md')]: {
    width: '53%',
  },

  //Make text white
  // @ts-expect-error TS(2339): Property 'palette' does not exist on type 'Theme'.
  color: theme.palette.light.main,

  //Make the tab indicator white
  '&.Mui-selected': {
  // @ts-expect-error TS(2339): Property 'palette' does not exist on type 'Theme'.
  color: theme.palette.primary.main,

  },



}));

const SmallTextField = styled(TextField)(({ theme }) => ({

  margin: '5px',

}));

function ProfilePage() {
  const [tabIndex, setTabIndex] = useState(0);

  const handleTabChange = (event: any, newValue: any) => {
    setTabIndex(newValue);
  };

  const currentUser = useCurrentUser();


  const {update: updateUser
    ,error: updateError,
    loading: updateLoading,
    resources: updatedUser,
    setResources: setUpdatedUser,
    success: updateSuccess,
    setSuccess: setUpdateSuccess

  } = useResource('/users');



  const [email, setEmail] = useState(currentUser?.email);
  const [username, setUsername] = useState(currentUser?.username);
  const [bio, setBio] = useState(currentUser?.profile?.bio);
  const [street, setStreet] = useState(currentUser?.profile?.address.street);
  const [city, setCity] = useState(currentUser?.profile?.address.city);
  const [state, setState] = useState(currentUser?.profile?.address.state);
  const [zip, setZip] = useState(currentUser?.profile?.address.zip);

  const [avatar, setAvatar] = useState(currentUser?.profile?.profilePicture);
  const [avatarFile, setAvatarFile] = useState(null);

  const axiosPrivate = useAxiosPrivate();

  // Function to handle avatar click
  const handleAvatarClick = () => {
    // @ts-expect-error TS(2531): Object is possibly 'null'.
    document.getElementById('avatarInput').click();
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();



    const updatedUser = {
      ...currentUser,
      email,
      username,
      profile: {
        profilePicture: avatar,
        bio,
        address: {
          street,
          city,
          state,
          zip
        }
      }
    }
    
    updateUser(updatedUser);



  }


  const handleFileChange = async (e: any) => {
    const file = e.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append('file', file);  // 'avatar' is the field name your backend expects

    try {
      const response = await axiosPrivate.post(`/users/upload/${currentUser._id}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      setAvatar(response.data.avatarUrl);  // Assuming the response contains the URL
    } catch (error) {
      console.error('Error uploading avatar:', error);

    }
  }

  useEffect(()=>{
    console.log(currentUser);
  },[])
  return (
    <div>
      <input type="file" id='avatarInput' style={{ display: 'none' }} onChange={handleFileChange} />
      <Avatar alt={currentUser?.username} src={avatar} sx={{ width: "150px", height: "150px" 
        , cursor: 'pointer'
        , marginLeft: 'auto'
        , marginRight: 'auto'
        , border: '2px solid black'
        , boxShadow: '0px 0px 10px 0px rgba(0,0,0,0.75)'
    }} 
      onClick={handleAvatarClick} 
      />


      <Snackbar open={updateSuccess !== ''
      } autoHideDuration={6000} onClose={() => {setUpdateSuccess('');}}>
        <Alert onClose={() => {
          setUpdateSuccess('');
        }} severity="success" sx={{ width: '100%' }}>
          Update Successful!
        </Alert>
      </Snackbar>



      <Tabs 
       sx={{ borderBottom: 1, borderColor: 'divider' 
      
       //Center the tabs
        , margin: 'auto'
        , width: '70%'
      }}
      value={tabIndex} onChange={handleTabChange}>

        <StyledTab 

        label="Edit Profile" />

        <StyledTab 

        label="Change Password" />
        <StyledTab 
        label="About Me" />

      </Tabs>
      <TabPanel value={tabIndex} index={0}>
        {/* General Edit Form */}
      <Alert severity="error" sx={{display: updateError ? 'block' : 'none', width: '100%', marginBottom: '10px'}} 

      >{updateError}</Alert>

  



        <Card
          // @ts-expect-error TS(2769): No overload matches this call.
          variant='form'
        >
        <Grid container spacing={2} >

          <Grid item xs={12} >
            <TextField label="Email" 
            sx={
              {
                width: '70%'
              }
            } defaultValue={currentUser?.email} onChange={(e) => setEmail(e.target.value)} />
          </Grid>
          <Grid item xs={12} >
            <TextField sx={
              {
                width: '70%'
              }
            } label="Username" defaultValue={currentUser?.username} onChange={(e) => setUsername(e.target.value)} />
          </Grid>
          <Grid item xs={12} >
            <TextField sx={
              {
                width: '70%'
                
              }
            } label="About Me" defaultValue={currentUser?.profile?.bio} onChange={(e) => setBio(e.target.value)} />
            
          </Grid>
          <Grid item xs={12}>
            <SmallTextField label="Street" defaultValue={currentUser?.profile?.address.street} onChange={(e) => setStreet(e.target.value)} />
            <SmallTextField label="city" defaultValue={currentUser?.profile?.address.city} onChange={(e) => setCity(e.target.value)} />
            <SmallTextField label="state" defaultValue={currentUser?.profile?.address.state} onChange={(e) => setState(e.target.value)} />
            <SmallTextField label="zip" defaultValue={currentUser?.profile?.address.zip} onChange={(e) => setZip(e.target.value)} />
          </Grid>

          <Grid item xs={12} >
            <Button  variant='contained' color='primary' onClick={handleSubmit}
            >Update Profile</Button>
          </Grid>
            
        </Grid>
        </Card>
      </TabPanel>



      <TabPanel value={tabIndex} index={1}>
        {/* Password Change Form */}
        <TextField label="New Password" type="password" />
        <Button>Update Password</Button>
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

function TabPanel(props: any) {
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
