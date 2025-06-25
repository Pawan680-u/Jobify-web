import React, { createContext, useState, useContext } from 'react';

const JobContext = createContext();

export const useJobs = () => useContext(JobContext);

export const JobProvider = ({ children }) => {
  const [jobs, setJobs] = useState([]); // Initial empty array for jobs

  const addJob = (job) => {
    setJobs((prevJobs) => [...prevJobs, { id: Date.now(), ...job }]);
  };

  const deleteJob = (id) => {
    setJobs((prevJobs) => prevJobs.filter((job) => job.id !== id));
  };

  const updateJob = (updatedJob) => {
    setJobs((prevJobs) =>
      prevJobs.map((job) => (job.id === updatedJob.id ? updatedJob : job))
    );
  };

  return (
    <JobContext.Provider value={{ jobs, addJob, deleteJob, updateJob }}>
      {children}
    </JobContext.Provider>
  );
}; 