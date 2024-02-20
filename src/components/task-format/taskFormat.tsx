import React from "react";
import { TaskProps } from "./task-format.props";
import styles from "./task-format.module.css";
import cn from "classnames";
import { Button, Input, Label, Select, Textarea } from "..";
import { SelectElementType } from "../select/select.props";
const Task = ({ type, ...props }: TaskProps): JSX.Element => {
  const array = [
    { title: "e.g. Make coffee" },
    { title: "e.g. Make coffee" },
    { title: "e.g. Make coffee" },
  ];
  const elements: SelectElementType[] = [
    { title: "Todo" },
    { title: "Doing" },
    { title: "Done" },
  ];

  return (
    <>
      <header>
        <h2 className={styles.title}>Add New Task</h2>
      </header>
      <Label title="Title">
        <Input placeholder="e.g. Take coffee break" />
      </Label>
      <Label title="Description">
        <Textarea
          placeholder="e.g. It’s always good to take a break. This 15 minute break will 
recharge the batteries a little."
        />
      </Label>
      <Label title="Subtask">
        {array.map((item, index) => (
          <Input key={index} trash={true} placeholder="e.g. Make coffee" />
        ))}
        <Button buttonType="secondary" title="+ Add New Column" />
      </Label>
      <Label title="Status">
        <Select title="Todo" elements={elements}></Select>
      </Label>
      <Button title="Save Changes" buttonType="primary-S" />
    </>
  );
};

export default Task;
