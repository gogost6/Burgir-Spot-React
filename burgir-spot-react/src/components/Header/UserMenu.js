import { useDispatch } from 'react-redux';
import { Link, useLocation } from 'react-router-dom';
import { logoutHandled } from "../../services/authService";
import { logout } from "../../features/user/userSlice";

const UserMenu = ({ showUserMenu, setShowUserMenu }) => {
    const dispatch = useDispatch();

    let logoutBtn = () => {
        logoutHandled().then(res => console.log(res)).catch(err => console.log(err));
        dispatch(logout());
    }

    return <div className="user-menu"
        onMouseEnter={() => setShowUserMenu(true)}
        onMouseLeave={() => setShowUserMenu(false)}
        style={showUserMenu ? { display: 'flex' } : { display: 'none' }}>
        <li className="user-menu-item">
            <Link className="nav-link" to="/create">
                Create
            </Link>
        </li>
        <li className="user-menu-item">
            <Link className="nav-link" to="/owned">
                Owned
            </Link>
        </li>
        <li className="user-menu-item">
            <Link className="nav-link" to="/favourite">
                Favourite
            </Link>
        </li>
        <li className="user-menu-item">
            <Link className="nav-link" to="/last-orders">
                Last Orders
            </Link>
        </li>
        <li>
            <Link className="nav-link" to="/" onClick={logoutBtn}>
                Logout
            </Link>
        </li>
    </div>
}

export default UserMenu;