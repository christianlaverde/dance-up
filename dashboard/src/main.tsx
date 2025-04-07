import * as React from 'react';
import * as ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router';
import App from './App';
import Layout from './layouts/dashboard';
import DashboardPage from './pages';
import SchedulePage from './pages/schedule/schedule';


const router = createBrowserRouter([
  {
    Component: App,
    children: [
      {
        path: '/',
        Component: Layout,
        children: [
          {
            path: '/',
            Component: DashboardPage,
          },
          {
            path: '/schedule/',
            Component: SchedulePage,
            
          },
          {
            path: 'schedule/addclass',
            Component: React.lazy(() => import('./pages/schedule/addClass/addClass')),
            errorElement: <div>Failed to load add class page</div>,
            loader: async () => {
              // Simulate a network request
              await new Promise((resolve) => setTimeout(resolve, 1000));
              return null;
            }
          }
        ],
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
);