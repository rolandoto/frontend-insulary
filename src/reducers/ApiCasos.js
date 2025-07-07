import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  // Estado para la lista de clientes
  casosFilter:[],
  casos: null,
  loading: false,
  error: null,



  totalPages: 0,
  loadingPages: false,
  errorPages: null,
};

export const Casoslice = createSlice({
  name: 'casos',
  initialState,
  reducers: {
        fetchCasostStart: (state) => {
        state.loading = true;
        state.error = null;
      },
      fetchCasosSuccess: (state, action) => {
        state.loading = false;
        state.casos = action.payload;
      },
      fetchCasosFilterSuccess: (state, action) => {
        state.loading = false;
        state.casosFilter = action.payload;
      },
      fetchCasosFailure: (state, action) => {
        state.loading = false;
        state.error = action.payload;
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
  },
});

export const {
    fetchCasostStart,
    fetchCasosFilterSuccess,
    fetchCasosSuccess,
    fetchCasosFailure,
    fetchPagesStart,
    fetchPagesSuccess,
    fetchPagesFailure
} = Casoslice.actions;

export default Casoslice.reducer;