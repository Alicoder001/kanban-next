import { BoardI, ColumnI, TaskI } from "@/interfaces/user.interface";
import { DetailedHTMLProps, HTMLAttributes, ReactNode } from "react";

export interface ModalProps
  extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  children?: ReactNode;
  data?: BoardI | ColumnI | TaskI | null;
  dataInf?: {
    boardId?: string;
    columnId?: string;
    taskId?: string;
  };
  type:
    | "add-task"
    | "edit-task"
    | "add-board"
    | "edit-board"
    | "delete-board"
    | "delete-task"
    | "check-task";
}
