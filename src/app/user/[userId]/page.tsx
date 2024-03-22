import { Tasks } from "@/components";
import React from "react";
interface Props {
  params: {
    userId: string;
  };
}
const Dashboard = ({ params }: Props) => {
  return <Tasks boardId="" />;
};

export default Dashboard;
