import { configureStore } from '@reduxjs/toolkit';
import { authReducer, authInitial } from './auth';
import { caledarReducer, calendarInitial } from './calendar';
import { uiReducer, uiInitial } from './ui';
import { IRootState } from '@/types';

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



