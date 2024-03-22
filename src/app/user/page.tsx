"use client";
import { RootState } from "@/redux/store";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";
import { useSelector } from "react-redux";

const User = () => {
  const { user, finished } = useSelector((state: RootState) => state.user);
  const router = useRouter();
  useEffect(() => {
    if (!user && finished) {
      router.push("/");
    }
  }, [user, finished]);
  return <div>Userrr</div>;
};

export default User;
