import React from 'react';
import { useSelector } from 'react-redux';
import { selectTheme } from '../store/slices/uiSlice';
import { FaPlus } from 'react-icons/fa';

const AddTaskButton = ({ onClick }) => {
  const theme = useSelector(selectTheme);
  
  return (
    <button 
      onClick={onClick}
      className={`px-8 py-3 ${
        theme === 'dark' ? 'bg-green-600 hover:bg-green-700' : 'bg-green-700 hover:bg-green-800'
      } flex justify-between items-center gap-5 cursor-pointer font-bold text-white rounded-md transition-colors duration-300`}
    >
      <FaPlus/> Add Task
    </button>
  );
};

export default AddTaskButton;