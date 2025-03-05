// frontend/src/App.jsx
import React from 'react';
import LoginPage from './pages/LoginPage';
import Register from './pages/Register';
import ForgotPassword from './components/ForgotPassword';
import { createBrowserRouter, createRoutesFromElements, RouterProvider, Route } from 'react-router-dom';
import CoordinatorLayout from './components/Coordinator/CoordinatorLayout';
import CreateStudentAccount from './components/CreateStudentAccount';
import CreateTest from './components/Coordinator/CreateTest';
import HomePage from './pages/HomePage';
import AlumniLayout from './components/Alumni/AlumniLayout';
import ShareOpportunities from './components/alumni/ShareOpportunities';
import ShareResources from './components/alumni/ShareResources';
import Events from './components/Coordinator/Events';
import Networking from './components/alumni/Networking';
import Notifications from './components/alumni/Notifications';
import Feedback from './components/Alumni/Feedback';
import StudentLayout from './components/Student/StudentLayout';
import AdvisorLayout from './components/Advisor/AdvisorLayout';
import PlacementData from './components/Home/PlacementData';
import Recruiters from './components/Home/Recruiters';
import HomeLayout from './components/Home/HomeLayout';
import AptitudeTest from './components/Coordinator/AptitudeTest';
import Resources from './components/Coordinator/Resources';
import PlacementResults from './components/Coordinator/PlacementResults';
import PlacementDrive from './components/Student/PlacementDrive';
import ResourceAdd from './components/Student/ResourceAdd';
import Analytics from './components/Student/Analytics';
import EventAdd from './components/Student/EventAdd';
import JobOpportunities from './components/Student/JobOpportunities';
import ExamCorner from './components/Student/ExamCorner';
import PendingRequests from './components/Advisor/PendingRequests';
import ViewAnalysis from './components/Advisor/ViewAnalysis';
import Contact from './components/Home/Contact';
import Gallery from './components/Home/Gallery';
import Procedure from './components/Home/Procedure';
import Testimonial from './components/Home/Testimonial';
import ProtectedRoute from './components/ProtectedRoute';
import { AuthProvider } from './context/AuthContext';
import StudentAddForm from './components/Advisor/AddStudent';

const App = () => {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <>
        {/* Public Routes */}
        <Route path="/" element={<LoginPage />} />
        <Route path="register" element={<Register />} />
        <Route path="ForgotPassword" element={<ForgotPassword />} />

        {/* Protected Routes */}
        <Route
          path="Alumni"
          element={<ProtectedRoute allowedRoles={['Alumni']}><AlumniLayout /></ProtectedRoute>}
        >
          <Route path="" element={<HomeLayout />}>
            <Route index element={<HomePage />} />
            <Route path="placementData" element={<PlacementData />} />
            <Route path="recruiters" element={<Recruiters />} />
            <Route path="gallery" element={<Gallery />} />
            <Route path="contact" element={<Contact />} />
            <Route path="procedure" element={<Procedure />} />
            <Route path="testimonial" element={<Testimonial />} />
          </Route>
          <Route path="shareOportunities" element={<ShareOpportunities />} />
          <Route path="shareResources" element={<ShareResources />} />
          <Route path="events" element={<Events />} />
          <Route path="networking" element={<Networking />} />
          <Route path="notifications" element={<Notifications />} />
          <Route path="feedback" element={<Feedback />} />
        </Route>

        <Route
          path="Coordinator"
          element={<ProtectedRoute allowedRoles={['Coordinator']}><CoordinatorLayout home={'Coordinator'} /></ProtectedRoute>}
        >
          <Route path="" element={<HomeLayout />}>
            <Route index element={<HomePage />} />
            <Route path="placementData" element={<PlacementData />} />
            <Route path="recruiters" element={<Recruiters />} />
            <Route path="gallery" element={<Gallery />} />
            <Route path="contact" element={<Contact />} />
            <Route path="procedure" element={<Procedure />} />
            <Route path="testimonial" element={<Testimonial />} />
          </Route>
          <Route path="aptitude" element={<AptitudeTest />} />
          <Route path="events" element={<Events />} />
          <Route path="resources" element={<Resources />} />
          <Route path="results" element={<PlacementResults />} />
          <Route path="create-test" element={<CreateTest />} />
        </Route>

        <Route
          path="Student"
          element={<ProtectedRoute allowedRoles={['Student']}><StudentLayout /></ProtectedRoute>}
        >
          <Route path="" element={<HomeLayout />}>
            <Route index element={<HomePage />} />
            <Route path="placementData" element={<PlacementData />} />
            <Route path="recruiters" element={<Recruiters />} />
            <Route path="gallery" element={<Gallery />} />
            <Route path="contact" element={<Contact />} />
            <Route path="procedure" element={<Procedure />} />
            <Route path="testimonial" element={<Testimonial />} />
          </Route>
          <Route path="placement" element={<PlacementDrive />} />
          <Route path="resources" element={<ResourceAdd />} />
          <Route path="analytics" element={<Analytics />} />
          <Route path="events" element={<EventAdd />} />
          <Route path="jobs" element={<JobOpportunities />} />
          <Route path="exam" element={<ExamCorner />} />
        </Route>

        <Route
          path="Advisor"
          element={<ProtectedRoute allowedRoles={['Advisor']}><AdvisorLayout /></ProtectedRoute>}
        >
          <Route path="" element={<HomeLayout />}>
            <Route index element={<HomePage />} />
            <Route path="placementData" element={<PlacementData />} />
            <Route path="recruiters" element={<Recruiters />} />
            <Route path="gallery" element={<Gallery />} />
            <Route path="contact" element={<Contact />} />
            <Route path="procedure" element={<Procedure />} />
            <Route path="testimonial" element={<Testimonial />} />
          </Route>
          <Route path="pendingRequests" element={<PendingRequests />} />
          <Route path="viewAnalysis" element={<ViewAnalysis />} />
          <Route path="add-students" element={<StudentAddForm />} /> {/* New route */}
        </Route>
      </>
    )
  );

  return (
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  );
};

export default App;