import { Navigate, useLocation, Outlet } from "react-router-dom";
import { useDispatch } from 'react-redux';
import { getUser } from '../features/user/userSlice';

const LoggedUserGuard = () => {
    const dispatch = useDispatch();
    const user = dispatch(getUser());
    const location = useLocation();
    
    if (user.payload.isLogged) {
        return <Outlet/>
    } else {
        return <Navigate to='/login' replace state={{ path: location.pathname }} />;
    }
}

export default LoggedUserGuard;