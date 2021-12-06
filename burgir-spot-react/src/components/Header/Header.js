import { Link } from "react-router-dom";
import "./Header.css";
import * as authService from "../../services/authService";

const Header = () => {
    return (
        <header className="header-container">
            {authService.getUser() ? <>
                <ul>
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
                    <Link className="nav-link" to="/user">
                        User
                    </Link>
                </li>
                <li>
                    {/* <Link className="nav-link" to="/logout">
                        Logout
                    </Link> */}
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