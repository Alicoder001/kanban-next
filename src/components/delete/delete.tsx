"use client";
import React from "react";
import styles from "./delete.module.css";
import { DeleteProps } from "./delete.props";
import Button from "../button/button";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { BoardI, ColumnI } from "@/interfaces/user.interface";
import { deleteBoard, setCurrentTask, updateBoard } from "@/redux/slice/board";
import { deleteDoc, doc, setDoc } from "firebase/firestore";
import { db } from "@/firebase";
import { useDispatch } from "react-redux";
import { setModal } from "@/redux/slice/service";
import { useRouter } from "next/navigation";

const Delete = ({ type, board }: DeleteProps) => {
  switch (type) {
    case "board":
  }
  const { boards, currentTaskInf } = useSelector(
    (state: RootState) => state.board
  );
  const { user } = useSelector((state: RootState) => state.user);
  const column = board?.columns?.find(
    (column) => column.uid === currentTaskInf?.columnId
  );
  const router = useRouter();
  const dispatch = useDispatch();
  const handleClick = async () => {
    const updatedTasks = column?.tasks?.filter(
      (task) => task.uid !== currentTaskInf?.taskId
    );
    const updatedColumns = board?.columns?.map((c) => {
      if (c.uid === column?.uid) {
        return { ...c, tasks: updatedTasks };
      } else {
        return c;
      }
    });
    const updatedBoard: BoardI = { ...board, columns: updatedColumns };
    if (user) {
      setDoc(
        doc(db, user ? `user/${user}/boards` : `boards`, board?.uid),
        { updatedBoard },
        {
          merge: true,
        }
      ).then((rec) => {
        console.log("task deleted");
        dispatch(updateBoard(updatedBoard));
        dispatch(setModal("none"));
        dispatch(
          setCurrentTask({
            boardId: "",
            taskId: "",
            columnId: "",
          })
        );
      });
    } else {
      const updatedBoards = boards.map((item) => {
        if (item.uid === board?.uid) {
          return updatedBoard;
        } else {
          return item;
        }
      });
      localStorage.setItem("template", JSON.stringify(updatedBoards));
      console.log("task deleted");
      dispatch(updateBoard(updatedBoard));
      dispatch(setModal("none"));
      dispatch(
        setCurrentTask({
          boardId: "",
          taskId: "",
          columnId: "",
        })
      );
    }
  };

  return type === "board" ? (
    <>
      <header>
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
          onClick={async () => {
            if (board) {
              if (user) {
                deleteDoc(doc(db, `user/${user}/boards`, board?.uid))
                  .then(() => {
                    console.log("board deleted");
                    dispatch(deleteBoard(board?.uid));
                    dispatch(setModal("none"));
                    dispatch(
                      setCurrentTask({
                        boardId: "",
                        taskId: "",
                        columnId: "",
                      })
                    );
                    router.push(
                      boards.length > 1
                        ? `/user/${user}/${boards[0].uid}`
                        : `/user/${user}`
                    );
                  })
                  .catch((error) => {
                    console.log(error);
                  });
              } else {
                const updateBoards = boards?.filter(
                  (item) => item?.uid !== board?.uid
                );
                localStorage.setItem("template", JSON.stringify(updateBoards));
                console.log("board deleted");
                dispatch(deleteBoard(board?.uid));
                dispatch(setModal("none"));
                dispatch(
                  setCurrentTask({
                    boardId: "",
                    taskId: "",
                    columnId: "",
                  })
                );
                router.push(
                  boards.length > 1 ? `/template/${boards[0].uid}` : `/template`
                );
              }
            }
          }}
          title="Delete"
          buttonType="dangerous"
        />
        <Button
          onClick={() => {
            dispatch(setModal("none"));
            dispatch(
              setCurrentTask({
                boardId: "",
                taskId: "",
                columnId: "",
              })
            );
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
        <Button
          onClick={() => {
            dispatch(setModal("none"));
            dispatch(
              setCurrentTask({
                boardId: "",
                taskId: "",
                columnId: "",
              })
            );
          }}
          title="Cancel"
          buttonType="secondary"
        />
      </div>
    </>
  );
};

export default Delete;
