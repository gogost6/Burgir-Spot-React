import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from 'react-redux';

const AdminGuard = () => {
    const isAdmin = useSelector((state) => state.user.value.isAdmin);
    
    if (isAdmin) {
        return <Outlet/>
    } else {
        return <Navigate to='/not-found' replace />;
    }
}

export default AdminGuard;