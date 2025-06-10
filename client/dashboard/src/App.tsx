import * as React from 'react';
import DashboardIcon from '@mui/icons-material/Dashboard';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import SchoolIcon from '@mui/icons-material/School';
import HomeIcon from '@mui/icons-material/Home';
import { Outlet } from 'react-router';
import { ReactRouterAppProvider } from '@toolpad/core/react-router';
import type { Navigation } from '@toolpad/core/AppProvider';

const NAVIGATION: Navigation = [
  {
    kind: 'header',
    title: 'Main items',
  },
  {
    title: 'Home',
    icon: <HomeIcon />,
  },
  {
    title: 'Students',
    segment: 'students',
    icon: <SchoolIcon />,
    children: [
      {
        segment: '',
        title: 'Students',
      },
      {
        segment: 'details',
        title: 'Student Details',
      },
    ]
  },
  {
    segment: 'schedule',
    title: 'Schedule',
    icon: <CalendarMonthIcon />,
    children: [
      {
        segment: '',
        title: 'Schedule',
      },
      {
        segment: 'addclass',
        title: 'Add Class',
      },
      {
        segment: 'editClass/',
        title: 'Edit Class',
      },
    ]
  },

];

const BRANDING = {
  title: "dashboard",
};


export default function App() {
  
  return (
    <ReactRouterAppProvider navigation={NAVIGATION} branding={BRANDING}>
      <Outlet />
    </ReactRouterAppProvider>
  );
}