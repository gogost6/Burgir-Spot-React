import { Navigate, useLocation, Outlet } from "react-router-dom";
import { useSelector } from 'react-redux';

const LoggedUserGuard = () => {
    const user = useSelector((state) => state.user.value)
    const location = useLocation();
    
    if (user.isLogged) {
        return <Outlet/>
    } else {
        return <Navigate to='/login' replace state={{ path: location.pathname }} />;
    }
}

export default LoggedUserGuard;