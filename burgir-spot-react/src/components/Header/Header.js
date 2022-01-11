import "./Header.css";
import OrderDetails from "./OrderDetails";
import UserMenu from "./UserMenu";
import { Link, useLocation } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import { useSelector } from "react-redux";
import { useState } from "react";

const Header = () => {
    const user = useSelector((state) => state.user.value);
    const order = useSelector((state) => state.order.value);
    const location = useLocation();

    const [showDivState, setShowDivState] = useState(false);
    const [showUserMenu, setShowUserMenu] = useState(false);

    const active = (name) => location.pathname === name
        ? { color: 'white', background: '#FFCC00', borderRadius: '13px' }
        : {};

    return (
        <header className="header-container">

            <ul>
                <li className="grow">
                    <Link className="nav-link" style={active('/')} to="/">
                        Home
                    </Link>
                </li>
                <li>
                    <Link className="nav-link" style={active('/order')} to="/order"
                        onMouseEnter={() => setShowDivState(true)}
                        onMouseLeave={() => setShowDivState(false)}
                    >
                        <FontAwesomeIcon icon={faShoppingCart} />
                        {order.quantity}
                    </Link>
                    <OrderDetails order={order} showDivState={showDivState} setShowDivState={setShowDivState} />
                </li>
                <li>
                    <Link className="nav-link" style={active('/menu')} to="/menu">
                        Menu
                    </Link>
                </li>
                {user._id ? <>
                    <li>
                        <Link
                            onMouseEnter={() => setShowUserMenu(true)}
                            onMouseLeave={() => setShowUserMenu(false)}
                            className="nav-link" style={active('/user')} to="/user">
                            User
                        </Link>
                    </li>
                    <UserMenu showUserMenu={showUserMenu} setShowUserMenu={setShowUserMenu} />
                </>
                    : <>
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
                    </>
                }
            </ul>
        </header >
    );
};

export default Header;