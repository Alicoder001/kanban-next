"use client";
import React, { useState } from "react";
import styles from "./tasks.module.css";
import cn from "classnames";
import { Query, collection, doc, getDocs } from "firebase/firestore";
import { db } from "@/firebase";
import { getCollection } from "@/lib";
import { BoardI } from "@/interfaces/user.interface";
import Modal from "../Modal/modal";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { useDispatch } from "react-redux";
import { setModal } from "@/redux/slice/service";
import { currentTaskI, setCurrentTask } from "@/redux/slice/board";

const Tasks = ({ boardId }: { boardId: string }) => {
  const { modalType } = useSelector((state: RootState) => state.service);
  const { boards } = useSelector((state: RootState) => state.board);
  const board = boards.find((item) => item?.uid === boardId);
  const dispatch = useDispatch();
  if (typeof window !== "undefined") {
    window.addEventListener("keydown", (e) => {
      if (e.key === "Escape") {
        dispatch(setModal("none"));
      }
    });
  }

  return (
    <>
      {modalType === "main-delete-task" && (
        <Modal data={board} type="delete-task" />
      )}
      {modalType === "main-check-task" && (
        <Modal data={board} type="check-task" />
      )}
      {modalType === "main-edit-board" && (
        <Modal data={board} type="edit-board" />
      )}
      {modalType === "main-add-board" && (
        <Modal data={board} type="add-board" />
      )}
      {modalType === "main-edit-task" && (
        <Modal data={board} type="edit-task" />
      )}
      {modalType === "main-add-task" && <Modal data={board} type="add-task" />}
      <div className={cn(styles.tasks)}>
        <ul className={styles.categories}>
          {board?.columns?.map((column) => (
            <li key={column.uid} className={styles.category}>
              <div className={styles.titleWrap}>
                <div className={styles.circle}></div>
                <h4 className={styles.categoryTitle}>
                  {column.title}{" "}
                  {`(${column.tasks?.length ? column.tasks?.length : "0"})`}
                </h4>
              </div>
              <ul className={styles.taskList}>
                {column?.tasks?.map((task) => (
                  <li
                    onClick={() => {
                      dispatch(setModal("main-check-task"));
                      dispatch(
                        setCurrentTask({
                          boardId,
                          taskId: task?.uid,
                          columnId: column.uid,
                        } as currentTaskI)
                      );
                    }}
                    key={task?.uid}
                    className={styles.task}
                  >
                    <h3 className={styles.title}>{task?.title}</h3>
                    <p className={styles.subt}>
                      {
                        task?.subtasks?.filter(
                          (subtask) => subtask.complete === true
                        ).length
                      }{" "}
                      of {task?.subtasks?.length} substasks
                    </p>
                  </li>
                ))}
              </ul>
            </li>
          ))}

          <div
            onClick={() => {
              dispatch(setModal("main-edit-board"));
            }}
            className={styles.newCategory}
          >
            + New Column
          </div>
        </ul>
      </div>
    </>
  );
};

export default Tasks;
