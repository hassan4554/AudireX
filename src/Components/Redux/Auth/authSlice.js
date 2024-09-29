import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

export const signupRoute = createAsyncThunk('signupRoute', async (payload) => {
    try {
        let response = await axios.post(`http://localhost:3000/auth/signup/`, payload)
        return response.data
    } catch (error) {
        return error.response.data
    }
});

export const loginRoute = createAsyncThunk('loginRoute', async (payload) => {
    try {
        let response = await axios.post(`http://localhost:3000/auth/login/`, payload)
        return response.data
    } catch (error) {
        return error.response.data
    }
})

export const meRoute = createAsyncThunk('meRoute', async () => {
    try {
        const token = localStorage.getItem('token')

        let response = await axios.get(`http://localhost:3000/auth/me/`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        return response.data
    } catch (error) {
        return error.response.data
    }
})

const initialState = {
    data: '',
    accessToken: '',
    authState: false,
    isLoading: false
}


export const authSlice = createSlice({
    name: 'auth',
    initialState,
    extraReducers: (builder) => {

        //////////////      SignupRoute     //////////////////////////
        builder
            .addCase(signupRoute.pending, (state) => {
                state.isLoading = true
            })
            .addCase(signupRoute.fulfilled, (state, action) => {
                let response = action.payload;
                console.log(response)
                state.isLoading = false

                if (response.error) {
                    console.log(response.error)
                    state.authState = false
                } else {
                    console.log(response.message)
                    state.authState = true
                    localStorage.setItem('token', response.token)
                    state.accessToken = response.token
                }
            })
            .addCase(signupRoute.rejected, (state, action) => {
                console.log('Rejected')
                state.isLoading = false
                console.log(action.payload)
            })

        ////////////       LoginRoute      /////////////////////////
        builder
            .addCase(loginRoute.pending, (state) => {
                state.isLoading = true
            })
            .addCase(loginRoute.fulfilled, (state, action) => {
                state.isLoading = false;
                if (action.payload.error) {
                    console.log(action.payload.error)
                } else {
                    console.log(action.payload.message)

                    if (action.payload.error == null && action.payload.token) {
                        localStorage.setItem('token', action.payload.token)
                        state.accessToken = action.payload.token
                        state.authState = true
                    }
                }
            })
            .addCase(loginRoute.rejected, (state, action) => {
                console.log('Login Rejected')
                state.isLoading = false
                console.log(action)
            })

        ////////////    meRoute     ///////////////////////////
        builder
            .addCase(meRoute.pending, (state) => {
                state.isLoading = true
            })
            .addCase(meRoute.fulfilled, (state, action) => {
                const response = action.payload
                state.isLoading = false

                if (response.error) {
                    console.log(response.error)
                    state.authState = false
                } else {
                    console.log(response.message)
                    state.data = action.payload.data
                    state.authState = true
                }
            })
            .addCase(meRoute.rejected, (state, action) => {
                console.log('Rejected')
                state.isLoading = false
                console.log(action)
            })
    },
    reducers: {
        protectedRoute: (state) => {
            let token = localStorage.getItem('token');
            axios.get(`http://localhost:3000/auth/protected-route`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
                .then(response => {
                    console.log(response)
                    state.value = response.data
                })
                .catch(error => console.log(error))
        }
    }
})

export const { protectedRoute } = authSlice.actions

export default authSlice.reducer