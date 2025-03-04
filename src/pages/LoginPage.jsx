import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { StudentForm } from '../components/StudentForm'; // Changed to named import
import { CoordinatorForm } from '../components/CoordinatorForm'; // Changed to named import
import Nabar from '../components/TabNavigator';
import gcek from '../assets/gcek.png';
import { AlumniForm } from '../components/AlumniForm'; // Changed to named import
import { AdvisorForm } from '../components/AdvisorForm'; // Changed to named import

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

      if (activeRole === 'Student' && !result.email.endsWith('@gcek.ac.in')) {
        setError('Students must use a @gcek.ac.in email');
        console.log('Email validation failed:', result.email);
        return;
      }

      const destination = `/${result.role.toLowerCase()}`;
      console.log('Google login successful, navigating to:', destination);
      navigate(destination, { replace: true });
    } catch (err) {
      setError(err.message);
      console.error('Google login error:', err);
    }
  };

  return (
    <div className="flex h-screen">
      <div className="w-2/4 h-auto flex justify-center items-center">
        <img className="w-2/5 h-auto" src={gcek} alt="gcek" />
      </div>
      <div className="w-3/4 flex flex-col justify-center items-center">
        <div>
          <h1 className="text-3xl font-bold text-center mb-4 text-blue-800">
            Sign In To GCEK Placement Portal
          </h1>
          <Nabar activeRole={activeRole} setActiveRole={setActiveRole} />
          <div className="underline"></div>
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