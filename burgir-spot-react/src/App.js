import "./App.css";
import { Route, Routes } from "react-router-dom";
import { useState, useEffect } from "react";

import Header from "./components/Header/Header";
import Home from "./components/Home/Home";
import Menu from "./components/Menu/Menu";
import Login from "./components/Login/Login";
import Register from "./components/Register/Register";
import Create from "./components/Burgir/Create/Create";
import Details from "./components/Details/Details";
import Edit from "./components/Burgir/Edit/Edit";
import UserProfile from "./components/UserProfile/UserProfile";
import EditProfile from "./components/UserProfile/Edit/EditProfile";

import { getUser } from "./services/authService";

import AuthContext from './context/AuthContext';

function App() {
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
    };

    let value = { onLogin, user, setUser};

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
                        <Route path="/login" element={<Login />} />
                        <Route path="/register" element={<Register />} />
                        <Route path="/create" element={<Create />} />
                        <Route path="/details/:id" element={<Details />} />
                        <Route path="/edit/:id" element={<Edit />} />
                        <Route path="/user" element={<UserProfile />}>
                            <Route path="edit" element={<EditProfile />}/>
                        </Route>
                    </Routes>
                </div>
            </>
        </AuthContext.Provider>
    );
}

export default App;
