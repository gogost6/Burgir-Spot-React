import "./Login.css";
import AuthContext from "../../context/AuthContext";
import { useState, useContext } from "react";
import { Link } from "react-router-dom";
import { loginUser } from '../../services/authService';

const Login = () => {
    let { onLogin } = useContext(AuthContext);
    let [error, setError] = useState('');

    const onSubmit = (e) => {
        e.preventDefault();

        let formData = new FormData(e.currentTarget);
        let data = Object.fromEntries(formData);
        
        loginUser(data)
            .then(res => {
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
                    <input
                        type="text"
                        name="username"
                        id="username"
                        placeholder="Username"
                    />
                    <input
                        type="password"
                        name="password"
                        id="password"
                        placeholder="Password"
                    />
                    {error ? <p>{error}</p> : ''}
                    <section className="btn-wraper">
                        <button type="submit" className="btn burgir-color">
                            Login
                        </button>
                        <Link to="/register" className="btn gray">
                            Create account
                        </Link>
                    </section>
                </form>
            </section>
        </div>
    );
};

export default Login;
