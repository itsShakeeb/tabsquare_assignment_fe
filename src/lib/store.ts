import { combineReducers, configureStore } from '@reduxjs/toolkit'
import { api } from './api'
import cartReducer from './features/cart/cartSlice'
import authReducer from './features/auth/authSlice'
import { persistReducer, persistStore } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import itemReducer from './features/item/itemSlice'

const reducers = {
    [api.reducerPath]: api.reducer,
    cart: cartReducer,
    auth: authReducer,
    items: itemReducer
}

const rootReducer = combineReducers(reducers);
const persistConfig = { key: "root", storage, whitelist: ["auth"] };
const persistedReducer = persistReducer(persistConfig, rootReducer);
export const makeStore = () => {
    return configureStore({
        reducer: persistedReducer,
        devTools: process.env.NODE_ENV !== 'production',
        middleware: (getDefaultMiddleware) =>
            getDefaultMiddleware({
                serializableCheck: false,
            }).concat(api.middleware),
    })
}

export const store = makeStore()
export const persistor = persistStore(store);

// Infer the type of makeStore
export type AppStore = ReturnType<typeof makeStore>
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore['getState']>
export type AppDispatch = AppStore['dispatch']