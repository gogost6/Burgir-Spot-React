import "./Menu.css"
import { Link } from 'react-router-dom';
import { useEffect, useState } from "react";
import { recentBurgirs, getOwned, getLiked } from '../../services/foodService';

const Menu = ({type}) => {
    let [burgirs, setBurgirs] = useState([]);

    useEffect(() => {
        if(type === 'menu') {
            recentBurgirs().then(res => {
                setBurgirs(res);
            }).catch(err => console.log(err));
        } else if(type === 'owned') {
            getOwned().then(res => {
                console.log(res);
                setBurgirs(res);
            }).catch(err => console.log(err));
        }
    }, []);

    return (
        <>
            <div className="container pad">
                {burgirs.length > 0 ?
                    burgirs.map(x => (<div className="card" key={x._id}>
                        <div className="image-wrap">
                            <img src={x.imgUrl} alt="img" />
                        </div>
                        <div className="cnt">
                            <p><strong>{x.name}</strong></p>
                            <p>Price: {x.price}$</p>
                            <p>{x.description}</p>
                        </div>
                        <Link to={`/details/${x._id}`}
                            className="details-btn"
                        >Details</Link>
                    </div>)
                    )
                    : <p>No burgirs in DB!</p>
                }
            </div>
        </>
    )
}

export default Menu;