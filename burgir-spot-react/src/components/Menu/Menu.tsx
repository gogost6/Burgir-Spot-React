import "./Menu.css"
import { Link } from 'react-router-dom';
import { useEffect, useState } from "react";
import { recentBurgirs, getOwned, getLiked } from '../../services/foodService';
import ThreeDotsLoader from "../../utils/ThreeDotsLoader";
import { Burgir } from "../../interfaces/burgir";

interface PropsType {
    type: string;
}

const Menu = (props: PropsType) => {
    let [burgirs, setBurgirs] = useState<Burgir[]>([]);
    const [loader, setLoader] = useState(true);

    useEffect(() => {
        if (props.type === "menu") {
            recentBurgirs()
                .then((res) => {
                    setLoader(false);
                    setBurgirs(res);
                })
                .catch((err) => console.log(err));
        } else if (props.type === "owned") {
            getOwned()
                .then((res) => {
                    setBurgirs(res);
                })
                .catch((err) => console.log(err));
        } else if (props.type === "liked") {
            getLiked()
                .then((res) => {
                    setBurgirs(res);
                })
                .catch((err) => console.log(err));
        }
    }, [props.type]);

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
                            <p>Price: {x.price} BGN</p>
                            <p>{x.description}</p>
                        </div>
                        <Link to={`/details/${x._id}`}
                            className="details-btn"
                        >Details</Link>
                    </div>)
                    )
                    : <ThreeDotsLoader style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }} />
                }
                {burgirs.length === 0 && loader === false ? <p>No burgers in the menu.</p> : ''}
            </div>
        </>
    )
}

export default Menu;