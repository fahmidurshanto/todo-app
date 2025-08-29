import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { selectTheme } from '../store/slices/uiSlice';
import { FaTimes } from 'react-icons/fa';

const TaskModal = ({ onClose, onAddTask, onUpdateTask, editingTask }) => {
  const theme = useSelector(selectTheme);
  const [taskData, setTaskData] = useState({
    title: '',
    date: '',
    description: ''
  });

  // Pre-fill form when editing
  useEffect(() => {
    if (editingTask) {
      setTaskData({
        title: editingTask.title,
        date: editingTask.date,
        description: editingTask.description
      });
    }
  }, [editingTask]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setTaskData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editingTask) {
      onUpdateTask(taskData);
    } else {
      onAddTask(taskData);
    }
    onClose();
    setTaskData({
      title: '',
      date: '',
      description: ''
    });
  };

  return (
    <div className={`fixed inset-0 bg-black ${
      theme === 'dark' ? 'bg-opacity-70' : 'bg-opacity-50'
    } flex items-center justify-center p-4 z-50 transition-colors duration-300`}>
      <div className={`${
        theme === 'dark' ? 'bg-gray-800' : 'bg-white'
      } rounded-lg shadow-xl w-full max-w-md transition-colors duration-300`}>
        <div className={`flex justify-between items-center p-4 border-b ${
          theme === 'dark' ? 'border-gray-600' : 'border-gray-200'
        }`}>
          <h2 className={`text-xl font-semibold ${
            theme === 'dark' ? 'text-gray-200' : 'text-gray-800'
          }`}>
            {editingTask ? 'Edit Task' : 'Task Details'}
          </h2>
          <button 
            onClick={onClose}
            className={`${
              theme === 'dark' 
                ? 'text-gray-400 hover:text-gray-200' 
                : 'text-gray-500 hover:text-gray-700'
            } transition-colors duration-200`}
          >
            <FaTimes />
          </button>
        </div>
        
        <form onSubmit={handleSubmit} className="p-4">
          <div className="mb-4">
            <label className={`block ${
              theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
            } text-sm font-bold mb-2`}>
              Title
            </label>
            <input
              type="text"
              name="title"
              value={taskData.title}
              onChange={handleInputChange}
              placeholder="Add a task title"
              className={`w-full px-3 py-2 border ${
                theme === 'dark' 
                  ? 'border-gray-600 bg-gray-700 text-gray-100' 
                  : 'border-gray-300 bg-white text-gray-900'
              } rounded-md focus:outline-none focus:ring-2 focus:ring-green-600 transition-colors duration-300`}
              required
            />
          </div>
          
          <div className="mb-4">
            <label className={`block ${
              theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
            } text-sm font-bold mb-2`}>
              Date
            </label>
            <input
              type="date"
              name="date"
              value={taskData.date}
              onChange={handleInputChange}
              className={`w-full px-3 py-2 border ${
                theme === 'dark' 
                  ? 'border-gray-600 bg-gray-700 text-gray-100' 
                  : 'border-gray-300 bg-white text-gray-900'
              } rounded-md focus:outline-none focus:ring-2 focus:ring-green-600 transition-colors duration-300`}
              required
            />
          </div>
          
          <div className="mb-6">
            <label className={`block ${
              theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
            } text-sm font-bold mb-2`}>
              Description
            </label>
            <textarea
              name="description"
              value={taskData.description}
              onChange={handleInputChange}
              placeholder="Add any description to your task"
              rows="4"
              className={`w-full px-3 py-2 border ${
                theme === 'dark' 
                  ? 'border-gray-600 bg-gray-700 text-gray-100' 
                  : 'border-gray-300 bg-white text-gray-900'
              } rounded-md focus:outline-none focus:ring-2 focus:ring-green-600 transition-colors duration-300`}
            ></textarea>
          </div>
          
          <div className={`flex justify-end gap-3 pt-4 border-t ${
            theme === 'dark' ? 'border-gray-600' : 'border-gray-200'
          }`}>
            <button
              type="button"
              onClick={onClose}
              className={`px-4 py-2 border rounded-md transition-colors duration-200 ${
                theme === 'dark' 
                  ? 'text-gray-300 border-gray-600 bg-gray-600 hover:bg-gray-500'
                  : 'text-gray-700 border-gray-300 bg-gray-200 hover:bg-gray-300'
              }`}
            >
              Close
            </button>
            <button
              type="submit"
              className={`px-4 py-2 text-white rounded-md transition-colors duration-200 ${
                theme === 'dark' 
                  ? 'bg-green-600 hover:bg-green-700'
                  : 'bg-green-700 hover:bg-green-800'
              }`}
            >
              {editingTask ? 'Update Task' : 'Add Task'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TaskModal;