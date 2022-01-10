import "./Header.css";
import OrderDetails from "./OrderDetails/OrderDetails";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { logoutHandled } from "../../services/authService";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../features/user/userSlice";
import { useState } from "react";

const Header = () => {
    const location = useLocation();
    const dispatch = useDispatch();
    const user = useSelector((state) => state.user.value);
    const order = useSelector((state) => state.order.value);

    const [showDivState, setShowDivState] = useState(false);

    const active = (name) => location.pathname === name
        ? { color: 'white', background: '#FFCC00', borderRadius: '13px' }
        : {};

    let logoutBtn = () => {
        logoutHandled().then(res => console.log(res)).catch(err => console.log(err));
        dispatch(logout());
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
                    <li>
                        <Link className="nav-link" style={active('/order')} to="/order">
                            <FontAwesomeIcon icon={faShoppingCart} />
                            {order.quantity}
                        </Link>
                    </li>
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
                    <Link onMouseEnter={() => setShowDivState(true)}
                        onMouseLeave={() => setShowDivState(false)}
                        className="nav-link" style={active('/order')} to="/order">
                        <FontAwesomeIcon icon={faShoppingCart} />
                        {order.quantity}
                    </Link>
                    <OrderDetails order={order} showDivState={showDivState} setShowDivState={setShowDivState}/>
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
        </header >
    );
};

export default Header;