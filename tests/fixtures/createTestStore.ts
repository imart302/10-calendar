import { configureStore } from '@reduxjs/toolkit';
import { uiReducer, caledarReducer, authReducer } from '../../src/store';

export const createTestStore = () => {
  const store = configureStore({
    reducer: {
      ui: uiReducer,
      calendar: caledarReducer,
      auth: authReducer,
    },
  });

  return store;
};
