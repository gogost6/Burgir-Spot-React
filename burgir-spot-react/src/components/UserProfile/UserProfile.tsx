import "./UserProfile.css";

// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

// import { faFacebook, faTwitter, faLinkedin, faInstagram } from '@fortawesome/free-brands-svg-icons';

import { Link, Outlet } from "react-router-dom";
import { useAppSelector } from "../../app/hooks";

const UserProfile = () => {
    const user = useAppSelector((state) => state.user.value);

    return (
        <div className="user-container">
            <div className="align-user-profile">
                <img src="images/profile-img.jpg" alt="img" className="profile-img" />

                <h1>{user.username}</h1>
                <h2>{user.email}</h2>
                {/* <h1><strong>1000</strong> followers</h1> */}
                <div className="bnt-wrapper-edit-profile">
                    <Link to="edit-profile" className="btn burgir-color">Edit Profile</Link>
                    <Link to="edit-password" className="btn gray">Edit Password</Link>
                </div>
                <p>Hey there, we are glad you use our tasty site.</p>
                {/* <ul className="icons-ul">
                    <li><a target="_blank" rel="noreferrer" href="https://facebook.com"><FontAwesomeIcon icon={faFacebook} /></a></li>
                    <li><a target="_blank" rel="noreferrer" href="https://twitter.com"><FontAwesomeIcon icon={faTwitter} /></a></li>
                    <li><a target="_blank" rel="noreferrer" href="https://linkedin.com"><FontAwesomeIcon icon={faLinkedin} /></a></li>
                    <li><a target="_blank" rel="noreferrer" href="https://instagram.com"><FontAwesomeIcon icon={faInstagram} /></a></li>
                </ul> */}
            </div>
                <Outlet />
        </div>
    )
}

export default UserProfile;