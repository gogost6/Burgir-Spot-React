import { Navigate, Outlet } from "react-router-dom";
import { useAppSelector } from "../app/hooks";

const GuestGuard = () => {
    const user = useAppSelector(state => state.user.value)

    if (user.isLogged) {
        return <Navigate to='/' replace />;
    } else {
        return <Outlet />;
    }
}

export default GuestGuard;