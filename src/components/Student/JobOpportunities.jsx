import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { 
  Briefcase, AlertCircle,
  Calendar, ExternalLink
} from 'lucide-react';

export const JobOpportunities = () => {
  const [jobs, setJobs] = useState([]); 
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [deletedExpiredCount, setDeletedExpiredCount] = useState(0);

  // Function to check expired jobs
  const checkExpiredJobs = (jobsToCheck) => {
    const currentDate = new Date();
    return jobsToCheck.filter(job => 
      !job.applicationDeadline || new Date(job.applicationDeadline) >= currentDate
    );
  };

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        setIsLoading(true);
        const response = await axios.get('http://localhost:8080/api/jobs', {
          withCredentials: true
        });
        
        const jobData = Array.isArray(response.data) 
          ? response.data 
          : response.data.jobs || [];
        
        // Filter out expired jobs
        const filteredJobs = checkExpiredJobs(jobData);
        
        setJobs(filteredJobs);
        setError(null);
      } catch (err) {
        console.error('Error fetching jobs:', err);
        setError('Failed to fetch job opportunities. Please refresh the page.');
        setJobs([]); 
      } finally {
        setIsLoading(false);
      }
    };

    fetchJobs();
  }, []);

  if (isLoading) {
    return (
      <div className="p-6 bg-[#0f1218] h-screen flex items-center justify-center">
        <div className="text-white">Loading job opportunities...</div>
      </div>
    );
  }

  return (
    <div className="p-6 bg-[#0f1218] min-h-screen w-full">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-200">Job Opportunities</h2>
      </div>
      
      {error && (
        <div className="bg-red-900 text-red-200 p-3 rounded mb-4 flex items-center">
          <AlertCircle size={20} className="mr-2" />
          {error}
        </div>
      )}
      
      {deletedExpiredCount > 0 && (
        <div className="bg-blue-900 text-blue-200 p-3 rounded mb-4 flex items-center">
          <Calendar size={20} className="mr-2" />
          {deletedExpiredCount} expired job {deletedExpiredCount === 1 ? 'opportunity' : 'opportunities'} automatically removed
        </div>
      )}

      {jobs.length === 0 ? (
        <div className="text-gray-400 text-center">
          No job opportunities found.
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {jobs.map((job) => (
            <div 
              key={job._id}
              className="bg-[#1a1f2c] p-4 rounded-lg shadow-md flex flex-col"
            >
              <div className="mb-2">
                <Briefcase size={24} className="text-blue-400" />
              </div>
              <h3 className="text-lg font-semibold text-gray-200 mb-1">
                {job.title}
              </h3>
              <p className="text-gray-400 text-sm mb-2">
                {job.company}
              </p>
              <p className="text-gray-400 text-sm mb-2 flex-grow line-clamp-3">
                {job.description}
              </p>
              <div className="flex justify-between items-center mt-2">
                {job.applicationDeadline && (
                  <div className={`flex items-center text-sm ${
                    new Date(job.applicationDeadline) < new Date(new Date().setDate(new Date().getDate() + 7)) 
                      ? 'text-amber-400' 
                      : 'text-gray-300'
                  }`}>
                    <Calendar size={16} className="mr-2" />
                    {new Date(job.applicationDeadline).toLocaleDateString()}
                    {new Date(job.applicationDeadline) < new Date(new Date().setDate(new Date().getDate() + 7)) && 
                      ' (Closing soon)'}
                  </div>
                )}
                <a
                  href={job.applyUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-400 hover:underline text-sm flex items-center gap-2"
                >
                  <ExternalLink size={16} /> Apply
                </a>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default JobOpportunities;