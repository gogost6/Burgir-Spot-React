import "./Details.css";
import { Link, useNavigate, useParams } from 'react-router-dom'
import { useEffect, useState } from "react";
import { burgirDetails, deleteBurgir } from '../../../services/foodService';
import { fullUserDataByUsername } from '../../../services/authService'
import { useDispatch, useSelector } from "react-redux";
import { addToBucket } from "../../../features/order/orderSlice";

const Details = () => {
    const navigate = useNavigate();
    const user = useSelector((state) => state.user.value);
    // const order = useSelector((state) => state.value.order);
    const dispatch = useDispatch();

    const params = useParams();
    const { id } = params;

    let [burgir, setBurgir] = useState({});
    let [quantity, setQuantity] = useState(1);
    let [userData, setUserData] = useState({});

    useEffect(() => {
        fullUserDataByUsername(user.username).then(res => setUserData(res)).catch(err => console.log(err))
        burgirDetails(id).then(res => setBurgir(res)).catch(err => console.log(err));
    }, [id, user]);


    const userButtons = () => {
        const onDelete = (e) => {
            e.preventDefault();
            deleteBurgir(id).then(res => navigate('/')).catch(err => console.log(err))
        }
        if (userData._id) {
            if (userData.createdBurgirs.includes(id)) {
                return (<>
                    <Link className="btn gray" style={{ 'width': '70%' }} to={`/edit/${id}`}>Edit</Link>
                    <Link className="btn red" style={{ 'width': '70%' }} to={`/menu`} onClick={onDelete}>Delete</Link>
                </>);
            } else {
                return '';
            }
        }
    };

    const quantityHandler = (e) => {
        const newQuantity = e.target.value;
        setQuantity(Number(newQuantity));
    }

    const buyBurgir = (e) => {
        e.preventDefault();
        dispatch(addToBucket({
            quantity,
            price: burgir.price,
            name: burgir.name,
            imgUrl: burgir.imgUrl,
            _id: burgir._id
        }));
    }

    return (
        <div className="container">
            {burgir.name ?
                (<div className="details-card">
                    <div className="i-w">
                        <img src={burgir.imgUrl} alt="img" />
                    </div>
                    <div className="details-wrapper">
                        <h1>{burgir.name}</h1>
                        <p>This custon burger is made with {burgir.meat} meat from our farm!
                            The vegetables included are {burgir.vegetables.join(', ')} and we use only the fresh. 
                            {burgir.sauces ? `Topped with ${burgir.sauces.join(', ')}. ` : ''}
                            {burgir.spices ? `Little ${burgir.spices.join(', ')}. ` : ''}
                            {burgir.bonus ? `And the best part ${burgir.bonus.join(', ')}.` : ''}
                        </p>
                        {burgir.description ? <p style={{'marginTop': '10px'}}>With love: {burgir.description}</p> : ''}
                        <label htmlFor="quantity" style={{'marginTop': '10px'}}><strong>Quantity:</strong></label>
                        <input type="number" id="quantity" name="quantity" min={1} onChange={quantityHandler} value={quantity} />
                        <h3>Total: {burgir.price * quantity}$</h3>
                    </div>
                    <div className="btn-wrapper">
                        <button className="btn burgir-color" style={{ 'width': '70%' }} onClick={buyBurgir}>Buy</button>
                        {userButtons()}
                    </div>
                </div>)
                : <p>Loading...</p>}
        </div>
    )
}

export default Details;