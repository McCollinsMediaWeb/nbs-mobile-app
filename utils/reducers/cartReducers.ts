import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface CartProduct {
    merchandiseId: string;
    id: string;
    title: string;
    price: number;
    oldPrice?: number; // optional
    quantity: number;
    image?: string;
    productType: string;
}

interface CartState {
    cartItems: CartProduct[];
}

const initialState: CartState = {
    cartItems: [],
};

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addProduct: (state, action: PayloadAction<CartProduct>) => {
            const existing = state.cartItems.find(
                (item) => item.merchandiseId === action.payload.merchandiseId
            );

            if (existing) {
                existing.quantity += action.payload.quantity;
            } else {
                state.cartItems.push(action.payload);
            }
        },

        incrementProduct: (state, action: PayloadAction<{ merchandiseId: string }>) => {
            const existing = state.cartItems.find(
                (item) => item.merchandiseId === action.payload.merchandiseId
            );
            if (existing) {
                existing.quantity += 1;
            }
        },

        decrementProduct: (state, action: PayloadAction<{ merchandiseId: string }>) => {
            const existing = state.cartItems.find(
                (item) => item.merchandiseId === action.payload.merchandiseId
            );
            if (existing && existing.quantity > 1) {
                existing.quantity -= 1;
            }
        },

        removeProduct: (state, action: PayloadAction<{ merchandiseId: string }>) => {
            state.cartItems = state.cartItems.filter(
                (item) => item.merchandiseId !== action.payload.merchandiseId
            );
        },

        emptyCart: (state) => {
            console.log("here is backend")
            state.cartItems = [];
        },
    },
});

export const { addProduct, incrementProduct, decrementProduct, removeProduct, emptyCart } = cartSlice.actions;
export default cartSlice.reducer;