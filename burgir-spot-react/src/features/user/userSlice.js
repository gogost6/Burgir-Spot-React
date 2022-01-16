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
        getUser: (state, action) => {
            const user = JSON.parse(localStorage.getItem('user'));

            if (user !== null && user._id === '') {
              state.value = user;
            } else {
                action.payload = {
                    isLogged: false
                }
            }

            if(user.isAdmin) {
                action.payload = {
                    isAdmin: true,
                    isLogged: true
                };
            } else if(user.isLogged) {
                action.payload = {
                    isLogged: true
                };
            }
        },
        userAuthentication: (state, action) => {
            state.value = action.payload;
            if (action.payload._id) {
                state.value.isLogged = true;
            }
            localStorage.setItem('user', JSON.stringify(state.value));
        },
        addToLiked: (state, action) => {
            state.value.likedBurgirs.push(action.payload);
            localStorage.setItem('user', JSON.stringify(state.value));
        },
        removeFromLiked: (state, action) => {
            let index = state.value.likedBurgirs.findIndex(x => x._id === action.payload);

            if (index) {
                state.value.likedBurgirs.splice(index, 1);
            }
            localStorage.setItem('user', JSON.stringify(state.value));
        },
        logout: (state, action) => {
            state.value = initialState.value;
            localStorage.setItem('user', JSON.stringify(state.value));
        },
    }
});

export const { userAuthentication, logout, addToLiked, removeFromLiked, getUser } = userSlice.actions;

export default userSlice.reducer;