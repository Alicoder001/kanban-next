import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  dark: false,
};
const serviceSlice = createSlice({
  name: "service",
  initialState,
  reducers: {
    setMode(state, action) {
      state.dark = !action.payload;
    },
  },
});
export const { setMode } = serviceSlice.actions;
export default serviceSlice.reducer;
