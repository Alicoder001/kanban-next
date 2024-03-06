import { db } from "@/firebase";
import { collection, doc, getDoc, getDocs } from "firebase/firestore";

export const getCollection = async (link: string) => {
  const data = await getDocs(collection(db, link));
  return data;
};
export const getDocument = async (link: string) => {
  const data = await getDoc(doc(db, link));
  return data.data();
};
