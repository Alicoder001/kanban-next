import { BoardI } from "@/interfaces/user.interface";
import { DetailedHTMLProps, HTMLAttributes, ReactNode } from "react";

export interface MainProps
  extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  children: ReactNode;
  boards?: BoardI[];
}
