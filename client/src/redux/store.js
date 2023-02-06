import { configureStore } from '@reduxjs/toolkit'
import userReducer from './userReducer'
import adminReducer from './adminReducer'
import { combineReducers } from 'redux'
import storage from 'redux-persist/lib/storage'
import {
    persistReducer,
    FLUSH,
    REHYDRATE,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER,
  } from 'redux-persist';

  const persistConfig = {
    key: 'admin',
    storage,
  };

  const reducers = combineReducers({ user:userReducer, admin:adminReducer });
  const persistedReducer = persistReducer(persistConfig, reducers);


  export const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        serializableCheck: {
          ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
        },
      }),
  });

