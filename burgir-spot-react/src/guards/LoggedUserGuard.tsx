import { Navigate, useLocation, Outlet } from "react-router-dom";
import { useAppSelector } from "../app/hooks";

const LoggedUserGuard = () => {
    const user = useAppSelector(state => state.user.value)
    const location = useLocation();
    
    if (user.isLogged) {
        return <Outlet/>
    } else {
        return <Navigate to='/login' replace state={{ path: location.pathname }} />;
    }
}

export default LoggedUserGuard;