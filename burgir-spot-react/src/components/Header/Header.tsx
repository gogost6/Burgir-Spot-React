import "./Header.css";
import OrderDetails from "./OrderDetails";
import UserMenu from "./UserMenu";
import { Link, useLocation } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart, faArrowAltCircleDown, faArrowCircleUp } from '@fortawesome/free-solid-svg-icons';
import { useState, useEffect } from "react";
import MobileUserMenu from "./MobileUserMenu";
import { useAppSelector } from "../../app/hooks";

const Header = () => {
    const user = useAppSelector((state) => state.user.value);
    const order = useAppSelector((state) => state.order.value);
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

    const active = (name: string) => location.pathname === name
        ? { color: 'white', background: '#FFCC00', borderRadius: '13px' }
        : {};

    const mobileMenuBtn = (
        e: React.MouseEvent<HTMLButtonElement, MouseEvent>
    ) => {
        e.preventDefault();

        if (showMobileUserMenu) {
            setShowMobileUserMenu(false);
        } else {
            setShowMobileUserMenu(true);
        }
    };

    const closeMenu = (e: React.MouseEvent<HTMLLIElement, MouseEvent>) => {
        e.preventDefault();
        setShowMobileUserMenu(false);
    };

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
                        <Link className="nav-link order" style={active('/order')} to="/order"
                            onMouseEnter={() => {
                                if (width > 768) {
                                    setShowDivState(true)
                                }
                            }}
                            onMouseLeave={() => {
                                if (width > 768) {
                                    setShowDivState(false)
                                }
                            }}
                        >
                            <FontAwesomeIcon icon={faShoppingCart} />
                            {order.quantity}
                        </Link>
                        <OrderDetails width={width} order={order} showDivState={showDivState} setShowDivState={setShowDivState} />
                    </li>
                    <li onClick={closeMenu}>
                        <Link className="nav-link" style={active('/menu')} to="/menu">
                            Menu
                        </Link>
                    </li>
                    {user._id ? <>
                        <li style={{ textAlign: 'center' }}>
                            {width > 768
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
            {width <= 768 ? <MobileUserMenu closeMenu={closeMenu} showMobileUserMenu={showMobileUserMenu} /> : ''}
        </>
    );
};

export default Header;