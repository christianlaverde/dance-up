import * as React from 'react';
import DashboardIcon from '@mui/icons-material/Dashboard';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import SchoolIcon from '@mui/icons-material/School';
import HomeIcon from '@mui/icons-material/Home';
import PersonIcon from '@mui/icons-material/Person';
import { Outlet } from 'react-router';
import { ReactRouterAppProvider } from '@toolpad/core/react-router';
import type { Navigation, Authentication } from '@toolpad/core/AppProvider';
import { firebaseSignOut, onAuthStateChanged } from './firebase/auth';
import SessionContext, { type Session } from './SessionContext';

const NAVIGATION: Navigation = [
  {
    kind: 'header',
    title: 'Main items',
  },
  {
    title: 'Dashboard',
    icon: <DashboardIcon />,
  },
  {
    segment: 'instructors',
    title: 'Instructors',
    icon: <PersonIcon />
  },
  {
    title: 'Students',
    segment: 'students',
    icon: <SchoolIcon />,
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
    ]
  },
  {
    segment: 'account',
    title: 'Account',
    icon: <AccountCircleIcon />
  }
];

const BRANDING = {
  title: "Dance Up Dashboard",
};

const AUTHENTICATION: Authentication = {    
  signIn: () => {},
  signOut: firebaseSignOut,
};

export default function App() {
  const [session, setSession] = React.useState<Session | null>(null);
  const [loading, setLoading] = React.useState(true);

  const sessionContextValue = React.useMemo(
    () => ({
      session,
      setSession,
      loading,
    }),
    [session, loading],
  );

  React.useEffect(() => {
    const unsubscribe = onAuthStateChanged((user) => {
      if (user) {
        setSession({
          user: {
            name: user.name || '',
            email: user.email || '',
            image: user.photoURL || '',
            phoneNumber: user.phoneNumber || '',
            uid: user.uid || '',
          },
        });
      } else {
        setSession(null);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  return (
    <ReactRouterAppProvider
      navigation={NAVIGATION}
      branding={BRANDING}
      session={session}
      authentication={AUTHENTICATION}
    >
      <SessionContext.Provider value={sessionContextValue}>
        <Outlet />
      </SessionContext.Provider>
    </ReactRouterAppProvider>
  );
}
