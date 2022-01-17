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
            if (user !== null && user.isLogged !== false) {
                state.value = user;
            } else if(user.isLogged === false) {
                action.payload = {
                    isLogged: false
                }
            }

            if (user !== null && user.isAdmin) {
                action.payload = {
                    isAdmin: true,
                    isLogged: true
                };
            } else if (user !== null && user.isLogged) {
                action.payload = {
                    isLogged: true
                };
            }
        },
        userAuthentication: (state, action) => {
            if (action.payload.isLogged === false) {
                state.value.isLogged = false;
            } else {
                state.value = action.payload;
            }
            localStorage.setItem('user', JSON.stringify(state.value));
        },
        addBurgirToUserModel: (state, action) => {
            state.value.createdBurgirs.push(action.payload);
            localStorage.setItem('user', JSON.stringify(state.value));
        },
        removeBurgirFromUserModel: (state, action) => {
            let index = state.value.createdBurgirs.findIndex(x => x === action.payload);
            if (index) {
                state.value.createdBurgirs.splice(index, 1);
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

export const { userAuthentication, logout, addToLiked, removeFromLiked, getUser, addBurgirToUserModel, removeBurgirFromUserModel } = userSlice.actions;

export default userSlice.reducer;