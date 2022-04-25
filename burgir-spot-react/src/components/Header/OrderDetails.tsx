import { useNavigate } from "react-router-dom";
import { useAppSelector } from "../../app/hooks";
import { OrderBurgir } from "../../interfaces/burgir";
import "./OrderDetails.scss";

interface Order {
    totalPrice: number;
    quantity: number;
    burgirs: OrderBurgir[];
    deliveryPrice: number;
}

interface PropsType {
    width: number;
    order: Order;
    showDivState: boolean;
    setShowDivState: React.Dispatch<React.SetStateAction<boolean>>;
}

const OrderDetails = (props: PropsType) => {
    const deliveryPrice = useAppSelector(
        (state) => state.order.value.deliveryPrice
    );
    const navigate = useNavigate();
    
    const onImgClick = (
        e: React.MouseEvent<HTMLDivElement, MouseEvent>,
        id: string
    ) => {
        e.preventDefault();
        navigate(`/details/${id}`);
    };

    return (
        <div
            className="items-header"
            onMouseEnter={() => {
                if (props.width > 500) {
                    props.setShowDivState(true);
                }
            }}
            onMouseLeave={() => {
                if (props.width > 500) {
                    props.setShowDivState(false);
                }
            }}
            style={
                props.showDivState ? { display: "flex" } : { display: "none" }
            }
        >
            <div className="order-content">
                {props.order.quantity > 0
                    ? props.order.burgirs.map((x) => (
                          <div className="order-img-wrap" key={x._id} onClick={e => onImgClick(e, x._id)}>
                              <img src={x.imgUrl} alt="img" />
                          </div>
                      ))
                    : ""}
            </div>
            <div className="flex-order">
                <h3>Delivery</h3>
                <h6>{deliveryPrice} BGN</h6>
            </div>
            <div className="flex-order">
                <h3>Total</h3>
                <h6>{props.order.totalPrice} BGN</h6>
            </div>
        </div>
    );
};

export default OrderDetails;
