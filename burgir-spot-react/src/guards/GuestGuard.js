import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from 'react-redux';

const GuestGuard = () => {
    const user = useSelector(state => state.user.value)

    if (user.isLogged) {
        return <Navigate to='/' replace />;
    } else {
        return <Outlet />;
    }
}

export default GuestGuard;