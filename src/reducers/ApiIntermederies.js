import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  intermediaries: [],
  intermediariesFilter: [],
  loading: false,
  error: null,

  totalPages: 0,
  loadingPages: false,
  errorPages: null,


  IntermederiesById: null,
  isLoadingIntermederies: false,
  IntermederiesError: null,

};

export const intermediariesSlice = createSlice({
  name: 'intermediaries',
  initialState,
  reducers: {
    fetchIntermediariesStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    fetchIntermediariesSuccess: (state, action) => {
      state.loading = false;
      state.intermediaries = action.payload;
    },
    fetchIntermediariesFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    setIntermediariesFilter: (state, action) => {
      state.intermediariesFilter = action.payload;
    },


    fetchPagesStart: state => {
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


    fetchIntermederiesByIdStart: (state) => {
      state.isLoadingIntermederies = true;
      state.IntermederiesError = null;
    },
    fetchIntermederiesByIdSuccess: (state, action) => {
      state.isLoadingIntermederies = false;
      state.IntermederiesById = action.payload;
    },
    
    fetchIntermederiesByIdFailure: (state, action) => {
      state.isLoadingIntermederies = false;
      state.IntermederiesError = true;
    },
  },
});

// Exporta las acciones
export const {
  fetchIntermediariesStart,
  fetchIntermediariesSuccess,
  fetchIntermediariesFailure,
  setIntermediariesFilter,
  fetchPagesStart,
  fetchPagesSuccess,
  fetchPagesFailure,
  fetchIntermederiesByIdStart,
  fetchIntermederiesByIdSuccess,
  fetchIntermederiesByIdFailure
} = intermediariesSlice.actions;

// Exporta el reducer
export default intermediariesSlice.reducer;