import { Delete, Modal } from "@/components";
import React from "react";

const BoardDelete = ({ params }: { params: any }) => {
  console.log(params);

  return <Modal type={params["format-type"]}></Modal>;
};

export default BoardDelete;
