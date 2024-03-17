import { BoardI, ColumnI, TaskI } from "@/interfaces/user.interface";
import { currentTaskI } from "@/redux/slice/board";
import { DetailedHTMLProps, HTMLAttributes, SetStateAction } from "react";

export interface SelectProps
  extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  taskColumnuid: string | undefined;
  isOpen?: boolean;
  columns?: ColumnI[];
  currentTaskInfo?: currentTaskI;
  setTaskColumn: any;
  setIsOpen: any;
  realTime: boolean;
  board?: BoardI;
  task?: TaskI;
}
