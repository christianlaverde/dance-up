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

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
      {/* Public Layout */}
      <Route element={<Layout />}>
        <Route path="/" element={<Home />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/users" element={<Students />} />
        <Route path="/signup/student" element={<StudentSignUp />} />
        <Route path="/signup/studio" element={<StudioSignUp />} />
      </Route>

      {/* Dashboard Layout */}
      <Route element={<DashboardAdminLayout />}>
        <Route path="/dashboard" element={<DashboardHome />} />
        <Route path="/dashboard/signin" element={<SignIn />} />
        <Route path="/dashboard/students" element={<AdminStudents />} />
      </Route>
      </Routes>
    </BrowserRouter>
  </StrictMode>,
)
