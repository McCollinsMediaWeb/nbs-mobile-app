// // redux/store.ts
// import { configureStore } from '@reduxjs/toolkit';
// import authReducer from './reducers/userReducers';

// export const store = configureStore({
//     reducer: {
//         auth: authReducer,
//     },
// });


import AsyncStorage from "@react-native-async-storage/async-storage";
import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "redux";
import { persistReducer, persistStore } from "redux-persist";

import cartReducer from './reducers/cartReducers';
import collectionReducer from './reducers/collectionReducers';
import generalSettingsReducer from "./reducers/generalSettingsReducers";
import orderReducer from "./reducers/orderReducers";
import productReducer from './reducers/productReducers';
import recommendedProductsReducer from "./reducers/recommendedProductsReducers";
import searchReducer from "./reducers/searchReducers";
import selectedAddressReducer from './reducers/selectedAddressReducers';
import shopifyCartReducer from "./reducers/shopifyCartReducers";
import userReducer from "./reducers/userReducers";
import wishlistReducer from "./reducers/wishListReducers";

const rootReducer = combineReducers({
    user: userReducer,
    collections: collectionReducer,
    product: productReducer,
    cart: cartReducer,
    selectedAddress: selectedAddressReducer,
    wishlist: wishlistReducer,
    shopifyCart: shopifyCartReducer,
    orders: orderReducer,
    search: searchReducer,
    recommendedProducts: recommendedProductsReducer,
    generalSettings: generalSettingsReducer
});

const persistConfig = {
    key: "root",
    storage: AsyncStorage,
    blacklist: ["collections", "selectedAddress", "shopifyCart", "orders"], // optional
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            immutableCheck: false,
            serializableCheck: false,
        }),
});

const persistor = persistStore(store);


export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export { persistor, store };

