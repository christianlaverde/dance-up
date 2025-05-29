import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router";
import { TextField, Button, Box, Select, MenuItem } from "@mui/material";
import axios from "axios";
import React from "react";
import { ClassStructure } from "../../../utils/interfaces/classObject";
import { DateTime, Info } from "luxon";
import { TimeField, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterLuxon } from "@mui/x-date-pickers/AdapterLuxon";
import { DANCE_GENRES } from "../../../utils/enums/danceGenres";
import { RecurrencePattern } from "../../../../../backend/src/domain/recurrencePattern";

const API_ENDPOINT = import.meta.env.VITE_API_ENDPOINT;
const WEEKDAYS = Info.weekdays('long');

interface EditClassFormData {
  id: string;
  name: string;
  description: string;
  genre: string;
  day: string;
  startTime: DateTime | null; 
  endTime: DateTime | null;
  recurrence: RecurrencePattern | null;
}

export default function EditClass() {
  const location = useLocation();
  const navigate = useNavigate();
  const [classData, setClassData] = useState<ClassStructure>({
    id: "",
    name: "",
    description: "",
    startTime: null,
    endTime: null,
    day: null,
    genre: "",
    recurrence: null,
  });
  const [formData, setFormData] = useState<EditClassFormData>({
    id: "",
    name: '',
    description: '',
    startTime: null,
    endTime: null,
    day: '',
    genre: '',
    recurrence: null,
  });

  useEffect(() => {
    const fetchClassData = async () => {
      try {
        const studioId = 'studio-0';
        const classId = location.state.classId;
        const response = await axios.get(`${API_ENDPOINT}/studios/${studioId}/classes/${classId}`);
        if (response.status === 200) {
          const cls = response.data.data;
          setClassData(cls);
          setFormData({
            id: cls.id || "",
            name: cls.name || "",
            description: cls.description || "",
            startTime: DateTime.fromISO(cls.startTime) || "",
            endTime: DateTime.fromISO(cls.endTime) || "",
            day: cls.day || "",
            genre: cls.genre || "",
            recurrence: cls.recurrence,
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
      const studioId = 'studio-0';
      const classId = location.state.classId;
      await axios.put(`${API_ENDPOINT}/studios/${studioId}/classes/${classId}`, formData);
      alert("Class updated successfully!");
      navigate("/schedule");
    } catch (error) {
      console.error("Error updating class:", error);
    }
  };

  const handleDelete = async () => {
    try {
      const studioId = 'studio-0';
      const classId = location.state.classId;
      await axios.delete(`${API_ENDPOINT}/studios/${studioId}/classes/${classId}`);
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
      <Select
        label="Genre"
        id="genre"
        name="genre"
        value={formData.genre}
        onChange={ (e) => setFormData({ ...formData, genre: e.target.value }) }
        required
      >
        {Object.values(DANCE_GENRES).map((genre) => (
          <MenuItem key={genre} value={genre}>
            {genre}
          </MenuItem>
        ))}
      </Select>
      <Select
        labelId="day-label"
        id="day"
        name="day"
        value={formData.day}
        onChange={(e) => setFormData({ ...formData, day: e.target.value })}
        required
      >
        {WEEKDAYS.map((day, index) => (
          <MenuItem key={day} value={index+1}>
            {day}
          </MenuItem>
        ))}
      </Select>
      <LocalizationProvider dateAdapter={AdapterLuxon} adapterLocale="en">
        <TimeField
          label="Start Time"
          id="start-time"
          name="start-time"
          value={formData.startTime}
          onChange={(newTime) => setFormData({ ...formData, startTime: newTime} )}
          fullWidth
        />
        <TimeField
          label="End Time"
          id="end-time"
          name="end-time"
          value={formData.endTime}
          onChange={(newTime) => setFormData({ ...formData, endTime: newTime} )}
          fullWidth
        />
      </LocalizationProvider>
      <Button type="submit" variant="contained" color="primary">
        Update Class
      </Button>
      <Button variant="contained" color="secondary" onClick={handleDelete}>
        Delete Class
      </Button>
    </Box>
  );
}
