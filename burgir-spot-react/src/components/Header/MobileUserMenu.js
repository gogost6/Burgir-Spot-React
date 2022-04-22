import { Link } from 'react-router-dom';
import { logoutHandled } from "../../services/authService";
import { logout } from "../../features/user/userSlice";
import { useAppDispatch, useAppSelector } from '../../app/hooks';

const MobileUserMenu = ({ closeMenu, showMobileUserMenu }) => {
    const dispatch = useAppDispatch();
    const user = useAppSelector(state => state.user.value);

    let logoutBtn = () => {
        logoutHandled().then(res => console.log(res)).catch(err => console.log(err));
        dispatch(logout());
    }

    return <div style={showMobileUserMenu
        ? { display: 'flex' }
        : { display: 'none' }} className="mobile-user-menu">
        {user.isAdmin
            ? <> <li onClick={closeMenu} className="mobile-user-item">
                <Link className="nav-link" to="/create">
                    Create
                </Link>
            </li>
                <li onClick={closeMenu} className="mobile-user-item">
                    <Link className="nav-link" to="/owned">
                        Owned
                    </Link>
                </li> </>
            : ''}

        <li onClick={closeMenu} className="mobile-user-item">
            <Link className="nav-link" to="/liked-collection">
                Liked
            </Link>
        </li>
        <li onClick={closeMenu} className="mobile-user-item">
            <Link className="nav-link" to="/user">
                User Profile
            </Link>
        </li>
        {/* <li className="mobile-user-item">
            <Link className="nav-link" to="/last-orders">
                Last Orders
            </Link>
        </li> */}
        <li onClick={closeMenu} className="mobile-user-item">
            <Link className="nav-link" to="/" onClick={logoutBtn}>
                Logout
            </Link>
        </li>
    </div>
}

export default MobileUserMenu;