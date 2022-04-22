import { Link } from "react-router-dom";
import { useAppSelector } from "../../app/hooks";
import { OrderBurgir } from "../../interfaces/burgir";

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
    const deliveryPrice = useAppSelector(state => state.order.value.deliveryPrice);

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
            <div style={{ overflow: "auto" }}>
                {props.order.quantity > 0
                    ? props.order.burgirs.map((x) => (
                          <div key={x._id}>
                              <div
                                  style={{
                                      display: "flex",
                                      border: "1px solid black",
                                  }}
                              >
                                  <img
                                      src={x.imgUrl}
                                      style={{
                                          width: "100px",
                                          height: "100px",
                                          objectFit: "cover",
                                      }}
                                      alt="img"
                                  />
                                  <div style={{ display: "flex" }}>
                                      <h3>{x.name}</h3>
                                      <h4 style={{ paddingTop: "57px" }}>
                                          {x.price} BGN
                                      </h4>
                                  </div>
                              </div>
                          </div>
                      ))
                    : ""}
            </div>
            <div style={{ display: "flex" }}>
                <h3>Delivery</h3>
                <h6 style={{ marginLeft: "10px" }}>{deliveryPrice} BGN</h6>
            </div>
            <div style={{ display: "flex" }}>
                <h3>Total</h3>
                <h6 style={{ marginLeft: "10px" }}>
                    {props.order.totalPrice} BGN
                </h6>
            </div>
            <Link
                to="/order"
                style={{
                    width: "100%",
                    textAlign: "center",
                    textDecoration: "none",
                    color: "black",
                    background: "gray",
                    borderRadius: "10px",
                }}
            >
                See order
            </Link>
        </div>
    );
}

export default OrderDetails;