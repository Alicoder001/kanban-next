import { DetailedHTMLProps, HTMLAttributes } from "react";

export interface SelectProps
  extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  title: string;
  isOpen?: boolean;
  elements: SelectElementType[];
}
export interface SelectElementType {
  title: string;
  id?: number;
}
