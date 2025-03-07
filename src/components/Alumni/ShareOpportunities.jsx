import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { 
  Plus, Edit, Trash2, Briefcase, AlertCircle,
  Calendar, X, ExternalLink
} from 'lucide-react';

const JobOpportunityModal = ({ onClose, onJobAdded, jobToEdit }) => {
  const [jobData, setJobData] = useState(
    jobToEdit 
      ? {
          title: jobToEdit.title,
          company: jobToEdit.company,
          description: jobToEdit.description,
          applyUrl: jobToEdit.applyUrl,
          applicationDeadline: jobToEdit.applicationDeadline 
            ? new Date(jobToEdit.applicationDeadline).toISOString().split('T')[0] 
            : ''
        }
      : {
          title: '',
          company: '',
          description: '',
          applyUrl: '',
          applicationDeadline: ''
        }
  );
  
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Validate URL format
  const isValidUrl = (url) => {
    try {
      new URL(url);
      return true;
    } catch (e) {
      return false;
    }
  };

  // Validate form fields
  const validateForm = () => {
    const newErrors = {};
    
    if (!jobData.title.trim()) {
      newErrors.title = "Job title is required";
    }
    
    if (!jobData.company.trim()) {
      newErrors.company = "Company name is required";
    }
    
    if (!jobData.description.trim()) {
      newErrors.description = "Job description is required";
    }
    
    if (!jobData.applyUrl.trim()) {
      newErrors.applyUrl = "Application URL is required";
    } else if (!isValidUrl(jobData.applyUrl)) {
      newErrors.applyUrl = "Please enter a valid URL";
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      let response;
      const submitData = {
        ...jobData,
        applicationDeadline: jobData.applicationDeadline 
          ? new Date(jobData.applicationDeadline).toISOString() 
          : undefined
      };

      if (jobToEdit) {
        response = await axios.put(
          `http://localhost:8080/api/jobs/${jobToEdit._id}`, 
          submitData,
          {
            withCredentials: true
          }
        );
        onJobAdded(response.data);
      } else {
        response = await axios.post(
          'http://localhost:8080/api/jobs', 
          submitData,
          {
            withCredentials: true
          }
        );
        onJobAdded(response.data.job);
      }
      
      onClose();
    } catch (error) {
      console.error('Error saving job:', error);
      setErrors({
        submit: "Failed to save job opportunity. Please try again."
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <form 
        onSubmit={handleSubmit} 
        className="bg-[#1a1f2c] rounded-lg p-6 w-full max-w-md"
      >
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-bold text-gray-200">
            {jobToEdit ? 'Edit Job Opportunity' : 'Add Job Opportunity'}
          </h3>
          <button 
            type="button"
            onClick={onClose}
            className="text-gray-400 hover:text-gray-200"
          >
            <X size={24} />
          </button>
        </div>
        
        {errors.submit && (
          <div className="bg-red-900 text-red-200 p-3 rounded mb-4 flex items-center">
            <AlertCircle size={20} className="mr-2" />
            {errors.submit}
          </div>
        )}
        
        <div className="space-y-4">
          <div>
            <label className="block text-gray-300 mb-2">Job Title</label>
            <input
              type="text"
              value={jobData.title}
              onChange={(e) => {
                setJobData({ ...jobData, title: e.target.value });
                if (errors.title) {
                  setErrors({ ...errors, title: null });
                }
              }}
              className={`w-full bg-[#2c3341] text-gray-200 p-2 rounded ${errors.title ? 'border border-red-500' : ''}`}
              placeholder="Enter job title"
            />
            {errors.title && (
              <p className="text-red-500 text-sm mt-1">{errors.title}</p>
            )}
          </div>

          <div>
            <label className="block text-gray-300 mb-2">Company</label>
            <input
              type="text"
              value={jobData.company}
              onChange={(e) => {
                setJobData({ ...jobData, company: e.target.value });
                if (errors.company) {
                  setErrors({ ...errors, company: null });
                }
              }}
              className={`w-full bg-[#2c3341] text-gray-200 p-2 rounded ${errors.company ? 'border border-red-500' : ''}`}
              placeholder="Enter company name"
            />
            {errors.company && (
              <p className="text-red-500 text-sm mt-1">{errors.company}</p>
            )}
          </div>

          <div>
            <label className="block text-gray-300 mb-2">Description</label>
            <textarea
              value={jobData.description}
              onChange={(e) => {
                setJobData({ ...jobData, description: e.target.value });
                if (errors.description) {
                  setErrors({ ...errors, description: null });
                }
              }}
              className={`w-full bg-[#2c3341] text-gray-200 p-2 rounded ${errors.description ? 'border border-red-500' : ''}`}
              placeholder="Enter job description"
              rows="4"
            />
            {errors.description && (
              <p className="text-red-500 text-sm mt-1">{errors.description}</p>
            )}
          </div>

          <div>
            <label className="block text-gray-300 mb-2">Application URL</label>
            <input
              type="text"
              value={jobData.applyUrl}
              onChange={(e) => {
                setJobData({ ...jobData, applyUrl: e.target.value });
                if (errors.applyUrl) {
                  setErrors({ ...errors, applyUrl: null });
                }
              }}
              className={`w-full bg-[#2c3341] text-gray-200 p-2 rounded ${errors.applyUrl ? 'border border-red-500' : ''}`}
              placeholder="Enter application URL (e.g., https://example.com/apply)"
            />
            {errors.applyUrl && (
              <p className="text-red-500 text-sm mt-1">{errors.applyUrl}</p>
            )}
          </div>

          <div>
            <label className="block text-gray-300 mb-2">Application Deadline</label>
            <input
              type="date"
              value={jobData.applicationDeadline}
              onChange={(e) => setJobData({ ...jobData, applicationDeadline: e.target.value })}
              className="w-full bg-[#2c3341] text-gray-200 p-2 rounded"
            />
          </div>

          <button 
            type="submit"
            disabled={isSubmitting}
            className={`w-full text-white p-2 rounded transition ${
              isSubmitting ? 'bg-blue-800 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'
            }`}
          >
            {isSubmitting ? 'Saving...' : jobToEdit ? 'Update Job' : 'Add Job'}
          </button>
        </div>
      </form>
    </div>
  );
};

export const ShareOpportunities = () => {
  const [jobs, setJobs] = useState([]); 
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showAddJob, setShowAddJob] = useState(false);
  const [editingJob, setEditingJob] = useState(null);
  const [deletedExpiredCount, setDeletedExpiredCount] = useState(0);

  // Function to check and delete expired jobs
  const checkAndDeleteExpiredJobs = async (jobsToCheck) => {
    const currentDate = new Date();
    const expiredJobs = jobsToCheck.filter(job => 
      job.applicationDeadline && new Date(job.applicationDeadline) < currentDate
    );
    
    if (expiredJobs.length > 0) {
      // Delete expired jobs from the database
      const deletePromises = expiredJobs.map(job => 
        axios.delete(`http://localhost:8080/api/jobs/${job._id}`, {
          withCredentials: true
        })
          .catch(err => {
            console.error(`Error deleting job ${job._id}:`, err);
            return null; // Return null for failed deletions
          })
      );
      
      try {
        const results = await Promise.all(deletePromises);
        const successfulDeletes = results.filter(result => result !== null).length;
        
        // Remove expired jobs from the state
        setJobs(prevJobs => 
          prevJobs.filter(job => 
            !job.applicationDeadline || new Date(job.applicationDeadline) >= currentDate
          )
        );
        setDeletedExpiredCount(prev => prev + successfulDeletes);
      } catch (error) {
        console.error('Error processing job deletions:', error);
      }
    }
    
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
        
        // Filter out expired jobs and delete them
        const filteredJobs = await checkAndDeleteExpiredJobs(jobData);
        
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

    // Set up periodic check for expired jobs (every hour)
    const intervalId = setInterval(() => {
      if (jobs.length > 0) {
        checkAndDeleteExpiredJobs(jobs);
      }
    }, 3600000); // 1 hour in milliseconds
    
    return () => clearInterval(intervalId);
  }, []);

  const handleDeleteJob = async (jobId) => {
    try {
      await axios.delete(`http://localhost:8080/api/jobs/${jobId}`, {
        withCredentials: true
      });
      setJobs(jobs.filter(j => j._id !== jobId));
    } catch (error) {
      console.error('Error deleting job:', error);
      // Using inline notification instead of alert
      setError('Failed to delete job opportunity. Please try again.');
      // Auto-dismiss error after 5 seconds
      setTimeout(() => setError(null), 5000);
    }
  };

  const handleJobAdded = (updatedOrNewJob) => {
    if (editingJob) {
      setJobs(jobs.map(j => 
        j._id === updatedOrNewJob._id ? updatedOrNewJob : j
      ));
    } else {
      setJobs([...jobs, updatedOrNewJob]);
    }
  };

  if (isLoading) {
    return (
      <div className="p-6 bg-[#0f1218] h-screen flex items-center justify-center">
        <div className="text-white">Loading job opportunities...</div>
      </div>
    );
  }

  return (
    <div className="p-6 bg-[#0f1218] min-h-screen w-full">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-200">Job Opportunities</h2>
        <button 
          onClick={() => setShowAddJob(true)}
          className="bg-blue-600 text-white p-2 rounded flex items-center hover:bg-blue-700"
        >
          <Plus size={20} className="mr-2" /> Add Job
        </button>
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
          No job opportunities found. Add a new job to get started.
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {jobs.map((job) => (
            <div 
              key={job._id}
              className="bg-[#1a1f2c] p-4 rounded-lg shadow-md flex flex-col"
            >
              <div className="flex justify-between items-start mb-2">
                <Briefcase size={24} className="text-blue-400" />
                <div className="flex space-x-2">
                  <button 
                    onClick={() => {
                      setEditingJob(job);
                      setShowAddJob(true);
                    }}
                    className="text-gray-400 hover:text-blue-400"
                  >
                    <Edit size={20} />
                  </button>
                  <button 
                    onClick={() => handleDeleteJob(job._id)}
                    className="text-gray-400 hover:text-red-400"
                  >
                    <Trash2 size={20} />
                  </button>
                </div>
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

      {showAddJob && (
        <JobOpportunityModal 
          onClose={() => {
            setShowAddJob(false);
            setEditingJob(null);
          }}
          onJobAdded={handleJobAdded}
          jobToEdit={editingJob}
        />
      )}
    </div>
  );
};

export default ShareOpportunities;