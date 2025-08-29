import React, { useState, useEffect } from 'react';
import TaskList from '../utils/TaskList';
import TaskModal from '../utils/TaskModal';
import AddTaskButton from '../utils/AddTaskButton';

const TaskManager = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTask, setEditingTask] = useState(null);
  const [tasks, setTasks] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // Load tasks from localStorage on component mount
  useEffect(() => {
    const loadTasks = () => {
      try {
        const storedTasks = localStorage.getItem('tasks');
        if (storedTasks) {
          const parsedTasks = JSON.parse(storedTasks);
          setTasks(parsedTasks);
        }
      } catch (error) {
        console.error('Error loading tasks from localStorage:', error);
      } finally {
        setIsLoading(false);
      }
    };
    
    loadTasks();
  }, []);

  // Save tasks to localStorage whenever tasks change
  useEffect(() => {
    if (!isLoading) {
      try {
        localStorage.setItem('tasks', JSON.stringify(tasks));
      } catch (error) {
        console.error('Error saving tasks to localStorage:', error);
        // Handle quota exceeded error
        if (error.name === 'QuotaExceededError') {
          alert('Storage limit exceeded. Some tasks may not be saved.');
        }
      }
    }
  }, [tasks, isLoading]);

  const openModal = () => {
    setEditingTask(null);
    setIsModalOpen(true);
  };

  const openEditModal = (task) => {
    setEditingTask(task);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditingTask(null);
  };

  const addTask = (taskData) => {
    const newTask = {
      id: Date.now(),
      completed: false,
      ...taskData
    };
    setTasks(prevTasks => [...prevTasks, newTask]);
  };

  const updateTask = (taskData) => {
    setTasks(prevTasks => 
      prevTasks.map(task => 
        task.id === editingTask.id 
          ? { ...task, ...taskData } 
          : task
      )
    );
    setEditingTask(null);
  };

  const deleteTask = (taskId) => {
    setTasks(prevTasks => prevTasks.filter(task => task.id !== taskId));
  };

  const toggleTaskCompletion = (taskId) => {
    setTasks(prevTasks => 
      prevTasks.map(task => 
        task.id === taskId 
          ? { ...task, completed: !task.completed } 
          : task
      )
    );
  };

  if (isLoading) {
    return (
      <div className="p-6 bg-gray-100 min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-600">Loading tasks...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-gray-800">Tasks</h1>
          <AddTaskButton onClick={openModal} />
        </div>
        
        <TaskList 
          tasks={tasks} 
          onDeleteTask={deleteTask} 
          onToggleComplete={toggleTaskCompletion}
          onEditTask={openEditModal}
        />
      </div>

      {isModalOpen && (
        <TaskModal 
          onClose={closeModal} 
          onAddTask={addTask}
          onUpdateTask={updateTask}
          editingTask={editingTask}
        />
      )}
    </div>
  );
};

export default TaskManager;