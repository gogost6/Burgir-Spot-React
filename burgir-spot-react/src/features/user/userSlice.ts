import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Burgir } from "../../interfaces/burgir";
import { User } from "../../interfaces/user";

interface UserState {
    value: {
        _id: string;
        email: string;
        username: string;
        createdBurgirs: string[];
        likedBurgirs: string[];
        telephone: string;
        isLogged: boolean;
        isAdmin: boolean;
    };
}

interface UserAction {
    isLogged: boolean;
    isAdmin: boolean;
}

let initialState: UserState = {
    value: {
        _id: "",
        email: "",
        username: "",
        createdBurgirs: [],
        likedBurgirs: [],
        telephone: "",
        isLogged: false,
        isAdmin: false,
    },
};

const userSlice = createSlice({
    name: "user",
    initialState: initialState,
    reducers: {
        getUser: (state, action: PayloadAction<UserAction>) => {
            const user = JSON.parse(localStorage.getItem("user")!);
            if (user !== null && user.isLogged !== false) {
                state.value = user;
            } else if (user.isLogged === false) {
                action.payload = {
                    isLogged: false,
                    isAdmin: false,
                };
            }

            if (user !== null && user.isAdmin) {
                action.payload = {
                    isAdmin: true,
                    isLogged: true,
                };
            } else if (user !== null && user.isLogged) {
                action.payload = {
                    isLogged: true,
                    isAdmin: false,
                };
            }
        },
        userAuthentication: (state, action: PayloadAction<User>) => {
            if (action.payload.isLogged === false) {
                state.value.isLogged = false;
                state.value.isAdmin = false;
            } else {
                state.value = action.payload;
                state.value.isLogged = true;
                if (action.payload.isAdmin) {
                    state.value.isAdmin = true;
                }
            }
            localStorage.setItem("user", JSON.stringify(state.value));
        },
        addBurgirToUserModel: (state, action: PayloadAction<string>) => {
            state.value.createdBurgirs.push(action.payload);
            localStorage.setItem("user", JSON.stringify(state.value));
        },
        removeBurgirFromUserModel: (state, action: PayloadAction<string>) => {
            let index = state.value.createdBurgirs.findIndex(
                (x) => x === action.payload
            );
            if (index) {
                state.value.createdBurgirs.splice(index, 1);
            }
            localStorage.setItem("user", JSON.stringify(state.value));
        },
        addToLiked: (state, action: PayloadAction<string>) => {
            state.value.likedBurgirs.push(action.payload);
            localStorage.setItem("user", JSON.stringify(state.value));
        },
        removeFromLiked: (state, action: PayloadAction<string>) => {
            let index = state.value.likedBurgirs.findIndex(
                (x) => x === action.payload
            );

            if (index) {
                state.value.likedBurgirs.splice(index, 1);
            }
            localStorage.setItem("user", JSON.stringify(state.value));
        },
        logout: (state) => {
            state.value = initialState.value;
            localStorage.setItem("user", JSON.stringify(state.value));
        },
    },
});

export const {
    userAuthentication,
    logout,
    addToLiked,
    removeFromLiked,
    getUser,
    addBurgirToUserModel,
    removeBurgirFromUserModel,
} = userSlice.actions;

export default userSlice.reducer;
