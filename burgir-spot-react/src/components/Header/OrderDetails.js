import { Link } from "react-router-dom";
import { useAppSelector } from "../../app/hooks";

const OrderDetails = ({ width, order, showDivState, setShowDivState }) => {
    const deliveryPrice = useAppSelector(state => state.order.value.deliveryPrice);

    return (<div className="items-header"
        onMouseEnter={() =>
            {if(width > 500) {
                    setShowDivState(true)
                }
        }}
        onMouseLeave={() =>
            {if(width > 500) {
                    setShowDivState(false)
                }
        }}
        style={showDivState ? { display: 'flex' } : { display: 'none' }}>
        <div style={{ overflow: 'auto' }}>
            {
                order.quantity > 0
                    ? order.burgirs.map(x =>
                        <div key={x._id}>
                            <div style={{ display: 'flex', border: '1px solid black' }}>
                                <img src={x.imgUrl}
                                    style={{ width: '100px', height: '100px', objectFit: 'cover' }} alt="img" />
                                <div style={{ display: 'flex' }}>
                                    <h3>{x.name}</h3>
                                    <h4 style={{ paddingTop: '57px' }}>{x.singlePrice} BGN</h4>
                                </div>
                            </div>
                        </div>
                    ) : ''
            }
        </div>
        <div style={{ display: 'flex' }}>
            <h3>Delivery</h3>
            <h6 style={{ marginLeft: '10px' }}>{deliveryPrice} BGN</h6>
        </div>
        <div style={{ display: 'flex' }}>
            <h3>Total</h3>
            <h6 style={{ marginLeft: '10px' }}>{order.totalPrice} BGN</h6>
        </div>
        <Link to="/order"
            style={{
                width: '100%', textAlign: 'center',
                textDecoration: 'none', color: 'black',
                background: 'gray', borderRadius: '10px'
            }} >See order</Link>
    </div>)
}

export default OrderDetails;