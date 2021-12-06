import "./App.css";
import { Route, Routes } from "react-router-dom";
import Header from "./components/Header/Header";
import Home from "./components/Home/Home";
import Menu from "./components/Menu/Menu";
import Login from "./components/Login/Login";
import Register from "./components/Register/Register";

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

    return (
        <AuthContext.Provider value={onLogin}>
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
