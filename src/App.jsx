import React from 'react'
import LoginPage from './pages/LoginPage'
import StudentRegister from './components/StudentRegister'
import ForgotPassword from './components/ForgotPassword'
import AlumniRegister from './components/AlumniRegister'
import { BrowserRouter,Routes,Route } from 'react-router-dom'
import CoordinatorPage from './pages/CoordinatorPage'
import HomePage from './pages/HomePage'
import AddTest from './components/AddTest'
import AddResources from './components/AddResources'
import AddResults from './components/AddResults'
import AddEvent  from './components/AddEvent'
import Layout from './components/Layout';
import CreateStudentAccount from './components/CreateStudentAccount'
import Event from './components/Event'
import AptitudeTest from "./components/AptitudeTest"
import Resources from "./components/Resources"
import PlacementResults from './components/PlacementResults'

const App = () => (
  
  <BrowserRouter>
   <Routes>
    <Route path="/"element={<LoginPage/>}/>
    <Route path="/StudentRegister"element={<StudentRegister/>}/>
    <Route path="/AlumniRegister"element={<AlumniRegister/>}/>
    <Route path="/ForgotPassword"element={<ForgotPassword/>}/>
    <Route path="/CreateStudent"element={<CreateStudentAccount/>}/>

      <Route element={<Layout />}>
        <Route path="/Coordinator" element={<CoordinatorPage />} />
        <Route path="/Event" element={<Event />} />
        <Route path="/AptitudeTest" element={<AptitudeTest/>} />
        <Route path="/Resources" element={<Resources/>} />
        <Route path="/PlacementResults" element={<PlacementResults/>} />

        <Route path="/add-test" element={<AddTest />} />
        <Route path="/add-event" element={<AddEvent />} />
        <Route path="/add-resources" element={<AddResources />} />
        <Route path="/add-results" element={<AddResults />} />
      </Route>
   </Routes>
  </BrowserRouter>
  
)





export default App



