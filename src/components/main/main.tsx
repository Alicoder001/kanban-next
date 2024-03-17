import React from "react";
import { MainProps } from "./main.props";
import cn from "classnames";
import styles from "./main.module.css";
import Modal from "../Modal/modal";
const Main = ({ children, boards }: MainProps) => {
  return (
    <>
      <div className={cn(styles.main)}>{children}</div>{" "}
    </>
  );
};

export default Main;
