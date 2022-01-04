import "./Details.css";
import { Link, useNavigate, useParams } from 'react-router-dom'
import { useEffect, useState } from "react";
import { burgirDetails, deleteBurgir } from '../../../services/foodService';
import { fullUserDataByUsername } from '../../../services/authService'
import { useSelector } from "react-redux";

const Details = () => {
    const navigate = useNavigate();
    const user = useSelector((state) => state.user.value);

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
                    <Link className="btn gray" to={`/edit/${id}`}>Edit</Link>
                    <Link className="btn red" to={`/menu`} onClick={onDelete}>Delete</Link>
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

    // const buyBurgir = (e) => {
    //     e.preventDefault();
    //     addToBucket({
    //         quantity,
    //         price: burgir.price,
    //         name: burgir.name
    //     });
    // }

    return (
        <div className="container">
            {burgir.name ?
                (<div className="details-card">
                    <div className="i-w">
                        <img src={burgir.imgUrl} alt="img" />
                    </div>
                    <div className="details-wrapper">
                        <h1>{burgir.name}</h1>
                        <p><strong>Meat:</strong> {burgir.meat}</p>
                        {burgir.vegetables ? (<p><strong>Vegetables:</strong> {burgir.vegetables.join(', ')}</p>) : ''}
                        {burgir.spices ? (<p><strong>Spices:</strong> {burgir.spices.join(', ')}</p>) : ''}
                        {burgir.sauces ? (<p><strong>Sauces:</strong> {burgir.sauces.join(', ')}</p>) : ''}
                        {burgir.bonus ? (<p><strong>Bonus:</strong> {burgir.bonus.join(', ')}</p>) : ''}
                        <label htmlFor="quantity"><strong>Quantity:</strong></label>
                        <input type="number" id="quantity" name="quantity" min={1} onChange={quantityHandler} value={quantity} />
                        <h3>Total: {burgir.price * quantity}$</h3>
                    </div>
                    <div className="btn-wrapper">
                        {/* <button className="btn burgir-color" onClick={buyBurgir}>Buy</button> */}
                        {userButtons()}
                    </div>
                </div>)
                : <p>Loading...</p>}
        </div>
    )
}

export default Details;