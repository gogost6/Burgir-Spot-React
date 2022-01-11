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
            if (action.payload._id) {
                state.value.isLogged = true;
            }
        },
        addToFavourite: (state, action) => {
            state.value.favouriteBurgirs.push(action.payload);
            localStorage.setItem('favourite', JSON.stringify(state.value.favouriteBurgirs));
        },
        removeFromFavourite: (state, action) => {
            let index = state.value.favouriteBurgirs.findIndex(x => x._id === action.payload);

            if (index) {
                state.value.favouriteBurgirs.splice(index, 1);
            }
        },
        logout: (state, action) => {
            state.value = initialState.value;
        },
    }
});

export const { userAuthentication, logout, addToFavourite, removeFromFavourite, checkForFavourite } = userSlice.actions;

export default userSlice.reducer;