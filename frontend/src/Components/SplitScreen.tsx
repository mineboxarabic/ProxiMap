import 'split-pane-react/esm/themes/default.css';

import { Box } from "@mui/system";

export default function SplitScreen({


    // @ts-expect-error TS(7031): Binding element 'Left' implicitly has an 'any' typ... Remove this comment to see the full error message
    left: Left,


    // @ts-expect-error TS(7031): Binding element 'Right' implicitly has an 'any' ty... Remove this comment to see the full error message
    right: Right,
    
}) {
  
    return(
        <Box sx={{ 
            width: "100%",
            display: "flex",
            flexDirection: "row",
            }}>
            <Box sx={{
                    width: "70%",
                    float: "left",
                }} >
                <Left/>
            </Box>

            <Box sx={{width: "30%" }}>
                <Right/>
            </Box>

        </Box>
    );

}
