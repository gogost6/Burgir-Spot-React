import "./EditPassword.css";
import { useState } from "react";
import { editPasswordHandled } from '../../../services/authService'
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { userAuthentication } from "../../../features/user/userSlice";

const EditPassword = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const user = useSelector(state => state.user.value);
    //let { user, setUser, setUserState } = useContext(AuthContext);

    let [oldPassword, setOldPassword] = useState('');
    let [newPassword, setNewPassword] = useState('');
    let [isSubmitted, setIsSubmitted] = useState(false);
    // let [oldPasswordErr, setOldPasswordErr] = useState(false);

    const onSubmit = (e) => {
        e.preventDefault();
        setIsSubmitted(true);
        const data = { ...user, oldPassword, newPassword };
        editPasswordHandled(data)
            .then(res => dispatch(userAuthentication(res)))
            .catch(err => console.log(err));
    }

    const goBackBtn = () => {
        navigate('/user');
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
            onClick={goBackBtn}>Go back</button>
    </form >
    </>
    );

    return (editForm)
}

export default EditPassword;