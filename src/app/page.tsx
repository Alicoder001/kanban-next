"use client";
import { auth } from "@/firebase";
import { getCollection } from "@/lib";
import { userFailure, userSucces } from "@/redux/slice/user.slice";
import { RootState } from "@/redux/store";
import { onAuthStateChanged } from "firebase/auth";
import { redirect, useRouter } from "next/navigation";
import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";

const Home = () => {
  const dispatch = useDispatch();
  let currentUser = null;
  const router = useRouter();
  const { user, userLoading, finished } = useSelector(
    (state: RootState) => state.user
  );
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (!user) {
        router.push("/template");
        dispatch(userFailure("autentifikatsiya amalga oshirilmadi!"));
      } else {
        // router.push("/template");
        dispatch(userSucces(user.uid));
      }
    });
  }, []);
  if (finished) {
    console.log(user);
  }
  return <h1>Welcome</h1>;
};

export default Home;
