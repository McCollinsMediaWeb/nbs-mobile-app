import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Product {
  products: any;
  id: string;
  title: string;
  handle: string;
  productType: string;
  image: string;
  price: string;
  currency: string;
}

interface CollectionState {
    data: Product[];       // array of products
    status: string | null; // "loading" | "success" | "failed"
    error: string | null;
    hasNextPage: boolean;
    cursor: string | null;
}

const initialState: CollectionState = {
    data: [],
    status: null,
    error: null,
    hasNextPage: true,
    cursor: null,
};

const collectionSlice = createSlice({
    name: 'collections',
    initialState,
    reducers: {
        fetchCollectionStart: (state) => {
            state.status = "loading";
            state.error = null;
        },
        fetchCollectionSuccess: (
            state,
            action: PayloadAction<{
                products: Product[];
                hasNextPage: boolean;
                cursor: string | null;
            }>
        ) => {
            state.status = "success";
            state.data = [...state.data, ...action.payload.products]; // Append for pagination
            state.hasNextPage = action.payload.hasNextPage;
            state.cursor = action.payload.cursor;
        },
        fetchCollectionFailure: (state, action: PayloadAction<string>) => {
            state.status = "failed";
            state.error = action.payload;
        }
    }
});

export const { fetchCollectionStart, fetchCollectionSuccess, fetchCollectionFailure } = collectionSlice.actions;
export default collectionSlice.reducer;
