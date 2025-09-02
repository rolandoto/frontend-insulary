import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  Ramos: [],
  loading: false,
  error: null,

  amparosFilter: [],
  loadingAmparos: false,
  errorAmparos: null,
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
      state.Ramos = action.payload;
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
  },
});

export const {
  fetchRamosStart,
  fetchRamosSuccess,
  fetchRamosFailure,
  fetchAmparosStart,
  fetchAmparosSuccess,
  fetchAmparosFailure,
} = ramosSlice.actions;

export default ramosSlice.reducer;