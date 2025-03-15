import React, { useState, useEffect } from 'react';
import { LineChart, BarChart, PieChart, Pie, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Line, Rectangle, Cell } from 'recharts';
import { Calendar, Filter, Download, BarChart2 } from 'lucide-react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import * as d3 from 'd3';
import axios from 'axios';

// API Base URL
const API_BASE_URL = 'http://localhost:8080/api';

// Custom Heatmap Component using Recharts
const HeatmapChart = ({ data, xLabels, yLabels }) => {
  // Prepare data for Recharts
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
  
  // Calculate max value for color scaling
  const maxValue = Math.max(...data.flat());
  
  // Create color scale
  const getColor = (value) => {
    const intensity = value / maxValue;
    return `rgba(66, 86, 244, ${intensity})`;
  };
  
  return (
    <ResponsiveContainer width="100%" height={400}>
      <BarChart
        data={chartData}
        layout="vertical"
        margin={{ top: 20, right: 50, left: 100, bottom: 5 }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis type="category" dataKey="x" />
        <YAxis type="category" dataKey="y" width={100} />
        <Tooltip 
          formatter={(value) => [`${value} drives`, 'Value']}
          labelFormatter={(label) => ``}
        />
        <Bar 
          dataKey="value" 
          fill="#8884d8" 
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
            content: (props) => props.value > 0 ? props.value : ''
          }}
        />
      </BarChart>
    </ResponsiveContainer>
  );
};

