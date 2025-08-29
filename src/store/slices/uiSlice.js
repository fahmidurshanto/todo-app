import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  searchValue: '',
  filterValue: 'all',
  isModalOpen: false,
  editingTask: null,
  inlineEditingTaskId: null,
  inlineEditValue: '',
  deletingTaskId: null,
};

const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    setSearchValue: (state, action) => {
      state.searchValue = action.payload;
    },
    setFilterValue: (state, action) => {
      state.filterValue = action.payload;
    },
    clearSearch: (state) => {
      state.searchValue = '';
    },
    openModal: (state) => {
      state.isModalOpen = true;
      state.editingTask = null;
    },
    openEditModal: (state, action) => {
      state.isModalOpen = true;
      state.editingTask = action.payload;
    },
    closeModal: (state) => {
      state.isModalOpen = false;
      state.editingTask = null;
    },
    startInlineEdit: (state, action) => {
      const { taskId, currentTitle } = action.payload;
      state.inlineEditingTaskId = taskId;
      state.inlineEditValue = currentTitle;
    },
    updateInlineEditValue: (state, action) => {
      state.inlineEditValue = action.payload;
    },
    cancelInlineEdit: (state) => {
      state.inlineEditingTaskId = null;
      state.inlineEditValue = '';
    },
    completeInlineEdit: (state) => {
      state.inlineEditingTaskId = null;
      state.inlineEditValue = '';
    },
    startDeletion: (state, action) => {
      state.deletingTaskId = action.payload;
    },
    completeDeletion: (state) => {
      state.deletingTaskId = null;
    },
  },
});

export const {
  setSearchValue,
  setFilterValue,
  clearSearch,
  openModal,
  openEditModal,
  closeModal,
  startInlineEdit,
  updateInlineEditValue,
  cancelInlineEdit,
  completeInlineEdit,
  startDeletion,
  completeDeletion,
} = uiSlice.actions;

// Selectors
export const selectSearchValue = (state) => state.ui.searchValue;
export const selectFilterValue = (state) => state.ui.filterValue;
export const selectIsModalOpen = (state) => state.ui.isModalOpen;
export const selectEditingTask = (state) => state.ui.editingTask;
export const selectInlineEditingTaskId = (state) => state.ui.inlineEditingTaskId;
export const selectInlineEditValue = (state) => state.ui.inlineEditValue;
export const selectDeletingTaskId = (state) => state.ui.deletingTaskId;

export default uiSlice.reducer;