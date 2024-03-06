import { BoardI } from "@/interfaces/user.interface";
import { DetailedHTMLProps, HTMLAttributes, SetStateAction } from "react";

export interface SidebarProps
  extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  boards?: BoardI[] | null;
}
