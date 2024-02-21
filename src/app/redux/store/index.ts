import { configureStore } from "@reduxjs/toolkit";
import serviceSlice from "../slice/service";

export const store = configureStore({
  reducer: {
    service: serviceSlice,
  },
  devTools: process.env.NODE_ENV !== "production",
});
export type RootState = ReturnType<typeof store.getState>;
export type AddDispatch = typeof store.dispatch;
