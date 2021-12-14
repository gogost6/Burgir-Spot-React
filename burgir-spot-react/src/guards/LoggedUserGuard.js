import { Navigate, useLocation } from "react-router-dom";
import AuthContext from "../context/AuthContext";
import { useContext } from "react";

const LoggedUserGuard = ({ children }) => {
    const location = useLocation();
    const { user } = useContext(AuthContext);

    if (user._id) {
        return children;
    } else {
        return <Navigate to='/login' replace state={{ path: location.pathname }} />;
    }
}

export default LoggedUserGuard;