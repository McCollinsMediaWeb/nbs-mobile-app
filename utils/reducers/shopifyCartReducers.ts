import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface ShopifyCartState {
    checkoutUrl: string | null;
    loading: boolean;
    error: string | null;
};

const initialState: ShopifyCartState = {
    checkoutUrl: null,
    loading: false,
    error: null,
};

const shopifyCartSlice = createSlice({
    name: 'shopifyCart',
    initialState,
    reducers: {
        shopifyCartCreateStart: (state) => {
            state.loading = true;
            state.error = null;
        },
        shopifyCartCreateSuccess: (
            state,
            action: PayloadAction<{
                checkoutUrl: string | null;
            }>
        ) => {
            state.loading = false;
            state.checkoutUrl = action.payload.checkoutUrl;
        },
        shopifyCartCreateFailure: (state, action: PayloadAction<string>) => {
            state.loading = false;
            state.error = action.payload;
        }
    },
});

export const {
    shopifyCartCreateStart,
    shopifyCartCreateSuccess,
    shopifyCartCreateFailure
} = shopifyCartSlice.actions;

export default shopifyCartSlice.reducer;
