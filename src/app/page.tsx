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
  redirect("/template");

  return <h1>Welcome</h1>;
};

export default Home;
