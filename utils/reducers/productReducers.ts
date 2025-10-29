import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Product {
    id: string;
    title: string;
    handle: string;
    descriptionHtml: string;
    productType: string;
    vendor: string;
    tags?: string[] | null;
    images: {
        src: string;
    }[];
    variants: {
        id: string;
        sku: string | null;
        title: string;
        price: string;
        oldPrice: string;
        image: string;
        available: boolean;
    }[];
    specificationValues?: string | null; // new
    features?: string | null;
    supportingFile?: string | null;
}

interface ProductState {
    data: Product | null;
    status: string | null;
    error: string | null;
}

const initialState: ProductState = {
    data: null,
    status: null,
    error: null,
};


const productSlice = createSlice({
    name: 'product',
    initialState,
    reducers: {
        fetchProductStart: (state) => {
            state.status = "loading";
            state.error = null;
        },
        fetchProductSuccess: (
            state,
            action: PayloadAction<{ product: Product }>
        ) => {
            state.status = "success";
            state.data = action.payload.product;
        },
        fetchProductFailure: (state, action: PayloadAction<string>) => {
            state.status = "failed";
            state.error = action.payload;
        },
        clearProduct: (state) => {
            return { ...initialState };
        },
    }
});

export const { fetchProductStart, fetchProductSuccess, fetchProductFailure, clearProduct } = productSlice.actions;
export default productSlice.reducer;
