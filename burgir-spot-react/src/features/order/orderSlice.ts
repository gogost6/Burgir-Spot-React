import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { OrderBurgir, BurgirQuantity } from "../../interfaces/burgir";

interface OrderState {
    value: {
        totalPrice: number;
        quantity: number;
        burgirs: OrderBurgir[];
        deliveryPrice: number;
    };
}

const initialState: OrderState = {
    value: {
        totalPrice: 0,
        quantity: 0,
        burgirs: [],
        deliveryPrice: 2.99,
    },
};

export const orderSlice = createSlice({
    name: "order",
    initialState,
    reducers: {
        freeDelivery: (state) => {
            state.value.deliveryPrice = 0;
        },
        checkBusketForItems: (state) => {
            const busket = JSON.parse(localStorage.getItem("order")!);
            if (busket !== null && busket.quantity !== 0) {
                state.value = busket;
            }
        },
        addToBucket: (state, action: PayloadAction<OrderBurgir>) => {
            let totalPrice = 0;
            let quantity = 0;

            let existingBurgir: OrderBurgir | undefined =
                state.value.burgirs.find((x) => x.name === action.payload.name);
            if (existingBurgir) {
                existingBurgir.quantity += action.payload.quantity;
            } else {
                state.value.burgirs.push({
                    ...action.payload,
                });
            }

            state.value.burgirs.forEach((x) => {
                totalPrice += x.price * x.quantity;
                quantity += x.quantity;
            });

            state.value.totalPrice = totalPrice;
            state.value.quantity = quantity;
            localStorage.setItem("order", JSON.stringify(state.value));
        },
        changeBurgirQuantity: (
            state,
            action: PayloadAction<BurgirQuantity>
        ) => {
            let totalPrice = 0;
            let quantity = 0;

            let existingBurgir = state.value.burgirs.find(
                (x) => x.name === action.payload.name
            );

            existingBurgir!.quantity = Number(action.payload.quantity);
            state.value.burgirs.forEach((x) => {
                totalPrice += x.price * x.quantity;
                quantity += x.quantity;
            });

            state.value.totalPrice = totalPrice;
            state.value.quantity = quantity;
            localStorage.setItem("order", JSON.stringify(state.value));
        },
        clearBucket: (state) => {
            state.value = initialState.value;
            localStorage.setItem("order", JSON.stringify(state.value));
        },
        removeBurgir: (state, action: PayloadAction<{_id: string}>) => {
            let totalPrice = 0;
            let quantity = 0;

            let existingBurgirIndex = state.value.burgirs.findIndex(
                (x) => x._id === action.payload._id
            );

            if (existingBurgirIndex) {
                state.value.burgirs.splice(existingBurgirIndex, 1);
            }

            state.value.burgirs.forEach((x) => {
                totalPrice += x.price * x.quantity;
                quantity += x.quantity;
            });

            state.value.totalPrice = totalPrice;
            state.value.quantity = quantity;
            localStorage.setItem("order", JSON.stringify(state.value));
        },
    },
});

export const {
    addToBucket,
    clearBucket,
    changeBurgirQuantity,
    removeBurgir,
    checkBusketForItems,
    freeDelivery,
} = orderSlice.actions;

export default orderSlice.reducer;
