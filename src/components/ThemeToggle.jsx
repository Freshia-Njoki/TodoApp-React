import React from 'react';
import { FaSun, FaMoon } from 'react-icons/fa';

const ThemeToggle = ({ darkMode, setDarkMode }) => {
  return (
    <button onClick={() => setDarkMode(!darkMode)} className="theme-toggle">
      {darkMode ? <FaSun /> : <FaMoon />}
    </button>
  );
};

export default ThemeToggle;
