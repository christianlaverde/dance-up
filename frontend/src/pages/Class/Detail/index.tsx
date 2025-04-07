import React, { useEffect, useState } from 'react';
// import { useRouter } from 'next/router';
import axios from 'axios';
import { useParams } from 'react-router';
import { ClassItem, Studio } from '../../../components/classList';
import { Box } from '@mui/system';

const ClassDetail: React.FC = () => {
    // const router = useRouter();
    const { studioId, id } = useParams();

    const [classDetail, setClassDetail] = useState<ClassItem | null>(null);
    const [studio, setStudio] = useState<Studio | null>(null);

    useEffect(() => {
        console.log(studioId, id)
        if (id) {
            axios
                .get('http://localhost:3000/danceStudios')
                .then((response) => {
                    console.log(response.data)
                    const studio = response.data.filter((studio: Studio) => studio.id === studioId);
                    setStudio(studio[0]);
                    const selectedClass = studio[0].classes.find((classItem: ClassItem) => classItem.id === id);
                    setClassDetail(selectedClass);
                })
                .catch((error) => console.error('Error fetching class details:', error));
        }
    }, [id, studioId]);

    if (!classDetail) {
        return <Box>Loading...</Box>;
    }

    return (
        <Box style={{ display: 'flex', gap: '2rem', padding: '2rem' }}>
            {/* Left Column */}
            <Box style={{ flex: 1 }}>
                <img
                    src={classDetail.image}
                    alt={classDetail.title}
                    style={{ width: '100%', borderRadius: '8px', marginBottom: '1rem' }}
                />
                <h1>{classDetail.title}</h1>
                <p><strong>Description:</strong> {classDetail.description}</p>
                <p><strong>Time:</strong> {classDetail.time}</p>
                <p><strong>Location:</strong> {studio?.address} {studio?.city},{studio?.state}</p>
                <p><strong>Genre:</strong> {classDetail.genre}</p>
            </Box>

            {/* Right Column */}
            <Box style={{ flex: 1, border: '1px solid #ccc', borderRadius: '8px', padding: '1rem' }}>
                <h2>Sign Up for the Class</h2>
                <form
                    onSubmit={(e) => {
                        e.preventDefault();
                        const formData = new FormData(e.currentTarget);
                        const data = {
                            firstName: formData.get('firstName'),
                            middleName: formData.get('middleName'),
                            lastName: formData.get('lastName'),
                            paymentInfo: formData.get('paymentInfo'),
                            studioId: studioId,
                            classId: id,
                        };

                        axios
                            .post('http://localhost:3000/classes', data)
                            .then((response) => {
                                alert('Successfully signed up for the class!');
                                console.log(response.data);
                            })
                            .catch((error) => {
                                console.error('Error signing up for the class:', error);
                                alert('Failed to sign up for the class.');
                            });
                    }}
                >
                    <Box style={{ marginBottom: '1rem' }}>
                        <label htmlFor="firstName">First Name</label>
                        <input
                            type="text"
                            id="firstName"
                            name="firstName"
                            style={{ width: '100%', padding: '0.5rem', marginTop: '0.5rem' }}
                            required
                        />
                    </Box>
                    <Box style={{ marginBottom: '1rem' }}>
                        <label htmlFor="middleName">Middle Name</label>
                        <input
                            type="text"
                            id="middleName"
                            name="middleName"
                            style={{ width: '100%', padding: '0.5rem', marginTop: '0.5rem' }}
                        />
                    </Box>
                    <Box style={{ marginBottom: '1rem' }}>
                        <label htmlFor="lastName">Last Name</label>
                        <input
                            type="text"
                            id="lastName"
                            name="lastName"
                            style={{ width: '100%', padding: '0.5rem', marginTop: '0.5rem' }}
                            required
                        />
                    </Box>
                    <Box style={{ marginBottom: '1rem' }}>
                        <label htmlFor="paymentInfo">Payment Info</label>
                        <input
                            type="text"
                            id="paymentInfo"
                            name="paymentInfo"
                            style={{ width: '100%', padding: '0.5rem', marginTop: '0.5rem' }}
                        />
                    </Box>
                    <button
                        type="submit"
                        style={{
                            backgroundColor: '#0070f3',
                            color: '#fff',
                            padding: '0.75rem 1.5rem',
                            border: 'none',
                            borderRadius: '4px',
                            cursor: 'pointer',
                        }}
                    >
                        Sign Up
                    </button>
                </form>
            </Box>
        </Box>
    );
};

export default ClassDetail;