import React from 'react'
import LoginPage from './pages/LoginPage'
import StudentRegister from './components/StudentRegister'
import ForgotPassword from './components/ForgotPassword'
import AlumniRegister from './components/AlumniRegister'
import { BrowserRouter,Routes,Route ,createBrowserRouter,createRoutesFromElements,RouterProvider} from 'react-router-dom'
import CoordinatorPage from './pages/CoordinatorPage'
import CoordinatorLayout from './components/Coordinator/CoordinatorLayout';
import CreateStudentAccount from './components/CreateStudentAccount'
import CreateTest from './components/Coordinator/CreateTest'
import AlumniDashboard from './pages/AlumniDashboard'
import HomePage from './pages/HomePage'
import AdvisorPage from './pages/AdvisorPage'
import AlumniLayout from './components/Alumni/AlumniLayout'
import ShareOpportunities from './components/alumni/ShareOpportunities'
import ShareResources from './components/alumni/ShareResources'
import Events from './components/alumni/Events'
import Networking from './components/alumni/Networking'
import Notifications from './components/alumni/Notifications'
import Feedback from './components/Alumni/Feedback'
import StudentPage from './pages/StudentPage'
import StudentLayout from './components/Student/StudentLayout'
import AdvisorLayout from './components/Advisor/AdvisorLayout'
import PlacementData from './components/Home/PlacementData'
import Recruiters from './components/Home/Recruiters'
import HomeLayout from './components/Home/HomeLayout'



const App = () => {
  
 
const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/" element={<LoginPage />} />
      <Route path="StudentRegister" element={<StudentRegister />} />
      <Route path="AlumniRegister" element={<AlumniRegister />} />
      <Route path="ForgotPassword" element={<ForgotPassword />} />
      <Route path="CreateStudent" element={<CreateStudentAccount />} />
      <Route path="Alumni" element={<AlumniDashboard />} />
      <Route path="Coordinator" element={<CoordinatorPage />} />


      <Route path="Alumni" element={<AlumniLayout />}>
        <Route path="" element={<HomeLayout />} >
          <Route index element={<HomePage />} />
          <Route path="placementData" element={<PlacementData />} />
          <Route path="recruiters" element={<Recruiters />} />
        </Route>
        <Route path="shareOportunities" element={<ShareOpportunities />} />
        <Route path="shareResources" element={<ShareResources />} />
        <Route path="events" element={<Events />} />
        <Route path="networking" element={<Networking />} />
        <Route path="notifications" element={<Notifications />} />
        <Route path="feedback" element={<Feedback />} />
      </Route>

      <Route path="Coordinator" element={<CoordinatorLayout home={"Coordinator"}/>}>
      <Route index element={<CoordinatorPage />} />
      <Route path="create-test" element={<CreateTest />} />
      </Route>

      <Route path="Student" element={<StudentLayout />}>
      <Route index element={<StudentPage />} />

      </Route>

      <Route path="Advisor" element={<AdvisorLayout />}>
      <Route index element={<AdvisorPage />} />

      </Route>
    </>
    
     

  )
);
  return <RouterProvider router={router} />;
  
}




export default App



