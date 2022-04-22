import { Link } from "react-router-dom";
import "./Home.css";

const Home = () => {
    return (
        <>
            <div className="landing">
                <h3 style={{ 'textShadow': '1px 0px #999999d6' }}>The Best Burgirs <br /> in Sofia!</h3>
            </div>
            <img src="images/homePage.png" alt="landingImg" className="langing-img" />
            <div className="right-landing">
                <h1>Wanna see our</h1>
                <Link to={'/menu'}>MENU</Link>
            </div>
        </>
    )
}

export default Home;