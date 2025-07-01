import { removeProduct, toggleProduct, WishlistProduct } from '../reducers/wishListReducers';

// Add product thunk
export const addProductToWishlist = (product: WishlistProduct) => (dispatch: any) => {
    dispatch(toggleProduct(product));
};

// Remove product thunk
export const removeProductFromWishlist = (merchandiseId: string) => (dispatch: any) => {
    dispatch(removeProduct({ merchandiseId }));
};

// Empty entire cart thunk
// export const checkWishlistStatus = (merchandiseId: string) => (dispatch: any) => {
//     dispatch(isInWishlist(merchandiseId));
// };

export const checkWishlistStatus = (merchandiseId: string) => (dispatch: any, getState: any): boolean => {
    const state = getState();
    return state.wishlist.wishlistItems.some(
        (item: WishlistProduct) => item.merchandiseId === merchandiseId
    );
};