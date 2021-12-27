import "./EditPassword.css";
import UserContext from '../../../context/UserContext';
import AuthContext from "../../../context/AuthContext";
import { useContext, useState } from "react";
import { editPasswordHandled } from '../../../services/authService'
import { useNavigate } from "react-router-dom";

const EditPassword = () => {
    const navigate = useNavigate();
    let { user, setUser, setUserState } = useContext(AuthContext);

    let [userData, setUserData] = useState(user);
    let [oldPassword, setOldPassword] = useState('');
    let [newPassword, setNewPassword] = useState('');
    let [isSubmitted, setIsSubmitted] = useState(false);
    let [oldPasswordErr, setOldPasswordErr] = useState(false);

    const onSubmit = (e) => {
        e.preventDefault();
        setIsSubmitted(true);
        const data = { ...user, oldPassword, newPassword };
        editPasswordHandled(data)
            .then(res => { setUser(userData); setUserState(false) })
            .catch(err => console.log(err));
    }

    const editForm = (<><form method="POST" className="edit-form" onSubmit={onSubmit} >
        <label htmlFor="oldPassword">Old Password</label>
        <input type="password" name="oldPassword" id="oldPassword" onChange={(e) => setOldPassword(e.target.value)} />
        {oldPassword === '' && isSubmitted ? <p className="p-err">Old password should not be empty!</p> : ''}
        {oldPassword.length < 4 && isSubmitted ? <p className="p-err">Old password should be atleast 4 chars!</p> : ''}
        <label htmlFor="newPassword">New Password</label>
        <input type="password" name="newPassword" id="newPassword" onChange={(e) => setNewPassword(e.target.value)} />
        {oldPassword !== newPassword && isSubmitted ? <p className="p-err">Passwords don't match!</p> : ''}
        <button className="btn gray">Edit</button>
        <button className="btn burgir-color" style={{ 'margin': '15px 0' }}
            onClick={(e) => { e.preventDefault(); navigate(-1); setUserState(false)}}>Go back</button>
    </form >
    </>
    );

    return (editForm)
}

export default EditPassword;