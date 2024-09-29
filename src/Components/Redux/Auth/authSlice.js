import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'
import { hostname } from '../../Utilities/hostname';

export const signupRoute = createAsyncThunk('signupRoute', async (payload, { rejectWithValue }) => {
    try {
        let response = await axios.post(`${hostname}/auth/signup/`, payload)

        if (response.status === 200) {
            return response.data
        } else {
            throw new Error('Error')
        }

    } catch (error) {
        console.log('Error');

        return rejectWithValue(error.response.data)
    }
});

export const loginRoute = createAsyncThunk('loginRoute', async (payload, { rejectWithValue }) => {
    try {
        let response = await axios.post(`${hostname}/auth/login/`, payload)
        if (response.status === 200) {
            return response.data
        } else {
            throw new Error('Error')
        }
    } catch (error) {
        return rejectWithValue(error.response.data)
    }
})

export const meRoute = createAsyncThunk('meRoute', async (_, { rejectWithValue }) => {
    try {
        const token = localStorage.getItem('token')

        let response = await axios.get(`${hostname}/auth/me/`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        if (response.status === 200) {
            return response.data
        } else {
            throw new Error('Error')
        }

    } catch (error) {
        return rejectWithValue(error.response.data)
    }
})

const initialState = {
    data: null,
    accessToken: null,
    authState: false,
    isLoading: false,
    error: null,
    meError: null
}


export const authSlice = createSlice({
    name: 'auth',
    initialState,
    extraReducers: (builder) => {

        //////////////      SignupRoute     //////////////////////////
        builder
            .addCase(signupRoute.pending, (state) => {
                state.isLoading = true
                state.error = null
            })
            .addCase(signupRoute.fulfilled, (state, action) => {
                let response = action.payload;
                state.isLoading = false
                state.authState = true
                localStorage.setItem('token', response.token)
                state.accessToken = response.token
            })
            .addCase(signupRoute.rejected, (state, action) => {
                state.isLoading = false
                state.error = action.payload.error
            })

        ////////////       LoginRoute      /////////////////////////
        builder
            .addCase(loginRoute.pending, (state) => {
                state.isLoading = true
                state.error = null
            })
            .addCase(loginRoute.fulfilled, (state, action) => {
                state.isLoading = false;
                localStorage.setItem('token', action.payload.token)
                state.accessToken = action.payload.token
                state.authState = true
            })
            .addCase(loginRoute.rejected, (state, action) => {
                state.isLoading = false
                state.error = action.payload.error
            })

        ////////////    meRoute     ///////////////////////////
        builder
            .addCase(meRoute.pending, (state) => {
                state.isLoading = true
                state.meError = null
            })
            .addCase(meRoute.fulfilled, (state, action) => {
                state.isLoading = false
                state.data = action.payload.data
                state.authState = true
            })
            .addCase(meRoute.rejected, (state, action) => {
                state.isLoading = false
                state.meError = action.payload.error
            })
    },
    reducers: {
    }
})

// export const { } = authSlice.actions

export default authSlice.reducer