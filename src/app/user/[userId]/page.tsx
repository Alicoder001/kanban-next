"use client";
import { auth } from "@/firebase";
import { onAuthStateChanged } from "firebase/auth";
import React, { useEffect } from "react";
import styles from "./template.module.css";
import { Button, Modal } from "@/components";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { useDispatch } from "react-redux";
import { setModal } from "@/redux/slice/service";
import { useRouter } from "next/navigation";
const Board = ({}) => {
  const { modalType } = useSelector((state: RootState) => state.service);
  const { user, finished } = useSelector((state: RootState) => state.user);
  const router = useRouter();
  useEffect(() => {
    if (!user && finished) {
      router.push("/template");
    }
  }, [user, finished]);
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
