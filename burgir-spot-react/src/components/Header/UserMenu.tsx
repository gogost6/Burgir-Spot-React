import { Link } from "react-router-dom";
import { logoutHandled } from "../../services/authService";
import { logout } from "../../features/user/userSlice";
import { useAppDispatch, useAppSelector } from "../../app/hooks";

interface PropsType {
    showUserMenu: boolean;
    setShowUserMenu: React.Dispatch<React.SetStateAction<boolean>>;
}

const UserMenu = (props: PropsType) => {
    const dispatch = useAppDispatch();
    const user = useAppSelector((state) => state.user.value);

    let logoutBtn = () => {
        logoutHandled()
            .then((res) => console.log(res))
            .catch((err) => console.log(err));
        dispatch(logout());
    };

    return (
        <div
            className="user-menu"
            onMouseEnter={() => props.setShowUserMenu(true)}
            onMouseLeave={() => props.setShowUserMenu(false)}
            style={
                props.showUserMenu ? { display: "flex" } : { display: "none" }
            }
        >
            {user.isAdmin ? (
                <>
                    {" "}
                    <li className="user-menu-item">
                        <Link className="nav-link" to="/create">
                            Create
                        </Link>
                    </li>
                    <li className="user-menu-item">
                        <Link className="nav-link" to="/owned">
                            Owned
                        </Link>
                    </li>{" "}
                </>
            ) : (
                ""
            )}

            <li className="user-menu-item">
                <Link className="nav-link" to="/liked-collection">
                    Liked
                </Link>
            </li>
            {/* <li className="user-menu-item">
            <Link className="nav-link" to="/last-orders">
                Last Orders
            </Link>
        </li> */}
            <li>
                <Link className="nav-link" to="/" onClick={logoutBtn}>
                    Logout
                </Link>
            </li>
        </div>
    );
};

export default UserMenu;
