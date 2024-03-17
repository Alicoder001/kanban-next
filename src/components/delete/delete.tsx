"use client";
import React from "react";
import styles from "./delete.module.css";
import { DeleteProps } from "./delete.props";
import Button from "../button/button";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { BoardI, ColumnI } from "@/interfaces/user.interface";
import { updateBoard } from "@/redux/slice/board";
import { doc, setDoc } from "firebase/firestore";
import { db } from "@/firebase";
import { useDispatch } from "react-redux";
import { setModal } from "@/redux/slice/service";

const Delete = ({ type, board }: DeleteProps) => {
  switch (type) {
    case "board":
  }
  const { boards, currentTaskInf } = useSelector(
    (state: RootState) => state.board
  );
  const column = board.columns?.find(
    (column) => column.uid === currentTaskInf?.columnId
  );
  const dispatch = useDispatch();
  const handleClick = async () => {
    const updatedTasks = column?.tasks?.filter(
      (task) => task.uid !== currentTaskInf?.taskId
    );
    const updatedColumns = board.columns?.map((c) => {
      if (c.uid === column?.uid) {
        return { ...c, tasks: updatedTasks };
      } else {
        return c;
      }
    });
    const updatedBoard: BoardI = { ...board, columns: updatedColumns };
    setDoc(
      doc(db, "boards", board.uid),
      { updatedBoard },
      {
        merge: true,
      }
    ).then((rec) => {
      console.log("task deleted");
      dispatch(updateBoard(updatedBoard));
      dispatch(setModal("none"));
    });
  };

  return type === "board" ? (
    <>
      <header
        onClick={() => {
          console.log("header");
        }}
      >
        <h2 className={styles.title}>Delete this Board?</h2>
      </header>
      <p className={styles.subtitle}>
        Are you sure you want to delete the ‘Platform Launch’ board? This action
        will remove all columns and tasks and cannot be reversed.
      </p>
      <div
        onClick={() => {
          "salom";
        }}
        className={styles.wrap}
      >
        <Button
          onClick={() => {
            "salom";
          }}
          title="Delete"
          buttonType="dangerous"
        />
        <Button
          onClick={() => {
            "salom";
          }}
          title="Cancel"
          buttonType="secondary"
        />
      </div>
    </>
  ) : (
    <>
      <header>
        <h2 className={styles.title}>Delete this task?</h2>
      </header>
      <p className={styles.subtitle}>
        Are you sure you want to delete the ‘Build settings UI’ task and its
        subtasks? This action cannot be reversed.
      </p>
      <div className={styles.wrap}>
        <Button onClick={handleClick} title="Delete" buttonType="dangerous" />
        <Button title="Cancel" buttonType="secondary" />
      </div>
    </>
  );
};

export default Delete;
