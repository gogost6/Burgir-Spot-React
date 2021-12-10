export const arrHandler = (e, type, fnc) => {
    const arr = e.map(x => x.value);
    fnc(oldState => {
        return {
            ...oldState,
            [type]: arr
        }
    })
};

export const arrValueHandler = (state, type) => {
    if (state[type]) {
        return state[type].map(x => { return { value: x, label: x } });
    } else {
        return '';
    }
};

export const changeValue = (e, type, fnc) => {
    const newValue = e.target.value;
    fnc((state) => {
        return {
            ...state,
            [type]: newValue
        }
    });
};

export const changeMeatValue = (e, fnc) => {
    const newValue = e.value;
    fnc((state) => {
        return {
            ...state,
            meat: newValue
        }
    });
}

