import "./Login.css";

const Login = () => {
    return (
        <div className="container">
            <section className="img-wraper">
                <img src="images/Man_eating_hamburger.jpg" alt="man-e-ham" />
            </section>
            <section className="content-wraper">
                <div>
                    <h1>Welcome back :)</h1>
                    <p>Login to start your tasty Burgir adventure!</p>
                </div>
                <form action="" className="login-form">
                    <label htmlFor="email">
                        Email:
                        <input type="text" name="email" id="email"/>
                    </label>
                    <label htmlFor="password">
                        Password:
                        <input type="password" name="password" id="password"/>
                    </label>
                    <section className="btn-wraper">
                        <button type="submit" className="btn burgir-color">
                            Login
                        </button>
                        <button type="submit" className="btn">
                            Create account
                        </button>
                    </section>
                </form>
            </section>
        </div>
    );
};

export default Login;
