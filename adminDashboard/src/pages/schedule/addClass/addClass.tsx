import React, { useState } from "react";
import { TextField, Button, MenuItem, Select, InputLabel, FormControl, TextareaAutosize } from "@mui/material";
import { ClassStruture } from "../../../utils/interfaces/classObject";
import { useSession } from "../../../SessionContext";
import { DAY_OF_THE_WEEK } from "../../../utils/enums/dayOfTheWeek";
import { DANCE_GENRES } from "../../../utils/enums/danceGenres";
import { useNavigate } from "react-router";
import APIRequest from "../../../utils/funcs/apiRequest";

export default function AddClass() {
    const navigate = useNavigate();
    
    const [formData, setFormData] = useState<ClassStruture>({
        name: '',
        time: '',
        description: '',
        cost: '',
        day: '',
        danceGenres: '',
        studioId: useSession().session?.user.uid || '',
    });
    return (
        <>
            <p>Use this page to add a new class to the schedule.</p>
            <form
                onSubmit={(e) => {
                    e.preventDefault();
                    APIRequest('POST', 'classes', formData);
                    navigate('/schedule');
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
                        {Object.values(DAY_OF_THE_WEEK).map((day) => (
                            <MenuItem key={day} value={day}>
                                {day}
                            </MenuItem>
                        ))}
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
                        {Object.values(DANCE_GENRES).map((genre) => (
                            <MenuItem key={genre} value={genre}>
                                {genre}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
                <Button type="submit" variant="contained" color="primary">
                    Add Class
                </Button>
            </form>
        </>
    )
}