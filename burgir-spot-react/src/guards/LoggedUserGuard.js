import { Navigate, useLocation, Outlet } from "react-router-dom";

const LoggedUserGuard = ({ children }) => {
    const location = useLocation();
    const logged = localStorage.getItem('logged');
    
    if (logged !== null) {
        return <Outlet/>
    } else {
        return <Navigate to='/login' replace state={{ path: location.pathname }} />;
    }
}

export default LoggedUserGuard;