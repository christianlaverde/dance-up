import * as React from 'react';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import CardActionArea from '@mui/material/CardActionArea';
// import { Link } from 'react-router';
// import AddCircleIcon from '@mui/icons-material/AddCircle';
// import { styled } from '@mui/material/styles';
import { useState, useEffect } from 'react';
// import TextField from '@mui/material/TextField';
// import MenuItem from '@mui/material/MenuItem';
import Grid from '@mui/material/Grid';
// import Button from '@mui/material/Button';
import { ClassStructure } from '../../../utils/interfaces/classObject';
import { useSession } from '../../../SessionContext';
// import { DAY_OF_THE_WEEK } from "../../../utils/enums/dayOfTheWeek";
// import { DANCE_GENRES } from "../../../utils/enums/danceGenres";

export default function SchedulePage() {
    const [classes, setClasses] = useState<ClassStructure[]>([]);
    // const [filteredClasses, setFilteredClasses] = useState<ClassStructure[]>([]);
    // const [genreFilter, setGenreFilter] = useState('');
    // const [dayFilter, setDayFilter] = useState('');
    // const [sortOption, setSortOption] = useState('');

    // const FilterContainer = styled('div')(({ theme }) => ({
    //     marginBottom: theme.spacing(2),
    //     display: 'flex',
    //     gap: theme.spacing(2),
    //     alignItems: 'center',
    // }));

    const API_ENDPOINT = import.meta.env.VITE_API_ENDPOINT;
    const session = useSession().session;
    const userId = session?.user.id || '';
    console.log('session: ', session);

    useEffect(() => {
        //fetch(`http://localhost:3000/classes?studioId=${userId}`)
        fetch(`${API_ENDPOINT}/studios/studio-0/classes`)
        .then((response) => response.json())
        .then((data) => {
            console.log('class data: ', data);
            const classData = data.data;
            setClasses(classData);
            // setFilteredClasses(data);
        })
        .catch((error) => console.error('Error fetching classes:', error));
    }, []);

    /*
        useEffect(() => {
        let updatedClasses = [...classes];

        if (genreFilter) {
            updatedClasses = updatedClasses.filter((cls) => cls.danceGenres === genreFilter);
        }

        if (dayFilter) {
            updatedClasses = updatedClasses.filter((cls) => cls.day === dayFilter);
        }

        if (sortOption === 'alphabetical') {
            updatedClasses.sort((a, b) => a.name.localeCompare(b.name));
        } else if (sortOption === 'day') {
            updatedClasses.sort((a, b) => DAY_OF_THE_WEEK.indexOf(a.day) - DAY_OF_THE_WEEK.indexOf(b.day));
        }

        setFilteredClasses(updatedClasses);
    }, [genreFilter, dayFilter, sortOption, classes]);
    */

    return (
        <div>
        <Grid container spacing={0}>
        {classes.map((cls: any) => (
            <Grid xs={12} sm={6} md={4} sx={{padding: '5px' }} key={cls.id}>
            {/* <Link to={`/Schedule/editClass`} state={{ classId: cls.id }}> */}
            <Card> 
            <CardActionArea>
            <Typography variant="h6" component="div" gutterBottom sx={{textAlign: 'center'}}>
            {cls.name.value}
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{paddingLeft: '10px'}}>
            Genre: {cls.genre}
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{paddingLeft: '10px'}}>
            Day: {cls.timeSlot.day}
            </Typography>
            </CardActionArea>
            </Card>
            {/* </Link> */}
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
