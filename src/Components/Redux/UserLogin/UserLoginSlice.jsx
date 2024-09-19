import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    value: {},
}

export const UserLoginSlice = createSlice({
    name: 'userLogin',
    initialState,
    reducers: {
        addUser: (state, action) => {
            let info = action.payload;
            state.value = { ...info };
        }
    },
})

export const { addUser } = UserLoginSlice.actions

export default UserLoginSlice.reducer