import "./Register.css";
import { Link } from "react-router-dom";

const Register = () => {
    const onSubmit = (e) => {
        e.preventDefault();
        console.log(e.currentTarget);
    }

    return (
        <div className="container">
            <section className="content-wraper left">
                <div>
                    <h1>You hungry?</h1>
                    <p>Register to start your tasty Burgir adventure!</p>
                </div>
                <form method="POST" className="login-form" onSubmit={onSubmit}>
                    <input
                        type="text"
                        name="email"
                        id="email"
                        placeholder="Email"
                    />
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
                    <input
                        type="password"
                        name="rePassword"
                        id="rePassword"
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
                </form>
            </section>
            <section className="img-wraper right">
                <img src="images/hungry-man.jpg" alt="man-e-ham" />
            </section>
        </div>
    );
};

export default Register;
