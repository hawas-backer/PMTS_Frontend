import React from 'react'
import LoginPage from './pages/LoginPage'
import StudentRegister from './components/StudentRegister'
import ForgotPassword from './components/ForgotPassword'
import AlumniRegister from './components/AlumniRegister'
import { BrowserRouter,Routes,Route } from 'react-router-dom'
import CoordinatorPage from './pages/CoordinatorPage'
import Layout from './components/Layout';
import CreateStudentAccount from './components/CreateStudentAccount'
import CreateTest from './components/CreateTest'


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
        <Route path="/create-test" element={<CreateTest />} />
      </Route>
   </Routes>
  </BrowserRouter>
  
)





export default App



