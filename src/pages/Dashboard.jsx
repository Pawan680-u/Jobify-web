import React, { useState } from "react";
import { useJobs } from "../context/JobContext";
import toast from "react-hot-toast";
import { FaBriefcase, FaCalendarCheck, FaTimes, FaClipboardList } from "react-icons/fa";

const Dashboard = () => {
  const { addJob, jobs } = useJobs();
  const [formData, setFormData] = useState({
    position: "",
    company: "",
    location: "",
    status: "pending",
    type: "full-time",
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.position.trim()) {
      newErrors.position = "Position is required";
    }
    if (!formData.company.trim()) {
      newErrors.company = "Company is required";
    }
    if (!formData.location.trim()) {
      newErrors.location = "Location is required";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      addJob(formData);
      toast.success("Job added successfully!");
      setFormData({
        position: "",
        company: "",
        location: "",
        status: "pending",
        type: "full-time",
      });
      setErrors({}); // Clear errors after successful submission
    }
  };

  const handleClear = () => {
    setFormData({
      position: "",
      company: "",
      location: "",
      status: "pending",
      type: "full-time",
    });
    setErrors({}); // Clear errors
  };

  // Quick Stats Calculation
  const totalApplications = jobs.length;
  const pendingApplications = jobs.filter((job) => job.status === "pending").length;
  const interviewsScheduled = jobs.filter((job) => job.status === "interview").length;
  const jobsDeclined = jobs.filter((job) => job.status === "declined").length;

  // Recent Jobs
  const recentJobs = jobs.sort((a, b) => b.id - a.id).slice(0, 5);

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-8 text-gray-800 dark:text-gray-100">Dashboard</h1>

      {/* Quick Stats Summary */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-6 shadow-sm flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Total Applications</p>
            <p className="text-3xl font-bold text-gray-900 dark:text-gray-100 mt-2">{totalApplications}</p>
          </div>
          <FaClipboardList className="text-4xl text-blue-500" />
        </div>
        <div className="bg-yellow-50 dark:bg-yellow-900/20 rounded-lg p-6 shadow-sm flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Pending</p>
            <p className="text-3xl font-bold text-gray-900 dark:text-gray-100 mt-2">{pendingApplications}</p>
          </div>
          <FaBriefcase className="text-4xl text-yellow-500" />
        </div>
        <div className="bg-green-50 dark:bg-green-900/20 rounded-lg p-6 shadow-sm flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Interviews</p>
            <p className="text-3xl font-bold text-gray-900 dark:text-gray-100 mt-2">{interviewsScheduled}</p>
          </div>
          <FaCalendarCheck className="text-4xl text-green-500" />
        </div>
        <div className="bg-red-50 dark:bg-red-900/20 rounded-lg p-6 shadow-sm flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Declined</p>
            <p className="text-3xl font-bold text-gray-900 dark:text-gray-100 mt-2">{jobsDeclined}</p>
          </div>
          <FaTimes className="text-4xl text-red-500" />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Add Job Form */}
        <div className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-md">
          <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-6">Add New Job</h2>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="position" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Position
              </label>
              <input
                type="text"
                id="position"
                name="position"
                value={formData.position}
                onChange={handleChange}
                className={`form-input ${errors.position ? "border-red-500" : ""}`}
                placeholder="e.g. Frontend Developer"
              />
              {errors.position && (
                <p className="mt-1 text-sm text-red-500">{errors.position}</p>
              )}
            </div>

            <div>
              <label htmlFor="company" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Company
              </label>
              <input
                type="text"
                id="company"
                name="company"
                value={formData.company}
                onChange={handleChange}
                className={`form-input ${errors.company ? "border-red-500" : ""}`}
                placeholder="e.g. Google"
              />
              {errors.company && (
                <p className="mt-1 text-sm text-red-500">{errors.company}</p>
              )}
            </div>

            <div>
              <label htmlFor="location" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Job Location
              </label>
              <input
                type="text"
                id="location"
                name="location"
                value={formData.location}
                onChange={handleChange}
                className={`form-input ${errors.location ? "border-red-500" : ""}`}
                placeholder="e.g. New York, NY"
              />
              {errors.location && (
                <p className="mt-1 text-sm text-red-500">{errors.location}</p>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="status" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Status
                </label>
                <select
                  id="status"
                  name="status"
                  value={formData.status}
                  onChange={handleChange}
                  className="form-select"
                >
                  <option value="pending">Pending</option>
                  <option value="interview">Interview</option>
                  <option value="declined">Declined</option>
                </select>
              </div>

              <div>
                <label htmlFor="type" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Job Type
                </label>
                <select
                  id="type"
                  name="type"
                  value={formData.type}
                  onChange={handleChange}
                  className="form-select"
                >
                  <option value="full-time">Full-Time</option>
                  <option value="part-time">Part-Time</option>
                  <option value="remote">Remote</option>
                  <option value="internship">Internship</option>
                </select>
              </div>
            </div>

            <div className="flex justify-end gap-4 mt-6">
              <button type="button" onClick={handleClear} className="btn bg-gray-300 text-gray-800 hover:bg-gray-400 dark:bg-gray-600 dark:text-gray-200 dark:hover:bg-gray-700">
                Clear
              </button>
              <button type="submit" className="btn btn-primary">
                Submit
              </button>
            </div>
          </form>
        </div>

        {/* Recent Jobs Overview */}
        <div className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-md">
          <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-6">Recent Jobs</h2>
          {recentJobs.length > 0 ? (
            <ul className="space-y-4">
              {recentJobs.map((job) => (
                <li key={job.id} className="flex items-center gap-4 p-4 rounded-md bg-gray-50 dark:bg-gray-700">
                  <span className="text-lg text-blue-500 dark:text-blue-400"><FaBriefcase /></span>
                  <div>
                    <p className="font-semibold text-gray-900 dark:text-gray-100">{job.position} at {job.company}</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">{job.location} - <span className={`font-medium ${
                      job.status === "pending" ? "text-yellow-600" :
                      job.status === "interview" ? "text-blue-600" :
                      "text-red-600"
                    }`}>{job.status.charAt(0).toUpperCase() + job.status.slice(1)}</span></p>
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-500 dark:text-gray-400">No recent jobs. Add one using the form!</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard; 