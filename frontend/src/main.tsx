import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
// import App from './App.tsx'
import { BrowserRouter, Route, Routes } from 'react-router'
import Home from './pages/home/index.tsx'
import Layout from './components/layout/index.tsx'
import Contact from './pages/contact/index.tsx'
import Students from './pages/users/index.tsx'
import StudentSignUp from './pages/signup/student/page.tsx'
import StudioSignUp from './pages/signup/studio/page.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route element={<Layout/>}>
          <Route index element={<Home/>} />
          <Route path='/contact' element={<Contact/>} />
          <Route path='/users' element={<Students/>} />
          <Route path='/signup/student' element={<StudentSignUp/>} />
          <Route path='/signup/studio' element={<StudioSignUp/>} />
        </Route>
      </Routes>
    </BrowserRouter>
  </StrictMode>,
)
