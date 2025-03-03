
import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import StudentForm from '../components/StudentForm';
import { CoordinatorForm } from '../components/CoordinatorForm';
import Nabar from '../components/TabNavigator';
import gcek from '../assets/gcek.png';
import { AlumniForm } from '../components/AlumniForm';
import { AdvisorForm } from '../components/AdvisorForm';

const LoginPage = () => {
  const { googleLogin } = useContext(AuthContext);
  const [activeRole, setActiveRole] = useState('Student');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleGoogleLogin = async () => {
    try {
      console.log('Starting Google login for role:', activeRole);
      const result = await googleLogin(activeRole);
      console.log('Google login result:', result);

      if (activeRole === 'Student') {
        if (!result.email || !result.email.endsWith('@gcek.ac.in')) {
          setError('Students must use a @gcek.ac.in email');
          console.log('Email validation failed:', result.email);
          return;
        }
      }

      console.log('Google login successful, navigating to:', `/${result.role.toLowerCase()}`);
      navigate(`/${result.role.toLowerCase()}`, { replace: true });
    } catch (err) {
      if (err.message === 'Not allowed: Coordinator/Advisor must exist in database') {
        setError('Not allowed: Only existing Coordinators or Advisors can use Google Sign-In');
      } else if (err.message === 'Role mismatch: User registered with a different role') {
        setError('Role mismatch: This email is registered with a different role');
      } else {
        setError('Google login failed: ' + err.message);
      }
      console.error('Google login error:', err);
    }
  };

  return (
    <div className="flex h-screen">
      <div className="w-2/4 h-auto flex justify-center items-center">
        <img
          className="w-2/5 h-auto flex justify-center items-center"
          src={gcek}
          alt="gcek"
        />
      </div>

      <div className="w-3/4 flex flex-col justify-center items-center">
        <div>
          <div className="w-full">
            <h1 className="text-3xl font-bold text-center mb-4 text-blue-800">
              Sign In To GCEK Placement Portal
            </h1>
          </div>
          <div>
            <div>
              <Nabar activeRole={activeRole} setActiveRole={setActiveRole} />
            </div>
            <div className="underline"></div>
          </div>
        </div>
        {error && <p className="text-red-500 text-center mt-4">{error}</p>}
        <div className="p-8 m-4">
          {activeRole === 'Student' && <StudentForm onGoogleLogin={handleGoogleLogin} />}
          {activeRole === 'Coordinator' && <CoordinatorForm onGoogleLogin={handleGoogleLogin} />}
          {activeRole === 'Advisor' && <AdvisorForm onGoogleLogin={handleGoogleLogin} />}
          {activeRole === 'Alumni' && <AlumniForm onGoogleLogin={handleGoogleLogin} />}
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
