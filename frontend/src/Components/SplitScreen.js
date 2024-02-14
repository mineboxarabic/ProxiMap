import 'split-pane-react/esm/themes/default.css';

import { Box } from "@mui/system";

export default function SplitScreen({
    left: Left,
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
