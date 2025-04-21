
import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router";
import { TextField, Button, Box, Select, MenuItem } from "@mui/material";
import axios from "axios";
import React from "react";
import { ClassStruture } from "../../../utils/interfaces/classObject";

export default function EditClass() {
    const location = useLocation();
    const navigate = useNavigate();
    const [classData, setClassData] = useState<ClassStruture>({
        name: "",
        description: "",
        time: "",
        cost: "",
        day: "",
        danceGenres: "",
        studioId: ""
    });
    const [formData, setFormData] = useState<ClassStruture>({
        name: "",
        description: "",
        time: "",
        cost: "",
        day: '',
        danceGenres: '',
        studioId: '1'
    });

    useEffect(() => {
        const fetchClassData = async () => {
            try {
                const response = await axios.get("http://localhost:3000/classes");
                const classItem = response.data.find(
                    (item: any) => item.id === location.state.classId
                );
                if (classItem) {
                    setClassData(classItem);
                    setFormData({
                        name: classItem.name || "",
                        description: classItem.description || "",
                        time: classItem.time || "",
                        day: classItem.day || "",
                        cost: classItem.cost || "",
                        danceGenres: classItem.danceGenres || "",
                        studioId: classItem.studioId || "1"
                    });
                }
            } catch (error) {
                console.error("Error fetching class data:", error);
            }
        };

        fetchClassData();
    }, [location.state.classId]);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await axios.put(`http://localhost:3000/classes/${location.state.classId}`, formData);
            alert("Class updated successfully!");
            navigate("/schedule");
        } catch (error) {
            console.error("Error updating class:", error);
        }
    };

    const handleDelete = async () => {
        try {
            await axios.delete(`http://localhost:3000/classes/${location.state.classId}`);
            alert("Class deleted successfully!");
            navigate("/schedule");
        } catch (error) {
            console.error("Error deleting class:", error);
        }
    };

    if (!classData) {
        return <p>Loading...</p>;
    }

    return (
        <Box component="form" onSubmit={handleSubmit} sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
            <h1>Edit Class</h1>
            <TextField
                label="Name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                fullWidth
            />
            <TextField
                label="Description"
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                fullWidth
            />
            <TextField
                label="Cost"
                name="cost"
                value={formData.cost}
                onChange={handleInputChange}
                fullWidth
            />
            <Select
                labelId="day-label"
                id="day"
                name="day"
                value={formData.day}
                onChange={(e) => setFormData({ ...formData, day: e.target.value })}
                required
            >
                <MenuItem value="Monday">Monday</MenuItem>
                <MenuItem value="Tuesday">Tuesday</MenuItem>
                <MenuItem value="Wednesday">Wednesday</MenuItem>
                <MenuItem value="Thursday">Thursday</MenuItem>
                <MenuItem value="Friday">Friday</MenuItem>
                <MenuItem value="Saturday">Saturday</MenuItem>
                <MenuItem value="Sunday">Sunday</MenuItem>
            </Select>
            <TextField
                label="Time"
                name="time"
                value={formData.time}
                onChange={handleInputChange}
                fullWidth
            />
            <Button type="submit" variant="contained" color="primary">
                Update Class
            </Button>
            <Button variant="contained" color="secondary" onClick={handleDelete}>
                Delete Class
            </Button>
        </Box>
    );
}