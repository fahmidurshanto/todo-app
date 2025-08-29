import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  searchValue: '',
  filterValue: 'all',
  isModalOpen: false,
  editingTask: null,
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
  },
});

export const {
  setSearchValue,
  setFilterValue,
  clearSearch,
  openModal,
  openEditModal,
  closeModal,
} = uiSlice.actions;

// Selectors
export const selectSearchValue = (state) => state.ui.searchValue;
export const selectFilterValue = (state) => state.ui.filterValue;
export const selectIsModalOpen = (state) => state.ui.isModalOpen;
export const selectEditingTask = (state) => state.ui.editingTask;

export default uiSlice.reducer;