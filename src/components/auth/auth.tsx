"use client";
import React, { useState } from "react";
import { AuthProps } from "./auth.props";
import cn from "classnames";
import styles from "./auth.module.css";
import { Button, Input, Label } from "..";
import userSlice, {
  userFailure,
  userStart,
  userSucces,
} from "@/redux/slice/user.slice";
import { RootState } from "@/redux/store";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import Link from "next/link";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { auth } from "@/firebase";
import { useRouter } from "next/navigation";
const Auth = ({ type = "login" }: AuthProps) => {
  const router = useRouter();
  const { loggedIn, userLoading, userError, userMsg } = useSelector(
    (state: RootState) => state.user
  );
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const signUp = async () => {
    dispatch(userStart());
    try {
      const response = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      dispatch(userSucces(response.user.uid));
      localStorage.setItem("user-uid", JSON.stringify(response.user.uid));
      router.push(`/user/${response.user.uid}`);
    } catch (response) {
      const error = response as Error;
      dispatch(userFailure(error.message));
      console.log(error.message);
    }
  };
  const signIn = async () => {
    dispatch(userStart());
    try {
      const response = await signInWithEmailAndPassword(auth, email, password);
      dispatch(userSucces(response.user.uid));
      router.push(`/user/${response.user.uid}`);
    } catch (response) {
      const error = response as Error;
      dispatch(userFailure(error.message));
      console.log(error.message);
    }
  };
  return (
    <div className={styles.auth}>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          type === "login" ? signIn() : signUp();
        }}
        className={cn(styles.wrap)}
      >
        <h1 className={styles.title}>
          {type === "login" ? "Sign In" : "Sign Up"}
        </h1>
        <Label title="Email">
          <Input
            onChange={(e) => {
              setEmail(e.target.value);
            }}
            placeholder="email"
            type="email"
          />
        </Label>
        <Label title="Password">
          <Input
            onChange={(e) => {
              setPassword(e.target.value);
            }}
            placeholder="Password"
            type="password"
          />
        </Label>
        <Button
          type="submit"
          title={`${
            userLoading
              ? "Loading..."
              : type === "login"
              ? "Sign In"
              : "Sign Up"
          }`}
        />
        <p className={styles.link}>
          Already account{" "}
          <Link href={`${type === "login" ? "/register" : "/login"}`}>
            {type === "login" ? "Sign Up" : "Sign In"}
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Auth;
