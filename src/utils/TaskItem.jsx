import React from 'react';
import { FaTrash, FaRegEdit, FaCheck, FaTimes } from 'react-icons/fa';
import { CiCalendarDate } from "react-icons/ci";


const TaskItem = ({ 
  task, 
  onDelete, 
  onToggleComplete, 
  onEdit, 
  isInlineEditing, 
  inlineEditValue, 
  onStartInlineEdit, 
  onUpdateInlineEditValue, 
  onSaveInlineEdit, 
  onCancelInlineEdit 
}) => {
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const options = { weekday: 'short', day: 'numeric', month: 'short', year: 'numeric' };
    return date.toLocaleDateString('en-US', options);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      onSaveInlineEdit();
    } else if (e.key === 'Escape') {
      onCancelInlineEdit();
    }
  };

  const handleDoubleClick = () => {
    if (!task.completed && !isInlineEditing) {
      onStartInlineEdit();
    }
  };

  return (
    <div className={`flex justify-between items-center p-4 border-b border-gray-200 ${
      task.completed 
        ? 'bg-gray-50 hover:bg-gray-100 opacity-75' 
        : 'hover:bg-gray-50 opacity-100'
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
          <div className="w-4 h-4 flex items-center justify-center animate__animated animate__bounceIn">
            <span className="text-green-600 text-lg font-bold">✓</span>
          </div>
        )}
        <div className='flex flex-col gap-1'>
          {isInlineEditing ? (
            <input
              type="text"
              value={inlineEditValue}
              onChange={(e) => onUpdateInlineEditValue(e.target.value)}
              onKeyDown={handleKeyDown}
              onBlur={onSaveInlineEdit}
              className="text-lg font-semibold bg-white border border-blue-500 rounded px-2 py-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
              autoFocus
            />
          ) : (
            <h3 
              className={`text-lg font-semibold ${
                task.completed 
                  ? 'line-through text-gray-400 animate__animated animate__fadeOut animate__slower' 
                  : 'text-gray-800 cursor-pointer hover:text-blue-600'
              }`}
              onDoubleClick={handleDoubleClick}
              title={!task.completed ? "Double-click to edit" : ""}
            >
              {task.title}
            </h3>
          )}
          <p className={`text-sm ${
            task.completed 
              ? 'text-gray-400 line-through opacity-60' 
              : 'text-gray-500 opacity-100'
          }`}>{task.description}</p>
        </div>
      </div>
      <div className="flex items-center gap-3">
        <span className="text-gray-600 flex items-center gap-2"><CiCalendarDate className='text-2xl'/> {formatDate(task.date)}</span>
        
        {isInlineEditing ? (
          <>
            <button 
              onClick={onSaveInlineEdit}
              className="text-green-600 hover:text-green-700 animate__animated animate__pulse animate__infinite"
              title="Save changes"
            >
              <FaCheck className='text-lg'/>
            </button>
            <button 
              onClick={onCancelInlineEdit}
              className="text-red-500 hover:text-red-700 animate__animated animate__pulse animate__infinite"
              title="Cancel editing"
            >
              <FaTimes className='text-lg'/>
            </button>
          </>
        ) : (
          !task.completed && (
            <button 
              onClick={onEdit}
              className="text-gray-500 hover:text-blue-500 animate__animated animate__pulse animate__slower"
              title="Edit in modal"
            >
              <FaRegEdit className='text-xl'/>
            </button>
          )
        )}
        
        <button 
          onClick={onDelete}
          className="text-red-500 hover:text-red-700 ml-2 animate__animated animate__wobble animate__infinite"
          title="Delete task"
        >
          <FaTrash />
        </button>
      </div>
    </div>
  );
};

export default TaskItem;