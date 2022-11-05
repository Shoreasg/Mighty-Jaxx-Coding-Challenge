import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios';
import { EditProductData, ProductData, ProductState } from '../../types';


const initialState: ProductState = {
    loading: false,
    filterValue: "",
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

export const deleteProducts = createAsyncThunk('products/delete', async (sku: string, thunkApi) => {
    try {
        const config = { headers: { Authorization: `Bearer ${localStorage.getItem("userToken")}` } }
        const response = await axios.delete(`${process.env.NEXT_PUBLIC_BACKEND_URL}/deleteProduct/${sku}`, config);
        return response.data
    } catch (err: any) {
        return thunkApi.rejectWithValue(err.response.data.Error)
    }

})

export const editProducts = createAsyncThunk('products/edit', async (productData: EditProductData, thunkApi) => {
    try {
        const { newSKU, newtitle, newimageURL, SKU } = productData;
        const config = { headers: { Authorization: `Bearer ${localStorage.getItem("userToken")}` } }
        const response = await axios.put(`${process.env.NEXT_PUBLIC_BACKEND_URL}/editProduct/${SKU}`, { newSKU: newSKU, newTitle: newtitle, newImageURL: newimageURL }, config);
        return response.data
    } catch (err: any) {
        return thunkApi.rejectWithValue(err.response.data.Error)
    }

})

export const productSlice = createSlice({
    name: 'product',
    initialState,
    reducers: {
        filter: (state, action) => {
            state.loading = false;
            state.filterValue = action.payload;
        },
        clear: (state) => {
            state.loading = false;
            state.filterValue = "";
            state.productInfo = [];
            state.status = "";
        }
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
            state.filterValue = "";
        }).addCase(addProducts.rejected, (state, action) => {
            state.loading = false;
            state.status = action.payload;
            state.filterValue = "";
        }).addCase(deleteProducts.pending, (state, action) => {
            state.loading = true;
        }).addCase(deleteProducts.fulfilled, (state, action) => {
            state.loading = false;
            state.status = action.payload;
            state.filterValue = "";
        }).addCase(deleteProducts.rejected, (state, action) => {
            state.loading = false;
            state.status = action.payload;
            state.filterValue = "";
        }).addCase(editProducts.pending, (state, action) => {
            state.loading = true;
        }).addCase(editProducts.fulfilled, (state, action) => {
            state.loading = false;
            state.status = action.payload;
            state.filterValue = "";
        }).addCase(editProducts.rejected, (state, action) => {
            state.loading = false;
            state.status = action.payload;
            state.filterValue = "";
        })
    }
})

export const { filter, clear } = productSlice.actions;
export default productSlice.reducer;