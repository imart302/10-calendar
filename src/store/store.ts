import { configureStore } from '@reduxjs/toolkit';
import { authReducer } from './auth';

import { caledarReducer } from './calendar';
import { uiReducer } from './ui';

// ...

const store = configureStore({

  reducer: {
    ui: uiReducer,
    calendar: caledarReducer,
    auth: authReducer,
  },
});



// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;

export default store;
