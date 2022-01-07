import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  value: {
    totalPrice: 0,
    quantity: 0,
    burgirs: []
  },
}

export const orderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {
    addToBucket: (state, action) => {
      let totalPrice = 0;
      let quantity = 0;

      let existingBurgir = state.value.burgirs.find(x => x.name == action.payload.name);
      if (existingBurgir) {
        existingBurgir.quantity += action.payload.quantity;
      } else {
        state.value.burgirs.push({
          name: action.payload.name,
          _id: action.payload._id,
          quantity: Number(action.payload.quantity),
          singlePrice: Number(action.payload.price),
          imgUrl: action.payload.imgUrl
        })
      }

      state.value.burgirs.forEach(x => {
        totalPrice += (x.singlePrice * x.quantity);
        quantity += x.quantity;
      });

      state.value.totalPrice = totalPrice
      state.value.quantity = quantity;
    },
    changeBurgirQuantity: (state, action) => {
      let totalPrice = 0;
      let quantity = 0;

      let existingBurgir = state.value.burgirs.find(x => x.name == action.payload.name);
      existingBurgir.quantity = Number(action.payload.quantity);
      state.value.burgirs.forEach(x => {
        totalPrice += (x.singlePrice * x.quantity);
        quantity += x.quantity;
      });

      state.value.totalPrice = totalPrice
      state.value.quantity = quantity;
    },
    clearBucket: (state) => {
      state.value = initialState;
    },
    removeBurgir: (state, action) => {
      let totalPrice = 0;
      let quantity = 0;

      let existingBurgirIndex = state.value.burgirs.findIndex(x => x._id == action.payload._id);

      if (existingBurgirIndex) {
        state.value.burgirs.splice(existingBurgirIndex, 1);
      }

      state.value.burgirs.forEach(x => {
        totalPrice += (x.singlePrice * x.quantity);
        quantity += x.quantity;
      });

      state.value.totalPrice = totalPrice
      state.value.quantity = quantity;
    },
  },
})

export const { addToBucket, clearBucket, changeBurgirQuantity, removeBurgir } = orderSlice.actions;

export default orderSlice.reducer;