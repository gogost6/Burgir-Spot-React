import { MultiValue, SingleValue } from "react-select";
import { InitialBurgir } from "../../interfaces/burgir";

export const arrHandler = (
    e: MultiValue<{
        value: string;
        label: string;
    }>,
    type: string,
    fnc: React.Dispatch<React.SetStateAction<InitialBurgir>>
) => {
    const arr = e.map((x) => x.value);
    fnc((oldState) => {
        return {
            ...oldState,
            [type]: arr,
        };
    });
};


export const arrValueHandler = (state: string[]) => {
    if (state) {
        return state.map((x) => {
            return { value: x, label: x };
        });
    } else {
        return { value: '', label: '' };
    }
};

export const changeValue = (
    e: React.ChangeEvent<HTMLInputElement>,
    type: string,
    fnc: React.Dispatch<React.SetStateAction<InitialBurgir>>
) => {
    const newValue = e.target.value;
    fnc((state) => {
        return {
            ...state,
            [type]: newValue,
        };
    });
};

export const changeMeatValue = (
    e: SingleValue<{
        value: string;
        label: string;
    }>,
    fnc: React.Dispatch<React.SetStateAction<InitialBurgir>>
) => {
    const newValue = e!.value;
    fnc((state) => {
        return {
            ...state,
            meat: newValue,
        };
    });
};
