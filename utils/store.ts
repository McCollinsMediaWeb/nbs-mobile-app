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
import productReducer from './reducers/productReducers';
import userReducer from "./reducers/userReducers";

const rootReducer = combineReducers({
    user: userReducer,
    collections: collectionReducer,
    product: productReducer,
    cart: cartReducer
});

const persistConfig = {
    key: "root",
    storage: AsyncStorage,
    blacklist: ["collections"], // optional
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

