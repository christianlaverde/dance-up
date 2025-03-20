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
} from '@mui/material';

import './styles.css';

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

const StudentSignUpForm: React.FC = () => {
const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    city: '',
    state: '',
    zipCode: '',
    gender: '',
    danceGenres: [] as string[],
});

const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
};

const handleSelectChange = (e: React.ChangeEvent<{ value: unknown }>) => {
    setFormData({ ...formData, danceGenres: e.target.value as string[] });
};

const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form Data:', formData);
};

return (
    <div className='custom-container'>
        <Paper elevation={14} sx={{ p: 2 }} className='custom-paper'>
            <Box component="form" onSubmit={handleSubmit} sx={{ maxWidth: 500, mx: 'auto', mt: 4 }}>
        <h1>Student Sign Up</h1>
        <p>Fill out the form below to sign up as a student</p>
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
            <FormControl fullWidth margin="normal">
                <InputLabel>Gender</InputLabel>
                <Select
                name="gender"
                value={formData.gender}
                onChange={(e) => setFormData({ ...formData, gender: e.target.value })}
                >
                <MenuItem value="Male">Male</MenuItem>
                <MenuItem value="Female">Female</MenuItem>
                <MenuItem value="Non-Binary">Non-Binary</MenuItem>
                <MenuItem value="Prefer not to say">Prefer not to say</MenuItem>
                </Select>
            </FormControl>
            <FormControl fullWidth margin="normal">
                <InputLabel>Dance Genres</InputLabel>
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

export default StudentSignUpForm;