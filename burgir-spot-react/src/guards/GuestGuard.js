import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from 'react-redux';
const GuestGuard = ({ children }) => {
    const isLogged = useSelector((state) => state.user.value.isLogged);

    if (isLogged) {
        return <Navigate to='/' replace />;
    } else {
        return <Outlet/>;
    }
}

export default GuestGuard;