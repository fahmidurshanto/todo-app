import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { selectTheme, toggleTheme } from '../store/slices/uiSlice';
import { FaMoon, FaSun } from 'react-icons/fa';

const DarkModeToggle = () => {
  const dispatch = useDispatch();
  const theme = useSelector(selectTheme);
  const [mounted, setMounted] = useState(false);

  // Prevent hydration mismatch
  useEffect(() => {
    setMounted(true);
  }, []);

  // Apply theme changes to DOM
  useEffect(() => {
    if (mounted) {
      if (theme === 'dark') {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
      localStorage.setItem('theme', theme);
    }
  }, [theme, mounted]);

  const handleToggle = () => {
    dispatch(toggleTheme());
  };

  if (!mounted) {
    return (
      <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center">
        <FaSun className="w-4 h-4 text-gray-400" />
      </div>
    );
  }

  return (
    <button
      onClick={handleToggle}
      className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 ${
        theme === 'dark'
          ? 'bg-gray-700 text-yellow-400 hover:bg-gray-600'
          : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
      }`}
      title={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
    >
      {theme === 'dark' ? (
        <FaSun className="w-4 h-4" />
      ) : (
        <FaMoon className="w-4 h-4" />
      )}
    </button>
  );
};

export default DarkModeToggle;