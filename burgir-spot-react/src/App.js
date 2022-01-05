import "./App.css";
import { Route, Routes, useLocation, useNavigate } from "react-router-dom";
import React, { useEffect, useMemo } from "react";

import Header from "./components/Header/Header";
import Home from "./components/Home/Home";
import Menu from "./components/Menu/Menu";
import Login from "./components/userAuth/Login/Login";
import Register from "./components/userAuth/Register/Register";
import Create from "./components/Burgir/Create/Create";
import Details from "./components/Burgir/Details/Details";
import Edit from "./components/Burgir/Edit/Edit";
import UserProfile from "./components/UserProfile/UserProfile";
import EditProfile from "./components/UserProfile/EditProfile/EditProfile";
import EditPassword from "./components/UserProfile/EditPassword/EditPassword";
import NotFound from "./components/NotFound/NotFound";

import { userAuthentication } from "./features/user/userSlice";
import { useDispatch, useSelector } from "react-redux";

import { getUser } from "./services/authService";

import LoggedUserGuard from "./guards/LoggedUserGuard";
import GuestGuard from './guards/GuestGuard';

function App() {
    const dispatch = useDispatch();
    const location = useLocation();
    const navigate = useNavigate();
    
    const user = useSelector(state => state.user.value);

    useMemo(() => {
        getUser()
            .then(response => {
                dispatch(userAuthentication(response));
                navigate(location.state.path);
            })
            .catch((err) => {
                console.log(err);
            })
    }, [user])

    return (
        <React.StrictMode>
            <Header />
            <div className="router">
                <Routes>
                    <Route path="/" exact element={<Home />} />
                    <Route path="/menu" element={<Menu />} />
                    <Route element={<GuestGuard />}>
                        <Route path="/login" element={<Login />} />
                        <Route path="/register" element={<Register />} />
                    </Route>
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
