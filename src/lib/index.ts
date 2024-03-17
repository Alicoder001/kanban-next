import { db } from "@/firebase";
import { BoardI, TaskI } from "@/interfaces/user.interface";
import { collection, doc, getDoc, getDocs, setDoc } from "firebase/firestore";
import { v4 } from "uuid";

export const getCollection = async (link: string) => {
  const data = await getDocs(collection(db, link));
  return data;
};
export const getDocument = async (link: string) => {
  const data = await getDoc(doc(db, link));
  return data.data();
};
export const addDoc = async (link: string, data: BoardI | TaskI) => {
  await setDoc(doc(db, link), data);
};
export const getUid = () => {
  return v4() as string;
};
