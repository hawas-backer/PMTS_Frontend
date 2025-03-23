import React, { useState, useEffect } from 'react';
import { LineChart, BarChart, PieChart, Pie, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Line, Rectangle, Cell } from 'recharts';
import { Calendar, Filter, Download, BarChart2 } from 'lucide-react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import * as d3 from 'd3';
import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL 
  ? `${import.meta.env.VITE_API_BASE_URL}/api` 
  : 'http://localhost:8080/api';
  
const HeatmapChart = ({ data, xLabels, yLabels }) => {
  const chartData = [];
  yLabels.forEach((yLabel, yIndex) => {
    data[yIndex].forEach((value, xIndex) => {
      chartData.push({
        x: xLabels[xIndex],
        y: yLabel,
        value: value
      });
    });
  });

  const maxValue = Math.max(...data.flat());
  const getColor = (value) => {
    const intensity = value / maxValue;
    return `rgba(129, 201, 149, ${intensity})`; // Adjusted to green-teal for dark theme
  };

  return (
    <ResponsiveContainer width="100%" height={400}>
      <BarChart
        data={chartData}
        layout="vertical"
        margin={{ top: 20, right: 50, left: 100, bottom: 5 }}
      >
        <CartesianGrid stroke="#4b5563" strokeDasharray="3 3" />
        <XAxis type="category" dataKey="x" stroke="#d1d5db" />
        <YAxis type="category" dataKey="y" width={100} stroke="#d1d5db" />
        <Tooltip 
          contentStyle={{ backgroundColor: '#1f2937', border: '1px solid #4b5563', color: '#d1d5db' }}
          formatter={(value) => [`${value} drives`, 'Value']}
          labelFormatter={() => ''}
        />
        <Bar 
          dataKey="value" 
          shape={(props) => {
            const { x, y, width, height, value } = props;
            return (
              <Rectangle
                x={x}
                y={y}
                width={width}
                height={height}
                fill={getColor(value)}
                stroke="none"
              />
            );
          }}
          label={{ 
            position: 'center', 
            fill: '#ffffff',
            content: (props) => props.value > 0 ? props.value : ''
          }}
        />
      </BarChart>
    </ResponsiveContainer>
  );
};

