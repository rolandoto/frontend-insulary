import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  // Estado para la lista de clientes
  clients: [],
  ClientFilter:[],
  loading: false,
  error: null,

  // Estado para el total de páginas
  totalPages: 0,
  loadingPages: false,
  errorPages: null,

  clientById: null,
  isLoadingClient: false,
  clientError: null,
};

export const clientSlice = createSlice({
  name: 'clients',
  initialState,
  reducers: {
    // --- Clientes ---
    fetchClientsStart: state => {
      state.loading = true;
      state.error = null;
    },
    fetchClientsSuccess: (state, action) => {
      state.loading = false;
      state.clients = action.payload;
    },
    fetchClientsFilterSuccess: (state, action) => {
      state.loading = false;
      state.ClientFilter = action.payload;
    },
    fetchClientsFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },

    // --- Total Pages ---
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

    fetchClientByIdStart: (state) => {
      state.isLoadingClient = true;
      state.clientError = null;
    },
    fetchClientByIdSuccess: (state, action) => {
      state.isLoadingClient = false;
      state.clientById = action.payload;
    },
    
    fetchClientByIdFailure: (state, action) => {
      state.isLoadingClient = false;
      state.clientError = true;
    },
  },
});

export const {
  fetchClientsStart,
  fetchClientsSuccess,
  fetchClientsFailure,
  fetchClientsFilterSuccess,
  fetchPagesStart,
  fetchPagesSuccess,
  fetchPagesFailure,
  fetchClientByIdFailure,
  fetchClientByIdSuccess,
  fetchClientByIdStart
} = clientSlice.actions;

export default clientSlice.reducer;