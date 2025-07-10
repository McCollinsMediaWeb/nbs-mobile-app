import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface RecommendedProductsState {
    data: any;
    loading: boolean;
    error: string | null;
}

const initialState: RecommendedProductsState = {
    data: [],
    loading: false,
    error: null,
};

const recommendedProductsSlice = createSlice({
    name: 'recommendedProducts',
    initialState,
    reducers: {
        recommendedProductsStart: (state) => {
            state.loading = true;
            state.error = null;
        },
        recommendedProductsSuccess: (
            state,
            action: PayloadAction<any>
        ) => {
            state.loading = false;
            state.data = action.payload;
        },
        recommendedProductsFailure: (state, action: PayloadAction<string>) => {
            state.loading = false;
            state.error = action.payload;
        },
    },
});

export const {
    recommendedProductsStart,
    recommendedProductsSuccess,
    recommendedProductsFailure,
} = recommendedProductsSlice.actions;

export default recommendedProductsSlice.reducer;
