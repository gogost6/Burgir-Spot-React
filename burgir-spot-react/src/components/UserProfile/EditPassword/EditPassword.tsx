import "./EditPassword.css";
import { useState } from "react";
import { editPasswordHandled } from '../../../services/authService'
import { useNavigate } from "react-router-dom";
import { userAuthentication } from "../../../features/user/userSlice";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";

const EditPassword = () => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();

    const user = useAppSelector(state => state.user.value);

    let [oldPassword, setOldPassword] = useState('');
    let [newPassword, setNewPassword] = useState('');
    let [isSubmitted, setIsSubmitted] = useState(false);
    let [oldPasswordErr, setOldPasswordErr] = useState(false);

    const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsSubmitted(true);
        setOldPasswordErr(false);
        const data = { ...user, oldPassword, newPassword };
        editPasswordHandled(data)
            .then((res) => {
                dispatch(userAuthentication(res));
                navigate("/user");
            })
            .catch((err) => {
                if (err.msg.includes("Old password is incorrect!")) {
                    setOldPasswordErr(true);
                }
            });
    };

    const goBackBtn = () => {
        navigate('/user');
    }

    const editForm = (<><form method="POST" className="edit-form" onSubmit={onSubmit} >
        <label htmlFor="oldPassword">Old Password</label>
        <input type="password" name="oldPassword" id="oldPassword" onChange={(e) => setOldPassword(e.target.value)} />
        {oldPassword === '' && isSubmitted ? <p className="p-err">Old password should not be empty!</p> : ''}
        {oldPassword.length < 4 && isSubmitted ? <p className="p-err">Old password should be atleast 4 chars!</p> : ''}
        {oldPasswordErr && isSubmitted ? <p className="p-err">Old password is incorect!</p> : ''}

        <label htmlFor="newPassword">New Password</label>
        <input type="password" name="newPassword" id="newPassword" onChange={(e) => setNewPassword(e.target.value)} />
        <button className="btn gray" style={{ width: '100%' }}>Edit</button>
        <button className="btn burgir-color" style={{ 'margin': '15px 0', width: '100%' }}
            onClick={goBackBtn}>Go back</button>
    </form >
    </>
    );

    return (editForm)
}

export default EditPassword;