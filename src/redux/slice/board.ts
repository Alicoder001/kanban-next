import { BoardI } from "@/interfaces/user.interface";
import { createSlice } from "@reduxjs/toolkit";

const initialState: stateI = {
  boards: [],
  currentTaskInf: {
    columnId: "",
    taskId: "",
  },
  boardLoading: false,
  boardFinish: false,
};
export interface currentTaskI {
  columnId: string;
  taskId: string;
}
interface stateI {
  boards: BoardI[];
  currentTaskInf: currentTaskI | null;
  boardFinish: boolean;
  boardLoading: boolean;
}
const boardSlice = createSlice({
  name: "board",
  initialState,
  reducers: {
    setBoardLoading(state, action) {
      state.boardLoading = action.payload;
    },
    getAllBoard(state, action) {
      state.boards = action.payload;
      state.boardFinish = true;
    },
    addBoard(state, action) {
      const board = action.payload;
      state.boards = [board, ...state.boards];
    },
    updateBoard(state, action) {
      const board = action.payload;
      state.boards = state.boards.map((item) => {
        if (item.uid === board.uid) {
          return board;
        } else {
          return item;
        }
      });
    },
    deleteBoard(state, action) {
      const uid = action.payload;
      state.boards = state.boards.filter((item) => item.uid !== uid);
    },
    setCurrentTask(state, action) {
      state.currentTaskInf = action.payload;
    },
  },
});
export const {
  getAllBoard,
  updateBoard,
  deleteBoard,
  addBoard,
  setCurrentTask,
  setBoardLoading,
} = boardSlice.actions;
export default boardSlice.reducer;
