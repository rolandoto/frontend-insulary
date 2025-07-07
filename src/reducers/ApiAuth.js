import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  // Estado para la lista de clientes
  accessToken: null,
  loadingRegrestoken: false,
  errorRefrestoken: null,
};

export const refresTokenslice = createSlice({
  name: 'Tokens',
  initialState,
  reducers: {
    fetchRefreshTokenStart: (state) => {
        state.loadingRegrestoken = true;
        state.errorRefrestoken = null;
      },
      fetchRefreshTokenSuccess: (state, action) => {
        state.loadingRegrestoken = false;
        state.accessToken = action.payload;
      },
      fetchRefreshTokenFailure: (state, action) => {
        state.loadingRegrestoken = false;
        state.errorRefrestoken = action.payload;
      },
  },
});

export const {
    fetchRefreshTokenStart,
    fetchRefreshTokenSuccess,
    fetchRefreshTokenFailure,
} = refresTokenslice.actions;

export default refresTokenslice.reducer;