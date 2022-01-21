import "./App.css";
import { Route, Routes, useLocation, useNavigate } from "react-router-dom";
import React, { useMemo } from "react";

import Header from "./components/Header/Header";
import Home from "./components/Home/Home";
import Menu from "./components/Menu/Menu";
import Login from "./components/Login/Login";
import Register from "./components/Register/Register";
import Create from "./components/Burgir/Create/Create";
import Details from "./components/Burgir/Details/Details";
import Edit from "./components/Burgir/Edit/Edit";
import UserProfile from "./components/UserProfile/UserProfile";
import EditProfile from "./components/UserProfile/EditProfile/EditProfile";
import EditPassword from "./components/UserProfile/EditPassword/EditPassword";
import NotFound from "./components/NotFound/NotFound";
import Order from "./components/Order/Order";

import { userAuthentication } from "./features/user/userSlice";
import { useDispatch, useSelector } from "react-redux";
import { checkBusketForItems } from "./features/order/orderSlice";

import { getUser } from "./services/authService";

import LoggedUserGuard from "./guards/LoggedUserGuard";
import GuestGuard from './guards/GuestGuard';
import AdminGuard from "./guards/AdminGuard";

function App() {
    const dispatch = useDispatch();
    const location = useLocation();
    const navigate = useNavigate();
    const order = useSelector(state => state.order.value);

    useMemo(() => {
        getUser()
            .then(response => {
                dispatch(userAuthentication(response));
                if (location.state != null) {
                    navigate(location.state.path);
                }
            })
            .catch((err) => {
                console.log(err);
            })
    }, []);

    if (order.quantity === 0) {
        dispatch(checkBusketForItems());
    }

    return (
        <React.StrictMode>
            <Header />
            <div className="router">
                <Routes>
                    <Route path="/" exact element={<Home />} />
                    <Route path="/menu" element={<Menu type={'menu'} />} />
                    <Route path="/order" element={<Order />} />
                    <Route element={<GuestGuard />}>
                        <Route path="/login" element={<Login />} />
                        <Route path="/register" element={<Register />} />
                    </Route>
                    <Route path="/details/:id" element={<Details />} />
                    <Route element={<AdminGuard />}>
                        <Route path="/owned" element={<Menu type={'owned'} />} />
                        <Route path="/create" element={<Create />} />
                        <Route path="/edit/:id" element={<Edit />} />
                    </Route>
                    <Route element={<LoggedUserGuard />}>
                        <Route path="/liked-collection" element={<Menu type={'liked'} />} />
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
