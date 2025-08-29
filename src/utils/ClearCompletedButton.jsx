import React from 'react';
import { useSelector } from 'react-redux';
import { selectTheme } from '../store/slices/uiSlice';
import { FaTrashAlt } from 'react-icons/fa';

const ClearCompletedButton = ({ onClick, disabled }) => {
  const theme = useSelector(selectTheme);
  
  const getButtonClasses = () => {
    if (disabled) {
      return theme === 'dark' 
        ? 'bg-gray-600 text-gray-500 cursor-not-allowed'
        : 'bg-gray-200 text-gray-400 cursor-not-allowed';
    }
    return theme === 'dark'
      ? 'bg-red-500 text-white hover:bg-red-600 active:bg-red-700'
      : 'bg-red-600 text-white hover:bg-red-700 active:bg-red-800';
  };
  
  return (
    <button 
      onClick={onClick}
      disabled={disabled}
      className={`px-4 py-2 rounded-md flex items-center gap-2 text-sm font-semibold transition-colors duration-300 ${getButtonClasses()}`}
    >
      <FaTrashAlt className="text-sm" />
      Clear Completed
    </button>
  );
};

export default ClearCompletedButton;