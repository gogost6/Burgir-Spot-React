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
        isLogged: false,
        isAdmin: false
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
        addToLiked: (state, action) => {
            state.value.likedBurgirs.push(action.payload);
        },
        removeFromLiked: (state, action) => {
            let index = state.value.likedBurgirs.findIndex(x => x._id === action.payload);

            if (index) {
                state.value.likedBurgirs.splice(index, 1);
            }
        },
        logout: (state, action) => {
            state.value = initialState.value;
        },
    }
});

export const { userAuthentication, logout, addToLiked, removeFromLiked } = userSlice.actions;

export default userSlice.reducer;