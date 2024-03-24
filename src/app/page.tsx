"use client";

import { RootState } from "@/redux/store";
import { redirect, useRouter } from "next/navigation";
import React, { useEffect } from "react";
import { useSelector } from "react-redux";

const Home = () => {
  const router = useRouter();
  const { user, finished } = useSelector((state: RootState) => state.user);
  const { boards } = useSelector((state: RootState) => state.board);
  useEffect(() => {
    if (!user && finished) {
      router.push("/template");
    }
    if (user) {
      router.push(`/user/${user}${boards[0] ? "/" + boards[0].uid : ""}`);
    }
  }, [user, finished]);
  return <h1>Welcome</h1>;
};

export default Home;
