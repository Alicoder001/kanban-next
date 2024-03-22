"use client";
import { auth, db } from "@/firebase";
import { BoardI } from "@/interfaces/user.interface";
import { getCollection } from "@/lib";
import { getAllBoard } from "@/redux/slice/board";
import { setMode } from "@/redux/slice/service";
import { userFailure, userSucces } from "@/redux/slice/user.slice";
import { RootState } from "@/redux/store";
import { onAuthStateChanged } from "firebase/auth";
import { collection, getDocs } from "firebase/firestore";
import { ReactNode, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
const RootProvider = ({ children }: { children: ReactNode }) => {
  const dispatch = useDispatch();
  const { dark } = useSelector((state: RootState) => state.service);
  const { user, finished } = useSelector((state: RootState) => state.user);
  const { boardFinish } = useSelector((state: RootState) => state.board);

  useEffect(() => {
    const localMode = localStorage.getItem("dark") as string;
    const mode = localMode && JSON.parse(localMode);
    if (mode === true) {
      dispatch(setMode(!localMode));
    }
    console.log("salom");
    onAuthStateChanged(auth, (user) => {
      if (!user) {
        dispatch(userFailure("autentifikatsiya amalga oshirilmadi!"));
      } else {
        dispatch(userSucces(user.uid));
      }
    });
  }, []);
  useEffect(() => {
    getDocs(collection(db, user ? `user/${user}/boards` : (`boards` as string)))
      .then((res: any) => {
        const boards = res?.docs?.map((item: BoardI) => {
          return item.data();
        }) as BoardI[];
        dispatch(getAllBoard(boards));
      })
      .catch((error) => {
        console.log(error);
      });
  }, [user, finished]);

  return (
    <div className={`root-provider ${dark && "dark"}`}>
      {boardFinish ? children : "Loading..."}
    </div>
  );
};

export default RootProvider;
