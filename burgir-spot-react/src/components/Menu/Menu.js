import "./Menu.css"
import { Link } from 'react-router-dom'

const Menu = () => {
    return (
        <>
            <h1>Our menu</h1>
            <div className="container pad">
                <div className="card">
                    <div className="image-wrap">
                        <img src="images/hungry-man.jpg" alt="img" />
                    </div>
                    <div className="cnt">
                        <p>This is the description!</p>
                        <p>This are the ingridients!</p>
                    </div>
                    <Link to="/details/:id" className="btn burgir-color">Details</Link>
                </div>
                <div className="card">
                    <div className="image-wrap">
                        <img src="images/hungry-man.jpg" alt="img" />
                    </div>
                    <div className="cnt">
                        <p>This is the description!</p>
                        <p>This are the ingridients!</p>
                    </div>
                    <Link to="/details/:id" className="btn burgir-color center">Details</Link>
                </div>
                <div className="card">
                    <div className="image-wrap">
                        <img src="images/hungry-man.jpg" alt="img" />
                    </div>
                    <div className="cnt">
                        <p>This is the description!</p>
                        <p>This are the ingridients!</p>
                    </div>
                    <Link to="/details/:id" className="btn burgir-color">Details</Link>
                </div>
            </div>
        </>
    )
}

export default Menu;