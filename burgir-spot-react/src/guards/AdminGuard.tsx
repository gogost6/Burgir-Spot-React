import { Navigate, Outlet } from "react-router-dom";
import { useAppSelector } from "../app/hooks";

const AdminGuard = () => {
    const user = useAppSelector(state => state.user.value)

    if (user.isAdmin) {
        return <Outlet/>
    } else {
        return <Navigate to='/not-found' replace />;
    }
}

export default AdminGuard;