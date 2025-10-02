import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  ramos: [],
  loading: false,
  error: null,

  totalPages: 0,
  loadingPages: false,
  errorPages: null,

  postRamosData: [],
  postRamosLoading: false,
  postRamosError: null,

  amparosFilter: [],
  loadingAmparos: false,
  errorAmparos: null,

  ramosFilter: [],
  ramosFilterLoading: false,
  ramosFilterError: null,


  ramosById: null,
  isLoadingRamos: false,
  ramosError: null,

};

export const ramosSlice = createSlice({
  name: 'ramos',
  initialState,
  reducers: {
    // --- Ramos ---
    fetchRamosStart: state => {
      state.loading = true;
      state.error = null;
    },
    fetchRamosSuccess: (state, action) => {
      state.loading = false;
      state.ramos = action.payload;
    },
    fetchRamosFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },

    // --- Amparos ---
    fetchAmparosStart: state => {
      state.loadingAmparos = true;
      state.errorAmparos = null;
    },
    fetchAmparosSuccess: (state, action) => {
      state.loadingAmparos = false;
      state.amparosFilter = action.payload;
    },
    fetchAmparosFailure: (state, action) => {
      state.loadingAmparos = false;
      state.errorAmparos = action.payload;
    },

    // --- Post Ramos ---
    postRamosStart: (state) => {
      state.postRamosLoading = true;
      state.postRamosError = null;
    },
    postRamosSuccess: (state, action) => {
      state.postRamosLoading = false;
      state.postRamosData = action.payload;
    },
    postRamosFailure: (state, action) => {
      state.postRamosLoading = false;
      state.postRamosError = action.payload;
    },

    setRamosFilter: (state, action) => {
      state.ramosFilter = action.payload;
    },

    // --- Paginación ---
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


    fetchRamosByIdStart: (state) => {
      state.isLoadingRamos = true;
      state.ramosError = null;
    },
    fetchRamosByIdSuccess: (state, action) => {
      state.isLoadingRamos = false;
      state.ramosById = action.payload;
    },
    fetchRamosByIdFailure: (state, action) => {
      state.isLoadingRamos = false;
      state.ramosError = action.payload;
    },

  },
});

export const {
  fetchRamosStart,
  fetchRamosSuccess,
  fetchRamosFailure,
  fetchAmparosStart,
  fetchAmparosSuccess,
  fetchAmparosFailure,
  postRamosStart,
  postRamosSuccess,
  postRamosFailure,
  fetchPagesStart,
  fetchPagesSuccess,
  fetchPagesFailure,
  setRamosFilter,
  fetchRamosByIdStart,
  fetchRamosByIdSuccess,
  fetchRamosByIdFailure
} = ramosSlice.actions;

export default ramosSlice.reducer;
