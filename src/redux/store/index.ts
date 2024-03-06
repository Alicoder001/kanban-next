import { configureStore } from "@reduxjs/toolkit";
import userSlice from "../slice/user.slice";
import serviceSlice from "../slice/service";

export const store = configureStore({
  reducer: {
    user: userSlice,
    service: serviceSlice,
  },
  devTools: process.env.NODE_ENV !== "production",
});
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
