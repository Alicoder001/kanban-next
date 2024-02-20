import React from "react";
import { BoardFormatProps } from "./board-format.props";
import { Label, Input, Select, Button } from "..";
import styles from "./board-format.module.css";
import cn from "classnames";
const BoardFormat = ({
  type = "add",
  ...props
}: BoardFormatProps): JSX.Element => {
  return (
    <>
      <header>
        <h2 className={styles.title}>Add New Board</h2>
      </header>
      <Label title="Name">
        <Input placeholder="e.g. Web Design" />
      </Label>
      <Label title="Column">
        <Input placeholder="e.g. Web Design" trash={true} value={"Todo"} />
        <Input placeholder="e.g. Web Design" trash={true} value={"Doing"} />
        <Button buttonType="secondary" title="+ Add New Column" />
      </Label>
      <Button title="Create New Board" />
    </>
  );
};

export default BoardFormat;
