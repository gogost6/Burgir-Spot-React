import { Link, useNavigate } from "react-router-dom";
import "./Header.css";
import AuthContext from "../../context/AuthContext";
import { useContext } from "react";
import { logoutHandled } from "../../services/authService";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';

const Header = () => {
    let { user, setUser, setUserState } = useContext(AuthContext);
    let navigate = useNavigate();

    let logout = (e) => {
        e.preventDefault();
        setUser([]);
        localStorage.removeItem('logged');
        logoutHandled().then(res => navigate('/')).catch(err => console.log(err));
    }

    return (
        <header className="header-container">
            {user._id ? <>
                <ul>
                    <li className="grow">
                        <Link className="nav-link" to="/">
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
                        <Link className="nav-link" to="/menu">
                            Menu
                        </Link>
                    </li>
                    <li>
                        <Link className="nav-link" to="/create">
                            Create
                        </Link>
                    </li>
                    <li>
                        <Link onClick={() => setUserState(false)} className="nav-link" to="/user">
                            User
                        </Link>
                    </li>
                    <li>
                        <Link className="nav-link" to="/" onClick={logout}>
                            Logout
                        </Link>
                    </li>
                </ul>
            </> : <ul>
                <li className="grow">
                    <Link className="nav-link" to="/">
                        Home
                    </Link>
                </li>
                <li>
                    <Link className="nav-link" to="/menu">
                        Menu
                    </Link>
                </li>
                <li>
                    <Link className="nav-link" to="/login">
                        Login
                    </Link>
                </li>
                <li>
                    <Link className="nav-link" to="/register">
                        Register
                    </Link>
                </li>
            </ul>
            }
        </header>
    );
};

export default Header;