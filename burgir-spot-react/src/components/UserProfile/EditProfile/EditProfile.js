import "./EditProfile.css";
import { useState } from "react";
import { changeValue } from '../../../utils/functions';
import { editHandled } from '../../../services/authService';
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { userAuthentication } from '../../../features/user/userSlice';

const EditProfile = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    let user = useSelector((state) => state.user.value);

    let [userData, setUserData] = useState({
        username: user.username,
        telephone: user.telephone,
        email: user.email
    });
    let [isSubmitted, setIsSubmitted] = useState(false);
    let [usedTelephone, setUsedTelephone] = useState(false);
    let [usedUsername, setUsedUsername] = useState(false);
    let [usedEmail, setUsedEmail] = useState(false);

    const telephoneRegex = new RegExp(/\+359[0-9]{9}/);
    const emailRegex = new RegExp(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);

    const onSubmit = (e) => {
        e.preventDefault();
        setUsedTelephone(false);
        setUsedEmail(false);
        setUsedUsername(false);
        setIsSubmitted(true);

        let formData = new FormData(e.currentTarget);
        let data = Object.fromEntries(formData);

        setUserData(data);

        const oldTelephone = user.telephone;
        const oldUsername = user.username;
        const oldEmail = user.email;

        const oldData = {
            oldTelephone,
            oldUsername,
            oldEmail
        }

        let result = { ...userData, ...oldData };

        editHandled(result)
            .then(res => {
                dispatch(userAuthentication(res));
                navigate('/user');
            })
            .catch(err => {
                console.log(err);

                if (err.msg.includes('Username is taken!')) {
                    setUsedUsername(true);
                }
                if (err.msg.includes('Telephone is used by other user!')) {
                    setUsedTelephone(true);
                }
                if (err.msg.includes('Email is taken!')) {
                    setUsedEmail(true);
                }
            });
    }

    const editForm = (<><form method="POST" className="edit-form" onSubmit={onSubmit} >
        <label htmlFor="email">Email</label>
        <input type="text" name="email" id="email" value={userData.email}
            onChange={(e) => changeValue(e, 'email', setUserData)} />
        {userData.email === '' && isSubmitted ? <p className="p-err">Email should not be empty!</p> : ''}
        {!emailRegex.test(userData.email) && isSubmitted ? <p className="p-alert">Email should be valid!</p> : ''}
        {usedEmail && isSubmitted ? <p className="p-alert">Email is taken!</p> : ''}

        <label htmlFor="username">Username</label>
        <input type="text" name="username" id="username" value={userData.username}
            onChange={(e) => changeValue(e, 'username', setUserData)} />
        {userData.username === '' && isSubmitted ? <p className="p-err">Username should not be empty!</p> : ''}
        {userData.username.length < 5 && isSubmitted ? <p className="p-alert">Username should be atleast 5 chars!</p> : ''}
        {usedUsername && isSubmitted ? <p className="p-alert">Username is taken!</p> : ''}

        <label htmlFor="telephone">Telephone</label>
        <input type="text" name="telephone" id="telephone" value={userData.telephone}
            onChange={(e) => changeValue(e, 'telephone', setUserData)} />
        {userData.telephone === '' && isSubmitted ? <p className="p-err">Telephone should not be empty!</p> : ''}
        {!telephoneRegex.test(userData.telephone) && isSubmitted ? <p className="p-alert">Telephone should be valid Bulgarian number!</p> : ''}
        {usedTelephone && isSubmitted ? <p className="p-alert">Telephone is used by other user!</p> : ''}

        <button className="btn gray">Edit</button>
        <button className="btn burgir-color" style={{ 'margin': '15px 0' }}
            onClick={(e) => {
                e.preventDefault();
                navigate('/user');
            }}>Go back</button>
    </form >
    </>
    );

    return (editForm)
}

export default EditProfile;