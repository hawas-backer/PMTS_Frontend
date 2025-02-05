import React, { useState } from 'react';
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, Tooltip, Legend } from 'recharts';
import { Check, X, User, BarChart2, Users } from 'lucide-react';

const ViewAnalysis = () => {
  const placementData = [
    { company: 'TCS', count: 45 },
    { company: 'Infosys', count: 35 },
    { company: 'Wipro', count: 25 },
    { company: 'IBM', count: 20 }
  ];

  const packageRanges = [
    { range: '3-5 LPA', count: 30 },
    { range: '5-7 LPA', count: 45 },
    { range: '7-10 LPA', count: 25 },
    { range: '10+ LPA', count: 15 }
  ];

  const COLORS = ['#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4'];
  const totalPlacements = placementData.reduce((sum, item) => sum + item.count, 0);
  const averagePackage = '6.8 LPA';

  return (
    <div className="p-6 space-y-6">
      <h2 className="text-2xl font-bold text-gray-200 mb-6">Placement Analysis</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <div className="bg-[#1a1f2c] p-4 rounded-lg flex items-center gap-4">
          <div className="bg-blue-500/20 p-3 rounded-lg">
            <Users size={24} className="text-blue-500" />
          </div>
          <div>
            <p className="text-gray-400">Total Placements</p>
            <p className="text-2xl font-bold text-gray-200">{totalPlacements}</p>
          </div>
        </div>

        <div className="bg-[#1a1f2c] p-4 rounded-lg flex items-center gap-4">
          <div className="bg-green-500/20 p-3 rounded-lg">
            <BarChart2 size={24} className="text-green-500" />
          </div>
          <div>
            <p className="text-gray-400">Average Package</p>
            <p className="text-2xl font-bold text-gray-200">{averagePackage}</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-[#1a1f2c] p-6 rounded-lg">
          <h3 className="text-xl font-bold text-gray-200 mb-4">Company-wise Placements</h3>
          <div className="h-64">
            <BarChart width={400} height={250} data={placementData}>
              <XAxis dataKey="company" stroke="#94a3b8" />
              <YAxis stroke="#94a3b8" />
              <Tooltip 
                contentStyle={{ backgroundColor: '#1a1f2c', border: 'none' }}
                labelStyle={{ color: '#e2e8f0' }}
              />
              <Bar dataKey="count" fill="#FF6B6B" />
            </BarChart>
          </div>
        </div>

        <div className="bg-[#1a1f2c] p-6 rounded-lg">
          <h3 className="text-xl font-bold text-gray-200 mb-4">Package Distribution</h3>
          <div className="flex justify-center">
            <PieChart width={300} height={250}>
              <Pie
                data={packageRanges}
                cx={150}
                cy={125}
                labelLine={false}
                outerRadius={100}
                fill="#8884d8"
                dataKey="count"
                nameKey="range"
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
              >
                {packageRanges.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip 
                contentStyle={{ backgroundColor: '#1a1f2c', border: 'none' }}
                labelStyle={{ color: '#e2e8f0' }}
              />
            </PieChart>
          </div>
        </div>
      </div>
    </div>
  );
};


export default ViewAnalysis