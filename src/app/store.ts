import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./slices/cartSlice";
import { productsApi } from "./api/productsApi";
import { categoriesApi } from "./api/categoriesApi";

export const store = configureStore({
  reducer: {
    cart: cartReducer,
    [productsApi.reducerPath]: productsApi.reducer,
    [categoriesApi.reducerPath]: categoriesApi.reducer
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware().concat(productsApi.middleware).concat(categoriesApi.middleware),
  devTools: import.meta.env.MODE !== "production"
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
