import "./Login.css";
import { Link } from "react-router-dom";

const Login = () => {
    return (
        <div className="container">
            <section className="img-wraper">
                <img src="images/Man_eating_hamburger.jpg" alt="man-e-ham" />
            </section>
            <section className="content-wraper right">
                <div>
                    <h1>Welcome back :)</h1>
                    <p>Login to start your tasty Burgir adventure!</p>
                </div>
                <form method="POST" className="login-form">
                    <input
                        type="text"
                        name="email"
                        id="email"
                        placeholder="Email"
                    />
                    <input
                        type="password"
                        name="password"
                        id="password"
                        placeholder="Password"
                    />
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
