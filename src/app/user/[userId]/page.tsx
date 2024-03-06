import { Tasks } from "@/components";
import React from "react";
interface Props {
  params: {
    userId: string;
  };
}
const Dashboard = ({ params }: Props) => {
  return <Tasks userId={params.userId} />;
};

export default Dashboard;
