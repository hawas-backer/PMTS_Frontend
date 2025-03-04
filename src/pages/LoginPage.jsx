// frontend/src/pages/LoginPage.jsx
import React, { useState } from 'react';
import Nabar from '../components/TabNavigator';
import gcek from '../assets/gcek.png';
import { StudentForm } from '../components/StudentForm';
import { AlumniForm } from '../components/AlumniForm';
import { CoordinatorForm } from '../components/CoordinatorForm';
import { AdvisorForm } from '../components/AdvisorForm';

const LoginPage = () => {
  const [activeRole, setActiveRole] = useState('Student');
  const [error, setError] = useState('');

  const handleGoogleLogin = () => {
    console.log('[FRONTEND] Initiating Google login');
    window.location.href = `${import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080'}/auth/google`;
  };

  const forms = {
    Student: <StudentForm onGoogleLogin={handleGoogleLogin} setError={setError} />,
    Alumni: <AlumniForm onGoogleLogin={handleGoogleLogin} setError={setError} />,
    Coordinator: <CoordinatorForm onGoogleLogin={handleGoogleLogin} setError={setError} />,
    Advisor: <AdvisorForm onGoogleLogin={handleGoogleLogin} setError={setError} />
  };

  return (
    <div className="flex h-screen">
      <div className="w-2/4 h-auto flex justify-center items-center bg-gray-100">
        <img className="w-2/5 h-auto" src={gcek} alt="GCEK" />
      </div>
      <div className="w-3/4 flex flex-col justify-center items-center">
        <div>
          <h1 className="text-3xl font-bold text-center mb-4 text-blue-800">
            Sign In To GCEK Placement Portal
          </h1>
          <Nabar activeRole={activeRole} setActiveRole={setActiveRole} />
          <div className="underline mb-4"></div>
        </div>
        {error && <p className="text-red-500 text-center mt-4">{error}</p>}
        <div className="p-8 m-4">
          {forms[activeRole]}
        </div>
      </div>
    </div>
  );
};

export default LoginPage;