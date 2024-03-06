import { DetailedHTMLProps, InputHTMLAttributes, ReactNode } from "react";

export interface InputProps
  extends DetailedHTMLProps<
    InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  > {
  trash?: boolean;
  itemKey?: string;
}
