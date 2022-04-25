import "./Menu.css";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import {
    recentBurgirs,
    getOwned,
    getLiked,
    burgirDetails,
} from "../../services/foodService";
import ThreeDotsLoader from "../../utils/ThreeDotsLoader";
import { Burgir } from "../../interfaces/burgir";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlusCircle } from "@fortawesome/free-solid-svg-icons";
import { useAppDispatch } from "../../app/hooks";
import { addToBucket } from "../../features/order/orderSlice";

interface PropsType {
    type: string;
}

const Menu = (props: PropsType) => {
    let [burgirs, setBurgirs] = useState<Burgir[]>([]);
    const [loader, setLoader] = useState(true);
    const dispatch = useAppDispatch();

    const buyBurgir = (
        e: React.MouseEvent<SVGSVGElement, MouseEvent>,
        id: string
    ) => {
        e.preventDefault();

        burgirDetails(id)
            .then((res) =>
                dispatch(
                    addToBucket({
                        quantity: 1,
                        description: res.description,
                        price: res.price,
                        name: res.name,
                        imgUrl: res.imgUrl,
                        _id: res._id,
                    })
                )
            )
            .catch((err) => console.log(err));
    };

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
                {burgirs.length > 0 ? (
                    burgirs.map((x) => (
                        <div className="card" key={x._id}>
                            <div className="image-wrap">
                                <img src={x.imgUrl} alt="img" />
                            </div>
                            <div className="cnt">
                                <p>
                                    <strong>{x.name}</strong>
                                </p>
                                <p>Price: {x.price} BGN</p>
                                <p>{x.description}</p>
                            </div>
                            <div className="flex">
                                <Link
                                    to={`/details/${x._id}`}
                                    className="details-btn"
                                >
                                    Details
                                </Link>
                                <FontAwesomeIcon
                                    className="plus"
                                    icon={faPlusCircle}
                                    onClick={(e) => buyBurgir(e, x._id)}
                                />
                            </div>
                        </div>
                    ))
                ) : (
                    <ThreeDotsLoader
                        style={{
                            position: "absolute",
                            top: "50%",
                            left: "50%",
                            transform: "translate(-50%, -50%)",
                        }}
                    />
                )}
                {burgirs.length === 0 && loader === false ? (
                    <p>No burgers in the menu.</p>
                ) : (
                    ""
                )}
            </div>
        </>
    );
};

export default Menu;
