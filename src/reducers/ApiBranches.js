import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  branches: [],
  branchesFilter: [],
  loading: false,
  error: null,

  totalPages: 0,
  loadingPages: false,
  errorPages: null,

  branchById: null,
  isLoadingBranch: false,
  branchError: null,
};

export const branchesSlice = createSlice({
  name: 'branches',
  initialState,
  reducers: {
    fetchBranchesStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    fetchBranchesSuccess: (state, action) => {
      state.loading = false;
      state.branches = action.payload;
    },
    fetchBranchesFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },

    setBranchesFilter: (state, action) => {
      state.branchesFilter = action.payload;
    },

    fetchPagesStart: (state) => {
      state.loadingPages = true;
      state.errorPages = null;
    },
    fetchPagesSuccess: (state, action) => {
      state.loadingPages = false;
      state.totalPages = action.payload;
    },
    fetchPagesFailure: (state, action) => {
      state.loadingPages = false;
      state.errorPages = action.payload;
    },

    fetchBranchByIdStart: (state) => {
      state.isLoadingBranch = true;
      state.branchError = null;
    },
    fetchBranchByIdSuccess: (state, action) => {
      state.isLoadingBranch = false;
      state.branchById = action.payload;
    },
    fetchBranchByIdFailure: (state, action) => {
      state.isLoadingBranch = false;
      state.branchError = action.payload;
    },
  },
});

// Exporta las acciones
export const {
  fetchBranchesStart,
  fetchBranchesSuccess,
  fetchBranchesFailure,
  setBranchesFilter,
  fetchPagesStart,
  fetchPagesSuccess,
  fetchPagesFailure,
  fetchBranchByIdStart,
  fetchBranchByIdSuccess,
  fetchBranchByIdFailure,
} = branchesSlice.actions;

// Exporta el reducer
export default branchesSlice.reducer;