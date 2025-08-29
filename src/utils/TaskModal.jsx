import React, { useState, useEffect } from 'react';
import { FaTimes } from 'react-icons/fa';

const TaskModal = ({ onClose, onAddTask, onUpdateTask, editingTask }) => {
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
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-md">
        <div className="flex justify-between items-center p-4 border-b">
          <h2 className="text-xl font-semibold text-gray-800">
            {editingTask ? 'Edit Task' : 'Task Details'}
          </h2>
          <button 
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            <FaTimes />
          </button>
        </div>
        
        <form onSubmit={handleSubmit} className="p-4">
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Title
            </label>
            <input
              type="text"
              name="title"
              value={taskData.title}
              onChange={handleInputChange}
              placeholder="Add a task title"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-600"
              required
            />
          </div>
          
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Date
            </label>
            <input
              type="date"
              name="date"
              value={taskData.date}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-600"
              required
            />
          </div>
          
          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Description
            </label>
            <textarea
              name="description"
              value={taskData.description}
              onChange={handleInputChange}
              placeholder="Add any description to your task"
              rows="4"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-600"
            ></textarea>
          </div>
          
          <div className="flex justify-end gap-3 pt-4 border-t">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-gray-700 border border-gray-300 bg-gray-200 rounded-md hover:bg-gray-300"
            >
              Close
            </button>
            <button
              type="submit"
              className="px-4 py-2 text-white bg-green-700 rounded-md hover:bg-green-800"
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