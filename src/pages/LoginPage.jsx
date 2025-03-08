import React, { useState } from 'react';
import Nabar from '../components/TabNavigator';
import gcek from '../assets/gcek-transparent.png'; // Transparent logo
import bgPattern from '../assets/bg-pattern.jpg'; // Import the pattern
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
    Advisor: <AdvisorForm onGoogleLogin={handleGoogleLogin} setError={setError} />,
  };

  return (
    <div className="min-h-screen flex flex-col lg:flex-row">
      {/* Left Section */}
      <div
        className="lg:w-1/3 flex flex-col justify-center items-center p-8 bg-blue-900 text-white relative"
        style={{ backgroundImage: `url(${bgPattern})`, backgroundSize: 'cover', backgroundColor: '#1E3A8A' }}
      >
        <img
          className="w-3/4 max-w-xs h-auto mb-6 drop-shadow-md "
          src={gcek}
          alt="GCEK Logo"
        />
        <h2 className="text-2xl font-bold mb-4 text-center">
          One stop portal for students to simplify placements.
        </h2>
        <p className="text-sm text-center">Login using your institute email ID.</p>
      </div>
      {/* Right Section */}
      <div className="lg:w-2/3 flex flex-col justify-center items-center p-8 bg-white">
        <h1 className="text-xl font-semibold text-blue-600 mb-6 text-center">
          Sign In to GCEK Placement Portal
        </h1>
        <Nabar activeRole={activeRole} setActiveRole={setActiveRole} />
        {error && <p className="text-red-500 text-center mt-4">{error}</p>}
        <div className="w-full max-w-md mt-6">{forms[activeRole]}</div>
      </div>
    </div>
  );
};

export default LoginPage;