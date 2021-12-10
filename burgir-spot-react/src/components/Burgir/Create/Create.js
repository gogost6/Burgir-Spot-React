import "./Create.css";
import Select from 'react-select';
import * as option from '../options';
import { createBurgir, burgirDetails, editBurgir } from '../../../services/foodService';
import { arrHandler, arrValueHandler, changeValue, changeMeatValue } from '../index'
import { useNavigate } from "react-router";
import { useState, useEffect } from "react";
import { useParams } from 'react-router-dom';

const Create = () => {
    let [state, setState] = useState({
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

    const navigate = useNavigate();
    const [errors, setErrors] = useState([]);

    const onSubmit = (e) => {
        e.preventDefault();

        const formData = new FormData(e.currentTarget);
        const data = Object.fromEntries(formData);

        createBurgir(data).then(res => navigate('/menu')).catch(err => setErrors(err));
    }

    return (<div className="container wrap">
        <h1>Share your own Burgir!</h1>
        <form method="POST" className="create-form" onSubmit={onSubmit}>
            <div className="form-item-wrapper">
                <label htmlFor="name">Burger name:</label>
                <input type="text" name="name" id="name" onChange={(e) => changeValue(e, 'name', setState)} />
            </div>
            <div className="form-item-wrapper">
                <label htmlFor="price">Price:</label>
                <input type="text" name="price" id="price" onChange={(e) => changeValue(e, 'price', setState)} />
            </div>
            <div className="form-item-wrapper">
                <label htmlFor="meat">Meat</label>
                <Select options={option.meatOptions} name="meat" id="meat" onChange={(e) => changeMeatValue(e, setState)} />
            </div>
            <div className="form-item-wrapper">
                <label htmlFor="vegetables">Vegetables</label>
                <Select options={option.vegetableOptions} isClearable={true}
                    isMulti={true} name="vegetables" id="vegetables"
                    onChange={(e) => arrHandler(e, 'vegetables', setState)} />
            </div>
            <div className="form-item-wrapper">
                <label htmlFor="spices">Spices</label>
                <Select options={option.spicesOptions}
                    isClearable={true} isMulti={true} name="spices" id="spices"
                    onChange={(e) => arrHandler(e, 'spices', setState)} />
            </div>
            <div className="form-item-wrapper">
                <label htmlFor="sauces">Sauces</label>
                <Select options={option.saucesOptions}
                    isClearable={true} isMulti={true} name="sauses" id="sauses"
                    onChange={(e) => arrHandler(e, 'sauses', setState)} />
            </div>
            <div className="form-item-wrapper">
                <label htmlFor="Bonus">Bonus</label>
                <Select options={option.bonusOptions}
                    isClearable={true} isMulti={true} name="bonus" id="bonus"
                    onChange={(e) => arrHandler(e, 'bonus', setState)} />
            </div>
            <div className="form-item-wrapper">
                <label htmlFor="description">Description:</label>
                <input type="text" name="description" id="description" onChange={(e) => changeValue(e, 'description', setState)} />
            </div>
            <div className="form-item-wrapper">
                <label htmlFor="imgUrl">Image Url:</label>
                <input type="text" name="imgUrl" id="imgUrl" onChange={(e) => changeValue(e, 'imgUrl', setState)} />
            </div>
            <div className="btn-wrapper-create">
                <button className="btn burgir-color">Preview</button>
                <button className="btn">Create</button>
            </div>
        </form>
        {errors.length > 0 ? <p className="p-err">Opsss you stil have some errors!</p> : ''}
    </div>);
}

export default Create;