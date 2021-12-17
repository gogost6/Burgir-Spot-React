import "./UserProfile.css";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { faFacebook, faTwitter, faLinkedin, faInstagram } from '@fortawesome/free-brands-svg-icons';

import { Link, Outlet, useNavigate } from "react-router-dom";
import AuthContext from '../../context/AuthContext';
import UserContext from '../../context/UserContext';
import { useContext, useState } from "react";

const UserProfile = () => {
    let { user, userState, setUserState } = useContext(AuthContext);
    let navigate = useNavigate();

    const onClick = (e) => {
        e.preventDefault();
        setUserState(true);
        e.target.pathname === "/user/edit-profile"
            ? navigate('edit-profile')
            : navigate('edit-password');
    }

    return (
        <div className="user-container">
            <div className="w">
                <img src="images/profile-img.jpg" alt="img" className="profile-img" />
                {userState ? <Outlet /> : (<><h1>{user.username}</h1>
                    <h2>{user.email}</h2>
                    <h1><strong>1000</strong> followers</h1>
                    <div className="bnt-wrapper-edit-profile">
                        <Link to="edit-profile" className="btn burgir-color" onClick={onClick}>Edit Profile</Link>
                        <Link to="edit-password" className="btn gray" onClick={onClick}>Edit Password</Link>
                    </div>
                    <p>Hey there, we are glad you use our tasty site.</p>
                    <ul className="icons-ul">
                        <li><a target="_blank" rel="noreferrer" href="https://facebook.com"><FontAwesomeIcon icon={faFacebook} /></a></li>
                        <li><a target="_blank" rel="noreferrer" href="https://twitter.com"><FontAwesomeIcon icon={faTwitter} /></a></li>
                        <li><a target="_blank" rel="noreferrer" href="https://linkedin.com"><FontAwesomeIcon icon={faLinkedin} /></a></li>
                        <li><a target="_blank" rel="noreferrer" href="https://instagram.com"><FontAwesomeIcon icon={faInstagram} /></a></li>
                    </ul></>)}
            </div>
        </div>
    )
}

export default UserProfile;