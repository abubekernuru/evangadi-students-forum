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

    signInStart: (state) => {
        state.loading = true;
    },
    signInSuccess: (state, action) => {
        state.currentUser = action.payload;
        state.loading = false;
        state.error = null;
    },
    
    signInFailure: (state, action) => {
        state.error = action.payload;
        state.loading = false;
    },

    signOutSuccess: (state) => {
        state.currentUser = null;
        state.loading = false;
        state.error = null;
    },
    updateStart: (state) => {
        state.loading = true;
    },
    updateSuccess: (state, action) => {
        state.currentUser = action.payload;
        state.loading = false;
        state.error = null;
    },
    updateFailure: (state, action) => {
        state.error = action.payload;
        state.loading = false;
    },
    deleteUserSuccess: (state) => {
        state.currentUser = null;
        state.loading = false;
        state.error = false;
    },
    deleteUserFailer: (state, action) => {
        state.error = action.payload;
        state.loading = false;
    },
    },
});

export const { signInStart, signInSuccess, signInFailure, signOutSuccess, updateStart, updateSuccess, updateFailure, deleteUserSuccess, deleteUserFailer } = userSlice.actions;
export default userSlice.reducer;