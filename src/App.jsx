import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import Sidebar from "./components/Sidebar";
import Dashboard from "./pages/Dashboard";
import AllJobs from "./pages/AllJobs";
import Stats from "./pages/Stats";
import Profile from "./pages/Profile";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import ThemeToggle from "./components/ThemeToggle";
import { ThemeProvider } from "./context/ThemeContext";
import { JobProvider } from "./context/JobContext";
import "./index.css";

function App() {
  // Dummy authentication state for demonstration
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // This would typically come from an authentication context
  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  return (
    <ThemeProvider>
      <Toaster position="top-center" reverseOrder={false} />
      <Router>
        <div className="flex h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
          {isLoggedIn && (
            <Sidebar />
          )}
          <main className="flex-1 overflow-y-auto relative">
            <div className="absolute top-4 right-6">
              <ThemeToggle />
            </div>
            <JobProvider>
              <div className="container mx-auto px-6 py-8">
                <Routes>
                  <Route path="/login" element={<LoginPage onLogin={handleLogin} />} />
                  <Route path="/register" element={<RegisterPage />} />
                  {
                    // Protected routes
                    isLoggedIn ? (
                      <>
                        <Route path="/dashboard" element={<Dashboard />} />
                        <Route path="/all-jobs" element={<AllJobs />} />
                        <Route path="/stats" element={<Stats />} />
                        <Route path="/profile" element={<Profile />} />
                        <Route path="*" element={<Navigate to="/dashboard" replace />} />
                      </>
                    ) : (
                      <Route path="*" element={<Navigate to="/login" replace />} />
                    )
                  }
                </Routes>
              </div>
            </JobProvider>
          </main>
        </div>
      </Router>
    </ThemeProvider>
  );
}

export default App; 