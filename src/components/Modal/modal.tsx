import React from "react";
import { ModalProps } from "./modal.props";
import styles from "./modal.module.css";
import cn from "classnames";
import { BoardFormat, Delete, TaskFormat } from "..";
import { notFound } from "next/navigation";
import { BoardI } from "@/interfaces/user.interface";
import Check from "../check-task/check";
const Modal = ({ type, data, children, ...props }: ModalProps): JSX.Element => {
  const typeRender = () => {
    switch (type) {
      case "add-task":
        return <TaskFormat board={data as BoardI} type={"add"} />;
      case "edit-task":
        return <TaskFormat board={data as BoardI} type={"edit"} />;
      case "add-board":
        return <BoardFormat board={data} type={"add"} />;
      case "check-task":
        return <Check board={data as BoardI} />;
      case "edit-board":
        return <BoardFormat board={data} type={"edit"} />;
      case "delete-board":
        return <Delete type={"board"} board={data as BoardI} />;
      case "delete-task":
        return <Delete type={"task"} board={data as BoardI} />;
    }
  };
  return (
    <div className={cn(styles.modal)} {...props}>
      <div className={styles.main}> {typeRender()}</div>
    </div>
  );
};

export default Modal;
