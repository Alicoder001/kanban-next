import { DetailedHTMLProps, HTMLAttributes, ReactNode } from "react";

export interface TaskProps
  extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  children?: ReactNode;
  type: "edit" | "add";
}
