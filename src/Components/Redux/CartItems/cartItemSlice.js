import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    value: [],
}

export const cartItemSlice = createSlice({
    name: 'cartItems',
    initialState,
    reducers: {
        incrementCartItem: (state, action) => {
            let item = action.payload;
            let array = state.value;
            let index = array.findIndex(cartItem => cartItem.id == item.id);
            if (index >= 0) {
                ++state.value[index].quantity;
            }
            else {
                state.value.push(item);
            }
        },
        decrementCartItem: (state, action) => {
            let item = action.payload;
            let index = state.value.findIndex(cartItem => cartItem.id == item.id);
            --state.value[index].quantity;
        },
        removeCartItem: (state, action) => {
            state.value = state.value.filter(product => product.id != action.payload.id);
        }
    },
})

export const { incrementCartItem, decrementCartItem, removeCartItem } = cartItemSlice.actions

export default cartItemSlice.reducer