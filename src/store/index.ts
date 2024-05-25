import { configureStore } from "@reduxjs/toolkit";
import userSlice from './user-slice';
import referPostsSlice from "./referRequests-slice";

const store = configureStore({
    reducer: { user: userSlice.reducer, referPosts: referPostsSlice.reducer }
});

export default store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