const AnalyticsDashboard = () => {
  const [dashboardData, setDashboardData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [dateRange, setDateRange] = useState({
    startDate: new Date(new Date().setFullYear(new Date().getFullYear() - 1)),
    endDate: new Date()
  });
  const [filters, setFilters] = useState({
    companies: [],
    roles: [],
    branches: [],
    testTypes: []
  });
  const [activeFilters, setActiveFilters] = useState({
    companies: [],
    roles: [],
    branches: [],
    testTypes: []
  });

  useEffect(() => {
    const fetchDashboardData = async () => {
      setLoading(true);
      try {
        const response = await axios.post(
          `${API_BASE_URL}/analytics/dashboard`, 
          {
            startDate: dateRange.startDate,
            endDate: dateRange.endDate,
            filters: activeFilters
          },
          { 
            headers: { 'Content-Type': 'application/json' },
            withCredentials: true
          }
        );
        
        if (response.status === 200) {
          const data = response.data;
          setDashboardData(data);
          setFilters({
            companies: [...new Set(data.placementDrives.map(drive => drive.companyName))],
            roles: [...new Set(data.placementDrives.map(drive => drive.role))],
            branches: [...new Set(data.placementDrives.flatMap(drive => drive.eligibleBranches))],
            testTypes: [...new Set(data.aptitudeTests.map(test => test.title.split(' ')[0]))]
          });
        } else {
          console.error('Failed to fetch analytics data');
        }
      } catch (error) {
        console.error('Error fetching analytics data:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchDashboardData();
  }, [dateRange, activeFilters]);

  const exportData = async (format) => {
    if (!dashboardData) return;
    
    if (format === 'csv') {
      const placementData = dashboardData.placementDrives.map(drive => ({
        companyName: drive.companyName,
        role: drive.role,
        applications: drive.applicationCount,
        selected: drive.selectedCount,
        conversionRate: `${drive.conversionRate}%`
      }));
      
      const csvContent = "data:text/csv;charset=utf-8," 
        + Object.keys(placementData[0]).join(",") + "\n"
        + placementData.map(row => Object.values(row).join(",")).join("\n");
      
      const encodedUri = encodeURI(csvContent);
      const link = document.createElement("a");
      link.setAttribute("href", encodedUri);
      link.setAttribute("download", "placement_analytics.csv");
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } else if (format === 'pdf') {
      try {
        const response = await axios.post(
          `${API_BASE_URL}/analytics/export/pdf`,
          {
            startDate: dateRange.startDate,
            endDate: dateRange.endDate,
            filters: activeFilters
          },
          { 
            responseType: 'blob',
            withCredentials: true
          }
        );
        
        const url = window.URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', 'placement_analytics.pdf');
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      } catch (error) {
        console.error('Error exporting PDF:', error);
        alert('Failed to export PDF. Please try again later.');
      }
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 flex items-center justify-center">
        <div className="flex flex-col items-center text-white">
          <div className="w-12 h-12 border-t-4 border-teal-500 border-solid rounded-full animate-spin"></div>
          <p className="mt-4 text-lg">Loading analytics...</p>
        </div>
      </div>
    );
  }

  if (!dashboardData) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 flex items-center justify-center">
        <div className="bg-gray-800/90 backdrop-blur-md p-6 rounded-lg shadow-xl border border-gray-700 text-center max-w-md">
          <h2 className="text-2xl font-extrabold text-white bg-gradient-to-r from-indigo-400 to-purple-500 bg-clip-text text-transparent">
            No Data Available
          </h2>
          <p className="text-gray-400 mt-2">Try adjusting your filters or date range</p>
        </div>
      </div>
    );
  }

  const companyStatsArray = Object.values(
    dashboardData.placementDrives.reduce((acc, drive) => {
      if (!acc[drive.companyName]) {
        acc[drive.companyName] = {
          name: drive.companyName,
          drives: 0,
          applications: 0,
          selected: 0
        };
      }
      acc[drive.companyName].drives += 1;
      acc[drive.companyName].applications += drive.applicationCount;
      acc[drive.companyName].selected += drive.selectedCount;
      return acc;
    }, {})
  );

  const branches = [...new Set(dashboardData.placementDrives.flatMap(drive => drive.eligibleBranches))];
  const companies = [...new Set(dashboardData.placementDrives.map(drive => drive.companyName))];
  const heatmapData = companies.map(company => 
    branches.map(branch => 
      dashboardData.placementDrives
        .filter(drive => drive.companyName === company && drive.eligibleBranches.includes(branch))
        .length
    )
  );

  const phaseProgressionData = [
    { name: 'Applied', count: dashboardData.phaseProgression.applied || 0 },
    { name: 'Resume', count: dashboardData.phaseProgression.resumeScreening || 0 },
    { name: 'Written', count: dashboardData.phaseProgression.writtenTest || 0 },
    { name: 'Aptitude', count: dashboardData.phaseProgression.aptitudeTest || 0 },
    { name: 'Coding', count: dashboardData.phaseProgression.codingTest || 0 },
    { name: 'HR', count: dashboardData.phaseProgression.interviewHR || 0 },
    { name: 'Technical', count: dashboardData.phaseProgression.interviewTechnical || 0 },
    { name: 'Selected', count: dashboardData.phaseProgression.selected || 0 }
  ];

  const cgpaData = [
    { name: '6.0-6.5', value: dashboardData.cgpaDistribution['6.0-6.5'] || 0 },
    { name: '6.5-7.0', value: dashboardData.cgpaDistribution['6.5-7.0'] || 0 },
    { name: '7.0-7.5', value: dashboardData.cgpaDistribution['7.0-7.5'] || 0 },
    { name: '7.5-8.0', value: dashboardData.cgpaDistribution['7.5-8.0'] || 0 },
    { name: '8.0-8.5', value: dashboardData.cgpaDistribution['8.0-8.5'] || 0 },
    { name: '8.5-9.0', value: dashboardData.cgpaDistribution['8.5-9.0'] || 0 },
    { name: '9.0-9.5', value: dashboardData.cgpaDistribution['9.0-9.5'] || 0 },
    { name: '9.5-10.0', value: dashboardData.cgpaDistribution['9.5-10.0'] || 0 }
  ];

  const scoreData = dashboardData.aptitudeScoreDistribution.map(item => ({
    name: `${item.range}`,
    count: item.count
  }));

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 p-4">
      <div className="bg-gray-800/90 backdrop-blur-md shadow-xl rounded-lg border border-gray-700 p-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start gap-4 mb-6">
          <h1 className="text-2xl font-extrabold text-white bg-gradient-to-r from-indigo-400 to-purple-500 bg-clip-text text-transparent">
            Placement Analytics Dashboard
          </h1>
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
            <div className="flex items-center gap-2">
              <Calendar className="text-gray-400" size={20} />
              <div className="flex items-center gap-2">
                <DatePicker
                  selected={dateRange.startDate}
                  onChange={(date) => setDateRange({ ...dateRange, startDate: date })}
                  className="bg-gray-800/80 border border-gray-700 rounded-lg p-2 text-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
                  dateFormat="MMM yyyy"
                  showMonthYearPicker
                />
                <span className="text-gray-400">to</span>
                <DatePicker
                  selected={dateRange.endDate}
                  onChange={(date) => setDateRange({ ...dateRange, endDate: date })}
                  className="bg-gray-800/80 border border-gray-700 rounded-lg p-2 text-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
                  dateFormat="MMM yyyy"
                  showMonthYearPicker
                />
              </div>
            </div>
            <button 
              onClick={() => exportData('csv')}
              className="bg-gradient-to-r from-teal-500 to-cyan-500 hover:from-teal-600 hover:to-cyan-600 text-white px-3 py-1.5 rounded-lg shadow-md transform hover:scale-105 transition-all duration-300 flex items-center text-sm"
            >
              <Download size={16} className="mr-1" /> Export CSV
            </button>
          </div>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <div className="bg-teal-500/20 rounded-lg p-4">
            <p className="text-sm text-teal-400">Total Placement Drives</p>
            <h2 className="text-3xl font-bold text-white">{dashboardData.summary.totalDrives}</h2>
          </div>
          <div className="bg-green-500/20 rounded-lg p-4">
            <p className="text-sm text-green-400">Conversion Rate</p>
            <h2 className="text-3xl font-bold text-white">{dashboardData.summary.conversionRate}%</h2>
          </div>
          <div className="bg-purple-500/20 rounded-lg p-4">
            <p className="text-sm text-purple-400">Avg. Aptitude Score</p>
            <h2 className="text-3xl font-bold text-white">{dashboardData.summary.avgAptitudeScore}/10</h2>
          </div>
          <div className="bg-amber-500/20 rounded-lg p-4">
            <p className="text-sm text-amber-400">Students Placed</p>
            <h2 className="text-3xl font-bold text-white">{dashboardData.summary.totalPlacements}</h2>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-gray-800/80 rounded-lg p-6 mb-6 border border-gray-700">
          <div className="flex items-center mb-4">
            <Filter className="text-gray-400 mr-2" size={20} />
            <h2 className="text-lg font-semibold text-white bg-gradient-to-r from-indigo-400 to-purple-500 bg-clip-text text-transparent">
              Filters
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {['companies', 'roles', 'branches', 'testTypes'].map((filterType) => (
              <div key={filterType}>
                <label className="block text-gray-400 mb-1 text-sm font-medium capitalize">{filterType}</label>
                <select 
                  multiple
                  className="w-full bg-gray-800/80 border border-gray-700 rounded-lg p-2 text-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500 h-32"
                  value={activeFilters[filterType]}
                  onChange={(e) => setActiveFilters({
                    ...activeFilters, 
                    [filterType]: Array.from(e.target.selectedOptions, option => option.value)
                  })}
                >
                  {filters[filterType].map(item => (
                    <option key={item} value={item} className="text-gray-200">{item}</option>
                  ))}
                </select>
              </div>
            ))}
          </div>
        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          <div className="bg-gray-800/80 rounded-lg p-6 border border-gray-700">
            <h2 className="text-lg font-semibold text-white bg-gradient-to-r from-indigo-400 to-purple-500 bg-clip-text text-transparent mb-4">
              Company-wise Statistics
            </h2>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={companyStatsArray}>
                <CartesianGrid stroke="#4b5563" strokeDasharray="3 3" />
                <XAxis dataKey="name" stroke="#d1d5db" />
                <YAxis stroke="#d1d5db" />
                <Tooltip contentStyle={{ backgroundColor: '#1f2937', border: '1px solid #4b5563', color: '#d1d5db' }} />
                <Legend wrapperStyle={{ color: '#d1d5db' }} />
                <Bar dataKey="drives" fill="#60a5fa" name="Drives" />
                <Bar dataKey="applications" fill="#81c995" name="Applications" />
                <Bar dataKey="selected" fill="#fbbf24" name="Selected" />
              </BarChart>
            </ResponsiveContainer>
          </div>

          <div className="bg-gray-800/80 rounded-lg p-6 border border-gray-700">
            <h2 className="text-lg font-semibold text-white bg-gradient-to-r from-indigo-400 to-purple-500 bg-clip-text text-transparent mb-4">
              Student Phase Progression
            </h2>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={phaseProgressionData}>
                <CartesianGrid stroke="#4b5563" strokeDasharray="3 3" />
                <XAxis dataKey="name" stroke="#d1d5db" />
                <YAxis stroke="#d1d5db" />
                <Tooltip contentStyle={{ backgroundColor: '#1f2937', border: '1px solid #4b5563', color: '#d1d5db' }} />
                <Legend wrapperStyle={{ color: '#d1d5db' }} />
                <Line type="monotone" dataKey="count" stroke="#60a5fa" name="Student Count" />
              </LineChart>
            </ResponsiveContainer>
          </div>

          <div className="bg-gray-800/80 rounded-lg p-6 border border-gray-700">
            <h2 className="text-lg font-semibold text-white bg-gradient-to-r from-indigo-400 to-purple-500 bg-clip-text text-transparent mb-4">
              Branch Targeting Heatmap
            </h2>
            <HeatmapChart data={heatmapData} xLabels={branches} yLabels={companies} />
          </div>

          <div className="bg-gray-800/80 rounded-lg p-6 border border-gray-700">
            <h2 className="text-lg font-semibold text-white bg-gradient-to-r from-indigo-400 to-purple-500 bg-clip-text text-transparent mb-4">
              CGPA vs Selection Rate
            </h2>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={cgpaData}
                  cx="50%"
                  cy="50%"
                  labelLine={true}
                  outerRadius={100}
                  dataKey="value"
                  nameKey="name"
                  label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                >
                  {cgpaData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={d3.schemeBlues[9][index % 9 + 1]} />
                  ))}
                </Pie>
                <Tooltip contentStyle={{ backgroundColor: '#1f2937', border: '1px solid #4b5563', color: '#d1d5db' }} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Aptitude Test Analytics */}
        <div className="bg-gray-800/80 rounded-lg p-6 border border-gray-700 mb-6">
          <h2 className="text-lg font-semibold text-white bg-gradient-to-r from-indigo-400 to-purple-500 bg-clip-text text-transparent mb-4">
            Aptitude Test Analytics
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
            <div className="bg-teal-500/20 rounded-lg p-4">
              <p className="text-sm text-teal-400">Total Tests</p>
              <h2 className="text-3xl font-bold text-white">{dashboardData.aptitudeSummary.totalTests}</h2>
            </div>
            <div className="bg-green-500/20 rounded-lg p-4">
              <p className="text-sm text-green-400">Pass Rate</p>
              <h2 className="text-3xl font-bold text-white">{dashboardData.aptitudeSummary.passRate}%</h2>
            </div>
            <div className="bg-purple-500/20 rounded-lg p-4">
              <p className="text-sm text-purple-400">Participation Rate</p>
              <h2 className="text-3xl font-bold text-white">{dashboardData.aptitudeSummary.participationRate}%</h2>
            </div>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div>
              <h3 className="text-md font-semibold text-gray-300 mb-3">Score Distribution</h3>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={scoreData}>
                  <CartesianGrid stroke="#4b5563" strokeDasharray="3 3" />
                  <XAxis dataKey="name" stroke="#d1d5db" />
                  <YAxis stroke="#d1d5db" />
                  <Tooltip contentStyle={{ backgroundColor: '#1f2937', border: '1px solid #4b5563', color: '#d1d5db' }} />
                  <Bar dataKey="count" name="Students">
                    {scoreData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={d3.schemeBlues[9][Math.min(index + 3, 8)]} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
            <div>
              <h3 className="text-md font-semibold text-gray-300 mb-3">Test Performance Trend</h3>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={dashboardData.aptitudePerformanceTrend}>
                  <CartesianGrid stroke="#4b5563" strokeDasharray="3 3" />
                  <XAxis dataKey="testName" stroke="#d1d5db" />
                  <YAxis stroke="#d1d5db" />
                  <Tooltip contentStyle={{ backgroundColor: '#1f2937', border: '1px solid #4b5563', color: '#d1d5db' }} />
                  <Legend wrapperStyle={{ color: '#d1d5db' }} />
                  <Line type="monotone" dataKey="avgScore" stroke="#60a5fa" name="Avg Score" />
                  <Line type="monotone" dataKey="passRate" stroke="#81c995" name="Pass Rate %" />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* Timeline */}
        <div className="bg-gray-800/80 rounded-lg p-6 border border-gray-700">
          <h2 className="text-lg font-semibold text-white bg-gradient-to-r from-indigo-400 to-purple-500 bg-clip-text text-transparent mb-4">
            Placement Activity Timeline
          </h2>
          <div className="overflow-x-auto">
            <table className="min-w-full">
              <thead>
                <tr className="bg-gray-700/50">
                  <th className="py-2 px-4 text-left text-gray-300 text-sm">Date</th>
                  <th className="py-2 px-4 text-left text-gray-300 text-sm">Activity</th>
                  <th className="py-2 px-4 text-left text-gray-300 text-sm">Company/Test</th>
                  <th className="py-2 px-4 text-left text-gray-300 text-sm">Details</th>
                  <th className="py-2 px-4 text-left text-gray-300 text-sm">Status</th>
                </tr>
              </thead>
              <tbody>
                {dashboardData.timeline.map((item, index) => (
                  <tr key={index} className={index % 2 === 0 ? 'bg-gray-800/50' : 'bg-gray-800/30'}>
                    <td className="py-2 px-4 text-gray-200 text-sm">{new Date(item.date).toLocaleDateString()}</td>
                    <td className="py-2 px-4 text-gray-200 text-sm">{item.type}</td>
                    <td className="py-2 px-4 text-gray-200 text-sm">{item.title}</td>
                    <td className="py-2 px-4 text-gray-200 text-sm">{item.details}</td>
                    <td className="py-2 px-4">
                      <span className={`px-2 py-1 rounded text-xs ${
                        item.status === 'Completed' ? 'bg-green-500/20 text-green-400' :
                        item.status === 'In Progress' ? 'bg-teal-500/20 text-teal-400' :
                        'bg-gray-500/20 text-gray-400'
                      }`}>
                        {item.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnalyticsDashboard;