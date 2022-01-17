import "./Header.css";
import OrderDetails from "./OrderDetails";
import UserMenu from "./UserMenu";
import { Link, useLocation } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart, faArrowAltCircleDown, faArrowCircleUp } from '@fortawesome/free-solid-svg-icons';
import { useSelector } from "react-redux";
import { useState, useEffect } from "react";
import MobileUserMenu from "./MobileUserMenu";

const Header = () => {
    const user = useSelector((state) => state.user.value);
    const order = useSelector((state) => state.order.value);
    const location = useLocation();
    const [width, setWindowWidth] = useState(0);

    useEffect(() => {
        updateDimensions();

        window.addEventListener('resize', updateDimensions);
        return () => window.removeEventListener('resize', updateDimensions);
    }, [width]);

    const updateDimensions = () => {
        const width = window.innerWidth;
        setWindowWidth(width);
    }

    const [showDivState, setShowDivState] = useState(false);
    const [showUserMenu, setShowUserMenu] = useState(false);
    const [showMobileUserMenu, setShowMobileUserMenu] = useState(false);

    const active = (name) => location.pathname === name
        ? { color: 'white', background: '#FFCC00', borderRadius: '13px' }
        : {};

    const mobileMenuBtn = (e) => {
        e.preventDefault();

        if (showMobileUserMenu) {
            setShowMobileUserMenu(false);
        } else {
            setShowMobileUserMenu(true);
        }
    }

    const closeMenu = (e) => {
        e.preventDefault();
        setShowMobileUserMenu(false);
    }

    return (
        <>
            <header className="header-container">

                <ul>
                    <li onClick={closeMenu} className="grow">
                        <Link className="nav-link" style={active('/')} to="/">
                            Home
                        </Link>
                    </li>
                    <li onClick={closeMenu}>
                        <Link className="nav-link" style={active('/order')} to="/order"
                            onMouseEnter={() => setShowDivState(true)}
                            onMouseLeave={() => setShowDivState(false)}
                        >
                            <FontAwesomeIcon icon={faShoppingCart} />
                            {order.quantity}
                        </Link>
                        <OrderDetails order={order} showDivState={showDivState} setShowDivState={setShowDivState} />
                    </li>
                    <li onClick={closeMenu}>
                        <Link className="nav-link" style={active('/menu')} to="/menu">
                            Menu
                        </Link>
                    </li>
                    {user._id ? <>
                        <li>
                            {width > 500
                                ? <Link
                                    onMouseEnter={() => setShowUserMenu(true)}
                                    onMouseLeave={() => setShowUserMenu(false)}
                                    className="nav-link" style={active('/user')} to="/user">
                                    User
                                </Link>
                                : <button className="mobile-btn"
                                    onClick={mobileMenuBtn}>
                                    {showMobileUserMenu ?
                                        <FontAwesomeIcon style={{ fontSize: '20px' }} icon={faArrowCircleUp} />
                                        : <FontAwesomeIcon style={{ fontSize: '20px' }} icon={faArrowAltCircleDown} />
                                    }
                                </button>}

                        </li>
                        <UserMenu showUserMenu={showUserMenu} setShowUserMenu={setShowUserMenu} />
                    </>
                        : <>
                            <li onClick={closeMenu}>
                                <Link className="nav-link" style={active('/login')} to="/login">
                                    Login
                                </Link>
                            </li>
                            <li onClick={closeMenu} className="register-class">
                                <Link className="nav-link" style={active('/register')} to="/register">
                                    Register
                                </Link>
                            </li>
                        </>
                    }
                </ul>
            </header >
            <MobileUserMenu closeMenu={closeMenu} showMobileUserMenu={showMobileUserMenu} width={width} />
        </>

    );
};

export default Header;