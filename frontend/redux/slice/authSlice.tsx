import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios';

interface AuthState {
    loading: boolean,
    userInfo: string,
    error: any,
}

interface FormData {
    email: string;
    password: string;
}

const initialState: AuthState = {
    loading: false,
    userInfo: "",
    error: "",
}

export const loginUser = createAsyncThunk('auth/login', async (formData: FormData, thunkApi) => {
    try {
        const response = await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_URL}/login`, formData);
        return response.data
    } catch (err: any) {
        return thunkApi.rejectWithValue(err.response.data.Error)
    }

})

export const checkUser = createAsyncThunk('auth/checkUser', async (jwtToken: {}, thunkApi) => {
    try {
        const response = await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_URL}/checkUser`, jwtToken);
        return response.data
    } catch (err: any) {
        return thunkApi.rejectWithValue(err.response.data.Error)
    }

})

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        logout: (state) => {
            localStorage.clear();
            state.loading = false;
            state.userInfo = "";
            state.error = "";
        }
    },
    extraReducers: (builder) => {
        builder.addCase(loginUser.pending, (state) => {
            state.loading = true;
        }).addCase(loginUser.fulfilled, (state, action) => {
            localStorage.setItem('userToken', action.payload.accessToken);
            state.loading = false;
        }).addCase(loginUser.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        }).addCase(checkUser.fulfilled, (state, action) => {
            state.loading = false
            state.userInfo = action.payload;
        }).addCase(checkUser.rejected, (state, action) => {
            state.loading = false;
            state.userInfo = "";
            state.error = action.payload;
        }).addCase(checkUser.pending, (state) => {
            state.loading = true;
            state.userInfo = "";
            state.error = "";
        })
    }
})

export const { logout } = authSlice.actions;

export default authSlice.reducer;