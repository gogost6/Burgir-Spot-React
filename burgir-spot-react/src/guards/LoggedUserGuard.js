import { Navigate, useLocation, Outlet } from "react-router-dom";
import { useSelector } from 'react-redux';

const LoggedUserGuard = () => {
    const isLogged = useSelector((state) => state.user.value.isLogged);
    const location = useLocation();
    
    if (isLogged) {
        return <Outlet/>
    } else {
        return <Navigate to='/login' replace state={{ path: location.pathname }} />;
    }
}

export default LoggedUserGuard;