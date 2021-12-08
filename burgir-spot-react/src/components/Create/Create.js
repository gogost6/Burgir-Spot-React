import "./Create.css";
import Select from 'react-select';
import * as option from './selectOptions';
import { createBurgir } from '../../services/foodService';
import { useNavigate } from "react-router";
import { useState } from "react";

const Create = () => {
    const navigate = useNavigate();
    const [errors, setErrors] = useState([]);
    const onSubmit = (e) => {
        e.preventDefault();

        const formData = new FormData(e.currentTarget);
        const data = Object.fromEntries(formData);
        createBurgir(data).then(res => navigate('/menu')).catch(err => setErrors(err));
    }

    return (
        <div className="container wrap">
            <h1>Share your own Burgir!</h1>
            <form method="POST" className="create-form" onSubmit={onSubmit}>
                <div className="form-item-wrapper">
                    <label htmlFor="name">Burger name:</label>
                    <input type="text" name="name" id="name" />
                </div>
                <div className="form-item-wrapper">
                    <label htmlFor="price">Price:</label>
                    <input type="text" name="price" id="price" />
                </div>
                <div className="form-item-wrapper">
                    <label htmlFor="meat">Meat</label>
                    <Select options={option.meatOptions} name="meat" id="meat"/>
                </div>
                <div className="form-item-wrapper">
                    <label htmlFor="vegetables">Vegetables</label>
                    <Select options={option.vegetableOptions} isClearable={true} isMulti={true} name="vegetables" id="vegetables"/>
                </div>
                <div className="form-item-wrapper">
                    <label htmlFor="spices">Spices</label>
                    <Select options={option.spicesOptions} isClearable={true} isMulti={true} name="spices" id="spices"/>
                </div>
                <div className="form-item-wrapper">
                    <label htmlFor="sauces">Sauces</label>
                    <Select options={option.saucesOptions} isClearable={true} isMulti={true} name="sauces" id="sauces"/>
                </div>
                <div className="form-item-wrapper">
                    <label htmlFor="Bonus">Bonus</label>
                    <Select options={option.bonusOptions} isClearable={true} isMulti={true} name="bonus" id="bonus" />
                </div>
                <div className="form-item-wrapper">
                    <label htmlFor="description">Description:</label>
                    <input type="text" name="description" id="description" />
                </div>
                <div className="form-item-wrapper">
                    <label htmlFor="imgUrl">Image Url:</label>
                    <input type="text" name="imgUrl" id="imgUrl" />
                </div>
                <div className="btn-wrapper-create">
                    <button className="btn burgir-color">Preview</button>
                    <button className="btn">Create</button>
                </div>
            </form>
            {errors.length > 0 ? <p className="p-err">Opsss you stil have some errors!</p> : ''}
        </div>
    )
}

export default Create;