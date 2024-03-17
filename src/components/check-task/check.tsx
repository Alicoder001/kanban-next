"use client";
import React, { useState } from "react";
import styles from "./check.module.css";
import cn from "classnames";
import menuLight from "../../images/menu-icon-light.svg";
import menuDark from "../../images/menu-icon-dark.svg";
import Image from "next/image";
import checkImg from "../../images/check.svg";
import { Label, Select } from "..";
import { CheckProps } from "./check.props";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { BoardI, SubtaskI } from "@/interfaces/user.interface";
import { useDispatch } from "react-redux";
import { updateBoard } from "@/redux/slice/board";
import { doc, setDoc } from "firebase/firestore";
import { db } from "@/firebase";
import { setModal } from "@/redux/slice/service";

const Check = ({ board }: CheckProps) => {
  const { currentTaskInf, boards } = useSelector(
    (state: RootState) => state.board
  );
  const [isOpen, setIsOpen] = useState(false);
  const column = board.columns?.find(
    (column) => column.uid === currentTaskInf?.columnId
  );
  const task = column?.tasks?.find(
    (item) => item?.uid === currentTaskInf?.taskId
  );
  const [currentColumnUid, setCurrentColumnUid] = useState(column?.uid || "");
  const dispatch = useDispatch();
  const [isShow, setIsShow] = useState(false);
  return (
    <div className={styles.check}>
      <div className={styles.header}>
        <h2 className={styles.title}>{task?.title}</h2>
        <div
          onClick={() => {
            setIsShow(!isShow);
          }}
          className={styles.wrap}
        >
          <Image src={menuLight} alt="menu" />
          {isShow && (
            <ul className={cn(styles.wrapList, { [styles.hidden]: true })}>
              <li
                onClick={() => {
                  dispatch(setModal("main-edit-task"));
                }}
                className={cn(styles.wrapItem)}
              >
                Edit Task
              </li>
              <li
                onClick={() => {
                  dispatch(setModal("main-delete-task"));
                }}
                className={cn(styles.wrapItem, styles.delete)}
              >
                Delete Task
              </li>
            </ul>
          )}
        </div>
      </div>
      <div className={styles.subt}>{task?.description}</div>
      <Label title={"Subtasks (2 of 3)"}>
        <ul className={styles.list}>
          {task?.subtasks?.map((subtask) => {
            return (
              <li
                onClick={() => {
                  const updatedSubtask = task?.subtasks?.map((s) => {
                    if (s.uid === subtask.uid) {
                      return { ...s, complete: !s.complete };
                    } else {
                      return s;
                    }
                  });
                  const updatedTasks = column?.tasks?.map((t) => {
                    if (t.uid === task?.uid) {
                      return { ...task, subtasks: updatedSubtask };
                    } else {
                      return t;
                    }
                  });

                  const updatedColumns = board.columns?.map((c) => {
                    if (c.uid === column?.uid) {
                      return { ...c, tasks: updatedTasks };
                    } else {
                      return c;
                    }
                  });
                  const updatedBoard: BoardI = {
                    ...board,
                    columns: updatedColumns,
                  };
                  dispatch(updateBoard(updatedBoard));
                  setDoc(doc(db, "boards", board.uid), updatedBoard, {
                    merge: true,
                  })
                    .then((rec) => {
                      console.log(subtask.complete);
                    })
                    .catch((rec) => {
                      dispatch(updateBoard(board));
                    });
                }}
                key={subtask.uid}
                className={cn(styles.item, {
                  [styles.checked]: subtask.complete,
                })}
              >
                <div className={styles.checker}>
                  <Image src={checkImg} alt="checker" />
                </div>
                <p className={styles.checkSubt}>{subtask.title}</p>
              </li>
            );
          })}
        </ul>
      </Label>
      <Label
        title="Current Status"
        onClick={(e: any) => {
          if (e.target.id === "header") {
            setIsOpen(!isOpen);
          }
        }}
      >
        <Select
          realTime={true}
          setIsOpen={setIsOpen}
          isOpen={isOpen}
          columns={board.columns}
          setTaskColumn={setCurrentColumnUid}
          taskColumnuid={currentColumnUid}
          board={board}
          task={task}
        />
      </Label>
    </div>
  );
};

export default Check;
