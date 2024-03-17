import React, { useState } from "react";
import { SelectProps } from "./select.props";
import styles from "./select.module.css";
import cn from "classnames";
import Image from "next/image";
import accordion from "../../images/accordion-light.svg";
import { doc, setDoc } from "firebase/firestore";
import { db } from "@/firebase";
import { useDispatch } from "react-redux";
import { BoardI, ColumnI } from "@/interfaces/user.interface";
import { currentTaskI, setCurrentTask, updateBoard } from "@/redux/slice/board";
const Select = ({
  taskColumnuid = "",
  isOpen = false,
  columns = [],
  setTaskColumn,
  setIsOpen,
  realTime = false,
  board,
  task: newTask,
}: SelectProps): JSX.Element => {
  const dispatch = useDispatch();
  const title = columns.find((item) => item.uid === taskColumnuid)?.title;
  const handleClick = async (columnUid: string) => {
    const updatedColumns = board?.columns?.map((column) => {
      if (columnUid === column.uid) {
        const hasTask = column.tasks?.find((task) => task.uid === newTask?.uid);
        if (hasTask) {
          return column;
        } else {
          return {
            ...column,
            tasks: column?.tasks ? [...column?.tasks, newTask] : [newTask],
          };
        }
      } else {
        const hasTask = column.tasks?.find((task) => task.uid === newTask?.uid);
        if (hasTask) {
          const newTaskArray = column.tasks?.filter(
            (task) => task.uid !== hasTask.uid
          );
          return { ...column, tasks: newTaskArray };
        } else {
          return column;
        }
      }
    }) as ColumnI[];
    console.log(board);
    const updatedBoard = board?.columns
      ? ({ ...board, columns: updatedColumns } as BoardI)
      : (board as BoardI);

    if (board) {
      dispatch(updateBoard(updatedBoard));
      dispatch(
        setCurrentTask({
          boardId: board.uid,
          taskId: newTask?.uid,
          columnId: columnUid,
        } as currentTaskI)
      );
      console.log(updatedBoard);
      setDoc(doc(db, "boards", board.uid), updatedBoard, {
        merge: true,
      })
        .then((rec) => {
          console.log(updatedColumns);
        })
        .catch((error) => {
          console.log(updateBoard);
          console.log(error);
        });
    }
  };
  return (
    <div className={cn(styles.select)}>
      <header
        id="header"
        className={cn(styles.header, { [styles.open]: isOpen })}
      >
        <p className={styles.title}>{title}</p>
        <Image className={styles.accordion} src={accordion} alt="accordion" />
      </header>
      {isOpen && (
        <ul className={styles.list}>
          {columns.map((item, index) => {
            return (
              <li
                onClick={() => {
                  if (realTime) {
                    handleClick(item.uid);
                  }
                  setTaskColumn(item.uid);
                  setIsOpen(false);
                }}
                key={index}
                className={styles.item}
              >
                {item.title}
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
};

export default Select;
