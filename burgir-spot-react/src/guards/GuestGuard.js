import { Navigate } from "react-router-dom";
import AuthContext from "../context/AuthContext";
import { useContext } from "react";

const GuestGuard = ({ children }) => {
    const { user } = useContext(AuthContext);
    if (user._id) {
        return <Navigate to='/' replace />;
    } else {
        return children;
    }
}

export default GuestGuard;