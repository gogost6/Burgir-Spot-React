import "./EditProfile.css";
import UserContext from '../../../context/UserContext';
import AuthContext from "../../../context/AuthContext";
import { useContext, useState } from "react";
import { changeValue } from '../../../utils/functions';
import { editHandled } from '../../../services/authService';
import { useNavigate } from 'react-router-dom';

const EditProfile = () => {
    let { setState } = useContext(UserContext);
    let { user, setUser } = useContext(AuthContext);

    let [userData, setUserData] = useState(user);
    let [errors, setErrors] = useState([]);

    const onSubmit = (e) => {
        e.preventDefault();

        const result = Object.assign(userData,
            {
                oldTelephone: user.telephone,
                oldUsername: user.username,
                oldEmail: user.email
            });
            console.log(result);
        editHandled(result).then(res => { setUser(userData); setState(false) })
            .catch(err => setErrors(err.msg));
    }

    const editForm = (<><form method="POST" className="edit-form" onSubmit={onSubmit} >
        <label htmlFor="email">Email</label>
        <input type="text" name="email" id="email" value={userData.email} onChange={(e) => changeValue(e, 'email', setUserData)} />
        <label htmlFor="username">Username</label>
        <input type="text" name="username" id="username" value={userData.username} onChange={(e) => changeValue(e, 'username', setUserData)} />
        <label htmlFor="telephone">Telephone</label>
        <input type="text" name="telephone" id="telephone" value={userData.telephone} onChange={(e) => changeValue(e, 'telephone', setUserData)} />
        <button className="btn gray">Edit</button>
    </form >
        {errors
            ? <div className='errors-wraper'>
                <ul>
                    {errors.map(x => <li>{x}</li>)}
                </ul>
            </div>
            : ''}
    </>
    );

    return (editForm)
}

export default EditProfile;