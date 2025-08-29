import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  selectIsLoading,
  selectFilteredTasks,
  selectFilteredTaskCounts,
  addTask,
  updateTask,
  deleteTask,
  toggleTaskCompletion,
  setLoading
} from '../store/slices/tasksSlice';
import {
  selectIsModalOpen,
  selectEditingTask,
  openModal,
  openEditModal,
  closeModal
} from '../store/slices/uiSlice';
import TaskList from '../utils/TaskList';
import TaskModal from '../utils/TaskModal';
import AddTaskButton from '../utils/AddTaskButton';

const TaskManager = () => {
  const dispatch = useDispatch();
  const filteredTasks = useSelector(selectFilteredTasks);
  const { filteredCount, totalCount, hasActiveFilters } = useSelector(selectFilteredTaskCounts);
  const isLoading = useSelector(selectIsLoading);
  const isModalOpen = useSelector(selectIsModalOpen);
  const editingTask = useSelector(selectEditingTask);

  // Simulate loading on component mount
  useEffect(() => {
    dispatch(setLoading(true));
    // Simulate async loading
    setTimeout(() => {
      dispatch(setLoading(false));
    }, 100);
  }, [dispatch]);

  const handleOpenModal = () => {
    dispatch(openModal());
  };

  const handleOpenEditModal = (task) => {
    dispatch(openEditModal(task));
  };

  const handleCloseModal = () => {
    dispatch(closeModal());
  };

  const handleAddTask = (taskData) => {
    dispatch(addTask(taskData));
  };

  const handleUpdateTask = (taskData) => {
    dispatch(updateTask({ id: editingTask.id, ...taskData }));
  };

  const handleDeleteTask = (taskId) => {
    dispatch(deleteTask(taskId));
  };

  const handleToggleTaskCompletion = (taskId) => {
    dispatch(toggleTaskCompletion(taskId));
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
          <div>
            <h1 className="text-2xl font-bold text-gray-800">Tasks</h1>
            {hasActiveFilters && (
              <p className="text-sm text-gray-600 mt-1">
                Showing {filteredCount} of {totalCount} tasks
              </p>
            )}
          </div>
          <AddTaskButton onClick={handleOpenModal} />
        </div>
        
        <TaskList 
          tasks={filteredTasks} 
          onDeleteTask={handleDeleteTask} 
          onToggleComplete={handleToggleTaskCompletion}
          onEditTask={handleOpenEditModal}
        />
      </div>

      {isModalOpen && (
        <TaskModal 
          onClose={handleCloseModal} 
          onAddTask={handleAddTask}
          onUpdateTask={handleUpdateTask}
          editingTask={editingTask}
        />
      )}
    </div>
  );
};

export default TaskManager;