import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  dark: false,
  modalType: "none",
};
const serviceSlice = createSlice({
  name: "service",
  initialState,
  reducers: {
    setMode(state, action) {
      state.dark = !action.payload;
      localStorage.setItem("dark", JSON.stringify(!action.payload));
    },
    setModal(state, action) {
      state.modalType = action.payload;
    },
  },
});
export const { setMode, setModal } = serviceSlice.actions;
export default serviceSlice.reducer;
