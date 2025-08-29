import React from 'react';
import { FaTrashAlt } from 'react-icons/fa';

const ClearCompletedButton = ({ onClick, disabled }) => {
  return (
    <button 
      onClick={onClick}
      disabled={disabled}
      className={`px-4 py-2 rounded-md flex items-center gap-2 text-sm font-semibold transition-colors ${
        disabled 
          ? 'bg-gray-200 text-gray-400 cursor-not-allowed' 
          : 'bg-red-600 text-white hover:bg-red-700 active:bg-red-800'
      }`}
    >
      <FaTrashAlt className="text-sm" />
      Clear Completed
    </button>
  );
};

export default ClearCompletedButton;