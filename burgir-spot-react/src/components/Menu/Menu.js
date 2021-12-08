import "./Menu.css"
import { Link } from 'react-router-dom';
import { useEffect, useState } from "react";
import { recentBurgirs } from '../../services/foodService'
const Menu = () => {
    let [burgirs, setBurgirs] = useState([]);

    useEffect(() => {
        recentBurgirs().then(res => {
            console.log(res);
            setBurgirs(res);
        }).catch(err => console.log(err));
    }, []);

    return (
        <>
            <div className="container pad">
                <h1>Our menu</h1>
                {burgirs.length > 0 ?
                    burgirs.map(x => (<div className="card" key={x._id}>
                        <div className="image-wrap">
                            <img src={x.imgUrl} alt="img" />
                        </div>
                        <div className="cnt">
                            <p>Price: {x.price}$</p>
                            <p>{x.description}</p>
                        </div>
                        <Link to={`/details/${x._id}`} className="btn burgir-color">Details</Link>
                    </div>)
                    )
                    : <p>No burgirs in DB!</p>
                }
            </div>
        </>
    )
}

export default Menu;