import React from 'react';
import { FaTrash, FaRegEdit } from 'react-icons/fa';

const TaskItem = ({ task, onDelete, onToggleComplete, onEdit }) => {
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const options = { weekday: 'short', day: 'numeric', month: 'short', year: 'numeric' };
    return date.toLocaleDateString('en-US', options);
  };

  return (
    <div className="flex justify-between items-center p-4 border-b border-gray-200 hover:bg-gray-50">
      <div className="flex items-center gap-3">
        <input
          type="checkbox"
          checked={task.completed || false}
          onChange={() => onToggleComplete(task.id)}
          className="w-4 h-4 text-green-600 rounded focus:ring-green-500"
        />
        <div className='flex flex-col gap-1'>
          <h3 className={`text-lg font-semibold ${task.completed ? 'line-through text-gray-400' : ''}`}>
            {task.title}
          </h3>
          <p className='text-gray-500 text-sm'>{task.description}</p>
        </div>
      </div>
      <div className="flex items-center gap-3">
        <span className="text-gray-600">{formatDate(task.date)}</span>
        
        <button 
          onClick={onEdit}
          className="text-gray-500 hover:text-blue-500"
        >
          <FaRegEdit className='text-xl'/>
        </button>
        
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