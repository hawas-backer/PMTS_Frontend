import React from 'react';
import PropTypes from 'prop-types';
import { Briefcase } from 'lucide-react';

const Dashboard = ({ title, value, icon: Icon = Briefcase }) => {
  return (
    <div className="bg-gradient-to-br from-[#00D4FF] to-[#FF00E0] text-[#1A2238] rounded-xl shadow-[0_8px_20px_rgba(0,212,255,0.5)] p-6 transition-all duration-300 hover:shadow-[0_12px_30px_rgba(255,0,224,0.7)] hover:scale-105 perspective-500">
      <div className="flex items-center gap-4">
        <div className="p-3 bg-[#0A0F1A]/50 rounded-full transform hover:rotate-45 transition-transform duration-300">
          <Icon className="w-8 h-8 text-[#E0E7FF]" />
        </div>
        <div>
          <h3 className="text-lg font-orbitron font-semibold">{title}</h3>
          <p className="text-3xl font-bold">{value}</p>
        </div>
      </div>
    </div>
  );
};

Dashboard.propTypes = {
  title: PropTypes.string.isRequired,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  icon: PropTypes.elementType,
};

export default Dashboard;