import "./App.css";
import { Route, Routes } from "react-router-dom";
import { useEffect } from "react";
import Header from "./components/Header/Header";
import Home from "./components/Home/Home";
import Menu from "./components/Menu/Menu";
import Login from "./components/Login/Login";
import Register from "./components/Register/Register";
import { getUser } from "./services/authService";

import AuthContext from './context/AuthContext';
import { useState } from "react";

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

    let value = { onLogin, user };

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
                    </Routes>
                </div>
            </>
        </AuthContext.Provider>
    );
}

export default App;
