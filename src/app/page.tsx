import { auth } from "@/firebase";
import { getCollection } from "@/lib";
import { onAuthStateChanged } from "firebase/auth";
import React from "react";

const Home = () => {
  onAuthStateChanged(auth, (user) => {
    console.log(user);
  });
  return <h1>Welcome</h1>;
};

export default Home;
