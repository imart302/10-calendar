import { AnyAction, ThunkMiddleware, configureStore } from '@reduxjs/toolkit';
import { uiReducer, caledarReducer, authReducer } from '../../src/store';
import { ToolkitStore } from '@reduxjs/toolkit/dist/configureStore';
import { IUIState, ICalendarState, IAuthState } from '../../src/types';

export const createTestStore = (): ToolkitStore<
  {
    ui: IUIState;
    calendar: ICalendarState;
    auth: IAuthState;
  },
  AnyAction,
  [
    ThunkMiddleware<
      {
        ui: IUIState;
        calendar: ICalendarState;
        auth: IAuthState;
      },
      AnyAction
    >
  ]
> => {
  const store = configureStore({
    reducer: {
      ui: uiReducer,
      calendar: caledarReducer,
      auth: authReducer,
    },
  });

  return store;
};
