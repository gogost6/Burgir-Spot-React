import "./App.css";
import { Route, Routes, useLocation, useNavigate } from "react-router-dom";
import React, { useState, useEffect } from "react";

import Header from "./components/Header/Header";
import Home from "./components/Home/Home";
import Menu from "./components/Menu/Menu";
import Login from "./components/UserProfile/Login/Login";
import Register from "./components/UserProfile/Register/Register";
import Create from "./components/Burgir/Create/Create";
import Details from "./components/Burgir/Details/Details";
import Edit from "./components/Burgir/Edit/Edit";
import UserProfile from "./components/UserProfile/UserProfile";
import EditProfile from "./components/UserProfile/EditProfile/EditProfile";
import EditPassword from "./components/UserProfile/EditPassword/EditPassword";
import NotFound from "./components/NotFound/NotFound";
import Demo from "./components/Demo/Demo";

import { userAuthentication } from "./features/user/userSlice";
import { useDispatch } from "react-redux";

import { getUser } from "./services/authService";

import LoggedUserGuard from "./guards/LoggedUserGuard";
import GuestGuard from './guards/GuestGuard';

function App() {
    // let navigate = useNavigate();
    // const { state } = useLocation();
    const dispatch = useDispatch();
    // let [userState, setUserState] = useState(false);

    // let [user, setUser] = useState({
    //     _id: "",
    //     email: "",
    //     username: "",
    //     createdBurgirs: [],
    //     favouriteBurgirs: [],
    //     likedBurgirs: [],
    //     telephone: ""
    // });

    // let onLogin = (userData) => {
    //     setUser(userData);
    //     navigate(state?.path || '/');
    // };

    useEffect(() => {
        getUser()
            .then(response => {
                dispatch(userAuthentication(response));
            })
            .catch((err) => {
                console.log(err);
            })
    }, [])

    return (
        <React.StrictMode>
            <Header />
            <div className="router">
                <Routes>
                    <Route path="/" exact element={<Home />} />
                    <Route path="/demo" element={<Demo />} />
                    <Route path="/menu" element={<Menu />} />
                    <Route path="/login" element={<GuestGuard><Login /></GuestGuard>} />
                    <Route path="/register" element={<GuestGuard><Register /></GuestGuard>} />
                    <Route path="/details/:id" element={<Details />} />
                    <Route element={<LoggedUserGuard />}>
                        <Route path="/create" element={<Create />} />
                        <Route path="/edit/:id" element={<Edit />} />
                        <Route path="/user" element={<UserProfile />}>
                            <Route path="edit-profile" element={<EditProfile />} />
                            <Route path="edit-password" element={<EditPassword />} />
                        </Route>
                    </Route>
                    <Route path="*" element={<NotFound />} />
                </Routes>
            </div>
        </React.StrictMode>
    );
}

export default App;
