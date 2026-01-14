import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    currentUser: null,
    error: null,
    loading: false,
};

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
    // Call this when login starts
    signInStart: (state) => {
        state.loading = true;
    },
    // Call this when login or checkUser succeeds
    signInSuccess: (state, action) => {
        state.currentUser = action.payload;
        state.loading = false;
        state.error = null;
    },
    // Call this if login or checkUser fails
    signInFailure: (state, action) => {
        state.error = action.payload;
        state.loading = false;
    },
    // Call this to log out
    signOut: (state) => {
        state.currentUser = null;
        state.loading = false;
        state.error = null;
    },
    },
});

export const { signInStart, signInSuccess, signInFailure, signOut } = userSlice.actions;
export default userSlice.reducer;