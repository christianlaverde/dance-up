import * as React from 'react';
import * as ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router';
import App from './App';
import Layout from './layouts/dashboard';
import DashboardPage from './pages';
import EmployeesCrudPage from './pages/instructors';
import SignInPage from './pages/signin';
import SchedulePage from './pages/schedule/schedule/schedule';
import InstructorsPage from './pages/instructors';

const router = createBrowserRouter([
  {
    Component: App,
    children: [
      {
        path: '/',
        Component: Layout,
        children: [
          {
            path: '',
            Component: DashboardPage,
          },
          {
            path: '/instructors',
            Component: InstructorsPage,
          },
          {
            path: '/schedule/',
            Component: SchedulePage,
          },
          {
            path: '/students',
            Component: React.lazy(() => import('./pages/students/students')),
            errorElement: <div>Failed to load students page</div>,
          },
          {
            path: '/students/details',
            Component: React.lazy(() => import('./pages/students/details/studentDetails')),
            errorElement: <div>Failed to load student details page</div>,
          },
          {
            path: 'schedule/addclass',
            Component: React.lazy(() => import('./pages/schedule/addClass/addClass')),
            errorElement: <div>Failed to load add class page</div>,
          },
          {
            path: 'schedule/editClass',
            Component: React.lazy(() => import('./pages/schedule/editClass/editClass')),
            errorElement: <div>Failed to load add class page</div>,
          }
        ],
      },
      {
        path: '/sign-in',
        Component: SignInPage,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
);