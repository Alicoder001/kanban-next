import { DocumentData } from "firebase/firestore";

export interface userInterface {
  uid: string;
  firstName: string;
  lastName: string;
  email: string;
}
export interface BoardI extends DocumentData {
  title: string;
  columns?: ColumnI[];
  uid: string;
}
export interface ColumnI extends DocumentData {
  uid: string;
  title: string;
  tasks?: TaskI[];
}
export interface TaskI extends DocumentData {
  uid: string;
  title: string;
  description: string;
  subtasks?: SubtaskI[];
}
export interface SubtaskI extends DocumentData {
  uid: string;
  title: string;
  complete?: boolean;
}
