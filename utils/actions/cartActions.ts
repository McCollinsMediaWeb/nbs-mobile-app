import { addProduct, CartProduct, emptyCart, removeProduct } from '../reducers/cartReducers';

// Add product thunk
export const addProductToCart = (product: CartProduct) => (dispatch: any) => {
    dispatch(addProduct(product));
};

// Remove product thunk
export const removeProductFromCart = (merchandiseId: string) => (dispatch: any) => {
    dispatch(removeProduct({ merchandiseId }));
};

// Empty entire cart thunk
export const emptyCartThunk = () => (dispatch: any) => {
    dispatch(emptyCart());
};