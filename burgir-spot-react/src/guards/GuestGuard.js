import { Navigate } from "react-router-dom";
import { useSelector } from 'react-redux';
const GuestGuard = ({ children }) => {
    const user = useSelector((state) => state.user.value)

    if (user._id) {
        return <Navigate to='/' replace />;
    } else {
        return children;
    }
}

export default GuestGuard;