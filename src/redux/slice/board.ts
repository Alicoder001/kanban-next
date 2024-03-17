import { BoardI } from "@/interfaces/user.interface";
import { createSlice } from "@reduxjs/toolkit";

const initialState: stateI = {
  boards: [],
  currentTaskInf: {
    columnId: "",
    taskId: "",
  },
};
export interface currentTaskI {
  columnId: string;
  taskId: string;
}
interface stateI {
  boards: BoardI[];
  currentTaskInf: currentTaskI | null;
}
const boardSlice = createSlice({
  name: "board",
  initialState,
  reducers: {
    getAllBoard(state, action) {
      state.boards = action.payload;
    },
    addBoard(state, action) {
      const board = action.payload;
      state.boards = [...board, ...state.boards];
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
} = boardSlice.actions;
export default boardSlice.reducer;
