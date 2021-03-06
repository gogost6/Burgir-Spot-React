import "./Order.css";
import {
    changeBurgirQuantity,
    removeBurgir,
    checkBusketForItems,
    clearBucket,
    freeDelivery,
} from "../../features/order/orderSlice";
import Select, { SingleValue } from "react-select";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";

const Order = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const order = useAppSelector((state) => state.order.value);

    const [code, setCode] = useState("");
    const [codeErr, setCodeErr] = useState("");
    const [completeOrder, setCompleteOrder] = useState(false);

    if (order.quantity === 0) {
        dispatch(checkBusketForItems());
    }

    let finalPrice = (order.totalPrice + order.deliveryPrice).toFixed(2);

    const quantityOptions = [
        { value: 1, label: 1 },
        { value: 2, label: 2 },
        { value: 3, label: 3 },
        { value: 4, label: 4 },
        { value: 5, label: 5 },
        { value: 6, label: 6 },
        { value: 7, label: 7 },
        { value: 8, label: 8 },
        { value: 9, label: 9 },
        { value: 10, label: 10 },
    ];

    const quantityChange = (
        e: SingleValue<{
            value: number;
            label: number;
        }>,
        name: string
    ) => {
        dispatch(changeBurgirQuantity({ quantity: e!.value, name }));
    };

    const removeItem = (
        e: React.MouseEvent<SVGSVGElement, MouseEvent>,
        _id: string
    ) => {
        e.preventDefault();
        dispatch(removeBurgir({ _id }));
    };

    const promoCodeHandler = (
        e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
        code: string
    ) => {
        e.preventDefault();
        if (code === "IWANTFREEDELIVERY") {
            setCode("");
            dispatch(freeDelivery());
        } else {
            setCodeErr("No such code!");
        }
    };

    const codeInputHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        setCode(e.target.value);
    };

    const completeOrderBtn = (
        e: React.MouseEvent<HTMLButtonElement, MouseEvent>
    ) => {
        e.preventDefault();
        setCompleteOrder(true);
    };

    const homeBtn = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.preventDefault();
        dispatch(clearBucket());
        navigate("/");
    };

    return (
        <div className="container" style={{ height: "auto" }}>
            {order.burgirs.length > 0 ? (
                <>
                    <div
                        className="items-in-order"
                        style={
                            completeOrder
                                ? {
                                      filter: "opacity(10%)",
                                      pointerEvents: "none",
                                  }
                                : {}
                        }
                    >
                        <div className="order-head">
                            <h1 style={{ margin: "0" }}>Your order</h1>
                            <p>Qty: {order.quantity}</p>
                        </div>
                        <div className="order-wrap-and-price">
                            {order.burgirs.map((x) => (
                                <div className="order-card" key={x._id}>
                                    <img src={x.imgUrl} alt="img" />
                                    <div className="text-wraper">
                                        <p style={{ fontWeight: "bold" }}>
                                            {x.name}
                                        </p>
                                        <p>{x.description}</p>
                                        <Select
                                            options={quantityOptions}
                                            name="quantity"
                                            id="quantity"
                                            value={[
                                                {
                                                    value: x.quantity,
                                                    label: x.quantity,
                                                },
                                            ]}
                                            onChange={(e) =>
                                                quantityChange(e, x.name)
                                            }
                                        />
                                    </div>
                                    <div className="right-side">
                                        <FontAwesomeIcon
                                            className="trash-svg"
                                            icon={faTrash}
                                            onClick={(e) =>
                                                removeItem(e, x._id)
                                            }
                                        />
                                        <p>{x.price * x.quantity} BGN</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div
                        className="order-details"
                        style={
                            completeOrder
                                ? {
                                      filter: "opacity(10%)",
                                      pointerEvents: "none",
                                  }
                                : {}
                        }
                    >
                        <div className="left-right">
                            <p>PRICE</p>
                            <p>{order.totalPrice} BGN</p>
                        </div>
                        <div className="left-right">
                            <p>DELIVERY</p>
                            <p>
                                {order.deliveryPrice === 0
                                    ? "FREE"
                                    : `${order.deliveryPrice} BGN`}
                            </p>
                        </div>
                        <div
                            className="left-right"
                            style={{ borderBottom: "1px solid gray" }}
                        >
                            <p>TOTAL PRICE</p>
                            <p>{finalPrice} BGN</p>
                        </div>
                        <button
                            className="order-btn"
                            onClick={completeOrderBtn}
                        >
                            COMPLETE ORDER
                        </button>
                        <div className="left-right">
                            <div style={{ flexGrow: "1" }}>
                                <p>YOUR PROMO CODE</p>
                                <input
                                    className="code-input"
                                    type="text"
                                    placeholder="IWANTFREEDELIVERY"
                                    value={code}
                                    style={{ width: "90%" }}
                                    onChange={codeInputHandler}
                                />
                            </div>
                            <button
                                onClick={(e) => promoCodeHandler(e, code)}
                                style={{ width: "27%" }}
                            >
                                ADD
                            </button>
                        </div>
                        {codeErr === "No such code!" ? (
                            <p style={{ color: "red" }}>{codeErr}</p>
                        ) : (
                            ""
                        )}
                        <p>Pay with cash to the delivery dude!</p>
                    </div>
                    <div
                        className="complete-order"
                        style={
                            completeOrder
                                ? { display: "block", cursor: "notAllowed" }
                                : { display: "none" }
                        }
                    >
                        <h1>Thank you for your order!</h1>
                        <p>Delivery time 30 min.</p>
                        <button
                            onClick={homeBtn}
                            className="btn burgir-color"
                            style={{
                                width: "46%",
                                display: "block",
                                margin: "0 auto",
                            }}
                        >
                            Home
                        </button>
                    </div>
                </>
            ) : (
                <div style={{ margin: "auto", marginTop: "13%" }}>
                    <h1>Your order is empty!</h1>
                    <h3>
                        If you want to see our menu click{" "}
                        <Link to="/menu">Here</Link>
                    </h3>
                </div>
            )}
        </div>
    );
};

export default Order;
