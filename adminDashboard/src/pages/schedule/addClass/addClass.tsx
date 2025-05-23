import React, { useState } from "react";
import { TextField, Button, MenuItem, Select, InputLabel, FormControl, TextareaAutosize, SelectChangeEvent } from "@mui/material";
import { TimeField, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterLuxon } from "@mui/x-date-pickers/AdapterLuxon"
import { useSession } from "../../../SessionContext";
import { DANCE_GENRES } from "../../../utils/enums/danceGenres";
import { useNavigate } from "react-router";
import APIRequest from "../../../utils/funcs/apiRequest";
import { DateTime, Info } from "luxon";

interface AddClassFormData {
  name: string;
  description: string;
  genre: string;
  day: string;
  startTime: DateTime | null; 
  endTime: DateTime | null;
}

const WEEKDAYS = Info.weekdays('long');

export default function AddClass() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState<AddClassFormData>({
    name: '',
    description: '',
    genre: '',
    day: '',
    startTime: DateTime.now(),
    endTime: DateTime.now(),
  })

  return (
    <>
      <p>Use this page to add a new class to the schedule.</p>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          console.log(formData);
          APIRequest('POST', '/studios/studio-0/classes', formData);
          navigate('/schedule');
        }}
      >
        <FormControl fullWidth margin="normal">
          <TextField
            label="Name"
            id="name"
            name="name"
            value={formData.name}
            onChange={ (e) => setFormData({ ...formData, name: e.target.value }) }
            required
          />
        </FormControl>
        <FormControl fullWidth margin="normal">
          <TextField
            label="Description"
            id="description"
            name="description"
            type="description"
            value={formData.description}
            onChange={ (e) => setFormData({ ...formData, description: e.target.value }) }
            required
          />
        </FormControl>
        <FormControl fullWidth margin="normal">
          <InputLabel id="dance-genres-label">Genres</InputLabel>
          <Select
            labelId="genre-label"
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
            {WEEKDAYS.map((day, index) => (
              <MenuItem key={day} value={index+1}>
                {day}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <FormControl fullWidth margin="normal">
          <LocalizationProvider dateAdapter={AdapterLuxon} adapterLocale="en">
            <TimeField
              label="Start Time"
              id="start-time"
              name="start-time"
              value={formData.startTime}
              format="hh:mm a"
              onChange={ (newTime) => setFormData({ ...formData, startTime: newTime }) }
              required
            />
          </LocalizationProvider>
        </FormControl>
        <FormControl fullWidth margin="normal">
          <LocalizationProvider dateAdapter={AdapterLuxon} adapterLocale="en">
            <TimeField
              label="End Time"
              id="end-time"
              name="end-time"
              value={formData.endTime}
              format="hh:mm a"
              onChange={ (newTime) => setFormData({ ...formData, endTime: newTime }) }
              required
            />
          </LocalizationProvider>
        </FormControl>
        <Button type="submit" variant="contained" color="primary">
          Add Class
        </Button>
      </form>
    </>
  )
}

