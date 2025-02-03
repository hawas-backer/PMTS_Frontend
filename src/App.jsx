import React from 'react'
import LoginPage from './pages/LoginPage'
import StudentRegister from './components/StudentRegister'
import ForgotPassword from './components/ForgotPassword'
import AlumniRegister from './components/AlumniRegister'
import { BrowserRouter,Routes,Route } from 'react-router-dom'
import CoordinatorPage from './pages/CoordinatorPage'
import Layout from './components/Layout';
import CreateStudentAccount from './components/CreateStudentAccount'
import CreateTest from './components/Coordinator/CreateTest'
import AlumniDashboard from './pages/AlumniDashboard'
import HomePage from './pages/HomePage'
import ShareOpportunities from './components/Alumni/ShareOpportunities'
import ShareResources from './components/Alumni/ShareResources'
import Events from './components/Alumni/Events'
import Networking from './components/Alumni/Networking'



const App = () => (

  
  
  <BrowserRouter>
   <Routes>
    <Route path="/"element={<LoginPage/>}/>
    <Route path="/StudentRegister"element={<StudentRegister/>}/>
    <Route path="/AlumniRegister"element={<AlumniRegister/>}/>
    <Route path="/ForgotPassword"element={<ForgotPassword/>}/>
    <Route path="/CreateStudent"element={<CreateStudentAccount/>}/>

      <Route element={<Layout />}>

      <Route path="/Alumni/Home" element={<HomePage />} />
      <Route path="/alumni/ShareOpportunities" element={<ShareOpportunities />} />
      <Route path="/alumni/ShareResources" element={<ShareResources />} />
       <Route path="/alumni/Events" element={<Events />} />
      <Route path="/alumni/Networking" element={<Networking />} />

            
        <Route path="/Coordinator" element={<CoordinatorPage />} />
        <Route path="/create-test" element={<CreateTest />} />
        <Route path="/Alumni"element={<AlumniDashboard/>}/>
        
      </Route>
   </Routes>
  </BrowserRouter>
  
)





export default App



