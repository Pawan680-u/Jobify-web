import React, { useState, useEffect } from "react";
import { useJobs } from "../context/JobContext";
import { FaRedo } from "react-icons/fa";
import { toast } from "react-hot-toast";

const AllJobs = () => {
  const { jobs, deleteJob } = useJobs();

  const [filters, setFilters] = useState({
    search: "",
    status: "all",
    type: "all",
  });
  const [filteredJobs, setFilteredJobs] = useState(jobs);

  useEffect(() => {
    let updatedJobs = jobs;

    // Search filter
    if (filters.search) {
      updatedJobs = updatedJobs.filter(
        (job) =>
          job.position.toLowerCase().includes(filters.search.toLowerCase()) ||
          job.company.toLowerCase().includes(filters.search.toLowerCase())
      );
    }

    // Status filter
    if (filters.status !== "all") {
      updatedJobs = updatedJobs.filter((job) => job.status === filters.status);
    }

    // Type filter
    if (filters.type !== "all") {
      updatedJobs = updatedJobs.filter((job) => job.type === filters.type);
    }

    setFilteredJobs(updatedJobs);
  }, [jobs, filters]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleClearFilters = () => {
    setFilters({
      search: "",
      status: "all",
      type: "all",
    });
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this job?")) {
      deleteJob(id);
      toast.success("Job deleted successfully!");
    }
  };

  const handleEdit = (job) => {
    // TODO: Implement actual edit functionality
    alert("Edit functionality not yet implemented for: " + job.position);
    console.log("Edit job:", job);
  };

  return (
    <div className="max-w-6xl mx-auto">
      <h1 className="text-3xl font-bold text-gray-800 dark:text-gray-100 mb-8">All Jobs</h1>

      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md mb-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <input
            type="text"
            name="search"
            value={filters.search}
            onChange={handleChange}
            className="form-input"
            placeholder="Search by position or company"
          />
          <select
            name="status"
            value={filters.status}
            onChange={handleChange}
            className="form-select"
          >
            <option value="all">All Statuses</option>
            <option value="pending">Pending</option>
            <option value="interview">Interview</option>
            <option value="declined">Declined</option>
          </select>
          <select
            name="type"
            value={filters.type}
            onChange={handleChange}
            className="form-select"
          >
            <option value="all">All Types</option>
            <option value="full-time">Full-Time</option>
            <option value="part-time">Part-Time</option>
            <option value="remote">Remote</option>
            <option value="internship">Internship</option>
          </select>
        </div>
        <div className="flex justify-end mt-4">
          <button
            onClick={handleClearFilters}
            className="btn bg-gray-300 text-gray-800 hover:bg-gray-400 dark:bg-gray-600 dark:text-gray-200 dark:hover:bg-gray-700 flex items-center gap-2"
          >
            <FaRedo /> Clear Filters
          </button>
        </div>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-lg shadow overflow-hidden">
        {filteredJobs.length > 0 ? (
          <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
            <thead className="bg-gray-50 dark:bg-gray-700">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Position
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Company
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Location
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Type
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
              {filteredJobs.map((job) => (
                <tr key={job.id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-gray-100">
                    {job.position}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-100">
                    {job.company}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-100">
                    {job.location}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        job.status === "pending"
                          ? "bg-yellow-100 text-yellow-800"
                          : job.status === "interview"
                          ? "bg-blue-100 text-blue-800"
                          : "bg-red-100 text-red-800"
                      }`}
                    >
                      {job.status.charAt(0).toUpperCase() + job.status.slice(1)}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-100">
                    {job.type}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <button
                      onClick={() => handleEdit(job)}
                      className="text-blue-600 hover:text-blue-900 dark:text-blue-400 dark:hover:text-blue-600 mr-4"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(job.id)}
                      className="text-red-600 hover:text-red-900 dark:text-red-400 dark:hover:text-red-600"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p className="p-6 text-center text-gray-500 dark:text-gray-400">
            No jobs to display. Add a new job from the Dashboard!
          </p>
        )}
      </div>
    </div>
  );
};

export default AllJobs; 