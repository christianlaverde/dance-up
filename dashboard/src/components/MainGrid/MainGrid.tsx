import * as React from 'react';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Copyright from '../../internals/components/Copyright';
import ChartUserByCountry from '../ChartUserByCountry/ChartUserByCountry';
import CustomizedTreeView from '../CustomizedTreeView/CustomizedTreeView';
import CustomizedDataGrid from '../CustomizedDataGrid/CustomizedDataGrid';
import HighlightedCard from '../HighlightedCard/HighlightedCard';
import PageViewsBarChart from '../PageViewsBarChart/PageViewsBarChart';
import SessionsChart from '../SessionsChart/SessionsChart';
import StatCard, { StatCardProps } from '../StatCard/StatCard';
import Grid2 from '@mui/material/Grid2';

const data: StatCardProps[] = [
  {
    title: 'Active Students',
    value: '14k',
    interval: 'Last 30 days',
    trend: 'up',
    data: [
      200, 24, 220, 260, 240, 380, 100, 240, 280, 240, 300, 340, 320, 360, 340, 380,
      360, 400, 380, 420, 400, 640, 340, 460, 440, 480, 460, 600, 880, 920,
    ],
  },
  {
    title: 'Class Attendance',
    value: '23',
    interval: '',
    trend: 'neutral',
    data: [
      10, 15, 20, 25, 16, 18, 30,10, 14, 28,39, 20, 30,32,19
    ],
    // data: [],
  },
  {
    title: 'Events',
    value: '',
    interval: 'Coming Soon...',
    trend: 'neutral',
    // data: [
    //   500, 400, 510, 530, 520, 600, 530, 520, 510, 730, 520, 510, 530, 620, 510, 530,
    //   520, 410, 530, 520, 610, 530, 520, 610, 530, 420, 510, 430, 520, 510,
    // ],
    data: [],
  },
];

export default function MainGrid() {
  return (
    <Box sx={{ width: '100%', maxWidth: { sm: '100%', md: '1700px' } }}>
      {/* cards */}
      <Typography component="h2" variant="h6" sx={{ mb: 2 }}>
        Overview
      </Typography>
      <Grid2
        container
        spacing={2}
        columns={12}
        sx={{ mb: (theme) => theme.spacing(2) }}
      >
        {data.map((card, index) => (
          <Grid2 key={index} size={{ xs: 12, sm: 6, lg: 3 }}>
            <StatCard {...card} />
          </Grid2>
        ))}
        <Grid2 size={{ xs: 12, sm: 6, lg: 3 }}>
          <HighlightedCard />
        </Grid2>
        {/* <Grid2 size={{ xs: 12, md: 6 }}>
          <SessionsChart />
        </Grid2> */}
        <Grid2 size={{ xs: 12, md: 12 }}>
          <PageViewsBarChart />
        </Grid2>
      </Grid2>
      {/* <Typography component="h2" variant="h6" sx={{ mb: 2 }}>
        Class Details
      </Typography> */}
      {/* <Grid2 container spacing={2} columns={12}>
        <Grid2 size={{ xs: 12, lg: 12 }}>
          <CustomizedDataGrid />
        </Grid2>
      </Grid2> */}
      <Copyright sx={{ my: 4 }} />
    </Box>
  );
}