const AnalyticsDashboard = () => {
  // State management
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

  // Fetch dashboard data
  useEffect(() => {
    const fetchDashboardData = async () => {
      setLoading(true);
      try {
        // Using axios instead of fetch to match the reference pattern
        const response = await axios.post(
          `${API_BASE_URL}/analytics/dashboard`, 
          {
            startDate: dateRange.startDate,
            endDate: dateRange.endDate,
            filters: activeFilters
          },
          { 
            headers: { 
              'Content-Type': 'application/json',
            },
            withCredentials: true
          }
        );
        
        if (response.status === 200) {
          const data = response.data;
          setDashboardData(data);
          
          // Extract filter options
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

  // Apply filters
  const applyFilters = () => {
    // This function is already triggered by the activeFilters dependency in useEffect
    // No additional implementation needed as it will re-fetch data when filters change
  };

  // Export data
  const exportData = async (format) => {
    if (!dashboardData) return;
    
    if (format === 'csv') {
      // Convert data to CSV format
      const placementData = dashboardData.placementDrives.map(drive => ({
        companyName: drive.companyName,
        role: drive.role,
        applications: drive.applicationCount,
        selected: drive.selectedCount,
        conversionRate: `${drive.conversionRate}%`
      }));
      
      const csvContent = "data:text/csv;charset=utf-8," 
        + Object.keys(placementData[0]).join(",") + "\n"
        + placementData.map(row => 
            Object.values(row).join(",")
          ).join("\n");
      
      const encodedUri = encodeURI(csvContent);
      const link = document.createElement("a");
      link.setAttribute("href", encodedUri);
      link.setAttribute("download", "placement_analytics.csv");
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } else if (format === 'pdf') {
      try {
        // Using axios for PDF export (just placeholder for implementation)
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
        
        // Create download link for blob response
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
      <div className="flex justify-center items-center h-96">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (!dashboardData) {
    return (
      <div className="text-center p-8">
        <h2 className="text-2xl font-bold text-gray-700">No data available</h2>
        <p className="text-gray-500 mt-2">Try adjusting your filters or date range</p>
      </div>
    );
  }

  // Prepare data for charts
  const companyStats = dashboardData.placementDrives.reduce((acc, drive) => {
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
  }, {});

  const companyStatsArray = Object.values(companyStats);

  // Branch eligibility heatmap data
  const branches = [...new Set(dashboardData.placementDrives.flatMap(drive => drive.eligibleBranches))];
  const companies = [...new Set(dashboardData.placementDrives.map(drive => drive.companyName))];
  
  const heatmapData = companies.map(company => {
    const row = [];
    branches.forEach(branch => {
      const count = dashboardData.placementDrives
        .filter(drive => drive.companyName === company && drive.eligibleBranches.includes(branch))
        .length;
      row.push(count);
    });
    return row;
  });

  // Phase progression data
  const phaseProgressionData = [
    { name: 'Applied', count: dashboardData.phaseProgression.applied || 0 },
    { name: 'Resume Screening', count: dashboardData.phaseProgression.resumeScreening || 0 },
    { name: 'Written Test', count: dashboardData.phaseProgression.writtenTest || 0 },
    { name: 'Aptitude Test', count: dashboardData.phaseProgression.aptitudeTest || 0 },
    { name: 'Coding Test', count: dashboardData.phaseProgression.codingTest || 0 },
    { name: 'HR Interview', count: dashboardData.phaseProgression.interviewHR || 0 },
    { name: 'Technical Interview', count: dashboardData.phaseProgression.interviewTechnical || 0 },
    { name: 'Selected', count: dashboardData.phaseProgression.selected || 0 }
  ];

  // CGPA distribution data
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

  // Aptitude test score distribution
  const scoreData = dashboardData.aptitudeScoreDistribution.map(item => ({
    name: `${item.range}`,
    count: item.count
  }));

  return (
    <div className="w-full bg-gray-50 p-4 md:p-8">
      {/* Header */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
          <h1 className="text-2xl font-bold text-gray-800">Placement Management Analytics Dashboard</h1>
          
          {/* Date Range Picker */}
          <div className="flex items-center space-x-4 mt-4 md:mt-0">
            <div className="flex items-center space-x-2">
              <Calendar className="text-gray-500" size={20} />
              <div className="flex items-center space-x-2">
                <DatePicker
                  selected={dateRange.startDate}
                  onChange={(date) => setDateRange({...dateRange, startDate: date})}
                  className="px-2 py-1 border border-gray-300 rounded text-sm"
                  dateFormat="MMM yyyy"
                  showMonthYearPicker
                />
                <span>to</span>
                <DatePicker
                  selected={dateRange.endDate}
                  onChange={(date) => setDateRange({...dateRange, endDate: date})}
                  className="px-2 py-1 border border-gray-300 rounded text-sm"
                  dateFormat="MMM yyyy"
                  showMonthYearPicker
                />
              </div>
            </div>
            <button 
              onClick={() => exportData('csv')}
              className="flex items-center space-x-1 bg-blue-50 hover:bg-blue-100 text-blue-700 px-3 py-1 rounded text-sm"
            >
              <Download size={16} />
              <span>Export CSV</span>
            </button>
          </div>
        </div>
        
        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="bg-blue-50 rounded-lg p-4">
            <p className="text-sm text-blue-700">Total Placement Drives</p>
            <h2 className="text-3xl font-bold text-blue-800">{dashboardData.summary.totalDrives}</h2>
          </div>
          <div className="bg-green-50 rounded-lg p-4">
            <p className="text-sm text-green-700">Conversion Rate</p>
            <h2 className="text-3xl font-bold text-green-800">{dashboardData.summary.conversionRate}%</h2>
          </div>
          <div className="bg-purple-50 rounded-lg p-4">
            <p className="text-sm text-purple-700">Avg. Aptitude Score</p>
            <h2 className="text-3xl font-bold text-purple-800">{dashboardData.summary.avgAptitudeScore}/10</h2>
          </div>
          <div className="bg-amber-50 rounded-lg p-4">
            <p className="text-sm text-amber-700">Students Placed</p>
            <h2 className="text-3xl font-bold text-amber-800">{dashboardData.summary.totalPlacements}</h2>
          </div>
        </div>
      </div>
      
      {/* Filters */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <div className="flex items-center mb-4">
          <Filter className="text-gray-500 mr-2" size={20} />
          <h2 className="text-lg font-semibold text-gray-700">Filters</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Companies</label>
            <select 
              multiple
              className="w-full p-2 border border-gray-300 rounded"
              value={activeFilters.companies}
              onChange={(e) => setActiveFilters({
                ...activeFilters, 
                companies: Array.from(e.target.selectedOptions, option => option.value)
              })}
            >
              {filters.companies.map(company => (
                <option key={company} value={company}>{company}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Roles</label>
            <select 
              multiple
              className="w-full p-2 border border-gray-300 rounded"
              value={activeFilters.roles}
              onChange={(e) => setActiveFilters({
                ...activeFilters, 
                roles: Array.from(e.target.selectedOptions, option => option.value)
              })}
            >
              {filters.roles.map(role => (
                <option key={role} value={role}>{role}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Branches</label>
            <select 
              multiple
              className="w-full p-2 border border-gray-300 rounded"
              value={activeFilters.branches}
              onChange={(e) => setActiveFilters({
                ...activeFilters, 
                branches: Array.from(e.target.selectedOptions, option => option.value)
              })}
            >
              {filters.branches.map(branch => (
                <option key={branch} value={branch}>{branch}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Test Types</label>
            <select 
              multiple
              className="w-full p-2 border border-gray-300 rounded"
              value={activeFilters.testTypes}
              onChange={(e) => setActiveFilters({
                ...activeFilters, 
                testTypes: Array.from(e.target.selectedOptions, option => option.value)
              })}
            >
              {filters.testTypes.map(testType => (
                <option key={testType} value={testType}>{testType}</option>
              ))}
            </select>
          </div>
        </div>
        <div className="mt-4 text-right">
          <button 
            onClick={applyFilters}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded text-sm font-medium"
          >
            Apply Filters
          </button>
        </div>
      </div>
      
      {/* Charts Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        {/* Company-wise Statistics */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-lg font-semibold text-gray-700 mb-4">Company-wise Statistics</h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={companyStatsArray}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="drives" fill="#8884d8" name="Drives" />
              <Bar dataKey="applications" fill="#82ca9d" name="Applications" />
              <Bar dataKey="selected" fill="#ffc658" name="Selected" />
            </BarChart>
          </ResponsiveContainer>
        </div>
        
        {/* Phase Progression */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-lg font-semibold text-gray-700 mb-4">Student Phase Progression</h2>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={phaseProgressionData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="count" stroke="#8884d8" name="Student Count" />
            </LineChart>
          </ResponsiveContainer>
        </div>
        
        {/* Branch-Company Heatmap */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-lg font-semibold text-gray-700 mb-4">Branch Targeting Heatmap</h2>
          <div className="w-full h-96 overflow-auto">
            <HeatmapChart 
              data={heatmapData}
              xLabels={branches}
              yLabels={companies}
            />
          </div>
        </div>
        
        {/* CGPA Distribution */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-lg font-semibold text-gray-700 mb-4">CGPA vs Selection Rate</h2>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={cgpaData}
                cx="50%"
                cy="50%"
                labelLine={true}
                outerRadius={100}
                fill="#8884d8"
                dataKey="value"
                nameKey="name"
                label={({name, percent}) => `${name}: ${(percent * 100).toFixed(0)}%`}
              >
                {cgpaData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={d3.schemeBlues[9][index % 9 + 1]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
      
      {/* Aptitude Test Analytics */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <h2 className="text-lg font-semibold text-gray-700 mb-4">Aptitude Test Analytics</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div className="bg-blue-50 rounded-lg p-4">
            <p className="text-sm text-blue-700">Total Tests</p>
            <h2 className="text-3xl font-bold text-blue-800">{dashboardData.aptitudeSummary.totalTests}</h2>
          </div>
          <div className="bg-green-50 rounded-lg p-4">
            <p className="text-sm text-green-700">Pass Rate</p>
            <h2 className="text-3xl font-bold text-green-800">{dashboardData.aptitudeSummary.passRate}%</h2>
          </div>
          <div className="bg-purple-50 rounded-lg p-4">
            <p className="text-sm text-purple-700">Participation Rate</p>
            <h2 className="text-3xl font-bold text-purple-800">{dashboardData.aptitudeSummary.participationRate}%</h2>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Score Distribution */}
          <div>
            <h3 className="text-md font-semibold text-gray-600 mb-3">Score Distribution</h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={scoreData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="count" fill="#8884d8" name="Students">
                  {scoreData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={d3.schemeBlues[9][Math.min(index + 3, 8)]} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
          
          {/* Test Performance Trend */}
          <div>
            <h3 className="text-md font-semibold text-gray-600 mb-3">Test Performance Trend</h3>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={dashboardData.aptitudePerformanceTrend}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="testName" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="avgScore" stroke="#8884d8" name="Avg Score" />
                <Line type="monotone" dataKey="passRate" stroke="#82ca9d" name="Pass Rate %" />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
      
      {/* Timeline View */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-lg font-semibold text-gray-700 mb-4">Placement Activity Timeline</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white">
            <thead>
              <tr className="bg-gray-100">
                <th className="py-2 px-4 border-b text-left">Date</th>
                <th className="py-2 px-4 border-b text-left">Activity</th>
                <th className="py-2 px-4 border-b text-left">Company/Test</th>
                <th className="py-2 px-4 border-b text-left">Details</th>
                <th className="py-2 px-4 border-b text-left">Status</th>
              </tr>
            </thead>
            <tbody>
              {dashboardData.timeline.map((item, index) => (
                <tr key={index} className={index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}>
                  <td className="py-2 px-4 border-b">{new Date(item.date).toLocaleDateString()}</td>
                  <td className="py-2 px-4 border-b">{item.type}</td>
                  <td className="py-2 px-4 border-b">{item.title}</td>
                  <td className="py-2 px-4 border-b">{item.details}</td>
                  <td className="py-2 px-4 border-b">
                    <span className={`px-2 py-1 rounded text-xs ${
                      item.status === 'Completed' ? 'bg-green-100 text-green-800' :
                      item.status === 'In Progress' ? 'bg-blue-100 text-blue-800' :
                      'bg-gray-100 text-gray-800'
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
  );
};

export default AnalyticsDashboard;