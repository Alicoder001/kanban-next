"use client";
import React from "react";
import { MainProps } from "./main.props";
import cn from "classnames";
import styles from "./main.module.css";
import Modal from "../Modal/modal";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";

const Main = ({ children, boards }: MainProps) => {
  const { sidebarShow } = useSelector((state: RootState) => state.service);

  return (
    <>
      <div className={cn(styles.main, { [styles.left]: !sidebarShow })}>
        {children}
      </div>{" "}
    </>
  );
};

export default Main;
