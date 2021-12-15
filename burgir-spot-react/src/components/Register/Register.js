import "./Register.css";
import { useState, useContext } from "react";
import { Link } from "react-router-dom";
import { registerUser } from '../../services/authService';
import AuthContext from "../../context/AuthContext";

const Register = () => {
    let { onLogin } = useContext(AuthContext);
    let [isSubmitted, setIsSubmitted] = useState(false);
    let [errors, setErrors] = useState([]);
    let [username, setUsername] = useState('');
    let [email, setEmail] = useState('');
    let [telephone, setTelephone] = useState('');
    let [password, setPassword] = useState('');
    let [repeatPassword, setRepeatPassword] = useState('');
    const emailRegex = new RegExp(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
    const telephoneRegex = new RegExp(/\+359[0-9]{9}/);

    const onSubmit = (e) => {
        e.preventDefault();

        let formData = new FormData(e.currentTarget);
        let data = Object.fromEntries(formData);
        registerUser(data)
            .then(res => {
                onLogin(res);
            })
            .catch(err => {
                setIsSubmitted(true);
                setErrors(err);
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
                    <input type="text" name="email" id="email" placeholder="Email"
                        value={email}
                        onChange={(e) => { setEmail(e.target.value) }} />
                    {email === '' && isSubmitted ? <p className="p-err">Email should not be empty!</p> : ''}
                    {!emailRegex.test(email) && isSubmitted ? <p className="p-alert">Email should be valid!</p> : ''}
                    <input
                        type="text"
                        name="username"
                        id="username"
                        placeholder="Username"
                        value={username}
                        onChange={(e) => { setUsername(e.target.value) }}
                    />
                    {username === '' && isSubmitted ? <p className="p-err">Username should not be empty!</p> : ''}
                    {username.length < 5 && isSubmitted ? <p className="p-alert">Username should be atleast 5 chars!</p> : ''}
                    <input
                        type="tel"
                        name="telephone"
                        id="telephone"
                        placeholder="+359882233404"
                        value={telephone}
                        onChange={(e) => { setTelephone(e.target.value) }}
                    />
                    {telephone === '' && isSubmitted ? <p className="p-err">Telephone should not be empty!</p> : ''}
                    {!telephoneRegex.test(telephone) && isSubmitted ? <p className="p-alert">Telephone should be valid Bulgarian number!</p> : ''}
                    <input
                        type="password"
                        name="password"
                        id="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => { setPassword(e.target.value) }}
                    />
                    {password === '' && isSubmitted ? <p className="p-err">Password should not be empty!</p> : ''}
                    {password.length < 4 && isSubmitted ? <p className="p-alert">Password should be atleast 4 chars!</p> : ''}
                    <input
                        type="password"
                        name="repassword"
                        id="repassword"
                        placeholder="Repeat password"
                        value={repeatPassword}
                        onChange={(e) => { setRepeatPassword(e.target.value) }}
                    />
                    {password !== repeatPassword && isSubmitted ? <p className="p-err">Password and repeat don't match!</p> : ''}
                    <section className="btn-wraper">
                        <button type="submit" className="btn burgir-color">
                            Register
                        </button>
                        <Link to="/login" className="btn gray">
                            Log in?
                        </Link>
                    </section>
                    {errors ? <p>Error in database!</p> : ''}
                </form>
            </section>
            <section className="img-wraper right">
                <img src="images/hungry-man.jpg" alt="man-e-ham" />
            </section>
        </div>
    );
};

export default Register;
