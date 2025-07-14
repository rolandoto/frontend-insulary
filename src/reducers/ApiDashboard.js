import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  metrics: {
    totalCases: 0,
    pendingCases: 0,
    totalCerrados:0,
    totalDelete:0
  },
  loading: false,
  error: null,
};

export const dashboardSlice = createSlice({
  name: 'dashboard',
  initialState,
  reducers: {
    fetchDashboardStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    fetchDashboardSuccess: (state, action) => {
      state.loading = false;
      state.metrics = action.payload;
    },
    fetchDashboardFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

// Exporta las acciones
export const {
  fetchDashboardStart,
  fetchDashboardSuccess,
  fetchDashboardFailure,
} = dashboardSlice.actions;

// Exporta el reducer
export default dashboardSlice.reducer;