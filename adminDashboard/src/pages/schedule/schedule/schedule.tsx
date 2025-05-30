import * as React from 'react';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import CardActionArea from '@mui/material/CardActionArea';
import { Link } from 'react-router';
// import AddCircleIcon from '@mui/icons-material/AddCircle';
import { styled } from '@mui/material/styles';
import { useState, useEffect } from 'react';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import InputLabel from '@mui/material/InputLabel';
import { ClassStructure } from '../../../utils/interfaces/classObject';
import { useSession } from '../../../SessionContext';
// import { DAY_OF_THE_WEEK } from "../../../utils/enums/dayOfTheWeek";
// import { DANCE_GENRES } from "../../../utils/enums/danceGenres";
import { DateTime, Info } from "luxon";
import { FormControl, Select } from '@mui/material';

const WEEKDAYS = Info.weekdays();

export default function SchedulePage() {
  const [classes, setClasses] = useState<ClassStructure[]>([]);
  const [filteredClasses, setFilteredClasses] = useState<ClassStructure[]>([]);
  const [genreFilter, setGenreFilter] = useState<string>();
  const [dayFilter, setDayFilter] = useState<string>();
  const [sortOption, setSortOption] = useState('');

  const FilterContainer = styled('div')(({ theme }) => ({
    marginBottom: theme.spacing(2),
    display: 'flex',
    gap: theme.spacing(2),
    alignItems: 'center',
  }));

  const API_ENDPOINT = import.meta.env.VITE_API_ENDPOINT;
  const session = useSession().session;
  const userId = session?.user.id || '';
  console.log('session: ', session);

  useEffect(() => {
    fetch(`${API_ENDPOINT}/studios/studio-0/classes`)
      .then((response) => response.json())
      .then((data) => {
        console.log('class data: ', data);
        const classData = data.data;
        setClasses(classData);
        setFilteredClasses(classData)
      })
      .catch((error) => console.error('Error fetching classes:', error));
  }, []);

  useEffect(() => {
    let updatedClasses = [...classes];

    if (genreFilter) {
      updatedClasses = updatedClasses.filter((cls) => cls.genre === genreFilter);
    }

    if (dayFilter) {
      updatedClasses = updatedClasses.filter((cls) => WEEKDAYS[cls.day! - 1] === dayFilter);
    }

    if (sortOption === 'alphabetical') {
      updatedClasses.sort((a, b) => a.name.localeCompare(b.name));
    } else if (sortOption === 'day') {
      // TODO: Using `!` here, make sure there is no better way.
      updatedClasses.sort((a, b) => a.day! - b.day!); 
    }

    setFilteredClasses(updatedClasses);
    console.log('filteredClasses: ', filteredClasses);
  }, [genreFilter, dayFilter, sortOption, classes]);

  return (
    <div>
      <FilterContainer>
        <FormControl fullWidth>
          <InputLabel id="genre-filter-select-label">Filter by Genre</InputLabel>
          <Select
            id="genre-filter-select"
            label="Filter by Genre"
            defaultValue={''}
            value={genreFilter}
            onChange={(e) => setGenreFilter(e.target.value)}
          >
            {Array.from(new Set(classes.map((cls) => cls.genre))).map((genre) => (
              <MenuItem key={genre} value={genre}>
                {genre}
              </MenuItem>
            ))}
          </Select>
          </FormControl>
          <FormControl fullWidth>
          <InputLabel id="day-filter-select-label">Filter by Day</InputLabel>
          <Select
            labelId="day-filter-select-label"
            id="day-filter-select"
            // For some reason if this label field isn't provided,
            // the select box outline goes right through the label when
            // the select is active.
            label="Filter by Day"
            defaultValue={''}
            value={dayFilter}
            onChange={(e) => { setDayFilter(e.target.value) }}
          >
            {WEEKDAYS.map((day) => (
              <MenuItem key={day} value={day}>
                {day}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <TextField
          label="Sort By"
          value={sortOption}
          onChange={(e) => setSortOption(e.target.value)}
          select
          fullWidth
        >
          <MenuItem value="alphabetical">Alphabetical</MenuItem>
          <MenuItem value="day">Day of the Week</MenuItem>
        </TextField>
        <Button variant="contained" onClick={() => {
          setGenreFilter('');
          setDayFilter(undefined);
          setSortOption('');
        }}>
          Clear Filters
        </Button>
      </FilterContainer>
      <Grid container spacing={0}>
        {filteredClasses.map((cls: any) => (
          <Grid xs={12} sm={6} md={4} padding={"5px"} key={cls.id}>
            <Link to={`/schedule/editClass`} state={{ classId: cls.id }}>
              <Card> 
                <CardActionArea sx={{paddingLeft: "10px"}}>
                  <Typography variant="h6" component="div" gutterBottom align="center">
                    {cls.name}
                  </Typography>
                  <Typography align="center">
                    {DateTime.fromISO(cls.startTime).toFormat('hh:mm a')} - {DateTime.fromISO(cls.endTime).toFormat('hh:mm a')}
                  </Typography>
                  <Typography variant="body2" component="div">
                    {cls.description}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" >
                    Genre: {cls.genre}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" >
                    Day: {WEEKDAYS[cls.day - 1]}
                  </Typography>
                </CardActionArea>
              </Card>
            </Link>
          </Grid>
        ))}
      </Grid>
    </div>
  );
{/*
        <div>
    <FilterContainer>
    <TextField
    label="Filter by Genre"
    value={genreFilter}
    onChange={(e) => setGenreFilter(e.target.value)}
    select
    fullWidth
    >
    {Array.from(new Set(classes.map((cls) => cls.danceGenres))).map((genre) => (
        <MenuItem key={genre} value={genre}>
        {genre}
        </MenuItem>
    ))}
    </TextField>
    <TextField
    label="Filter by Day"
    value={dayFilter}
    onChange={(e) => setDayFilter(e.target.value)}
    select
    fullWidth
    >
    {DAY_OF_THE_WEEK.map((day) => (
        <MenuItem key={day} value={day}>
        {day}
        </MenuItem>
    ))}
    </TextField>
    <TextField
    label="Sort By"
    value={sortOption}
    onChange={(e) => setSortOption(e.target.value)}
    select
    fullWidth
    >
    <MenuItem value="alphabetical">Alphabetical</MenuItem>
    <MenuItem value="day">Day of the Week</MenuItem>
    </TextField>
    <Button variant="outlined" onClick={() => {
        setGenreFilter('');
        setDayFilter('');
        setSortOption('');
    }}>
    Clear Filters
    </Button>
    </FilterContainer>
    <Grid container spacing={2}>
    {filteredClasses.map((cls: any) => (
        <Grid item xs={12} sm={6} md={4} key={cls.id}>
        <Link to={`/Schedule/editClass`} state={{ classId: cls.id }}>
        <Card>
        <CardActionArea>
        <Typography variant="h6" component="div" gutterBottom>
        {cls.name}
        </Typography>
        <Typography variant="body2" color="text.secondary">
        Genre: {cls.danceGenres}
        </Typography>
        <Typography variant="body2" color="text.secondary">
        Day: {cls.day}
        </Typography>
        </CardActionArea>
        </Card>
        </Link>
        </Grid>
    ))}
    </Grid>
    </div>
    */}
}
