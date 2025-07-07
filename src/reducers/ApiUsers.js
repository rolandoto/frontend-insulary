import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  // Estado para la lista de clientes
  users: null,
  loading: false,
  error: null,
  userFilter:[],

//amout pages
  totalPages: 0,
  loadingPages: false,
  errorPages: null,


  roles: null,
  loadingroles: false,
  errorRoles: null,

  
  userById: null,
  LoadingUser: false,
  userError: null,
};

export const Clientlice = createSlice({
  name: 'Users',
  initialState,
  reducers: {
    fetchUsersStart: (state) => {
        state.loading = true;
        state.error = null;
      },
    fetchUsersSuccess: (state, action) => {
        state.loading = false;
        state.users = action.payload;
      },

      fetchUsersFilterSuccess: (state, action) => {
        state.loading = false;
        state.userFilter = action.payload;
      },
    fetchUsersFailure: (state, action) => {
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



    fetchRolesStart: state => {
        state.loadingroles = true;
        state.errorRoles = null;
    },
    fetchRolesSuccess: (state, action) => {
        state.loadingroles = false;
        state.roles = action.payload;
    },
    fetchRolesFailure: (state, action) => {
        state.loadingroles = false;
        state.errorRoles = action.payload;
    },


    
    fetchUserByIdStart: state => {
        state.LoadingUser = true;
        state.userError = null;
    },
    fetchUserByIdSuccess: (state, action) => {
        state.LoadingUser = false;
        state.userById = action.payload;
    },
    fetchUserByIdFailure: (state, action) => {
        state.LoadingUser = false;
        state.userError = action.payload;
    },
  },
});

export const {
    fetchUsersStart,
    fetchUsersSuccess,
    fetchUsersFailure,
    fetchPagesStart,
    fetchPagesSuccess,
    fetchPagesFailure,
    fetchRolesStart,
    fetchRolesSuccess,
    fetchRolesFailure,
    fetchUserByIdStart,
    fetchUserByIdSuccess,
    fetchUserByIdFailure,
    fetchUsersFilterSuccess
} = Clientlice.actions;

export default Clientlice.reducer;