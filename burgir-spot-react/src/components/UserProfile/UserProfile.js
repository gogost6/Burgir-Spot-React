import "./UserProfile.css";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook, faTwitter, faLinkedin, faInstagram } from '@fortawesome/free-brands-svg-icons';

import { Link, Outlet, useNavigate } from "react-router-dom";
import AuthContext from '../../context/AuthContext';
import UserContext from '../../context/UserContext';
import { useContext, useState } from "react";

const UserProfile = () => {
    let { user } = useContext(AuthContext);
    let [state, setState] = useState(false);


    let navigate = useNavigate();
    const onClick = (e) => {
        e.preventDefault();
        setState(true);
        navigate('edit');
    }
    console.log('state from userProfile ' + state);
    return (
        <UserContext.Provider value={{setState: setState}}>
            <div className="user-container">
                <div className="w">
                    <img src="images/profile-img.jpg" alt="img" className="profile-img" />
                    {state ? <Outlet /> : (<><h1>{user.username}</h1>
                        <h2>{user.email}</h2>
                        <h1><strong>1000</strong> followers</h1>
                        <div className="bnt-wrapper-edit-profile">
                            <Link to="edit" className="btn burgir-color" onClick={onClick}>Edit Profile</Link>
                            {/* <Link to="/created-burgirs" className="btn gray">Created Burgirs</Link> */}
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
        </UserContext.Provider>
    )
}

export default UserProfile;