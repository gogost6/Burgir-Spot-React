import "./Login.css";
import AuthContext from "../../../context/AuthContext";
import { useState, useContext } from "react";
import { Link } from "react-router-dom";
import { loginUser } from '../../../services/authService';
import * as utils from '../../../utils/styles'


const Login = () => {
    let { onLogin } = useContext(AuthContext);
    let [error, setError] = useState('');
    let [isSubmitted, setIsSubmitted] = useState(false);
    let [username, setUsername] = useState('');
    let [password, setPassword] = useState('');
    let [usernameHover, setUsernameHover] = useState(false);
    let [passwordHover, setPasswordHover] = useState(false);

    const onSubmit = (e) => {
        e.preventDefault();
        setError('');
        setIsSubmitted(true);

        let formData = new FormData(e.currentTarget);
        let data = Object.fromEntries(formData);

        loginUser(data)
            .then(res => {
                localStorage.setItem('logged', true);
                onLogin(res);
            })
            .catch(err => {
                setError(err);
            })
    };

    return (
        <div className="container">
            <section className="img-wraper">
                <img src="images/Man_eating_hamburger.jpg" alt="man-e-ham" />
            </section>
            <section className="content-wraper right">
                <div>
                    <h1>Welcome back!</h1>
                    <p>Login to start your tasty Burgir adventure!</p>
                </div>
                <form method="POST" className="login-form" onSubmit={onSubmit}>
                    <label htmlFor="username">Username</label>
                    <input
                        type="text"
                        name="username"
                        id="username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
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
                        }}
                    />
                        {username === '' && isSubmitted ? utils.inputErr('username') : ''}
                        <label htmlFor="password" style={{ 'marginTop': '15px' }}>Password</label>
                        <input
                            type="password"
                            name="password"
                            id="password"
                            placeholder="****"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            onMouseEnter={() => {
                                setPasswordHover(true);
                            }}
                            onMouseLeave={() => {
                                setPasswordHover(false);
                            }}
                            style={{
                                ...utils.inputBorderStyle.normal,
                                ...(passwordHover ? utils.inputBorderStyle.hover : null),
                                ...(password === '' && isSubmitted ? utils.inputBorderStyle.error : null)
                                // ...(password.length < 4 && isSubmitted ? inputBorderStyle.error : null)
                            }}
                        />
                        {password === '' && isSubmitted ? utils.inputErr('password') : ''}
                        {/* {password.length < 4 && isSubmitted ? <p style={{ 'color': 'red' }}>Password must be 4 or more characters</p> : ''} */}
                        <section className="btn-wraper">
                            <button type="submit" className="btn burgir-color">
                                Login
                            </button>
                            <Link to="/register" className="btn gray">
                                Create account
                            </Link>
                        </section>
                        {error ? <p className={error !== '' 
                        ? 'p-err hidethis': ''} style={{'opacity': 1}}>{error}</p> : ''}
                </form>
            </section>
        </div>
    );
};

export default Login;
