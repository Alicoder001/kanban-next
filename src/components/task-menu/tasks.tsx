import React from "react";
import styles from "./tasks.module.css";
import cn from "classnames";
import { Query, collection, doc, getDocs } from "firebase/firestore";
import { db } from "@/firebase";
import { getCollection } from "@/lib";
import { BoardI } from "@/interfaces/user.interface";

const Tasks = async ({ board }: { board: BoardI }) => {
  return (
    <div className={cn(styles.tasks)}>
      <ul className={styles.categories}>
        {board.columns?.map((column) => (
          <li key={column.uid} className={styles.category}>
            <div className={styles.titleWrap}>
              <div className={styles.circle}></div>
              <h4 className={styles.categoryTitle}>{column.title}(4)</h4>
            </div>
            <ul className={styles.taskList}>
              {column.tasks?.map((task) => (
                <li className={styles.task}>
                  <h3 className={styles.title}>Build UI for onboarding flow</h3>
                  <p className={styles.subt}>0 of 3 substasks</p>
                </li>
              ))}
            </ul>
          </li>
        ))}

        {/* <li className={styles.category}>
          <div className={styles.titleWrap}>
            <div className={styles.circle}></div>
            <h4 className={styles.categoryTitle}>TODO (4)</h4>
          </div>
          <ul className={styles.taskList}>
            <li className={styles.task}>
              <h3 className={styles.title}>Build UI for onboarding flow</h3>
              <p className={styles.subt}>0 of 3 substasks</p>
            </li>
            <li className={styles.task}>
              <h3 className={styles.title}>Build UI for onboarding flow</h3>
              <p className={styles.subt}>0 of 3 substasks</p>
            </li>
            <li className={styles.task}>
              <h3 className={styles.title}>Build UI for onboarding flow</h3>
              <p className={styles.subt}>0 of 3 substasks</p>
            </li>{" "}
          </ul>
        </li>
        <li className={styles.category}>
          <div className={styles.titleWrap}>
            <div className={styles.circle}></div>
            <h4 className={styles.categoryTitle}>TODO (4)</h4>
          </div>
          <ul className={styles.taskList}>
            <li className={styles.task}>
              <h3 className={styles.title}>Build UI for onboarding flow</h3>
              <p className={styles.subt}>0 of 3 substasks</p>
            </li>
            <li className={styles.task}>
              <h3 className={styles.title}>Build UI for onboarding flow</h3>
              <p className={styles.subt}>0 of 3 substasks</p>
            </li>
            <li className={styles.task}>
              <h3 className={styles.title}>Build UI for onboarding flow</h3>
              <p className={styles.subt}>0 of 3 substasks</p>
            </li>
            <li className={styles.task}>
              <h3 className={styles.title}>Build UI for onboarding flow</h3>
              <p className={styles.subt}>0 of 3 substasks</p>
            </li>
            <li className={styles.task}>
              <h3 className={styles.title}>Build UI for onboarding flow</h3>
              <p className={styles.subt}>0 of 3 substasks</p>
            </li>
            <li className={styles.task}>
              <h3 className={styles.title}>Build UI for onboarding flow</h3>
              <p className={styles.subt}>0 of 3 substasks</p>
            </li>
          </ul>
        </li> */}
        <div className={styles.newCategory}>+ New Column</div>
      </ul>
    </div>
  );
};

export default Tasks;
