import React from 'react'
import Navbar from './components/Navbar'
import LoginPage from './components/LoginPage'
import StudentRegister from './components/StudentRegister'
import StudentDetailsForm from './components/CreateStudentAccount'
import ForgotPassword from './components/ForgotPassword'
import AlumniRegister from './components/AlumniRegister'
import ReactDOM from "react-dom/client"
import { BrowserRouter,Routes,Route } from 'react-router-dom'



const App = () => (
  
  <BrowserRouter>
   <Routes>
    <Route path="/"element={<LoginPage/>}/>
    <Route path="/StudentRegister"element={<StudentRegister/>}/>
    <Route path="/AlumniRegister"element={<AlumniRegister/>}/>
    <Route path="/ForgotPassword"element={<ForgotPassword/>}/>
   </Routes>
  </BrowserRouter>
  
)

export default App
