import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios';

interface ProductState {
    loading: boolean,
    productInfo: any
    status: any
}

interface ProductData {
    SKU: string;
    title: string;
    imageURL: string;
}

const initialState: ProductState = {
    loading: false,
    productInfo: [],
    status: ""
}



export const getProducts = createAsyncThunk('products/get', async () => {
    try {
        const config = { headers: { Authorization: `Bearer ${localStorage.getItem("userToken")}` } }
        const response = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/getProducts`, config);
        return response.data
    } catch (err: any) {
        return Promise.reject();
    }

})

export const addProducts = createAsyncThunk('products/add', async (productData: ProductData, thunkApi) => {
    try {
        const config = { headers: { Authorization: `Bearer ${localStorage.getItem("userToken")}` } }
        const response = await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_URL}/addProduct`, productData, config);
        return response.data
    } catch (err: any) {
        return thunkApi.rejectWithValue(err.response.data.Error)
    }

})

export const productSlice = createSlice({
    name: 'product',
    initialState,
    reducers: {
    },
    extraReducers: (builder) => {
        builder.addCase(getProducts.pending, (state) => {
            state.loading = true;
        }).addCase(getProducts.fulfilled, (state, action) => {
            state.productInfo = action.payload.allProducts;
            state.loading = false;
        }).addCase(getProducts.rejected, (state, action) => {
            state.loading = false;
            state.status = action.payload;
        }).addCase(addProducts.pending, (state) => {
            state.loading = true;
        }).addCase(addProducts.fulfilled, (state, action) => {
            state.loading = false;
            state.status = action.payload;
        }).addCase(addProducts.rejected, (state, action) => {
            state.loading = false;
            state.status = action.payload;
        })
    }
})


export default productSlice.reducer;