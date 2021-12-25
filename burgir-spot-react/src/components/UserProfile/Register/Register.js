import "./Register.css";
import { useState, useContext } from "react";
import { Link } from "react-router-dom";
import { registerUser } from '../../../services/authService';
import AuthContext from "../../../context/AuthContext";
import * as utils from '../../../utils/styles';


const Register = () => {
    let { onLogin } = useContext(AuthContext);
    let [isSubmitted, setIsSubmitted] = useState(false);
    let [username, setUsername] = useState('');
    let [email, setEmail] = useState('');
    let [telephone, setTelephone] = useState('');
    let [password, setPassword] = useState('');
    let [repeatPassword, setRepeatPassword] = useState('');
    let [usernameHover, setUsernameHover] = useState(false);
    let [emailHover, setEmailHover] = useState(false);
    let [telephoneHover, setTelephoneHover] = useState(false);
    let [passwordHover, setPasswordHover] = useState(false);
    let [repeatPasswordHover, setRepeatPasswordHover] = useState(false);

    const emailRegex = new RegExp(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
    const telephoneRegex = new RegExp(/\+359[0-9]{9}/);

    const onSubmit = (e) => {
        e.preventDefault();

        let formData = new FormData(e.currentTarget);
        let data = Object.fromEntries(formData);
        registerUser(data)
            .then(res => {
                localStorage.setItem('logged', true);
                onLogin(res);
            })
            .catch(err => {
                setIsSubmitted(true);
            })
    };

    return (
        <div className="container">
            <section className="content-wraper left">
                <div>
                    <h1>You hungry?</h1>
                    <p>Register to start your tasty Burgir adventure!</p>
                </div>
                <form method="POST" className="login-form" onSubmit={onSubmit}>
                    <label htmlFor="email">Email</label>
                    <input type="text" name="email" id="email" placeholder="example@gmail.com"
                        value={email}
                        onChange={(e) => { setEmail(e.target.value) }}
                        onMouseEnter={() => {
                            setEmailHover(true);
                        }}
                        onMouseLeave={() => {
                            setEmailHover(false);
                        }}
                        style={{
                            ...utils.inputBorderStyle.normal,
                            ...(emailHover ? utils.inputBorderStyle.hover : null),
                            ...(email === '' && isSubmitted ? utils.inputBorderStyle.error : null),
                            ...(!emailRegex.test(email) && isSubmitted ? utils.inputBorderStyle.error : null)
                        }} />
                    {email === '' && isSubmitted ? utils.inputErr('email') : ''}
                    {!emailRegex.test(email) && isSubmitted ? utils.inputValidErr('Email') : ''}
                    <label htmlFor="username" style={{'marginTop': '5px'}}>Username</label>
                    <input
                        type="text"
                        name="username"
                        id="username"
                        value={username}
                        placeholder="michael1203"
                        onChange={(e) => { setUsername(e.target.value) }}
                        onMouseEnter={() => {
                            setUsernameHover(true);
                        }}
                        onMouseLeave={() => {
                            setUsernameHover(false);
                        }}
                        style={{
                            ...utils.inputBorderStyle.normal,
                            ...(usernameHover ? utils.inputBorderStyle.hover : null),
                            ...(username === '' && isSubmitted ? utils.inputBorderStyle.error : null),
                            ...(username.length < 5 && isSubmitted ? utils.inputBorderStyle.error : null)
                        }}
                    />
                    {username === '' && isSubmitted ? utils.inputErr('username') : ''}
                    {username.length < 5 && isSubmitted ? utils.inputLengthErr('Username', 5) : ''}
                    {/* {username.length < 5 && isSubmitted ? utils.inputLengthErr('Username', 5) : ''} */}
                    <label htmlFor="telephone" style={{'marginTop': '5px'}}>Telephone</label>
                    <input
                        type="tel"
                        name="telephone"
                        id="telephone"
                        placeholder="+359882233404"
                        value={telephone}
                        onChange={(e) => { setTelephone(e.target.value) }}
                        onMouseEnter={() => {
                            setTelephoneHover(true);
                        }}
                        onMouseLeave={() => {
                            setTelephoneHover(false);
                        }}
                        style={{
                            ...utils.inputBorderStyle.normal,
                            ...(telephoneHover ? utils.inputBorderStyle.hover : null),
                            ...(telephone === '' && isSubmitted ? utils.inputBorderStyle.error : null),
                            ...(!telephoneRegex.test(telephone) && isSubmitted ? utils.inputBorderStyle.error : null)
                        }}
                    />
                    {telephone === '' && isSubmitted ? utils.inputErr('telephone') : ''}
                    {!telephoneRegex.test(telephone) && isSubmitted ? utils.inputValidErr('Telephone') : ''}
                    <label htmlFor="password" style={{'marginTop': '5px'}}>Password</label>
                    <input
                        type="password"
                        name="password"
                        id="password"
                        placeholder="****"
                        value={password}
                        onChange={(e) => { setPassword(e.target.value) }}
                        onMouseEnter={() => {
                            setPasswordHover(true);
                        }}
                        onMouseLeave={() => {
                            setPasswordHover(false);
                        }}
                        style={{
                            ...utils.inputBorderStyle.normal,
                            ...(passwordHover ? utils.inputBorderStyle.hover : null),
                            ...(password === '' && isSubmitted ? utils.inputBorderStyle.error : null),
                            ...(password.length < 4 && isSubmitted ? utils.inputBorderStyle.error : null)
                        }}
                    />
                    {password === '' && isSubmitted ? utils.inputErr('password') : ''}
                    {password.length < 4 && isSubmitted ? utils.inputLengthErr('Password', 4) : ''}
                    <label htmlFor="repassword" style={{'marginTop': '5px'}}>Repeat password</label>
                    <input
                        type="password"
                        name="repassword"
                        id="repassword"
                        placeholder="****"
                        value={repeatPassword}
                        onChange={(e) => { setRepeatPassword(e.target.value) }}
                        onMouseEnter={() => {
                            setRepeatPasswordHover(true);
                        }}
                        onMouseLeave={() => {
                            setRepeatPasswordHover(false);
                        }}
                        style={{
                            ...utils.inputBorderStyle.normal,
                            ...(repeatPasswordHover ? utils.inputBorderStyle.hover : null),
                            ...(repeatPassword === '' && isSubmitted ? utils.inputBorderStyle.error : null),
                            ...(password !== repeatPassword && isSubmitted ? utils.inputBorderStyle.error : null)
                        }}
                    />
                    {repeatPassword === '' && isSubmitted ? utils.inputErr('repeat password') : ''}
                    {password !== repeatPassword && isSubmitted ? <p style={{ 'color': 'red' }}>Password and repeat don't match!</p> : ''}
                    <section className="btn-wraper">
                        <button type="submit" className="btn burgir-color">
                            Register
                        </button>
                        <Link to="/login" className="btn gray">
                            Log in?
                        </Link>
                    </section>
                </form>
            </section>
            <section className="img-wraper right">
                <img src="images/hungry-man.jpg" alt="man-e-ham" />
            </section>
        </div>
    );
};

export default Register;
