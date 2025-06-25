import React from 'react';
import { useTheme } from '../context/ThemeContext';
import { FaSun, FaMoon } from 'react-icons/fa';

const ThemeToggle = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className="p-2 rounded-full bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
      aria-label="Toggle dark mode"
    >
      {theme === 'light' ? <FaMoon className="w-5 h-5" /> : <FaSun className="w-5 h-5" />}
    </button>
  );
};

export default ThemeToggle; 