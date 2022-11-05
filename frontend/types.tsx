export interface FormData {
    email: string;
    password: string;
}

export interface AuthState {
    loading: boolean,
    userInfo: string,
    error: any,
}

export interface ProductState {
    loading: boolean,
    filterValue: string,
    productInfo: any
    status: any
}

export interface ProductData {
    SKU: string;
    title: string;
    imageURL: string;
}

export interface EditProductData {
    newSKU: string;
    newtitle: string;
    newimageURL: string;
    SKU: string;
}