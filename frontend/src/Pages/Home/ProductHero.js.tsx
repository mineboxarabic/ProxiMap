import * as React from 'react';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
// @ts-expect-error TS(2307): Cannot find module './ProductHeroLayout' or its co... Remove this comment to see the full error message
import ProductHeroLayout from './ProductHeroLayout';
// @ts-expect-error TS(2307): Cannot find module '../../assets/images/bg.jpg' or... Remove this comment to see the full error message
import backgroundImage from '../../assets/images/bg.jpg';


import useCurrentUser from '../../Hooks/useCurrentUser';
//import search from '../../assets/images/magnifying-glass.svg'

const ProductHero = () =>{
    const currentUser = useCurrentUser();
    return (
        <ProductHeroLayout
            sxBackground={{
                backgroundImage: `url(${backgroundImage})`,
                backgroundColor: '#7fc7d9', // Average color of the background image.
                backgroundPosition: 'center',
            }}
        >
            {/* Increase the network loading priority of the background image. */}
            <img
                style={{ display: 'none' }}
                src={backgroundImage}
                alt="increase priority"
            />
          
            <Typography
            fontFamily={'"Impact"'}
            color="inherit" align="center" variant="h2">
                Welcome to ProxiMap: Your Community's Service Hub!
            </Typography>
            
            <Typography
                color="inherit"
                align="center"
                variant="h5"
                sx={{ mb: 4, mt: { xs: 4, sm: 10 } }}
            >
🌟 Discover Local. Connect Instantly. Experience Together. 🌟

</Typography>
{

            !currentUser &&

            <Button
                color="primary"
                variant="contained"
                size="large"
                component="a"
                href="/register"
                sx={{ minWidth: 200 }}
            >
                Get started
            </Button>
            }

{
            currentUser &&
            <Button
                color="primary"
                variant="contained"
                size="large"
                component="a"
                href="/services"
                sx={{ minWidth: 200 }
            }>
                Explore Services
            </Button>
}


            
        </ProductHeroLayout>
    );
}

export default ProductHero;
