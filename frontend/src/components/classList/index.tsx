import { useEffect, useState } from "react";
import axios from "axios";
import { Box, Button, Container, Grid2 } from "@mui/material";
import { Link } from "react-router";

export type ClassItem = {
    title: string;
    genre: string;
    time: string;
    id: string | number;
    studioId: string | number;
    description: string;
}

export type Studio = {
    id: string;
    address: string;
    city: string;
    classes: [];
    state: string;
    studioName: string;
    zip: string;
}

export default function ClassList() {
    const [classes, setClasses] = useState([]);
    const [visibleCount, setVisibleCount] = useState(10);

    useEffect(() => {
        const fetchClasses = async () => {
            try {
                const response = await axios.get("http://localhost:3000/danceStudios");
                const allClasses = response.data.flatMap((studio: Studio) => studio.classes || []);
                setClasses(allClasses);
            } catch (error) {
                console.error("Error fetching classes:", error);
            }
        };

        fetchClasses();
    }, []);

    return (
        <Container sx={{ display: "flex", justifyContent: 'center', flexDirection: 'column', alignItems: 'center'}} className="flex flex-col items-center justify-center py-10">
            <h1 className="text-2xl font-bold mb-4">Class List</h1>
            {/* <div style={{ flexGrow: 1 }}> */}
                <Grid2 container justifyContent={'center'} spacing={3}>
                    {classes.slice(0, visibleCount).map((classItem: ClassItem, index: number) => (
                        <Box sx={{ maxWidth: 345, minWidth: 250, display: "flex", justifyContent: "center" }} key={index}>
                            <Link to={`/classDetails/${classItem.studioId}/${classItem.id}`} style={{ textDecoration: "none", color: "inherit" }}>
                                <Box className="MuiCard-root">
                                    <Box className="MuiCardMedia-root" sx={{ height: 140, backgroundColor: "#f0f0f0" }}>
                                        <img
                                            src="https://placehold.co/600x400"
                                            alt={classItem.title}
                                            style={{ width: "100%", height: "100%", objectFit: "cover" }}
                                        />
                                    </Box>
                                    <Box className="MuiCardContent-root">
                                        <h2 className="MuiTypography-root MuiTypography-h5">
                                            {classItem.title}
                                        </h2>
                                        <p className="MuiTypography-root MuiTypography-body2">
                                            {classItem.genre} - {classItem.time}
                                        </p>
                                    </Box>
                                </Box>
                            </Link>
                        </Box>
                    ))}
                </Grid2>
                {visibleCount < classes.length && (
                    <Button
                        variant="outlined"
                        onClick={() => setVisibleCount(visibleCount + 10)}
                        className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                    >
                        Show More
                    </Button>
                )}
            {/* </div> */}
        </Container>
    )
}