import { auth } from "@/firebase";
import { onAuthStateChanged } from "firebase/auth";
import React from "react";

const Board = ({}) => {
  onAuthStateChanged(auth, (user) => {
    console.log(user);
  });
  return <div>Board</div>;
};

export default Board;
