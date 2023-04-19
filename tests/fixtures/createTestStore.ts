import { AnyAction, ThunkMiddleware, configureStore } from '@reduxjs/toolkit';
import { uiReducer, caledarReducer, authReducer } from '../../src/store';
import { ToolkitStore } from '@reduxjs/toolkit/dist/configureStore';
import { IUIState, ICalendarState, IAuthState } from '../../src/types';

export const createTestStore = (auth?: IAuthState, calendar?: ICalendarState, ui?: IUIState) => {
  
  
  const store = configureStore({
    reducer: {
      ui: uiReducer,
      calendar: caledarReducer,
      auth: authReducer,
    },
    preloadedState: {
      ui: ui,
      auth: auth,
      calendar: calendar
    }
  });

  return store;
};
