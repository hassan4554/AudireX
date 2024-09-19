import { configureStore } from '@reduxjs/toolkit'
import cartReducer from './CartItems/cartItemSlice.js'
import UserLoginReducer from './UserLogin/UserLoginSlice.jsx'

export const store = configureStore({
    reducer: {
        cartItems: cartReducer,
        userLogin: UserLoginReducer,
    },
})