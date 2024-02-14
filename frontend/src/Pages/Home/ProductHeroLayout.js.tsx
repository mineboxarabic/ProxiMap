import * as React from 'react';
import PropTypes from 'prop-types';
import { styled } from '@mui/material/styles';

import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
// @ts-expect-error TS(2307): Cannot find module '../../assets/images/bubles.png... Remove this comment to see the full error message
import bubles from '../../assets/images/bubles.png';
// @ts-expect-error TS(2307): Cannot find module '../../assets/down-arrow.png' o... Remove this comment to see the full error message
import downArrow from '../../assets/down-arrow.png';
const ProductHeroLayoutRoot = styled('section')(({ theme }) => ({
    // @ts-expect-error TS(2339): Property 'light' does not exist on type 'Palette'.
    color: theme.palette.light.main,
    position: 'relative',
    display: 'flex',
    alignItems: 'center',
    [theme.breakpoints.up('sm')]: {
        height: '80vh',
        minHeight: 500,
        maxHeight: 1300,

    },
    zIndex: 0,
}));

const Background = styled('div')({
    position: 'absolute',
    
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    zIndex: -2,
});

function ProductHeroLayout(props: any) {
    
    
    const { sxBackground, children } = props;



    return (
        <ProductHeroLayoutRoot
            
        >

            <Container
                sx={{
                    mt: 3,
                    mb: 14,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                }}
            >
            <Background sx={sxBackground} />

                <img
                    src={bubles}
                    alt="wonder"
                    width="147"
                    height="80"
                />

                {children}
                <Box
                    sx={{
                        position: 'absolute',
                        left: 0,
                        right: 0,
                        top: 0,
                        bottom: 0,
                        backgroundColor: 'black',
                        opacity: 0.5,
                        zIndex: -1,
                    }}
                />
                
                <Box
                    component="img"
                    src={downArrow}


                    alt="arrow down"
                    
                    sx={{ position: 'absolute', bottom: 32,
                        width: 60,
                        height: 60,
                        animation: 'bounce 2s infinite',
                    
                }}
                />
            </Container>
        </ProductHeroLayoutRoot>
    );
}

ProductHeroLayout.propTypes = {
    children: PropTypes.node,
    sxBackground: PropTypes.oneOfType([
        PropTypes.arrayOf(
            PropTypes.oneOfType([PropTypes.func, PropTypes.object, PropTypes.bool]),
        ),
        PropTypes.func,
        PropTypes.object,
    ]),
};

export default ProductHeroLayout;