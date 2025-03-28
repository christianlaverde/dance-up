import { Fade, Typography } from '@mui/material';
import Button from '@mui/material/Button';
import Zoom from '@mui/material/Zoom';
import { Box, Stack } from '@mui/system';
import React from 'react';
import { NavLink } from 'react-router';

const Hero: React.FC = () => {
    return (
        <Box
            className="hero"
            sx={{
                height: '100vh',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                backgroundImage: 'url(/path-to-your-image.jpg)',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                textAlign: 'center',
                color: '#fff',
                position: 'relative',
            }}
        >
            <Box
                sx={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    backgroundColor: 'rgba(0, 0, 0)',
                    zIndex: 1,
                }}
            />
            <Box sx={{ zIndex: 2 }}>
                <Fade in={true} timeout={750}>
                <Typography variant="h2" component="h1" gutterBottom>
                    Welcome to DanceUp
                </Typography>
                </Fade>
                <Fade in={true} timeout={1000}>
                    <Typography variant="h6" gutterBottom>
                        Discover the joy of dance with us
                    </Typography>
                </Fade>
                <Stack direction="row" spacing={2} justifyContent="center" mt={4}>
                    <Zoom in={true} timeout={750}>
                        <Button component={NavLink} to='/signup/student' variant="contained" color="primary" size="large">
                            Student Sign UP
                        </Button>
                    </Zoom>
                    <Zoom in={true} timeout={750}>
                        <Button component={NavLink} to='/signup/studio'  variant="outlined" color="secondary" size="large">
                            Studio Sign UP
                        </Button>
                    </Zoom>
                </Stack>
            </Box>
        </Box>
    );
};

export default Hero;