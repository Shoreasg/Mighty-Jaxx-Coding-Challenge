import { createSlice } from '@reduxjs/toolkit'

interface AuthState {
    loading: boolean,
    userInfo: string,
    userToken: string,
    error:any,
}

const initialState: AuthState = {
    loading: false,
    userInfo: "",
    userToken: "",
    error: null,
}

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {},
    extraReducers: {}
})


export default authSlice.reducer;