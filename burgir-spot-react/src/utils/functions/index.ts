import { MultiValue } from "react-select";
import { Burgir } from "../../interfaces/burgir";

interface Fnc {
    bonus: [];
    description: string;
    imgUrl: string;
    meat: string;
    name: string;
    price: number;
    sauses: [];
    spices: [];
    vegetables: [];
}

export const arrHandler = (
    e: MultiValue<{
        value: string;
        label: string;
    }>,
    type: string,
    fnc: React.Dispatch<React.SetStateAction<Fnc>>
) => {
    const arr = e.map((x) => x.value);
    fnc((oldState) => {
        return {
            ...oldState,
            [type]: arr,
        };
    });
};

// export const arrValueHandler = (state: Burgir, type: string) => {
//     if (state[type]) {
//         return state[type].map((x: string) => {
//             return { value: x, label: x };
//         });
//     } else {
//         return "";
//     }
// };

export const changeValue = (
    e: React.ChangeEvent<HTMLInputElement>,
    type: string,
    fnc: React.Dispatch<
        React.SetStateAction<Burgir>
    >
) => {
    const newValue = e.target.value;
    fnc((state) => {
        return {
            ...state,
            [type]: newValue,
        };
    });
};

// export const changeMeatValue = (e, fnc) => {
//     const newValue = e.value;
//     fnc((state) => {
//         return {
//             ...state,
//             meat: newValue,
//         };
//     });
// };
