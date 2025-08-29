import React from 'react';
import { useSelector } from 'react-redux';
import { selectTheme } from '../store/slices/uiSlice';
import TaskItem from './TaskItem';

const TaskList = ({ 
  tasks, 
  onDeleteTask, 
  onToggleComplete, 
  onEditTask, 
  inlineEditingTaskId,
  inlineEditValue,
  deletingTaskId,
  onStartInlineEdit,
  onUpdateInlineEditValue,
  onSaveInlineEdit,
  onCancelInlineEdit
}) => {
  const theme = useSelector(selectTheme);
  
  if (tasks.length === 0) {
    return (
      <div className={`rounded-xl px-4 sm:px-6 md:px-8 lg:px-10 py-4 sm:py-5 md:py-6 w-full max-w-6xl mx-auto ${
        theme === 'dark' ? 'bg-gray-800' : 'bg-white'
      } shadow-lg mb-4 transition-colors duration-300`}>
        <p className={`text-center ${
          theme === 'dark' ? 'text-gray-400' : 'text-gray-500'
        }`}>
          No tasks yet. Add a task to get started.
        </p>
      </div>
    );
  }

  return (
    <div className={`rounded-xl px-4 sm:px-6 md:px-8 lg:px-10 py-4 sm:py-5 md:py-6 w-full max-w-6xl mx-auto ${
      theme === 'dark' ? 'bg-gray-800' : 'bg-white'
    } shadow-lg mb-4 transition-colors duration-300`}>
      {tasks.map((task, index) => (
        <div 
          key={task.id}
          className={`${
            deletingTaskId === task.id 
              ? 'animate__animated animate__fadeOutRight animate__faster' 
              : 'animate__animated animate__fadeInUp'
          }`}
          style={{ 
            animationDelay: deletingTaskId === task.id ? '0ms' : `${index * 100}ms` 
          }}
        >
          <TaskItem 
            task={task} 
            onDelete={() => onDeleteTask(task.id)}
            onToggleComplete={() => onToggleComplete(task.id)}
            onEdit={() => onEditTask(task)}
            isInlineEditing={inlineEditingTaskId === task.id}
            inlineEditValue={inlineEditValue}
            onStartInlineEdit={() => onStartInlineEdit(task.id, task.title)}
            onUpdateInlineEditValue={onUpdateInlineEditValue}
            onSaveInlineEdit={() => onSaveInlineEdit(task.id)}
            onCancelInlineEdit={onCancelInlineEdit}
          />
        </div>
      ))}
    </div>
  );
};

export default TaskList;