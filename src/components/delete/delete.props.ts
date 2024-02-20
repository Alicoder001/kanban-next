import { DetailedHTMLProps, HTMLAttributes, ReactNode } from "react";

export interface DeleteProps
  extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  children?: ReactNode;
  type: "board" | "task";
}
