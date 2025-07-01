import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface WishlistProduct {
    merchandiseId: string;
    // id: string;
    title: string;
    price: number;
    oldPrice?: number; // optional
    image?: string;
    productType: string | null;
}

interface WishlistState {
    wishlistItems: WishlistProduct[];
}

const initialState: WishlistState = {
    wishlistItems: [],
};

const wishlistSlice = createSlice({
    name: 'wishlist',
    initialState,
    reducers: {
        toggleProduct: (state, action: PayloadAction<WishlistProduct>) => {
            const index = state.wishlistItems.findIndex(
                (item) => item.merchandiseId === action.payload.merchandiseId
            );
            if (index === -1) {
                state.wishlistItems.push(action.payload);
            } else {
                state.wishlistItems.splice(index, 1);
            }
        },

        removeProduct: (state, action: PayloadAction<{ merchandiseId: string }>) => {
            state.wishlistItems = state.wishlistItems.filter(
                (item) => item.merchandiseId !== action.payload.merchandiseId
            );
        },

        // isInWishlist: (state, action: PayloadAction<{ merchandiseId: string }>, merchandiseId: string): boolean => {
        //     return state.wishlistItems.some(item => item.merchandiseId === merchandiseId);
        // },
    },
});

export const { toggleProduct, removeProduct } = wishlistSlice.actions;
export default wishlistSlice.reducer;