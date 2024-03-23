"use client";
import React, { useEffect, useState } from "react";
import { BoardFormatProps } from "./board-format.props";
import { Label, Input, Select, Button } from "..";
import styles from "./board-format.module.css";
import cn from "classnames";
import { BoardI, ColumnI } from "@/interfaces/user.interface";
import { addDoc, getUid } from "@/lib";
import { title } from "process";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { db } from "@/firebase";
import { useDispatch } from "react-redux";
import { setModal } from "@/redux/slice/service";
import {
  addBoard,
  setBoardLoading,
  setCurrentTask,
  updateBoard,
} from "@/redux/slice/board";
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
const BoardFormat = ({ type = "add", board, ...props }: BoardFormatProps) => {
  const router = useRouter();
  const dispatch = useDispatch();
  const initialColumns: ColumnI[] = [
    {
      uid: "",
      title: "",
    },
  ];
  const initialBoard: BoardI = {
    uid: "",
    title: "",
  };
  const [columns, setColumn] = useState<ColumnI[]>(
    type === "edit"
      ? board?.columns
        ? board?.columns
        : [{ ...initialColumns[0], uid: getUid() }]
      : [{ ...initialColumns[0], uid: getUid() }]
  );
  const { boardLoading, boards } = useSelector(
    (state: RootState) => state.board
  );
  const { user } = useSelector((state: RootState) => state.user);
  const [newBoard, setBoard] = useState<BoardI>(board ? board : initialBoard);
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (type === "add") {
      const uid = getUid();
      const updatedBoard = {
        ...newBoard,
        uid,
        columns,
      };
      if (user) {
        dispatch(setBoardLoading(true));
        setDoc(doc(db, `user/${user}/boards`, uid), updatedBoard)
          .then((rec) => {
            console.log("board added");
            dispatch(addBoard(updatedBoard));
            dispatch(setModal("none"));
            dispatch(
              setCurrentTask({
                boardId: "",
                taskId: "",
                columnId: "",
              })
            );
            dispatch(setBoardLoading(false));
            router.push(
              user ? `${"/user/" + user + "/" + uid}` : `/template/${uid}`
            );
          })
          .catch((error) => {
            dispatch(setBoardLoading(false));
            console.log(error);
          });
      } else {
        const updatedBoards = [updatedBoard, ...boards];
        localStorage.setItem("template", JSON.stringify(updatedBoards));
        console.log("board updated");
        dispatch(addBoard(updatedBoard));
        dispatch(setModal("none"));
        dispatch(
          setCurrentTask({
            boardId: "",
            taskId: "",
            columnId: "",
          })
        );
      }
    } else if (type === "edit") {
      const docRef = doc(db, `user/${user}/boards/${board?.uid}`);
      const updatedBoard = { ...newBoard, columns };
      if (user) {
        dispatch(setBoardLoading(true));
        setDoc(docRef, updatedBoard, { merge: true })
          .then(() => {
            dispatch(setBoardLoading(false));
            console.log("board updated!");
            dispatch(setModal("none"));
            dispatch(
              setCurrentTask({
                boardId: "",
                taskId: "",
                columnId: "",
              })
            );
            dispatch(updateBoard(updatedBoard));
          })
          .catch((error) => {
            dispatch(setBoardLoading(false));
            console.log(error.message);
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
        console.log("board updated");
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
    }
  };
  return (
    <form className={styles.main} onSubmit={handleSubmit}>
      <header>
        <h2 className={styles.title}>Add New Board</h2>
      </header>
      <Label title="Name">
        <Input
          onChange={(e) => {
            setBoard((prev) => {
              return { ...prev, title: e.target.value };
            });
          }}
          defaultValue={type === "add" ? "" : board?.title}
          placeholder="e.g. Web Design"
        />
      </Label>
      <Label
        onClick={(e: any) => {
          const currentUid = Object.assign({}, e?.target?.dataset)?.uid;
          if (currentUid) {
            setColumn((prev) => {
              return prev.filter((item) => item.uid !== currentUid);
            });
          }
        }}
        title="Column"
      >
        {columns?.map((item) => (
          <Input
            itemKey={item.uid}
            onChange={(e) => {
              setColumn((prev) => {
                return prev.map((c) => {
                  if (c.uid === item.uid) {
                    return { ...c, title: e.target.value };
                  } else {
                    return c;
                  }
                });
              });
            }}
            key={item.uid}
            placeholder="e.g. Web Design"
            trash={true}
            defaultValue={type === "add" ? "" : item.title ? item.title : ""}
          />
        ))}
        <Button
          onClick={() => {
            setColumn((prev) => {
              return [...prev, { ...initialColumns[0], uid: getUid() }];
            });
          }}
          buttonType="secondary"
          title="+ Add New Column"
          type="button"
        />
      </Label>
      <Button
        disabled={boardLoading}
        type="submit"
        title={`${
          boardLoading
            ? "Loading..."
            : type === "add"
            ? "Create New Board"
            : "Save Changes"
        }`}
      />
    </form>
  );
};

export default BoardFormat;
