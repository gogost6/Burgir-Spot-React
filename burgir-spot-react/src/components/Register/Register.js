import "./Register.css";
import { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { registerUser } from '../../services/authService';
import AuthContext from "../../context/AuthContext";

const Register = () => {
    let { onLogin } = useContext(AuthContext);
    let [errors, setErrors] = useState([]);
    let navigate = useNavigate();

    const onSubmit = (e) => {
        e.preventDefault();

        let formData = new FormData(e.currentTarget);
        let data = Object.fromEntries(formData);
        registerUser(data)
            .then(res => {
                onLogin(res);
                navigate('/');
            })
            .catch(err => {
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
                    <input type="text" name="email" id="email" placeholder="Email" />
                    <input
                        type="text"
                        name="username"
                        id="username"
                        placeholder="Username"
                    />
                    <input
                        type="telephone"
                        name="telephone"
                        id="telephone"
                        placeholder="Telephone"
                    />
                    <input
                        type="password"
                        name="password"
                        id="password"
                        placeholder="Password"
                    />
                    <input
                        type="password"
                        name="repassword"
                        id="repassword"
                        placeholder="Repeat password"
                    />
                    <section className="btn-wraper">
                        <button type="submit" className="btn burgir-color">
                            Register
                        </button>
                        <Link to="/login" className="btn gray">
                            Log in?
                        </Link>
                    </section>
                    {errors
                        ? <div className='errors-wraper'>
                            <ul>
                                {errors.map(x => <li>{x}</li>)}
                            </ul>
                        </div>
                        : ''}
                </form>
            </section>
            <section className="img-wraper right">
                <img src="images/hungry-man.jpg" alt="man-e-ham" />
            </section>
        </div>
    );
};

export default Register;
