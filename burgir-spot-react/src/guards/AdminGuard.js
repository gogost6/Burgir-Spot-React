import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from 'react-redux';

const AdminGuard = () => {
    const user = useSelector(state => state.user.value)

    if (user.isAdmin) {
        return <Outlet/>
    } else {
        return <Navigate to='/not-found' replace />;
    }
}

export default AdminGuard;