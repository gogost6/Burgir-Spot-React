import Select from 'react-select';
import * as option from '../options';
import { arrHandler, arrValueHandler, changeValue, changeMeatValue } from '../index'
import { burgirDetails, editBurgir } from '../../../services/foodService';
import { useNavigate } from "react-router";
import { useState, useEffect } from "react";
import { useParams } from 'react-router-dom';

const Edit = () => {
    const params = useParams();
    const { id } = params;

    const navigate = useNavigate();
    const [errors, setErrors] = useState([]);

    let [burgir, setBurgir] = useState({
        bonus: [],
        description: "",
        imgUrl: "",
        meat: "",
        name: "",
        price: 0,
        sauses: [],
        spices: [],
        vegetables: []
    });

    useEffect(() => {
        if (id) {
            burgirDetails(id)
                .then(res => {
                    setBurgir(res);
                }).catch(err => console.log(err));
        }
    }, []);

    const onSubmit = (e) => {
        e.preventDefault();

        const formData = new FormData(e.currentTarget);
        const data = Object.fromEntries(formData);

        editBurgir(burgir, id).then(res => navigate('/menu')).catch(err => setErrors(err));
    }

    return (<div className="container wrap">
        <h1>Edit your burgir!</h1>
        <form method="POST" className="create-form" onSubmit={onSubmit}>
            <div className="form-item-wrapper">
                <label htmlFor="name">Burger name:</label>
                <input type="text" name="name" id="name" value={burgir.name}
                    onChange={(e) => changeValue(e, 'name', setBurgir)} />
            </div>
            <div className="form-item-wrapper">
                <label htmlFor="price">Price:</label>
                <input type="text" name="price" id="price" value={burgir.price}
                    onChange={(e) => changeValue(e, 'price', setBurgir)} />
            </div>
            <div className="form-item-wrapper">
                <label htmlFor="meat">Meat</label>
                <Select options={option.meatOptions}
                    name="meat" id="meat"
                    value={[{ value: burgir.meat, label: burgir.meat }]}
                    onChange={(e) => changeMeatValue(e, setBurgir)} />
            </div>
            <div className="form-item-wrapper">
                <label htmlFor="vegetables">Vegetables</label>
                <Select options={option.vegetableOptions} isClearable={true} isMulti={true}
                    name="vegetables" id="vegetables" onChange={(e) => arrHandler(e, 'vegetables', setBurgir)} value={arrValueHandler(burgir, 'vegetables')} />
            </div>
            <div className="form-item-wrapper">
                <label htmlFor="spices">Spices</label>
                <Select options={option.spicesOptions} isClearable={true} isMulti={true}
                    name="spices" id="spices" onChange={(e) => arrHandler(e, 'spices', setBurgir)} value={arrValueHandler(burgir, 'spices')} />
            </div>
            <div className="form-item-wrapper">
                <label htmlFor="sauses">Sauces</label>
                <Select options={option.saucesOptions} isClearable={true} isMulti={true}
                    name="sauses" id="sauses" onChange={(e) => arrHandler(e, 'sauses', setBurgir)} value={arrValueHandler(burgir, 'sauses')} />
            </div>
            <div className="form-item-wrapper">
                <label htmlFor="Bonus">Bonus</label>
                <Select options={option.bonusOptions} isClearable={true} isMulti={true}
                    name="bonus" id="bonus" onChange={(e) => arrHandler(e, 'bonus', setBurgir)} value={arrValueHandler(burgir, 'bonus')} />
            </div>
            <div className="form-item-wrapper">
                <label htmlFor="description">Description:</label>
                <input type="text" name="description" id="description"
                    value={burgir.description}
                    onChange={(e) => changeValue(e, 'description', setBurgir)} />
            </div>
            <div className="form-item-wrapper">
                <label htmlFor="imgUrl">Image Url:</label>
                <input type="text" name="imgUrl" id="imgUrl"
                    value={burgir.imgUrl}
                    onChange={(e) => changeValue(e, 'imgUrl', setBurgir)} />
            </div>
            <div className="btn-wrapper-create">
                <button className="btn burgir-color">Preview</button>
                <button className="btn">Edit</button>
            </div>
        </form>
        {errors.length > 0 ? <p className="p-err">Opsss you stil have some errors!</p> : ''}
    </div>);
}

export default Edit;