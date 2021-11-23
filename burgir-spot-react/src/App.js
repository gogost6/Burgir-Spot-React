import "./App.css";
import { Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import Home from "./components/Home";
import Menu from "./components/Menu";
import Login from "./components/Login";
import Register from "./components/Register";

function App() {
    return (
        <>
            <Header />
            <div className="router">
                <Routes>
                    <Route path="/" exact element={<Home/>} />
                    <Route path="/menu" element={<Menu/>} />
                    <Route path="/login" element={<Login/>} />
                    <Route path="/register" element={<Register/>} />
                </Routes>
            </div>
        </>
    );
}

export default App;
