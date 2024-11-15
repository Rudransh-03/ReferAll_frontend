import { PayloadAction, createSlice } from "@reduxjs/toolkit";

export interface YourRequestsState {
    companyName: string | undefined;
    jobId: string | undefined;
    jobTitle: string | undefined;
    jobUrl: string | undefined;
    referredStatus: number | undefined;
    user: any | undefined;
    referrer: any
}


const initialState: YourRequestsState[] = [];

const yourRequestsSlice = createSlice({
    name: 'yourRequests',
    initialState,
    reducers: {
        setYourRequestsObjects(state, action: PayloadAction<YourRequestsState[]>) {
            return [...action.payload];
        }
    }
});

export const yourRequestsActions = yourRequestsSlice.actions;
export default yourRequestsSlice;
