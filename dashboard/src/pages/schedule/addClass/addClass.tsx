import React, { useState } from "react";
import { TextField, Button, MenuItem, Select, InputLabel, FormControl, TextareaAutosize } from "@mui/material";
import { ClassStruture } from "../../../utils/interfaces/classObject";

export default function AddClass() {
    
    const [formData, setFormData] = useState<ClassStruture>({
        name: '',
        time: '',
        description: '',
        cost: '',
        day: '',
        danceGenres: '',
        studioId: '1'
    });
    return (
        <>
            <p>Use this page to add a new class to the schedule.</p>
            <form
                onSubmit={async (e) => {
                    e.preventDefault();
                    try {
                        const response = await fetch("http://localhost:3000/classes", {
                            method: "POST",
                            headers: {
                                "Content-Type": "application/json",
                            },
                            body: JSON.stringify(formData),
                        });

                        console.log(formData)

                        if (!response.ok) {
                            throw new Error("Failed to add class");
                        }

                        alert("Class added successfully!");
                    } catch (error) {
                        console.error(error);
                        alert("An error occurred while adding the class.");
                    }
                }}
            >
                <FormControl fullWidth margin="normal">
                    <TextField
                        label="name"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        required
                    />
                </FormControl>
                <FormControl fullWidth margin="normal">
                    <TextField
                        label="Time"
                        id="time"
                        name="time"
                        type="time"
                        InputLabelProps={{ shrink: true }}
                        value={formData.time}
                        onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                        required
                    />
                </FormControl>
                <FormControl fullWidth margin="normal">
                    <TextField
                        label="description"
                        id="description"
                        name="description"
                        type="description"
                        value={formData.description}
                        onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                        required
                    />
                </FormControl>
                <FormControl fullWidth margin="normal">
                    <TextField
                        label="Cost"
                        id="cost"
                        name="cost"
                        type="number"
                        value={formData.cost}
                        onChange={(e) => setFormData({ ...formData, cost: e.target.value })}
                        required
                    />
                </FormControl>
                <FormControl fullWidth margin="normal">
                    <InputLabel id="day-label">Day</InputLabel>
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
                </FormControl>
                <FormControl fullWidth margin="normal">
                    <InputLabel id="dance-genres-label">Dance Genres</InputLabel>
                    <Select
                        labelId="dance-genres-label"
                        id="danceGenres"
                        name="danceGenres"
                        value={formData.danceGenres}
                        onChange={(e) => setFormData({ ...formData, danceGenres: e.target.value })}
                        required
                    >
                        <MenuItem value="ballet">Ballet</MenuItem>
                        <MenuItem value="hiphop">Hip Hop</MenuItem>
                        <MenuItem value="jazz">Jazz</MenuItem>
                        <MenuItem value="contemporary">Contemporary</MenuItem>
                        <MenuItem value="tap">Tap</MenuItem>
                        <MenuItem value="salsa">Salsa</MenuItem>
                        <MenuItem value="ballroom">Ballroom</MenuItem>
                        <MenuItem value="tango">Tango</MenuItem>
                        <MenuItem value="swing">Swing</MenuItem>
                        <MenuItem value="lyrical">Lyrical</MenuItem>
                        <MenuItem value="folk">Folk</MenuItem>
                        <MenuItem value="kathak">Kathak</MenuItem>
                        <MenuItem value="bharatanatyam">Bharatanatyam</MenuItem>
                        <MenuItem value="flamenco">Flamenco</MenuItem>
                        <MenuItem value="breakdance">Breakdance</MenuItem>
                    </Select>
                </FormControl>
                <Button type="submit" variant="contained" color="primary">
                    Add Class
                </Button>
            </form>
        </>
    )
}