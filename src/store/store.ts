import { IRootState } from '@/types';
import { configureStore } from '@reduxjs/toolkit';
import { authInitial, authReducer } from './auth';
import { caledarReducer, calendarInitial } from './calendar';
import { uiInitial, uiReducer } from './ui';

const initialState : IRootState = { 
  auth: authInitial,
  calendar: calendarInitial,
  ui: uiInitial,
}

const store = configureStore({

  reducer: {
    ui: uiReducer,
    calendar: caledarReducer,
    auth: authReducer,
  },
  preloadedState: initialState
});

export default store;



