import { userInterface } from "@/interfaces/user.interface";
import { createSlice } from "@reduxjs/toolkit";

const initialState: stateProps = {
  user: null,
  loggedIn: false,
  userError: null,
  userMsg: null,
  userLoading: false,
};
interface stateProps {
  user: userInterface | null;
  loggedIn: boolean;
  userError: string | null;
  userMsg: string | null;
  userLoading: boolean;
}
const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    userStart(state) {
      state.userLoading = true;
    },
    userSucces(state, action) {
      state.userLoading = false;
      state.user = action.payload;
      state.loggedIn = true;
    },
    userFailure(state, action) {
      state.userLoading = false;
      state.userError = action.payload;
    },
    userLogOut(state) {
      state.user = null;
      state.loggedIn = false;
    },
  },
});
export const { userStart, userSucces, userFailure, userLogOut } =
  userSlice.actions;
export default userSlice.reducer;
