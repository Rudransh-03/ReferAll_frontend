import { configureStore } from "@reduxjs/toolkit";
import userSlice from './user-slice';
import referPostsSlice from "./referRequests-slice";
import yourRequestsSlice from "./yourRequests-slice";

const store = configureStore({
    reducer: { user: userSlice.reducer, referPosts: referPostsSlice.reducer, yourRequests: yourRequestsSlice.reducer }
});

export default store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
