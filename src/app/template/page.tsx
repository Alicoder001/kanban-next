"use client";
import { auth } from "@/firebase";
import { onAuthStateChanged } from "firebase/auth";
import React from "react";
import styles from "./template.module.css";
import { Button, Modal } from "@/components";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { useDispatch } from "react-redux";
import { setModal } from "@/redux/slice/service";
const Board = ({}) => {
  onAuthStateChanged(auth, (user) => {
    console.log(user);
  });
  const { modalType } = useSelector((state: RootState) => state.service);
  const dispatch = useDispatch();
  return (
    <div className={styles.main}>
      {modalType === "main-board-add" && <Modal type="add-board" />}
      <Button
        className={styles.mainBtn}
        onClick={() => {
          dispatch(setModal("main-board-add"));
        }}
        buttonType="primary-S"
        title="Add Column +"
      />
    </div>
  );
};

export default Board;
