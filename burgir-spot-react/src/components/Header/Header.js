import { NavLink } from "react-router-dom";
import "./Header.css";

const Header = () => {
    return (
        <header className="header-container">
            <ul>
                <li className="grow">
                    <NavLink className="nav-link" to="/">
                        Home
                    </NavLink>
                </li>
                <li>
                    <NavLink className="nav-link" to="/menu">
                        Menu
                    </NavLink>
                </li>
                <li>
                    <NavLink className="nav-link" to="/login">
                        Login
                    </NavLink>
                </li>
                <li>
                    <NavLink className="nav-link" to="/register">
                        Register
                    </NavLink>
                </li>
            </ul>
        </header>
    );
};

export default Header;