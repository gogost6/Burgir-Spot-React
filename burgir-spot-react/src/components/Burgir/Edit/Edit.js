import Select from 'react-select';
import * as option from '../options';
import { arrHandler, arrValueHandler, changeValue, changeMeatValue } from '../index'
import { burgirDetails, editBurgir } from '../../../services/foodService';
import { useNavigate } from "react-router";
import { useState, useEffect } from "react";
import { useParams } from 'react-router-dom';
import * as utils from '../../../utils/styles';

const Edit = () => {
    const params = useParams();
    const { id } = params;

    const navigate = useNavigate();

    const [error, setError] = useState('');
    let [isSubmitted, setIsSubmitted] = useState(false);
    let [nameHover, setNameHover] = useState(false);
    let [priceHover, setPriceHover] = useState(false);
    let [imgUrlHover, setImgHover] = useState(false);

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

    const colorStyles = {
        control: (styles) => ({ ...styles, 'border': '2px solid red' }),
    }

    useEffect(() => {
        if (id) {
            burgirDetails(id)
                .then(res => {
                    setBurgir(res);
                }).catch(err => console.log(err));
        }
    }, [id]);

    const onSubmit = (e) => {
        e.preventDefault();
        setError('');
        setIsSubmitted(true);
        editBurgir(burgir, id).then(res => navigate('/menu')).catch(err => setError('Please fill all fields!'));
    }

    return (<div className="container wrap">
        <h1 className="h1">Edit your burgir!</h1>
        <form method="POST" className="create-form" onSubmit={onSubmit}>
            <div className="form-item-wrapper">
                <label htmlFor="name">*Burgir name:</label>
                <input type="text" name="name" id="name" value={burgir.name}
                    className="required"
                    onChange={(e) => changeValue(e, 'name', setBurgir)}
                    onMouseEnter={() => {
                        setNameHover(true);
                    }}
                    onMouseLeave={() => {
                        setNameHover(false);
                    }}
                    style={{
                        ...utils.inputBorderStyle.normal,
                        ...(nameHover ? utils.inputBorderStyle.hover : null),
                        ...(burgir.name === '' && isSubmitted ? utils.inputBorderStyle.error : null),
                    }}
                />
            </div>
            <div className="form-item-wrapper">
                <label htmlFor="price">*Price:</label>
                <input type="text" name="price" id="price" value={burgir.price}
                    className="required"
                    onChange={(e) => changeValue(e, 'price', setBurgir)}
                    onMouseEnter={() => {
                        setPriceHover(true);
                    }}
                    onMouseLeave={() => {
                        setPriceHover(false);
                    }}
                    style={{
                        ...utils.inputBorderStyle.normal,
                        ...(priceHover ? utils.inputBorderStyle.hover : null),
                        ...(burgir.price == 0 && isSubmitted ? utils.inputBorderStyle.error : null),
                        ...(burgir.price === '' && isSubmitted ? utils.inputBorderStyle.error : null),
                    }}
                />
            </div>
            <div className="form-item-wrapper">
                <label htmlFor="meat">*Meat</label>
                <Select options={option.meatOptions}
                    name="meat" id="meat"
                    value={[{ value: burgir.meat, label: burgir.meat }]}
                    onChange={(e) => changeMeatValue(e, setBurgir)}
                    styles={burgir.meat == '' && isSubmitted ? colorStyles : ''}
                />
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
                <label htmlFor="imgUrl">*Image Url:</label>
                <input type="text" name="imgUrl" id="imgUrl"
                    value={burgir.imgUrl}
                    onChange={(e) => changeValue(e, 'imgUrl', setBurgir)}
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
                        ...(burgir.imgUrl === '' && isSubmitted ? utils.inputBorderStyle.error : null),
                    }}
                />
            </div>
            <div className="btn-wrapper-create">
                {/* <button className="btn burgir-color">Preview</button> */}
                <button className="btn">Edit</button>
            </div>
        </form>
        <p style={{ 'marginLeft': '200px', 'fontSize': '12px' }}>Inputs with * are required!</p>
        <p className={error !== '' ? 'p-err hidethis' : ''} style={{ 'opacity': 1, 'display': 'block' }}>{error}</p>
    </div>);
}

export default Edit;