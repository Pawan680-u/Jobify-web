import React from "react";
import { NavLink } from "react-router-dom";
import { FaPlus, FaList, FaChartBar, FaUser } from "react-icons/fa";

const Sidebar = () => {
  const navItems = [
    { path: "/dashboard", icon: <FaPlus />, text: "Add Job" },
    { path: "/all-jobs", icon: <FaList />, text: "All Jobs" },
    { path: "/stats", icon: <FaChartBar />, text: "Stats" },
    { path: "/profile", icon: <FaUser />, text: "Profile" },
  ];

  return (
    <aside className="w-64 bg-white shadow-md">
      <div className="p-6">
        <h2 className="text-2xl font-bold text-blue-600">Jobify</h2>
      </div>
      <nav className="px-4">
        <ul className="space-y-2">
          {navItems.map((item) => (
            <li key={item.path}>
              <NavLink
                to={item.path}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                    isActive
                      ? "bg-blue-50 text-blue-600"
                      : "text-gray-600 hover:bg-gray-50"
                  }`
                }
              >
                <span className="text-lg">{item.icon}</span>
                <span>{item.text}</span>
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar; 