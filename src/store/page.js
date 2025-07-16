// src/store/store.js
import {clientSlice} from '../reducers/ApiClient';
import {refresTokenslice} from '../reducers/ApiAuth';
import {Casoslice} from '../reducers/ApiCasos';
import {Clientlice} from '../reducers/ApiUsers';
import {dashboardSlice} from '../reducers/ApiDashboard';
import {intermediariesSlice} from '../reducers/ApiIntermederies';
import { configureStore } from '@reduxjs/toolkit';

const store = configureStore ({
    reducer:{
        clients:clientSlice.reducer,
        Refrestoken:refresTokenslice.reducer,
        Casos:Casoslice.reducer,
        users:Clientlice.reducer,
        dashboard:dashboardSlice.reducer,
        intermederies:intermediariesSlice.reducer
        },
    devTools:true,

})

export const RootState = store.getState

export const  AppDispatch = typeof store.dispatch

export default store