import "./Details.css";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import {
    addToLikedHandler,
    burgirDetails,
    deleteBurgir,
    removeFromFavouriteHandler,
} from "../../../services/foodService";
import { addToBucket } from "../../../features/order/orderSlice";
import {
    addToLiked,
    removeFromLiked,
    removeBurgirFromUserModel,
} from "../../../features/user/userSlice";
import ThreeDotsLoader from "../../../utils/ThreeDotsLoader";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import { Burgir } from "../../../interfaces/burgir";

const Details = () => {
    const navigate = useNavigate();
    const user = useAppSelector((state) => state.user.value);
    const dispatch = useAppDispatch();

    const params = useParams();
    const { id } = params;

    let [burgir, setBurgir] = useState<Burgir>({} as Burgir);
    let [quantity, setQuantity] = useState(1);
    let [isLiked, setIsLiked] = useState(false);

    const btnStyles = { width: "70%", marginTop: "15px" };

    useEffect(() => {
        burgirDetails(id!)
            .then((res) => setBurgir(res))
            .catch((err) => console.log(err));
    }, [burgir._id]);

    useEffect(() => {
        if (user._id && user.likedBurgirs.includes(burgir._id!)) {
            setIsLiked(true);
        } else {
            setIsLiked(false);
        }
    }, [user.likedBurgirs]);

    const userButtons = () => {
        const onDelete = (
            e: React.MouseEvent<HTMLAnchorElement, MouseEvent>
        ) => {
            e.preventDefault();
            deleteBurgir(id!)
                .then((res) => {
                    dispatch(removeBurgirFromUserModel(id!));
                    navigate("/");
                })
                .catch((err) => console.log(err));
        };
        if (user._id) {
            if (user.createdBurgirs.includes(id!)) {
                return (
                    <>
                        <Link
                            className="btn gray"
                            style={btnStyles}
                            to={`/edit/${id}`}
                        >
                            Edit
                        </Link>
                        <Link
                            className="btn red"
                            style={btnStyles}
                            to={`/menu`}
                            onClick={onDelete}
                        >
                            Delete
                        </Link>
                    </>
                );
            } else {
                return (
                    <button
                        className="btn"
                        onClick={likeBtnHandler}
                        style={btnStyles}
                    >
                        {isLiked ? "Unlike" : "Like"}
                        <FontAwesomeIcon
                            icon={faHeart}
                            className="hearth"
                            style={
                                isLiked ? { color: "red" } : { color: "blue" }
                            }
                        />
                    </button>
                );
            }
        }
    };

    const quantityHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newQuantity = e.target.value;
        setQuantity(Number(newQuantity));
    };

    const buyBurgir = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.preventDefault();
        
        dispatch(
            addToBucket({
                quantity,
                description: burgir.description,
                price: burgir.price,
                name: burgir.name,
                imgUrl: burgir.imgUrl,
                _id: burgir._id,
            })
        );
    };

    const likeBtnHandler = (
        e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
        _id = burgir._id
    ) => {
        e.preventDefault();
        if (isLiked) {
            dispatch(removeFromLiked(_id));
            removeFromFavouriteHandler(_id)
                .then((res) => setIsLiked(false))
                .catch((err) => console.log(err));
        } else {
            dispatch(addToLiked(_id));
            addToLikedHandler(_id)
                .then((res) => setIsLiked(true))
                .catch((err) => console.log(err));
        }
    };

    return (
        <div className="container" style={{ marginTop: "7%" }}>
            {burgir.name ? (
                <div className="details-card">
                    <div className="i-w">
                        <img src={burgir.imgUrl} alt="img" />
                    </div>
                    <div className="details-wrapper">
                        <h1>{burgir.name}</h1>
                        <p>
                            This custon burger is made with {burgir.meat} meat
                            from our farm! The vegetables included are{" "}
                            {burgir.vegetables.join(", ")} and we use only the
                            fresh.
                            {burgir.sauses
                                ? `Topped with ${burgir.sauses.join(", ")}. `
                                : ""}
                            {burgir.spices
                                ? `Little ${burgir.spices.join(", ")}. `
                                : ""}
                            {burgir.bonus
                                ? `And the best part ${burgir.bonus.join(
                                      ", "
                                  )}.`
                                : ""}
                        </p>
                        {burgir.description ? (
                            <p style={{ marginTop: "10px" }}>
                                With love: {burgir.description}
                            </p>
                        ) : (
                            ""
                        )}
                        <label htmlFor="quantity" style={{ marginTop: "10px" }}>
                            <strong>Quantity:</strong>
                        </label>
                        <input
                            className="quantity"
                            type="number"
                            id="quantity"
                            name="quantity"
                            min={1}
                            onChange={quantityHandler}
                            value={quantity}
                        />
                        <h3>Price: {burgir.price} BGN</h3>
                        {quantity > 1 ? (
                            <h3>Total: {burgir.price * quantity}BGN</h3>
                        ) : (
                            ""
                        )}
                    </div>
                    <div className="btn-wrapper">
                        <p className="p-likes">
                            {burgir.likes.length == 1
                                ? "1 like"
                                : `${burgir.likes.length} likes`}{" "}
                        </p>
                        <button
                            className="btn burgir-color"
                            style={{ width: "70%" }}
                            onClick={buyBurgir}
                        >
                            Buy
                        </button>
                        {userButtons()}
                    </div>
                </div>
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
        </div>
    );
};

export default Details;
