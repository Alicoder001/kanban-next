import { db } from "@/firebase";
import { collection, getDocs } from "firebase/firestore";
import React, { useEffect, useState } from "react";

const UseData = (link: string) => {
  const [data, setData] = useState(null);
  const getCollection = async (link: string) => {
    const response = await getDocs(collection(db, link));
    setData(response as any);
  };
  useEffect(() => {
    getCollection(link as string);
  }, [link as string]);

  return { getCollection, data };
};

export default UseData;
