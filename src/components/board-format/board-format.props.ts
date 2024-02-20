import { DetailedHTMLProps, HTMLAttributes, ReactNode } from "react";

export interface BoardFormatProps
  extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  children?: ReactNode;
  type: "edit" | "add";
}
