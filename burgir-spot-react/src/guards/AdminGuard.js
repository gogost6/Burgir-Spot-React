import { Navigate, Outlet } from "react-router-dom";
import { useDispatch } from 'react-redux';
import { getUser } from '../features/user/userSlice';

const AdminGuard = () => {
    const dispatch = useDispatch();
    const user = dispatch(getUser());

    if (user.payload.isAdmin) {
        return <Outlet/>
    } else {
        return <Navigate to='/not-found' replace />;
    }
}

export default AdminGuard;