import { Navigate } from "react-router-dom";

const GuestGuard = ({ children }) => {
    const logged = localStorage.getItem('logged');

    if (logged !== null) {
        return <Navigate to='/' replace />;
    } else {
        return children;
    }
}

export default GuestGuard;