import "./EditProfile.css";
import UserContext from '../../../context/UserContext';
import AuthContext from "../../../context/AuthContext";
import { useContext, useState } from "react";
import { changeValue } from '../../../utils/functions';
import { editHandled } from '../../../services/authService';
import { useNavigate } from 'react-router-dom';

const EditProfile = () => {
    let navigate = useNavigate()
    let { setState } = useContext(UserContext);
    let { user, setUser } = useContext(AuthContext);
    let [userData, setUserData] = useState(user);
    let [errors, setErrors] = useState([]);
    // let [state, setState] = useState(false);
    // let [username, setUsername] = useState(user.username);
    // let [email, setEmail] = useState(user.email);
    let [oldPassword, setOldPassword] = useState('');
    let [newPassword, setNewPassword] = useState('');
    // let [telephone, setTelephone] = useState(user.telephone);

    const onSubmit = (e) => {
        e.preventDefault();
        // const formData = new FormData(e.currentTarget);
        // const data = Object.fromEntries(formData);
        const result = Object.assign(userData, { oldTelephone: user.telephone, oldUsername: user.username, oldEmail: user.email, oldPassword, newPassword })
        editHandled(result).then(res =>{setUser(userData); setState(false)}).catch(err => console.log(err));
    }

    const editForm = (<form method="POST" className="edit-form" onSubmit={onSubmit} >
        <label htmlFor="email">Email</label>
        <input type="text" name="email" id="email" value={userData.email} onChange={(e) => changeValue(e, 'email', setUserData)} />
        <label htmlFor="username">Username</label>
        <input type="text" name="username" id="username" value={userData.username} onChange={(e) => changeValue(e, 'username', setUserData)} />
        <label htmlFor="telephone">Telephone</label>
        <input type="text" name="telephone" id="telephone" value={userData.telephone} onChange={(e) => changeValue(e, 'telephone', setUserData)} />
        <label htmlFor="oldPassword">Old Password</label>
        <input type="password" name="oldPassword" id="oldPassword" onChange={(e) => setOldPassword(e.target.value)} />
        <label htmlFor="newPassword">New Password</label>
        <input type="password" name="newPassword" id="newPassword" onChange={(e) => setNewPassword(e.target.value)} />
        <button className="btn gray">Edit</button>
    </form >);

    return (editForm)
}

export default EditProfile;