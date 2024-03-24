"use client";
import { auth, db } from "@/firebase";
import { BoardI } from "@/interfaces/user.interface";
import { getAllBoard, setCurrentTask } from "@/redux/slice/board";
import { setModal, setMode } from "@/redux/slice/service";
import { userFailure, userSucces } from "@/redux/slice/user.slice";
import { RootState } from "@/redux/store";
import { onAuthStateChanged } from "firebase/auth";
import { collection, getDocs } from "firebase/firestore";
import { ReactNode, useCallback, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
const RootProvider = ({ children }: { children: ReactNode }) => {
  const dispatch = useDispatch();
  const { dark, modalType } = useSelector((state: RootState) => state.service);
  const { user, finished } = useSelector((state: RootState) => state.user);
  const { boardFinish, currentTaskInf } = useSelector(
    (state: RootState) => state.board
  );

  const keyPress = useCallback(
    (e: any) => {
      if (e.key === "Escape" && modalType !== "none") {
        dispatch(setModal("none"));
        dispatch(
          setCurrentTask({
            boardId: "",
            taskId: "",
            columnId: "",
          })
        );
      }
    },
    [setModal, modalType]
  );

  useEffect(() => {
    document.addEventListener("keydown", keyPress);
    return () => document.removeEventListener("keydown", keyPress);
  }, [keyPress]);

  useEffect(() => {
    const localMode = localStorage.getItem("dark") as string;
    const mode = localMode && JSON.parse(localMode);
    if (mode === true) {
      dispatch(setMode(!localMode));
    }
    onAuthStateChanged(auth, (user) => {
      if (!user) {
        dispatch(userFailure("autentifikatsiya amalga oshirilmadi!"));
      } else {
        dispatch(userSucces(user.uid));
      }
    });
  }, []);
  useEffect(() => {
    const hasLocalData = JSON.parse(
      localStorage.getItem("template") as string
    ) as BoardI[] | null;

    if (user && finished) {
      getDocs(collection(db, `user/${user}/boards`))
        .then((res: any) => {
          const boards = res?.docs?.map((item: BoardI) => {
            return item.data();
          }) as BoardI[];
          dispatch(getAllBoard(boards));
          console.log(boards);
        })
        .catch((error) => {
          console.log(error);
        });
    }
    if (!user && finished && hasLocalData) {
      dispatch(getAllBoard(hasLocalData as BoardI[]));
    }
    if (!user && finished && !hasLocalData) {
      getDocs(collection(db, `boards`))
        .then((res: any) => {
          const boards = res?.docs?.map((item: BoardI) => {
            return item.data();
          }) as BoardI[];
          dispatch(getAllBoard(boards));
          console.log(boards);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [user, finished]);

  return (
    <div className={`root-provider ${dark && "dark"}`}>
      {boardFinish ? children : <h1>Loading...</h1>}
    </div>
  );
};

export default RootProvider;
