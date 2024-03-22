"use client";
import React, { useEffect, useState } from "react";
import { TaskProps } from "./task-format.props";
import styles from "./task-format.module.css";
import cn from "classnames";
import { Button, Input, Label, Select, Textarea } from "..";
import { BoardI, ColumnI, SubtaskI, TaskI } from "@/interfaces/user.interface";
import { db } from "@/firebase";
import { doc, setDoc } from "firebase/firestore";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { getUid } from "@/lib";
import { title } from "process";
import { useDispatch } from "react-redux";
import { setBoardLoading, updateBoard } from "@/redux/slice/board";
import { setModal } from "@/redux/slice/service";

const Task = ({ type = "add", board, ...props }: TaskProps): JSX.Element => {
  const [isOpen, setIsOpen] = useState(false);
  const { boards, currentTaskInf, boardLoading } = useSelector(
    (state: RootState) => state.board
  );
  const { user } = useSelector((state: RootState) => state.user);
  const [taskColumnUid, setTaskColumn] = useState(
    currentTaskInf?.columnId || (board?.columns && board?.columns[0]?.uid)
  );

  console.log(taskColumnUid);
  const column: ColumnI | undefined = board?.columns?.find(
    (column) => column.uid === currentTaskInf?.columnId
  );
  const task = column?.tasks?.find(
    (task) => task.uid === currentTaskInf?.taskId
  );
  const initialSubtasks: SubtaskI[] = [
    {
      uid: "",
      title: "",
      complete: false,
    },
  ];
  const initialTask: TaskI = {
    uid: "",
    title: "",
    description: "",
  };
  const [subtasks, setSubtask] = useState<SubtaskI[]>(
    type === "edit"
      ? task?.subtasks
        ? task.subtasks
        : [{ ...initialSubtasks[0], uid: getUid() }]
      : [{ ...initialSubtasks[0], uid: getUid() }]
  );
  const [newTask, setTask] = useState<TaskI>(
    type === "edit"
      ? task
        ? task
        : { ...initialTask, uid: getUid() }
      : { ...initialTask, uid: getUid() }
  );
  const dispatch = useDispatch();

  return (
    <form
      className={styles.main}
      onSubmit={(e) => {
        e.preventDefault();
        const fullTask: TaskI = { ...newTask, subtasks };
        const updatedColumns = board?.columns?.map((column) => {
          if (taskColumnUid === column.uid) {
            const hasTask = column.tasks?.find(
              (task) => task.uid === newTask.uid
            );
            if (hasTask) {
              return column;
            } else {
              return {
                ...column,
                tasks: column?.tasks
                  ? [...column?.tasks, fullTask]
                  : [fullTask],
              };
            }
          } else {
            const hasTask = column.tasks?.find(
              (task) => task.uid === fullTask.uid
            );
            if (hasTask) {
              const newTaskArray = column.tasks?.filter(
                (task) => task.uid !== hasTask.uid
              );
              return { ...column, tasks: newTaskArray };
            } else {
              return column;
            }
          }
        }) as ColumnI[];

        const updatedBoard = board?.columns
          ? ({ ...board, columns: updatedColumns } as BoardI)
          : (board as BoardI);
        console.log(updateBoard);
        dispatch(setBoardLoading(true));
        setDoc(
          doc(db, user ? `user/${user}/boards` : `boards`, board.uid),
          updatedBoard,
          {
            merge: true,
          }
        )
          .then((rec) => {
            dispatch(setBoardLoading(false));
            console.log("task added");
            dispatch(updateBoard(updatedBoard));
            dispatch(setModal("none"));
          })
          .catch((error) => {
            dispatch(setBoardLoading(false));
            console.log(error);
          });
      }}
    >
      <header>
        <h2 className={styles.title}>Add New Task</h2>
      </header>
      <Label title="Title">
        <Input
          onChange={(e) => {
            setTask((prev) => {
              return { ...prev, title: e.target.value };
            });
          }}
          defaultValue={newTask.title}
          placeholder="e.g. Take coffee break"
        />
      </Label>
      <Label title="Description">
        <Textarea
          onChange={(e) => {
            setTask((prev) => {
              return { ...prev, description: e.target.value };
            });
          }}
          defaultValue={newTask.description}
          placeholder="e.g. It’s always good to take a break. This 15 minute break will 
recharge the batteries a little."
        />
      </Label>
      <Label
        onClick={(e: any) => {
          const currentUid = Object.assign({}, e?.target?.dataset)?.uid;
          if (currentUid) {
            setSubtask((prev) => {
              return prev.filter((item) => item.uid === currentUid);
            });
          }
        }}
        title="Subtask"
      >
        {subtasks.map((item, index) => (
          <Input
            itemKey={item.uid}
            key={index}
            trash={true}
            placeholder="e.g. Make coffee"
            defaultValue={item.title}
            onChange={(e) => {
              setSubtask((prev) => {
                return prev.map((subtask) => {
                  if (subtask.uid === item.uid) {
                    return { ...subtask, title: e.target.value };
                  } else {
                    return subtask;
                  }
                });
              });
            }}
          />
        ))}
        <Button
          type="button"
          onClick={() => {
            setSubtask((prev) => {
              return [...prev, { ...initialSubtasks[0], uid: getUid() }];
            });
          }}
          buttonType="secondary"
          title="+ Add New Subtask"
        />
      </Label>
      <Label
        title="Status"
        onClick={(e: any) => {
          if (e.target.id === "header") {
            setIsOpen(!isOpen);
          }
        }}
      >
        <Select
          realTime={false}
          setTaskColumn={setTaskColumn}
          setIsOpen={setIsOpen}
          isOpen={isOpen}
          taskColumnuid={taskColumnUid}
          columns={board?.columns || []}
        ></Select>
      </Label>
      <Button
        type="submit"
        title={
          boardLoading
            ? "Loading..."
            : type === "add"
            ? "Add Task"
            : "Save Changes"
        }
        buttonType="primary-S"
      />
    </form>
  );
};

export default Task;
