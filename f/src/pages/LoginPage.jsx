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
      const role = await googleLogin(activeRole);
      console.log('Google login successful, role:', role);
      navigate(`/${role.toLowerCase()}`); // Direct navigation based on role
    } catch (err) {
      setError('Google login failed: ' + err.message);
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