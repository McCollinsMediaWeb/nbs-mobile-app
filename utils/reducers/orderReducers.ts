import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface OrderState {
    orderItems: any;
    loading: boolean;
    error: string | null;
    orderUrl: any;
    urlLoading: boolean;
}

const initialState: OrderState = {
    orderItems: [],
    loading: false,
    error: null,
    orderUrl: "",
    urlLoading: false,
};

const ordersSlice = createSlice({
    name: 'orders',
    initialState,
    reducers: {
        orderFetchStart: (state) => {
            state.loading = true;
            state.error = null;
        },
        orderFetchSuccess: (
            state,
            action: PayloadAction<{
                orderItems: any
            }>
        ) => {
            state.loading = false;
            state.orderItems = action.payload.orderItems;
        },
        orderFetchFailure: (state, action: PayloadAction<string>) => {
            state.loading = false;
            state.error = action.payload;
        },
        orderUrlAdd: (state, action: PayloadAction<any>) => {
            state.orderUrl = action.payload.orderUrl;
            state.urlLoading = false;
        },
        orderUrlLoading: (state, action: PayloadAction<any>) => {
            state.urlLoading = true;
        },
    },
});

export const { orderFetchStart, orderFetchSuccess, orderFetchFailure, orderUrlAdd, orderUrlLoading } = ordersSlice.actions;
export default ordersSlice.reducer;