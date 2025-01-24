import React from 'react'
import LoginPage from './pages/LoginPage'
import StudentRegister from './components/StudentRegister'
import ForgotPassword from './components/ForgotPassword'
import AlumniRegister from './components/AlumniRegister'
import ReactDOM from "react-dom/client"
import { BrowserRouter,Routes,Route } from 'react-router-dom'
import CoordinatorPage from './pages/CoordinatorPage'
import HomePage from './pages/HomePage'
import AddTest from './components/AddTest'
import AddResources from './components/AddResources'
import AddResults from './components/AddResults'
import AddEvent  from './components/AddEvent'
import Layout from './components/Layout';



const App = () => (
  
  <BrowserRouter>
   <Routes>
    <Route path="/"element={<LoginPage/>}/>
    <Route path="/StudentRegister"element={<StudentRegister/>}/>
    <Route path="/AlumniRegister"element={<AlumniRegister/>}/>
    <Route path="/ForgotPassword"element={<ForgotPassword/>}/>

      <Route element={<Layout />}>
        <Route path="/Home" element={<HomePage />} />
        <Route path="/Coordinator" element={<CoordinatorPage />} />
        <Route path="/add-test" element={<AddTest />} />
        <Route path="/add-event" element={<AddEvent />} />
        <Route path="/add-resources" element={<AddResources />} />
        <Route path="/add-results" element={<AddResults />} />
      </Route>
   </Routes>
  </BrowserRouter>
  
)





export default App



