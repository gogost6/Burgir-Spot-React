import { useDispatch, useSelector } from "react-redux";
import { changeBurgirQuantity, removeBurgir } from "../../features/order/orderSlice";
import Select from 'react-select';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import "./Order.css";


const Order = () => {
    const dispatch = useDispatch();
    const order = useSelector(state => state.order.value);

    const finalPrice = (order.totalPrice + 2.99).toFixed(2);

    const quantityOptions = [
        { value: '1', label: '1' },
        { value: '2', label: '2' },
        { value: '3', label: '3' },
        { value: '4', label: '4' },
        { value: '5', label: '5' },
        { value: '6', label: '6' },
        { value: '7', label: '7' },
        { value: '8', label: '8' },
        { value: '9', label: '9' },
        { value: '10', label: '10' },
    ];

    const quantityChange = (e, burgirName) => {
        console.log(burgirName);
        dispatch(changeBurgirQuantity({ quantity: e.value, name: burgirName }))
    }

    const removeItem = (e, _id) => {
        e.preventDefault();
        dispatch(removeBurgir(_id))
    }

    return (
        <div className="container" style={{ 'height': 'auto' }}>
            {order.burgirs.length > 0 ?
                <>
                    <div className="items-in-order">
                        <div className="order-head">
                            <h1 style={{ 'margin': '0' }}>Your order</h1>
                            <p>Qty: {order.quantity}</p>
                        </div>
                        <div className="order-wrap-and-price">
                            {order.burgirs.map(x => <div className="order-card" key={x._id}>
                                <img src={x.imgUrl} alt="img" />
                                <div className="text-wraper">
                                    <p style={{ 'fontWeight': 'bold' }}>{x.name}</p>
                                    <p>maybe ingridients</p>
                                    <Select options={quantityOptions}
                                        name="quantity" id="quantity"
                                        value={[{ value: x.quantity, label: x.quantity }]}
                                        onChange={(e) => quantityChange(e, x.name)} />
                                </div>
                                <div className="right-side">
                                    <button onClick={(e) => removeItem(e, x._id)}>
                                        <FontAwesomeIcon icon={faTrash} />
                                    </button>
                                    <p>{x.singlePrice * x.quantity} BGN</p>
                                </div>
                            </div>)}

                        </div>
                    </div>
                    <div className="order-details" style={{
                       
                    }}>
                        <div className="left-right">
                            <p>PRICE</p>
                            <p>{finalPrice} BGN</p>
                        </div>
                        <div className="left-right" style={{'borderBottom': '1px solid gray'}}>
                            <p>DELIVERY</p>
                            <p>2.99 BGN</p>
                        </div>
                        <button className="order-btn">COMPLETE ORDER</button>
                        <div className="left-right">
                            <div style={{'flexGrow': '1'}}>
                                <p>YOUR PROMO CODE</p> 
                                <input type="text" placeholder="FREEDONUT" style={{'width': '90%'}}/>
                            </div>
                            <button style={{'width': '27%'}}>ADD</button>
                        </div>
                        <p>Pay with cash to the delivery dude!</p>
                    </div> </> : <p>Nothing in the bucket!</p>
            }
        </div>
    )
}

export default Order;