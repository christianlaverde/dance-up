import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
// import App from './App.tsx'
import { BrowserRouter, Route, Routes } from 'react-router'
import Home from './pages/home/index.tsx'
import Contact from './pages/contact/index.tsx'
import Students from './pages/users/index.tsx'
import StudentSignUp from './pages/signup/student/page.tsx'
import StudioSignUp from './pages/signup/studio/page.tsx'
import SignIn from './pages/dashboard/signIn/index.tsx'
import AdminStudents from './pages/dashboard/students/index.tsx'
import DashboardAdminLayout from './components/layout/dashboard/index.tsx'
import Layout from './components/layout/publicLayout/index.tsx'
import DashboardHome from './pages/dashboard/home/index.tsx'
import ProtectedRoute from './utils/context/protectedRoutes.tsx'
import ClassDetail from './pages/Class/Detail/index.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
      {/* Public Layout */}
      <Route element={<Layout />}>
        <Route path="/" element={<Home />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/classDetails/:studioId/:id" element={<ClassDetail />} />
        <Route path="/users" element={<Students />} />
        <Route path="/signup/student" element={<StudentSignUp />} />
        <Route path="/signup/studio" element={<StudioSignUp />} />
      </Route>

      {/* Dashboard Layout */}
      <Route element={<DashboardAdminLayout />}>
        <Route path="/dashboard/signin" element={<SignIn />} />
        <Route path="/dashboard/" element={<ProtectedRoute><DashboardHome /></ProtectedRoute>} />
        <Route path="/dashboard/students" element={<ProtectedRoute><AdminStudents /></ProtectedRoute>} />
      </Route>
      </Routes>
    </BrowserRouter>
  </StrictMode>,
)
