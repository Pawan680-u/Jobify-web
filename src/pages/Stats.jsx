import React from "react";
import { FaBriefcase, FaCalendarCheck, FaTimes } from "react-icons/fa";
import { useJobs } from "../context/JobContext";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const Stats = () => {
  const { jobs } = useJobs();

  // Calculate job stats
  const stats = [
    {
      title: "Pending Applications",
      count: jobs.filter((job) => job.status === "pending").length,
      icon: <FaBriefcase className="text-2xl text-blue-500" />,
      color: "bg-blue-50 dark:bg-blue-900/20",
    },
    {
      title: "Interviews Scheduled",
      count: jobs.filter((job) => job.status === "interview").length,
      icon: <FaCalendarCheck className="text-2xl text-green-500" />,
      color: "bg-green-50 dark:bg-green-900/20",
    },
    {
      title: "Jobs Declined",
      count: jobs.filter((job) => job.status === "declined").length,
      icon: <FaTimes className="text-2xl text-red-500" />,
      color: "bg-red-50 dark:bg-red-900/20",
    },
  ];

  // Prepare data for monthly applications chart
  const monthlyApplications = jobs.reduce((acc, job) => {
    const date = new Date(job.id); // Using job.id as timestamp for simplicity
    const month = date.toLocaleString("default", { month: "short" });
    const year = date.getFullYear();
    const monthYear = `${month} ${year}`;

    if (!acc[monthYear]) {
      acc[monthYear] = { name: monthYear, applications: 0 };
    }
    acc[monthYear].applications += 1;
    return acc;
  }, {});

  // Convert to array and sort by date (approximation using year and month index)
  const chartData = Object.values(monthlyApplications).sort((a, b) => {
    const [monthA, yearA] = a.name.split(" ");
    const [monthB, yearB] = b.name.split(" ");
    const dateA = new Date(`${monthA} 1, ${yearA}`);
    const dateB = new Date(`${monthB} 1, ${yearB}`);
    return dateA - dateB;
  });

  return (
    <div className="max-w-6xl mx-auto">
      <h1 className="text-3xl font-bold text-gray-800 dark:text-gray-100 mb-8">Stats</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {stats.map((stat, index) => (
          <div
            key={index}
            className={`${stat.color} rounded-lg p-6 shadow-sm dark:text-gray-200`}
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">{stat.title}</p>
                <p className="text-3xl font-bold text-gray-900 dark:text-gray-100 mt-2">{stat.count}</p>
              </div>
              {stat.icon}
            </div>
          </div>
        ))}
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
        <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-100 mb-4">Monthly Applications</h2>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={chartData} margin={{
            top: 20, right: 30, left: 20, bottom: 5,
          }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" className="dark:stroke-gray-700" />
            <XAxis dataKey="name" stroke="#6b7280" className="dark:stroke-gray-400" />
            <YAxis stroke="#6b7280" className="dark:stroke-gray-400" />
            <Tooltip cursor={{ fill: 'transparent' }} />
            <Bar dataKey="applications" fill="#3b82f6" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default Stats; 