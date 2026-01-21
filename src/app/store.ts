import { configureStore } from "@reduxjs/toolkit";

export const store = configureStore({
  reducer: {
    // Add your reducers here
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
  devTools: import.meta.env.MODE !== "production",
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
