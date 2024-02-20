import React from "react";
import styles from "./delete.module.css";
import { DeleteProps } from "./delete.props";
import Button from "../button/button";
const Delete = ({ type }: DeleteProps) => {
  switch (type) {
    case "board":
  }
  return type === "board" ? (
    <>
      <header>
        <h2 className={styles.title}>Delete this Board?</h2>
      </header>
      <p className={styles.subtitle}>
        Are you sure you want to delete the ‘Platform Launch’ board? This action
        will remove all columns and tasks and cannot be reversed.
      </p>
      <div className={styles.wrap}>
        <Button title="Delete" buttonType="dangerous" />
        <Button title="Cancel" buttonType="secondary" />
      </div>
    </>
  ) : (
    <>
      <header>
        <h2 className={styles.title}>Delete this task?</h2>
      </header>
      <p className={styles.subtitle}>
        Are you sure you want to delete the ‘Build settings UI’ task and its
        subtasks? This action cannot be reversed.
      </p>
      <div className={styles.wrap}>
        <Button title="Delete" buttonType="dangerous" />
        <Button title="Cancel" buttonType="secondary" />
      </div>
    </>
  );
};

export default Delete;
