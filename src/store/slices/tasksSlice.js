import { createSlice } from '@reduxjs/toolkit';

// Load initial state from localStorage
const loadTasksFromStorage = () => {
  try {
    const storedTasks = localStorage.getItem('tasks');
    return storedTasks ? JSON.parse(storedTasks) : [];
  } catch (error) {
    console.error('Error loading tasks from localStorage:', error);
    return [];
  }
};

// Save tasks to localStorage
const saveTasksToStorage = (tasks) => {
  try {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  } catch (error) {
    console.error('Error saving tasks to localStorage:', error);
    if (error.name === 'QuotaExceededError') {
      alert('Storage limit exceeded. Some tasks may not be saved.');
    }
  }
};

const initialState = {
  tasks: loadTasksFromStorage(),
  isLoading: false,
};

const tasksSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    setLoading: (state, action) => {
      state.isLoading = action.payload;
    },
    addTask: (state, action) => {
      const newTask = {
        id: Date.now(),
        completed: false,
        ...action.payload
      };
      state.tasks.push(newTask);
      saveTasksToStorage(state.tasks);
    },
    updateTask: (state, action) => {
      const { id, ...taskData } = action.payload;
      const taskIndex = state.tasks.findIndex(task => task.id === id);
      if (taskIndex !== -1) {
        state.tasks[taskIndex] = { ...state.tasks[taskIndex], ...taskData };
        saveTasksToStorage(state.tasks);
      }
    },
    deleteTask: (state, action) => {
      state.tasks = state.tasks.filter(task => task.id !== action.payload);
      saveTasksToStorage(state.tasks);
    },
    toggleTaskCompletion: (state, action) => {
      const task = state.tasks.find(task => task.id === action.payload);
      if (task) {
        task.completed = !task.completed;
        saveTasksToStorage(state.tasks);
      }
    },
    setTasks: (state, action) => {
      state.tasks = action.payload;
      saveTasksToStorage(state.tasks);
    }
  },
});

export const {
  setLoading,
  addTask,
  updateTask,
  deleteTask,
  toggleTaskCompletion,
  setTasks
} = tasksSlice.actions;

// Selectors
export const selectTasks = (state) => state.tasks.tasks;
export const selectIsLoading = (state) => state.tasks.isLoading;
export const selectTaskCounts = (state) => {
  const tasks = state.tasks.tasks;
  return {
    allCount: tasks.length,
    activeCount: tasks.filter(task => !task.completed).length,
    completedCount: tasks.filter(task => task.completed).length,
  };
};

// Filtered tasks selector
export const selectFilteredTasks = (state) => {
  const tasks = state.tasks.tasks;
  const searchValue = state.ui.searchValue.toLowerCase();
  const filterValue = state.ui.filterValue;

  let filteredTasks = tasks;

  // Apply search filter
  if (searchValue.trim()) {
    filteredTasks = filteredTasks.filter(task => 
      task.title.toLowerCase().includes(searchValue) ||
      task.description.toLowerCase().includes(searchValue)
    );
  }

  // Apply status filter
  switch (filterValue) {
    case 'active':
      filteredTasks = filteredTasks.filter(task => !task.completed);
      break;
    case 'completed':
      filteredTasks = filteredTasks.filter(task => task.completed);
      break;
    case 'all':
    default:
      // Show all tasks
      break;
  }

  return filteredTasks;
};

// Filtered task counts selector
export const selectFilteredTaskCounts = (state) => {
  const allTasks = state.tasks.tasks;
  const filteredTasks = selectFilteredTasks(state);
  return {
    filteredCount: filteredTasks.length,
    totalCount: allTasks.length,
    hasActiveFilters: state.ui.searchValue.trim() || state.ui.filterValue !== 'all'
  };
};

export default tasksSlice.reducer;