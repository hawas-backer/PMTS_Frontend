import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import LoginPage from './pages/LoginPage';
import StudentRegister from './pages/StudentRegister';
import AlumniRegister from './pages/AlumniRegister';
import CreateStudentAccount from './pages/CreateStudentAccount';
import ForgotPassword from './pages/ForgotPassword';
import Dashboard from './pages/Dashboard';
import StudentDashboard from './components/Student/StudentLayout';
import AlumniDashboard from './pages/AlumniDashboard';
import CoordinatorDashboard from './pages/CoordinatorDashboard';
import AdvisorDashboard from './pages/AdvisorDashboard';
import ProtectedRoute from './components/ProtectedRoute';

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/studentregister" element={<StudentRegister />} />
          <Route path="/alumniregister" element={<AlumniRegister />} />
          <Route path="/createstudent" element={<CreateStudentAccount />} />
          <Route path="/forgotpassword" element={<ForgotPassword />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route
            path="/student"
            element={
              <ProtectedRoute roles={['Student']}>
                <StudentDashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/alumni"
            element={
              <ProtectedRoute roles={['Alumni']}>
                <AlumniDashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/coordinator"
            element={
              <ProtectedRoute roles={['Coordinator']}>
                <CoordinatorDashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/advisor"
            element={
              <ProtectedRoute roles={['Advisor']}>
                <AdvisorDashboard />
              </ProtectedRoute>
            }
          />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;