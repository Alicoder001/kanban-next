import React from "react";
import { ModalProps } from "./modal.props";
import styles from "./modal.module.css";
import cn from "classnames";
import { BoardFormat, Delete, TaskFormat } from "..";
import { notFound } from "next/navigation";
const Modal = ({ type, children, ...props }: ModalProps): JSX.Element => {
  const typeRender = () => {
    switch (type) {
      case "add-task":
        return <TaskFormat type={"add"} />;
      case "edit-task":
        return <TaskFormat type={"add"} />;
      case "add-board":
        return <BoardFormat type={"add"} />;
      case "edit-board":
        return <BoardFormat type={"edit"} />;
      case "delete-board":
        return <Delete type={"board"} />;
      case "delete-task":
        return <Delete type={"task"} />;
    }
  };
  return (
    <div className={cn(styles.modal)} {...props}>
      <div className={styles.main}> {typeRender()}</div>
    </div>
  );
};

export default Modal;
