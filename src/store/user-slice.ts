import { PayloadAction, createSlice } from "@reduxjs/toolkit";

export interface userState {
    userId: string,
    firstName: string;
    lastName: string;
    emailId: string;
    contactNumber: string;
    currentTitle: string;
    currentCompany: string;
    linkedInUrl: string;
    resumeUrl: string;
    bio: string;
    points: number;
    jwtToken: string;
    expiresIn: number;
}

// Retrieve the JWT token and user data from localStorage if it exists
const savedJwtToken = localStorage.getItem("jwtToken") || "";
const savedUserData = JSON.parse(localStorage.getItem("userData") || "{}");
const savedTimestamp = localStorage.getItem("userTimestamp") || "";
const ONE_HOUR = 3600000;

// Check if the stored data is older than 1 hour
if (savedTimestamp && (Date.now() - parseInt(savedTimestamp) > ONE_HOUR)) {
    localStorage.removeItem("jwtToken");
    localStorage.removeItem("userData");
    localStorage.removeItem("userTimestamp");
}

const initialState: userState = {
    userId: savedUserData.userId || "",
    firstName: savedUserData.firstName || "",
    lastName: savedUserData.lastName || "",
    emailId: savedUserData.emailId || "",
    contactNumber: savedUserData.contactNumber || "",
    currentTitle: savedUserData.currentTitle || "",
    currentCompany: savedUserData.currentCompany || "",
    linkedInUrl: savedUserData.linkedInUrl || "",
    resumeUrl: savedUserData.resumeUrl || "",
    bio: savedUserData.bio || "",
    points: savedUserData.points || 0,
    jwtToken: savedJwtToken,
    expiresIn: savedUserData.expiresIn || 0,
};

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUserObject(state, action: PayloadAction<Partial<userState>>) {
            state.userId = action.payload.userId || "";
            state.firstName = action.payload.firstName || state.firstName;
            state.lastName = action.payload.lastName || state.lastName;
            state.emailId = action.payload.emailId || state.emailId;
            state.contactNumber = action.payload.contactNumber || state.contactNumber;
            state.currentTitle = action.payload.currentTitle || state.currentTitle;
            state.currentCompany = action.payload.currentCompany || state.currentCompany;
            state.linkedInUrl = action.payload.linkedInUrl || state.linkedInUrl;
            state.resumeUrl = action.payload.resumeUrl || state.resumeUrl;
            state.bio = action.payload.bio || state.bio;
            state.points = action.payload.points || state.points;
            state.jwtToken = action.payload.jwtToken || state.jwtToken;
            state.expiresIn = action.payload.expiresIn || state.expiresIn;

            // Save to localStorage with timestamp
            const timestamp = Date.now().toString();
            localStorage.setItem("jwtToken", state.jwtToken);
            localStorage.setItem("userData", JSON.stringify({
                userId: state.userId,
                firstName: state.firstName,
                lastName: state.lastName,
                emailId: state.emailId,
                contactNumber: state.contactNumber,
                currentTitle: state.currentTitle,
                currentCompany: state.currentCompany,
                linkedInUrl: state.linkedInUrl,
                resumeUrl: state.resumeUrl,
                bio: state.bio,
                points: state.points,
                expiresIn: state.expiresIn
            }));
            localStorage.setItem("userTimestamp", timestamp);
        },
        clearUserObject(state) {
            state.userId = "";
            state.firstName = "";
            state.lastName = "";
            state.emailId = "";
            state.contactNumber = "";
            state.currentTitle = "";
            state.currentCompany = "";
            state.linkedInUrl = "";
            state.resumeUrl = "";
            state.bio = "";
            state.points = 0;
            state.jwtToken = "";
            state.expiresIn = 0;

            localStorage.removeItem("jwtToken");
            localStorage.removeItem("userData");
            localStorage.removeItem("userTimestamp");
        }
    }
});

export const userActions = userSlice.actions;
export default userSlice;
