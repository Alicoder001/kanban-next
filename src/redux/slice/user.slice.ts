import { userInterface } from "@/interfaces/user.interface";
import { createSlice } from "@reduxjs/toolkit";
import { finished } from "stream";

const initialState: stateProps = {
  user: null,
  loggedIn: false,
  userError: null,
  userMsg: null,
  userLoading: false,
  finished: false,
};
interface stateProps {
  user: string | null;
  loggedIn: boolean;
  userError: string | null;
  userMsg: string | null;
  userLoading: boolean;
  finished: boolean;
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
      state.finished = true;
    },
    userFailure(state, action) {
      state.userLoading = false;
      state.userError = action.payload;
      state.finished = true;
    },
    userLogOut(state) {
      state.user = null;
      state.loggedIn = false;
      state.finished = true;
    },
  },
});
export const { userStart, userSucces, userFailure, userLogOut } =
  userSlice.actions;
export default userSlice.reducer;
