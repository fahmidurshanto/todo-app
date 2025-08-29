import React from 'react';
import { FaPlus } from 'react-icons/fa';

const AddTaskButton = ({ onClick }) => {
  return (
    <button 
      onClick={onClick}
      className='px-8 py-3 bg-green-700 flex justify-between items-center gap-5 cursor-pointer font-bold text-white rounded-md'
    >
      <FaPlus/> Add Task
    </button>
  );
};

export default AddTaskButton;