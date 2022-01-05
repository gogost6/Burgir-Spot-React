import "./Header.css";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { logoutHandled } from "../../services/authService";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../features/user/userSlice";

const Header = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const dispatch = useDispatch();
    const user = useSelector((state) => state.user.value);
    
    const active = (name) => location.pathname == name
        ? { background: 'linear-gradient(90deg, rgba(88,88,88,1) 0%, rgba(219,143,143,1) 59%, rgb(45, 189, 221) 100%)' }
        : {};

    let logoutBtn = () => {
        dispatch(logout())
        logoutHandled().then(res => navigate('/')).catch(err => console.log(err));
    }

    return (
        <header className="header-container">
            {user._id ? <>
                <ul>
                    <li className="grow">
                        <Link className="nav-link" style={active('/')} to="/">
                            Home
                        </Link>
                    </li>
                    {/* <li>
                        <Link className="nav-link" to="/order">
                            <FontAwesomeIcon icon={faShoppingCart} />
                            1
                        </Link>
                    </li> */}
                    <li>
                        <Link className="nav-link" style={active('/menu')} to="/menu">
                            Menu
                        </Link>
                    </li>
                    <li>
                        <Link className="nav-link" style={active('/create')} to="/create">
                            Create
                        </Link>
                    </li>
                    <li>
                        <Link className="nav-link" style={active('/user')} to="/user">
                            User
                        </Link>
                    </li>
                    <li>
                        <Link className="nav-link" to="/" onClick={logoutBtn}>
                            Logout
                        </Link>
                    </li>
                </ul>
            </> : <ul>
                <li className="grow">
                    <Link className="nav-link" style={active('/')} to="/">
                        Home
                    </Link>
                </li>
                <li>
                    <Link className="nav-link" style={active('/menu')} to="/menu">
                        Menu
                    </Link>
                </li>
                <li>
                    <Link className="nav-link" style={active('/login')} to="/login">
                        Login
                    </Link>
                </li>
                <li>
                    <Link className="nav-link" style={active('/register')} to="/register">
                        Register
                    </Link>
                </li>
            </ul>
            }
        </header>
    );
};

export default Header;