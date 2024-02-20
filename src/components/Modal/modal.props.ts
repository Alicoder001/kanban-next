import { DetailedHTMLProps, HTMLAttributes, ReactNode } from "react";

export interface ModalProps
  extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  children?: ReactNode;
  type:
    | "add-task"
    | "edit-task"
    | "add-board"
    | "edit-board"
    | "delete-board"
    | "delete-task";
}
