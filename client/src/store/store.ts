import { configureStore } from '@reduxjs/toolkit';
import { enhancedApi } from './api'
import { authSlice } from './authSlice'

const store = configureStore({
  reducer: {
    [enhancedApi.reducerPath]: enhancedApi.reducer,
    [authSlice.reducerPath]: authSlice.reducer,
  },
    // Adding the api middleware enables caching, invalidation, polling,
  // and other useful features of `rtk-query`.
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(enhancedApi.middleware),
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch

export default store;