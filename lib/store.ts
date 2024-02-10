import { configureStore } from '@reduxjs/toolkit';

import bankCheckReducer from '~/features/bankCheck/bankCheckSlice';
import contactReducer from '~/features/contact/contactSlice';
import counterReducer from '~/features/counter';

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    bankCheck: bankCheckReducer,
    contact: contactReducer,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
