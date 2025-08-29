import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  selectIsLoading,
  selectFilteredTasks,
  selectFilteredTaskCounts,
  selectCompletedTasksCount,
  addTask,
  updateTask,
  deleteTask,
  toggleTaskCompletion,
  clearCompleted,
  setLoading
} from '../store/slices/tasksSlice';
import {
  selectIsModalOpen,
  selectEditingTask,
  selectInlineEditingTaskId,
  selectInlineEditValue,
  selectDeletingTaskId,
  openModal,
  openEditModal,
  closeModal,
  startInlineEdit,
  updateInlineEditValue,
  cancelInlineEdit,
  completeInlineEdit,
  startDeletion,
  completeDeletion
} from '../store/slices/uiSlice';
import TaskList from '../utils/TaskList';
import TaskModal from '../utils/TaskModal';
import AddTaskButton from '../utils/AddTaskButton';
import ClearCompletedButton from '../utils/ClearCompletedButton';

const TaskManager = () => {
  const dispatch = useDispatch();
  const filteredTasks = useSelector(selectFilteredTasks);
  const { filteredCount, totalCount, hasActiveFilters } = useSelector(selectFilteredTaskCounts);
  const completedTasksCount = useSelector(selectCompletedTasksCount);
  const isLoading = useSelector(selectIsLoading);
  const isModalOpen = useSelector(selectIsModalOpen);
  const editingTask = useSelector(selectEditingTask);
  const inlineEditingTaskId = useSelector(selectInlineEditingTaskId);
  const inlineEditValue = useSelector(selectInlineEditValue);
  const deletingTaskId = useSelector(selectDeletingTaskId);

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
    // Start deletion animation
    dispatch(startDeletion(taskId));
    
    // Wait for animation to complete, then delete
    setTimeout(() => {
      dispatch(deleteTask(taskId));
      dispatch(completeDeletion());
    }, 500); // Animate.css animation duration
  };

  const handleToggleTaskCompletion = (taskId) => {
    dispatch(toggleTaskCompletion(taskId));
  };

  const handleClearCompleted = () => {
    dispatch(clearCompleted());
  };

  const handleStartInlineEdit = (taskId, currentTitle) => {
    dispatch(startInlineEdit({ taskId, currentTitle }));
  };

  const handleUpdateInlineEditValue = (value) => {
    dispatch(updateInlineEditValue(value));
  };

  const handleSaveInlineEdit = () => {
    if (inlineEditValue.trim() && inlineEditingTaskId) {
      dispatch(updateTask({ 
        id: inlineEditingTaskId, 
        title: inlineEditValue.trim() 
      }));
    }
    dispatch(completeInlineEdit());
  };

  const handleCancelInlineEdit = () => {
    dispatch(cancelInlineEdit());
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
          <div className="flex items-center gap-3">
            <ClearCompletedButton 
              onClick={handleClearCompleted}
              disabled={completedTasksCount === 0}
            />
            <AddTaskButton onClick={handleOpenModal} />
          </div>
        </div>
        
        <TaskList 
          tasks={filteredTasks} 
          onDeleteTask={handleDeleteTask} 
          onToggleComplete={handleToggleTaskCompletion}
          onEditTask={handleOpenEditModal}
          inlineEditingTaskId={inlineEditingTaskId}
          inlineEditValue={inlineEditValue}
          deletingTaskId={deletingTaskId}
          onStartInlineEdit={handleStartInlineEdit}
          onUpdateInlineEditValue={handleUpdateInlineEditValue}
          onSaveInlineEdit={handleSaveInlineEdit}
          onCancelInlineEdit={handleCancelInlineEdit}
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