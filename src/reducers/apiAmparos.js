import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  amparos: [],
  amparosFilter: [],
  loading: false,
  error: null,

  totalPages: 0,
  loadingPages: false,
  errorPages: null,

  amparosById: null,
  isLoadingAmparos: false,
  amparosError: null,
};

export const amparosSlice = createSlice({
  name: 'amparos',
  initialState,
  reducers: {
    fetchAmparosStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    fetchAmparosSuccess: (state, action) => {
      state.loading = false;
      state.amparos = action.payload;
    },
    fetchAmparosFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },

    setAmparosFilter: (state, action) => {
      state.amparosFilter = action.payload;
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

    fetchAmparosByIdStart: (state) => {
      state.isLoadingAmparos = true;
      state.amparosError = null;
    },
    fetchAmparosByIdSuccess: (state, action) => {
      state.isLoadingAmparos = false;
      state.amparosById = action.payload;
    },
    fetchAmparosByIdFailure: (state, action) => {
      state.isLoadingAmparos = false;
      state.amparosError = action.payload;
    },
  },
});

// Exporta las acciones
export const {
  fetchAmparosStart,
  fetchAmparosSuccess,
  fetchAmparosFailure,
  setAmparosFilter,
  fetchPagesStart,
  fetchPagesSuccess,
  fetchPagesFailure,
  fetchAmparosByIdStart,
  fetchAmparosByIdSuccess,
  fetchAmparosByIdFailure,
} = amparosSlice.actions;

// Exporta el reducer
export default amparosSlice.reducer;
