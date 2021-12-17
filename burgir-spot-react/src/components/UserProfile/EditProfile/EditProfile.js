import "./EditProfile.css";
import AuthContext from "../../../context/AuthContext";
import { useContext, useState } from "react";
import { changeValue } from '../../../utils/functions';
import { editHandled } from '../../../services/authService';

const EditProfile = () => {
    let { user, setUser, setUserState } = useContext(AuthContext);

    let [userData, setUserData] = useState(user);
    let [isSubmitted, setIsSubmitted] = useState(false);

    const telephoneRegex = new RegExp(/\+359[0-9]{9}/);
    const emailRegex = new RegExp(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);

    const onSubmit = (e) => {
        e.preventDefault();

        const result = Object.assign(userData,
            {
                oldTelephone: user.telephone,
                oldUsername: user.username,
                oldEmail: user.email
            });
        console.log(result);
        editHandled(result).then(res => { setUser(userData); setUserState(false) })
            .catch(err => setIsSubmitted(true));
    }

    const editForm = (<><form method="POST" className="edit-form" onSubmit={onSubmit} >
        <label htmlFor="email">Email</label>
        <input type="text" name="email" id="email" value={userData.email} onChange={(e) => changeValue(e, 'email', setUserData)} />
        {userData.email === '' && isSubmitted ? <p className="p-err">Email should not be empty!</p> : ''}
        {!emailRegex.test(userData.email) && isSubmitted ? <p className="p-alert">Email should be valid!</p> : ''}
        <label htmlFor="username">Username</label>
        <input type="text" name="username" id="username" value={userData.username} onChange={(e) => changeValue(e, 'username', setUserData)} />
        {userData.username === '' && isSubmitted ? <p className="p-err">Username should not be empty!</p> : ''}
        {userData.username.length < 5 && isSubmitted ? <p className="p-alert">Username should be atleast 5 chars!</p> : ''}
        <label htmlFor="telephone">Telephone</label>
        <input type="text" name="telephone" id="telephone" value={userData.telephone} onChange={(e) => changeValue(e, 'telephone', setUserData)} />
        {userData.telephone === '' && isSubmitted ? <p className="p-err">Telephone should not be empty!</p> : ''}
        {!telephoneRegex.test(userData.telephone) && isSubmitted ? <p className="p-alert">Telephone should be valid Bulgarian number!</p> : ''}
        <button className="btn gray">Edit</button>
    </form >
    </>
    );

    return (editForm)
}

export default EditProfile;