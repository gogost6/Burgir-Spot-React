import { createSlice } from '@reduxjs/toolkit';

let initialState = {
    value: {
        _id: "",
        email: "",
        username: "",
        createdBurgirs: [],
        favouriteBurgirs: [],
        likedBurgirs: [],
        telephone: "",
        isLogged: false
    }
};

const userSlice = createSlice({
    name: "user",
    initialState: initialState,
    reducers: {
        userAuthentication: (state, action) => {
            state.value = action.payload;
            state.value.isLogged = true;
        },
        logout: (state, action) => {
            state.value = initialState;
        },
    }
});

export const { userAuthentication, logout } = userSlice.actions;

export default userSlice.reducer;