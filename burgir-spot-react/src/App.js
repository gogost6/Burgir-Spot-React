import "./App.css";
import { Route, Routes, useLocation, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

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

import { getUser } from "./services/authService";

import AuthContext from './context/AuthContext';

import LoggedUserGuard from "./guards/LoggedUserGuard";
import GuestGuard from './guards/GuestGuard';

function App() {
    let navigate = useNavigate();
    const { state } = useLocation();
    let [user, setUser] = useState({
        _id: "",
        email: "",
        username: "",
        createdBurgirs: [],
        favouriteBurgirs: [],
        likedBurgirs: [],
        telephone: ""
    });

    let onLogin = (userData) => {
        setUser(userData);
        navigate(state?.path || '/');
    };

    let value = { onLogin, user, setUser };
    useEffect(() => {
        getUser()
            .then(response => {
                setUser(response);
            })
            .catch((err) => {
                console.log(err);
            })
    }, [])

    return (
        <AuthContext.Provider value={value}>
            <>
                <Header />
                <div className="router">
                    <Routes>
                        <Route path="/" exact element={<Home />} />
                        <Route path="/menu" element={<Menu />} />
                        <Route path="/login" element={<GuestGuard><Login /></GuestGuard>} />
                        <Route path="/register" element={<GuestGuard><Register /></GuestGuard>} />
                        <Route path="/details/:id" element={<Details />} />
                        <Route path="/create" element={<LoggedUserGuard>
                            <Create />
                        </LoggedUserGuard>} />
                        <Route path="/edit/:id" element={<Edit />} />
                        <Route path="/user" element={<LoggedUserGuard><UserProfile /></LoggedUserGuard>}>
                            <Route path="edit-profile" element={<LoggedUserGuard>
                                <EditProfile />
                            </LoggedUserGuard>} />
                            <Route path="edit-password" element={<LoggedUserGuard>
                                <EditPassword />
                            </LoggedUserGuard>} />
                        </Route>
                        <Route path="*" element={<NotFound />} />
                    </Routes>
                </div>
            </>
        </AuthContext.Provider>
    );
}

export default App;
