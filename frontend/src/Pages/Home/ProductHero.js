import * as React from 'react';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import ProductHeroLayout from './ProductHeroLayout';
import backgroundImage from '../../assets/images/bg.jpg';


import useCurrentUser from '../../Hooks/useCurrentUser';
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
            color="inherit" align="center" variant="h2" marked="center">
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
