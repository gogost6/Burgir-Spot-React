import "./EditPassword.css";
import UserContext from '../../../context/UserContext';
import AuthContext from "../../../context/AuthContext";
import { useContext, useState } from "react";
import { editPasswordHandled } from '../../../services/authService'

const EditPassword = () => {
    let { user, setUser, setUserState } = useContext(AuthContext);

    let [userData, setUserData] = useState(user);
    let [errors, setErrors] = useState([]);
    let [oldPassword, setOldPassword] = useState('');
    let [newPassword, setNewPassword] = useState('');

    const onSubmit = (e) => {
        e.preventDefault();

        const data = { ...user, oldPassword, newPassword };
        editPasswordHandled(data).then(res => { setUser(userData); setUserState(false) })
            .catch(err => setErrors(err.msg));
    }

    const editForm = (<><form method="POST" className="edit-form" onSubmit={onSubmit} >
        <label htmlFor="oldPassword">Old Password</label>
        <input type="password" name="oldPassword" id="oldPassword" onChange={(e) => setOldPassword(e.target.value)} />
        <label htmlFor="newPassword">New Password</label>
        <input type="password" name="newPassword" id="newPassword" onChange={(e) => setNewPassword(e.target.value)} />
        <button className="btn gray">Edit</button>
    </form >
        {errors
            ? <div className='errors-wraper'>
                <ul style={{'listStyleType': 'none'}}>
                    {errors.map(x => <li className="p-err" key={Math.random()}>{x}</li>)}
                </ul>
            </div>
            : ''}
    </>
    );

    return (editForm)
}

export default EditPassword;