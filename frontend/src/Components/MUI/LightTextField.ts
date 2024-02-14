import { styled } from '@mui/material/styles';
import TextField from '@mui/material/TextField';

const LightTextField = styled(TextField)({

    //make the input white with black text
    '& .MuiInputBase-root': {
        color: 'black',
        backgroundColor: 'white',
    },

    //Make the label white
    '& label': {
        color: 'white',
        backgroundColor: 'white',
        borderColor: 'white',
        borderRadius: '5px',
    },

  // Add more customization here
});

export default LightTextField;