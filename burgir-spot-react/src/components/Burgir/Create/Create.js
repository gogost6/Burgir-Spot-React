import "./Create.css";
import Select from 'react-select';
import * as option from '../options';
import { addBurgirToUserModel } from '../../../features/user/userSlice';
import { createBurgir } from '../../../services/foodService';
import { arrHandler, changeValue, changeMeatValue } from '../index';
import { useNavigate } from "react-router";
import { useState } from "react";
import * as utils from '../../../utils/styles'
import { useAppDispatch } from "../../../app/hooks";

const Create = () => {
    const dispatch = useAppDispatch();
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

    const colorStyles = {
        control: (styles) => ({ ...styles, 'border': '2px solid red' }),
    }

    let [error, setError] = useState('');

    let [nameHover, setNameHover] = useState(false);
    let [priceHover, setPriceHover] = useState(false);
    let [imgUrlHover, setImgHover] = useState(false);

    let [isSubmitted, setIsSubmitted] = useState(false);

    const navigate = useNavigate();

    const onSubmit = (e) => {
        e.preventDefault();
        setError('');
        setIsSubmitted(true);
        createBurgir(state).then(res => {
            dispatch(addBurgirToUserModel(res._id));
            navigate('/menu')
        }).catch(err => setError('Please fill all fields!'));
    }

    return (<div className="container wrap">
        <h1 className="h1">Share your own Burgir!</h1>
        <form method="POST" className="create-form" onSubmit={onSubmit}>
            <div className="form-item-wrapper">
                <label htmlFor="name">*Burger name:</label>
                <input type="text" name="name" id="name" value={state.name}
                    className="required"
                    onChange={(e) => changeValue(e, 'name', setState)}
                    onMouseEnter={() => {
                        setNameHover(true);
                    }}
                    onMouseLeave={() => {
                        setNameHover(false);
                    }}
                    style={{
                        ...utils.inputBorderStyle.normal,
                        ...(nameHover ? utils.inputBorderStyle.hover : null),
                        ...(state.name === '' && isSubmitted ? utils.inputBorderStyle.error : null),
                    }} />
            </div>
            <div className="form-item-wrapper">
                <label htmlFor="price">*Price:</label>
                <input type="number" name="price" id="price"
                    className="required"
                    onChange={(e) => changeValue(e, 'price', setState)}
                    onMouseEnter={() => {
                        setPriceHover(true);
                    }}
                    onMouseLeave={() => {
                        setPriceHover(false);
                    }}
                    style={{
                        ...utils.inputBorderStyle.normal,
                        ...(priceHover ? utils.inputBorderStyle.hover : null),
                        ...(state.price === 0 && isSubmitted ? utils.inputBorderStyle.error : null),
                        ...(state.price === '' && isSubmitted ? utils.inputBorderStyle.error : null),
                    }}
                />
            </div>
            <div className="form-item-wrapper">
                <label htmlFor="meat">*Meat</label>
                <Select options={option.meatOptions} name="meat" id="meat"
                    onChange={(e) => changeMeatValue(e, setState)}
                    styles={state.meat === '' && isSubmitted ? colorStyles : ''}
                />
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
                <label htmlFor="imgUrl">*Image Url:</label>
                <input type="text" name="imgUrl" id="imgUrl"
                    onChange={(e) => changeValue(e, 'imgUrl', setState)}
                    className="required"
                    onMouseEnter={() => {
                        setImgHover(true);
                    }}
                    onMouseLeave={() => {
                        setImgHover(false);
                    }}
                    style={{
                        ...utils.inputBorderStyle.normal,
                        ...(imgUrlHover ? utils.inputBorderStyle.hover : null),
                        ...(state.imgUrl === '' && isSubmitted ? utils.inputBorderStyle.error : null),
                    }} />
            </div>
            <div className="btn-wrapper-create">
                {/* <button className="btn burgir-color">Preview</button> */}
                <button className="btn">Create</button>
            </div>
        </form>
        <p style={{ 'marginLeft': '200px', 'fontSize': '12px' }}>Inputs with * are required!</p>
        <p className={error !== '' ? 'p-err hidethis' : ''}
            style={{
                'opacity': 1,
                'display': 'block',
                position: 'absolute',
                top: '62%',
                left: '25%'
            }}>{error}</p>
    </div>);
}

export default Create;