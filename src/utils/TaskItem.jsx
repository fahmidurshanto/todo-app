import React from 'react';
import { FaTrash, FaRegEdit } from 'react-icons/fa';
import { CiCalendarDate } from "react-icons/ci";


const TaskItem = ({ task, onDelete, onToggleComplete, onEdit }) => {
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const options = { weekday: 'short', day: 'numeric', month: 'short', year: 'numeric' };
    return date.toLocaleDateString('en-US', options);
  };

  return (
    <div className={`flex justify-between items-center p-4 border-b border-gray-200 ${
      task.completed 
        ? 'bg-gray-50 hover:bg-gray-100' 
        : 'hover:bg-gray-50'
    }`}>
      <div className="flex items-center gap-3">
        {!task.completed && (
          <input
            type="checkbox"
            checked={task.completed || false}
            onChange={() => onToggleComplete(task.id)}
            className="w-4 h-4 text-green-600 rounded focus:ring-green-500"
          />
        )}
        {task.completed && (
          <div className="w-4 h-4 flex items-center justify-center">
            <span className="text-green-600 text-lg font-bold">✓</span>
          </div>
        )}
        <div className='flex flex-col gap-1'>
          <h3 className={`text-lg font-semibold ${
            task.completed 
              ? 'line-through text-gray-400' 
              : 'text-gray-800'
          }`}>
            {task.title}
          </h3>
          <p className={`text-sm ${
            task.completed 
              ? 'text-gray-400 line-through' 
              : 'text-gray-500'
          }`}>{task.description}</p>
        </div>
      </div>
      <div className="flex items-center gap-3">
        <span className="text-gray-600 flex items-center gap-2"><CiCalendarDate className='text-2xl'/> {formatDate(task.date)}</span>
        
        {!task.completed && (
          <button 
            onClick={onEdit}
            className="text-gray-500 hover:text-blue-500"
          >
            <FaRegEdit className='text-xl'/>
          </button>
        )}
        
        <button 
          onClick={onDelete}
          className="text-red-500 hover:text-red-700 ml-2"
        >
          <FaTrash />
        </button>
      </div>
    </div>
  );
};

export default TaskItem;