import { PayloadAction, createSlice } from "@reduxjs/toolkit";

export interface ReferPostState {
    companyName: string | undefined;
    jobId: string | undefined;
    jobTitle: string | undefined;
    jobUrl: string | undefined;
    referredStatus: number | undefined;
    user: any | undefined;
}


const initialState: ReferPostState[] = [];

const referPostsSlice = createSlice({
    name: 'referPosts',
    initialState,
    reducers: {
        setReferPostObjects(_, action: PayloadAction<ReferPostState[]>) {
            return [...action.payload];
        }
    }
});

export const referPostActions = referPostsSlice.actions;
export default referPostsSlice;
