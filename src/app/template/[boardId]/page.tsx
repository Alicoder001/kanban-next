import { Tasks } from "@/components";
import UseData from "@/hooks/useData";
import { BoardI } from "@/interfaces/user.interface";
import { getCollection, getDocument } from "@/lib";
import { DocumentData } from "firebase/firestore";
import React from "react";
interface Props {}
const Template = async ({ params }: { params: { boardId: string } }) => {
  const boardId = params.boardId;
  const data = await getDocument(`boards/${boardId}`);

  return <Tasks board={data as BoardI} />;
};

export default Template;
