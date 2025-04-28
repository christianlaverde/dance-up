import React, { useState } from 'react';
import {

Box,
Button,
TextField,
Typography,
Avatar,
InputAdornment,
Grid2,
} from '@mui/material';
import { getStorage, ref, getDownloadURL, uploadBytes } from "firebase/storage";
import { useSession } from '../../SessionContext';


const AccountPage: React.FC = () => {
    const storage = getStorage();
    const session = useSession();

    const userID = session.session?.user.uid
    console.log(session.session?.user.uid)
    // const userUid = user?.uid || '';
    const [isEditing, setIsEditing] = useState(false);
    const [formData, setFormData] = useState({
        username: '',
        ownerFullName: '',
        email: '',
        studioName: '',
        studioAddress: {
            street1: '',
            street2: '',
            city: '',
            state: '',
            zip: '',
        },
        businessHours: '',
        studioImage: '',
        ownerImage: '',
        bio: '',
    });

    React.useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`http://localhost:3000/danceStudios/${userID}`);
                if (!response.ok) {
                    throw new Error('Failed to fetch data');
                }
                const data = await response.json();
                console.log(data);
                setFormData({
                    username: data.username || '',
                    ownerFullName: data.ownerFullName || '',
                    email: data.email || '',
                    studioName: data.studioName || '',
                    studioAddress: {
                        street1: data.studioAddress?.street1 || '',
                        street2: data.studioAddress?.street2 || '',
                        city: data.studioAddress?.city || '',
                        state: data.studioAddress?.state || '',
                        zip: data.studioAddress?.zip || '',
                    },
                    businessHours: data.businessHours || '',
                    studioImage: data.studioImage || '',
                    ownerImage: data.ownerImage || '',
                    bio: data.bio || '',
                });
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
        console.log(formData)

    }, []);

const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    
    const { name, value } = e.target;
    if (name in formData.studioAddress) {
        setFormData({
            ...formData,
            studioAddress: {
                ...formData.studioAddress,
                [name]: value,
            },
        });
    } else {
        setFormData({ ...formData, [name]: value });
    }
};

const handleEditToggle = () => {
    setIsEditing(!isEditing);
};

const handleSave = () => {
    // Save the data to the database (API call can be added here)
    console.log('Saved data:', formData);
    fetch(`http://localhost:3000/danceStudios/${userID}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
    })
        .then((response) => {
            if (!response.ok) {
                throw new Error('Failed to save data');
            }
            return response.json();
        }
        )
    setIsEditing(false);
};

return (
    <Box sx={{ p: 4 }}>
        <Typography variant="h4" gutterBottom>
            Account Information
        </Typography>
        <Grid2 container spacing={2}>
            <Grid2 size={12}>
                <TextField
                    label="Username"
                    name="username"
                    value={formData.username}
                    onChange={handleInputChange}
                    fullWidth
                    disabled={!isEditing}
                />
            </Grid2>
            <Grid2  size={12}>
                <TextField
                    label="Owner Full Name"
                    name="ownerFullName"
                    value={formData.ownerFullName}
                    onChange={handleInputChange}
                    fullWidth
                    disabled={!isEditing}
                />
            </Grid2>
            <Grid2  size={12}>
                <TextField
                    label="Email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    fullWidth
                    disabled={!isEditing}
                />
            </Grid2>
            <Grid2  size={12}>
                <TextField
                    label="Studio Name"
                    name="studioName"
                    value={formData.studioName}
                    onChange={handleInputChange}
                    fullWidth
                    disabled={!isEditing}
                />
            </Grid2>
            <Grid2  size={12}>
                <TextField
                    label="Street"
                    name="street1"
                    value={formData.studioAddress.street1}
                    onChange={handleInputChange}
                    fullWidth
                    disabled={!isEditing}
                />
            </Grid2>
            <Grid2  size={12}>
                <TextField
                    label="Street"
                    name="street2"
                    value={formData.studioAddress.street2}
                    onChange={handleInputChange}
                    fullWidth
                    disabled={!isEditing}
                />
            </Grid2>
            <Grid2  size={4}>
                <TextField
                    label="City"
                    name="city"
                    value={formData.studioAddress.city}
                    onChange={handleInputChange}
                    fullWidth
                    disabled={!isEditing}
                />
            </Grid2>
            <Grid2  size={4}>
                <TextField
                    label="State"
                    name="state"
                    value={formData.studioAddress.state}
                    onChange={handleInputChange}
                    fullWidth
                    disabled={!isEditing}
                />
            </Grid2>
            <Grid2  size={4}>
                <TextField
                    label="Zip"
                    name="zip"
                    value={formData.studioAddress.zip}
                    onChange={handleInputChange}
                    fullWidth
                    disabled={!isEditing}
                />
            </Grid2>
            <Grid2  size={12}>
                <TextField
                    label="Business Hours"
                    name="businessHours"
                    value={formData.businessHours}
                    onChange={handleInputChange}
                    fullWidth
                    disabled={!isEditing}
                />
            </Grid2>
            <Grid2  size={12}>
                <TextField
                    label="Bio"
                    name="bio"
                    value={formData.bio}
                    onChange={handleInputChange}
                    fullWidth
                    multiline
                    rows={4}
                    disabled={!isEditing}
                />
            </Grid2>
            <Grid2 size={6}>
                <Typography>Studio Image</Typography>
                <Avatar
                    src={formData.studioImage}
                    alt="Studio"
                    sx={{ width: 100, height: 100 }}
                />
                {isEditing && (
                    <TextField
                        type="file"
                        name="studioImage"
                        onChange={async (e) => {
                            if (e.target.files?.[0]) {
                                const file = e.target.files[0];
                                console.log(file);
                                const storageRef = ref(storage, `/studioImages/8080/`);
                                try {
                                    uploadBytes(storageRef, file).then((snapshot) => {
                                        console.log('Uploaded a blob or file!');
                                        console.log(snapshot);
                                      });
                                    setFormData({
                                        ...formData,
                                        studioImage: file.name,
                                    });
                                } catch (error) {
                                    console.error("Error uploading image:", error);
                                }
                            }
                        }}
                        fullWidth
                        InputProps={{
                            startAdornment: <InputAdornment position="start">Upload</InputAdornment>,
                        }}
                    />
                )}
            </Grid2>
            <Grid2 size={6}>
                <Typography>Owner Image</Typography>
                <Avatar
                    src={formData.ownerImage}
                    alt="Owner"
                    sx={{ width: 100, height: 100 }}
                />
                {isEditing && (
                    <TextField
                        type="file"
                        name="ownerImage"
                        onChange={(e) =>
                            setFormData({
                                ...formData,
                                ownerImage: URL.createObjectURL(e.target.files?.[0] || ''),
                            })
                        }
                        fullWidth
                        InputProps={{
                            startAdornment: <InputAdornment position="start">Upload</InputAdornment>,
                        }}
                    />
                )}
            </Grid2>
        </Grid2>
        <Box sx={{ mt: 4 }}>
            {!isEditing ? (
                <Button variant="contained" onClick={handleEditToggle}>
                    Edit
                </Button>
            ) : (
                <>
                    <Button variant="contained" color="primary" onClick={handleSave} sx={{ mr: 2 }}>
                        Save
                    </Button>
                    <Button variant="outlined" onClick={handleEditToggle}>
                        Cancel
                    </Button>
                </>
            )}
        </Box>
    </Box>
);
};

export default AccountPage;