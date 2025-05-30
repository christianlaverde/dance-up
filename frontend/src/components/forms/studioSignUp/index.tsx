import React, { useState } from 'react';
import {
Box,
TextField,
MenuItem,
FormControl,
InputLabel,
Select,
Checkbox,
ListItemText,
OutlinedInput,
Button,
Paper,
Typography,
} from '@mui/material';

import './styles.css';
import axios from 'axios';
import { useNavigate } from 'react-router';

const danceGenres = [
'Ballet',
'Hip-Hop',
'Jazz',
'Contemporary',
'Tap',
'Ballroom',
'Salsa',
'Swing',
];

const StudioSignUpForm: React.FC = () => {
const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    address: '',
    city: '',
    state: '',
    studioName: '',
    zipCode: '',
    gender: '',
    classes: [],
    danceGenres: [] as string[],
});

const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
};

const handleSelectChange = (e: React.ChangeEvent<{ value: unknown }>) => {
    setFormData({ ...formData, danceGenres: e.target.value as string[] });
};

const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
        const response = await axios.post('http://localhost:3000/danceStudios', formData);
        console.log('Form submitted successfully:', response.data);
        // const navigate = useNavigate();
        // navigate('/'); // Redirect to the home page
    } catch (error) {
        console.error('Error submitting form:', error);
    }
};

return (
    <div className='custom-container'>
        <Paper elevation={14} sx={{ p: 2 }} className='custom-paper'>
            <Box component="form" onSubmit={handleSubmit} sx={{ maxWidth: 500, mx: 'auto', mt: 4 }}>
        <Typography variant='h3'>Studio Sign Up</Typography>
        <Typography component={'p'}>Fill out the form below to sign up as a studio manager!</Typography>
            <Box sx={{ display: 'flex', gap: 2 }}>
                <TextField
                fullWidth
                label="First Name"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                margin="normal"
                />
                <TextField
                fullWidth
                label="Last Name"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                margin="normal"
                />
            </Box>
            <TextField
                fullWidth
                label="Email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                margin="normal"
            />
            <Box sx={{ display: 'flex', gap: 2 }}>
                <TextField
                fullWidth
                label="City"
                name="city"
                value={formData.city}
                onChange={handleChange}
                margin="normal"
                />
                <TextField
                fullWidth
                label="State"
                name="state"
                value={formData.state}
                onChange={handleChange}
                margin="normal"
                />
            </Box>
            <TextField
                fullWidth
                label="Zip Code"
                name="zipCode"
                value={formData.zipCode}
                onChange={handleChange}
                margin="normal"
            />
            <TextField
                fullWidth
                label="Studio Name"
                name="studioName"
                value={formData.studioName}
                onChange={handleChange}
                margin="normal"
            />
            <FormControl fullWidth margin="normal">
                <InputLabel>Dance Genres Offered</InputLabel>
                <Select
                multiple
                value={formData.danceGenres}
                onChange={handleSelectChange}
                input={<OutlinedInput />}
                renderValue={(selected) => (selected as string[]).join(', ')}
                >
                {danceGenres.map((genre) => (
                    <MenuItem key={genre} value={genre}>
                    <Checkbox checked={formData.danceGenres.includes(genre)} />
                    <ListItemText primary={genre} />
                    </MenuItem>
                ))}
                </Select>
            </FormControl>
            <Button type="submit" variant="contained" color="primary" fullWidth sx={{ mt: 2 }}>
                Submit
            </Button>
            </Box>
        </Paper>
    </div>
);
};

export default StudioSignUpForm;