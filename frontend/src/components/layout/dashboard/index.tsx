import { Paper } from "@mui/material";
import { DashboardLayout, PageContainer } from "@toolpad/core";
import { ReactRouterAppProvider } from '@toolpad/core/react-router';
import DashboardIcon from '@mui/icons-material/Dashboard';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import type { Navigation } from '@toolpad/core/AppProvider';
import { Outlet } from "react-router";

export default function DashboardAdminLayout() {

  const NAVIGATION: Navigation = [
    {
      kind: 'header',
      title: 'Main items',
    },
    {
      segment: 'dashboard',
      title: 'Home',
      icon: <DashboardIcon />,
    },
    {
      segment: 'dashboard/students',
      title: 'Students',
      icon: <ShoppingCartIcon />,
    },
  ];
  return (
    <ReactRouterAppProvider
      navigation={NAVIGATION}
    >
      <DashboardLayout>
        <Paper sx={{ width: '100%' }}>
          <PageContainer>
            <Outlet />
          </PageContainer>
        </Paper>
      </DashboardLayout>
    </ReactRouterAppProvider>

  );
}
