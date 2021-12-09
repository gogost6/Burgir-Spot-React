import "./Create.css";
import Select from 'react-select';
import * as option from './selectOptions';
import { createBurgir, burgirDetails, editBurgir } from '../../services/foodService';
import { useNavigate } from "react-router";
import { useState, useEffect } from "react";
import { useParams } from 'react-router-dom';

import makeAnimated from 'react-select/animated';

const animatedComponents = makeAnimated();

const Create = () => {
    const params = useParams();
    const { id } = params;
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

    useEffect(() => {
        if (id) {
            burgirDetails(id).then(res => setBurgir(res)).catch(err => console.log(err));
        }
    }, []);

    const navigate = useNavigate();
    const [errors, setErrors] = useState([]);

    const arrHandler = (e, type, fnc) => {
        const arr = e.map(x => x.value);
        fnc(oldState => {
            return {
                ...oldState,
                [type]: arr
            }
        })
    };

    const arrValueHandler = (type) => {
        if (burgir[type]) {
            return burgir[type].map(x => { return { value: x, label: x } });
        } else {
            return '';
        }
    };

    const changeValue = (e, type, fnc) => {
        const newValue = e.target.value;
        fnc((state) => {
            return {
                ...state,
                [type]: newValue
            }
        });
    };

    const changeMeatValue = (e, fnc) => {
        const newValue = e.value;
        fnc((state) => {
            return {
                ...state,
                meat: newValue
            }
        });
    }

    const onSubmit = (e) => {
        e.preventDefault();

        const formData = new FormData(e.currentTarget);
        const data = Object.fromEntries(formData);
        if (burgir.name) {
            editBurgir(burgir, id).then(res => navigate('/menu')).catch(err => setErrors(err));
        } else {
            createBurgir(data).then(res => navigate('/menu')).catch(err => setErrors(err));
        }
    }

    const createComponent =
        (<div className="container wrap">
            <h1>{burgir.name ? 'Edit your burgir!' : 'Share your own Burgir!'}</h1>
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
                        isMulti={true} name="vegetables" id="vegetables" components={makeAnimated}
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

    const editComponent = (<div className="container wrap">
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
                    onChange={(e) => changeMeatValue(e, setState)} />
            </div>
            <div className="form-item-wrapper">
                <label htmlFor="vegetables">Vegetables</label>
                <Select options={option.vegetableOptions} isClearable={true} isMulti={true}
                    name="vegetables" id="vegetables" onChange={(e) => arrHandler(e, 'vegetables', setBurgir)} value={arrValueHandler('vegetables')} />
            </div>
            <div className="form-item-wrapper">
                <label htmlFor="spices">Spices</label>
                <Select options={option.spicesOptions} isClearable={true} isMulti={true}
                    name="spices" id="spices" onChange={(e) => arrHandler(e, 'spices', setBurgir)} value={arrValueHandler('spices')} />
            </div>
            <div className="form-item-wrapper">
                <label htmlFor="sauses">Sauces</label>
                <Select options={option.saucesOptions} isClearable={true} isMulti={true}
                    name="sauses" id="sauses" onChange={(e) => arrHandler(e, 'sauses', setBurgir)} value={arrValueHandler('sauses')} />
            </div>
            <div className="form-item-wrapper">
                <label htmlFor="Bonus">Bonus</label>
                <Select options={option.bonusOptions} isClearable={true} isMulti={true}
                    name="bonus" id="bonus" onChange={(e) => arrHandler(e, 'bonus', setBurgir)} value={arrValueHandler('bonus')} />
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


    return (
        <>
            {burgir.name ? editComponent : createComponent}
        </>
    )
}

export default Create;